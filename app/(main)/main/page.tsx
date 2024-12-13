import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

export default function Page() {
  return (
    <div className="h-full overflow-y-scroll flex p-4 flex-col">
      <Card className="h-min w-full relative">
        <CardHeader className="pb-4">
          <CardTitle>
            <Link className="underline" href="#">
              Upper A
            </Link>
          </CardTitle>

          <CardDescription className="text-current">
            <div>
              <p className="text-muted-foreground text-xs">Time</p>
              <p className="">1h 30min</p>
            </div>
          </CardDescription>

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
          <div className="w-full max-h-[10dvh] overflow-y-scroll">
            <div className="flex items-center w-full gap-2">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>B</AvatarFallback>
              </Avatar>
              <Link className="underline" href="#">
                2x Bench press
              </Link>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <CardDescription className="absolute bottom-2 right-2 !mt-0">
            14/12/2024
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
