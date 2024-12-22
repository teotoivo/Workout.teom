import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function TopNav({
  title,
  Action,
}: {
  title: string;
  Action?: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-between items-center">
        <Link href="../">
          <Button variant="ghost" className="h-fit p-1">
            <ChevronLeft className="!size-6" />
          </Button>
        </Link>

        <h1 className="mx-auto">{title}</h1>
        {Action && <>{Action}</>}
      </div>
      <Separator className="px-4" />
    </>
  );
}
