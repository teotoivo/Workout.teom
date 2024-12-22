import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

import Layout from "../main_layout";

export default function page() {
  return (
    <Layout>
      <div>
        <Link href="../../exercises">
          <Button variant="ghost" className="h-fit py-1">
            Exercises
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
