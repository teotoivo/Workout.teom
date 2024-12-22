"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useEffect, useState } from "react";

export default function Exercise({
  params,
}: {
  params: Promise<{ exercise_id: string }>;
}) {
  const [exercise, setExercise] = useState<{
    description: string | null;
    id: number;
    is_custom: boolean;
    name: string;
    target_muscle: string;
    user_id: string | null;
  }>();
  const [error, setError] = useState<string | null>(null);
  const client = createClient();

  useEffect(() => {
    async function fetchExercise() {
      const { exercise_id } = await params;
      const { data, error } = await client
        .from("exercises")
        .select()
        .eq("id", exercise_id);
      if (error) {
        console.log(error);
        setError("An error occurred while fetching the exercise");
        return;
      }
      if (data.length === 0) {
        setError("Exercise not found");
        return;
      }
      setExercise(data[0]);
    }
    fetchExercise();
  });
  return exercise ? (
    <div>
      <h1>{exercise.name}</h1>
      <p>{exercise.target_muscle}</p>
    </div>
  ) : error ? (
    <p>{error}</p>
  ) : (
    <p>Loading...</p>
  );
}
