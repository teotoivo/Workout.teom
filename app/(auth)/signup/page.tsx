"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MIN_PASSWORD_LENGTH = 6;
const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(MIN_PASSWORD_LENGTH, "Password must be at least 6 characters"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords do not match",
        path: ["confirmPassword"],
        fatal: true,
      });
    }
  });

export default function Signup() {
  const [error, setError] = useState<string | null>(null);

  const client = createClient();
  const router = useRouter();
  const [signupPending, setSignupPending] = useState(false);

  const searchParams = useSearchParams();

  const [redirect, setRedirect] = useState<string | null>(
    searchParams.get("redirect") ?? null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function signUp(values: z.infer<typeof formSchema>) {
    setSignupPending(true);
    const { email, password } = values;

    const { data, error } = await client.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setSignupPending(false);
    } else {
      setSignupPending(false);
      router.push(redirect ?? "/login");
    }
  }

  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Signup</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full"
                onClick={form.handleSubmit(signUp)}
                disabled={signupPending}
              >
                {signupPending ? "Signing up..." : "Sign up"}
              </Button>

              <Button variant="secondary" className="w-full">
                <Link href={`/login${redirect ? "?redirect=" + redirect : ""}`}>
                  Sign in
                </Link>
              </Button>
              {error && <Alert variant="destructive">{error}</Alert>}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
