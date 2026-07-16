"use client";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import Link from "next/link";

export function Overview({
  activitiesTimes,
}: {
  activitiesTimes: { name: string; time: string }[];
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-start py-32 px-48 min-w-2xl bg-white dark:bg-black sm:items-start">
        {" "}
        <div className="flex flex-col h-full w-full gap-5">
          <Nav />
          <ActivityView activitiesTimes={activitiesTimes} />
        </div>
      </main>
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

function ActivityView({ activitiesTimes }: { activitiesTimes: { name: string; time: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {activitiesTimes.map((p, i) => {
        return <ActivityTime {...p} key={i} />;
      })}
    </div>
  );
}

function ActivityTime({ name, time }: { name: string; time: string }) {
  return (
    <Field orientation={"horizontal"} className="h-12">
      <div className="flex-1 min-w-0 overflow-hidden  rounded-md px-5 h-full justify-between items-center flex text-xl font-bold bg-card">
        <span className="overflow-hidden">{name} </span>
        <span>{time}</span>
      </div>
    </Field>
  );
}
