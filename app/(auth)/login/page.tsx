"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import PasswordInput from "@/components/ui/passwordInput";
import { useForm } from "react-hook-form";

const MIN_PASSWORD_LENGTH = 6;
const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, "Password must be at least 6 characters"),
});

export default function Login() {
  const client = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | null>(null);
  const [signinPending, setSigninPending] = useState(false);
  const [redirect] = useState<string | null>(
    searchParams.get("redirect") ?? null
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function signIn(values: z.infer<typeof formSchema>) {
    setSigninPending(true);
    const { email, password } = values;

    const { error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setSigninPending(false);
    } else {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }

  return (
    <div className="flex flex-grow items-center justify-center">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
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
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      <Link
                        href="/request-reset"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </FormDescription>
                  </FormItem>
                )}
              />

              <Button
                className="w-full"
                onClick={form.handleSubmit(signIn)}
                disabled={signinPending}
              >
                {signinPending ? "Signing in..." : "Sign in"}
              </Button>

              <Button asChild variant="secondary" className="w-full">
                <Link
                  href={`/signup${redirect ? "?redirect=" + redirect : ""}`}
                >
                  Sign up
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
