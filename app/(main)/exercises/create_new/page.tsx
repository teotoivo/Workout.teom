"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { MUSCLES, EXERCISE_TYPES } from "@/utils/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

import TopNav from "@/components/topNav";

const formSchema = z.object({
  name: z.string().nonempty(),
  muscle: z.string().nonempty("Select a muscle"),
});

export default function Create_new() {
  const client = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      muscle: "",
    },
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { error } = await client.from("exercises").insert([
      {
        name: values.name,
        target_muscle: values.muscle,
        is_custom: true,
      },
    ]);
    if (error) {
      console.log(error);
      if (error.message.includes("duplicate key value")) {
        form.setError("name", {
          type: "manual",
          message: "An exercise with this name already exists",
        });
      } else {
        toast({
          title: "An error occurred",
          description: "An error occurred while creating the exercise",
          variant: "destructive",
        });
      }
      return;
    }
    toast({
      title: "Exercise created",
      description: "Your exercise has been created successfully",
      variant: "default",
    });
    router.push("../");
  }

  return (
    <div className="h-full flex p-4 flex-col gap-2">
      <TopNav title="Create new exercise" />
      <div className="h-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="muscle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target muscle</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a muscle that this exercise works" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {MUSCLES.map((muscle) => (
                        <SelectItem key={muscle.name} value={muscle.name}>
                          {muscle.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Create</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
