import { Button } from "@/components/ui/button";
import { Dumbbell, House, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NavBar() {
  return (
    <>
      <div className="w-full flex justify-evenly py-4">
        <Link href="/">
          <Button variant="ghost" className="h-fit py-1">
            Home
          </Button>
        </Link>
        <Link href="/workouts">
          <Button variant="ghost" className="h-fit py-1">
            Workouts
          </Button>
        </Link>
        <Link href="/profile">
          <Button variant="ghost" className="h-fit py-1">
            User
          </Button>
        </Link>
      </div>
    </>
  );
}
