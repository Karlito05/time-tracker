"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import Link from "next/link";
import { ActivityTimeList } from "./components/activity-time-list";

export function Overview({
  activitiesTimes,
}: {
  activitiesTimes: { name: string; time: string }[];
}) {
  return (
    <div className="flex flex-col h-full w-full gap-5">
      <Nav />
      <ActivityTimeList activitiesTimes={activitiesTimes} />
    </div>
  );
}

function Nav() {
  return (
    <Field orientation={"horizontal"} className="w-full h-full">
      <Link href={"/timer"} className="flex-1 h-10">
        <Button className="h-10 w-full" variant={"outline"}>
          Timer
        </Button>
      </Link>
      <Link href={"/overview"} className="flex-1 h-10">
        <Button className="w-full h-10" variant={"default"}>
          Overview
        </Button>
      </Link>
    </Field>
  );
}
