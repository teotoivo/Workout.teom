import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { EllipsisVertical, Pen, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="h-full overflow-y-scroll flex p-4 flex-col">
      <div className="w-full flex flex-col gap-4">
        <Button className="w-full">Start new empty workout</Button>
        <Button className="w-full">New Routine</Button>

        <h1 className="text-xl">Routines</h1>
      </div>

      <div className="w-full flex flex-col gap-4 pt-4">
        <Card className="h-min w-full relative">
          <CardHeader className="pb-4">
            <CardTitle>
              <Link className="underline" href="#">
                Upper A
              </Link>
            </CardTitle>

            <CardDescription>description</CardDescription>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="absolute top-0 right-0 p-2 !m-0"
                >
                  <EllipsisVertical />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-0">
                <DropdownMenuItem className="justify-between">
                  Edit <Pen />
                </DropdownMenuItem>

                <DropdownMenuItem className="justify-between text-destructive">
                  Delete <Trash />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>

          <CardContent>
            <Button className="w-full">Start Workout</Button>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
}
