import { Button } from "@/components/ui/button";
import { Dumbbell, House, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <>
      <div className="mt-auto w-full flex justify-evenly py-4">
        <Link href="/">
          <Button className="h-fit py-1">
            <House className="!w-7 !h-7" />
          </Button>
        </Link>
        <Link href="/workouts">
          <Button className="h-fit py-1">
            <Dumbbell className="!w-7 !h-7" />
          </Button>
        </Link>
        <Link href="/profile">
          <Button className="h-fit py-1">
            <User className="!w-7 !h-7" />
          </Button>
        </Link>
      </div>
    </>
  );
}
