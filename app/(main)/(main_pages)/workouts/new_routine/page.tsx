import TopNav from "@/components/topNav";
import { Button } from "@/components/ui/button";
import React from "react";

export default function page() {
  return (
    <div className="h-full flex p-4 flex-col gap-2">
      <TopNav
        title="New Routine"
        Action={
          <Button variant="secondary" className="h-fit">
            Save
          </Button>
        }
      />
      <div className="h-full overflow-y-scroll"></div>
      <Button className="w-full">Add exercise</Button>
    </div>
  );
}
