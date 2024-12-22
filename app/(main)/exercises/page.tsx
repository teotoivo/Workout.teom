"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/client";
import { ChevronLeft, ChevronRight, Trash } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import TopNav from "@/components/topNav";

export default function Exercises() {
  const client = createClient();

  const [exercises, setExercises] = useState<
    {
      description: string | null;
      id: number;
      is_custom: boolean;
      name: string;
      target_muscle: string;
      user_id: string | null;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      const { data, error } = await client.from("exercises").select();
      if (error) {
        console.error(error);
        return;
      }
      setExercises(data);
      setLoading(false);
    };

    fetchExercises();
  }, []);

  return (
    <div className="h-full overflow-y-scroll flex p-4 flex-col gap-2">
      <TopNav
        title="Exercises"
        Action={
          <Link className="" href="./create_new">
            <Button variant="secondary" className="h-fit">
              Create new
            </Button>
          </Link>
        }
      />
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-muted">Loading...</p>
        </div>
      ) : exercises.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-lg text-muted">No exercises found</p>
        </div>
      ) : (
        exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="h-min w-full border rounded-lg p-2 flex items-center gap-2"
          >
            <Avatar>
              <AvatarImage src={""} />
              <AvatarFallback>{exercise.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="">{exercise.name}</h1>
            <p className="text-muted">{exercise.target_muscle}</p>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="p-2 ml-auto">
                  <Trash className="!size-6 text-red-900" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action can not be undone. This will permantently delete
                    this exercise.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={async () => {
                      const { error } = await client
                        .from("exercises")
                        .delete()
                        .eq("id", exercise.id);
                      if (error) {
                        console.log(error);

                        toast({
                          title: "Error",
                          description:
                            "An error occured while deleting the exercise",
                          variant: "destructive",
                        });
                        return;
                      }

                      setExercises(
                        exercises.filter((e) => e.id !== exercise.id)
                      );
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Link href={`./${exercise.id}`}>
              <Button variant="ghost" className="ml-auto p-2">
                <ChevronRight className="!size-6" />
              </Button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
