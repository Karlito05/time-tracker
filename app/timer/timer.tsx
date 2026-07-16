"use client";

import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { Activity, ActivityContext } from "./utils/typedefs";
import { TimeCard } from "./components/time-card";
import { ActivityList } from "./components/activity-list";
import { AddActivityInput } from "./components/add-activity-input";

export default function TimerHome({
  initActivities,
  initActiveID,
  initActiveSince,
}: {
  initActivities: Activity[];
  initActiveID?: string;
  initActiveSince: Date;
}) {
  const [activities, setActivities] = useState(initActivities);
  const [activeID, setActiveID] = useState(initActiveID);
  const [activeSince, setActiveSince] = useState(initActiveSince);

  return (
    <ActivityContext
      value={{
        activities: activities,
        activeID: activeID,
        activeSince: activeSince,
        setActivities: setActivities,
        setActiveSince: setActiveSince,
        setActiveID: setActiveID,
      }}
    >
      <div className="flex flex-col h-full w-full gap-5">
        <Nav />
        <TimeCard />
        <ActivityList />
        <AddActivityInput />
      </div>
    </ActivityContext>
  );
}

function Nav() {
  return (
    <Field orientation={"horizontal"} className="w-full h-full">
      <Link href={"/timer"} className="flex-1 h-10">
        <Button className="h-10 w-full" variant={"default"}>
          Timer
        </Button>
      </Link>
      <Link href={"/overview"} className="flex-1 h-10">
        <Button className="w-full h-10" variant={"outline"}>
          Overview
        </Button>
      </Link>
    </Field>
  );
}
