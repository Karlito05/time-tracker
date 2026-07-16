"use client";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconX } from "@tabler/icons-react";
import { Activity, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { activate, addActivity, removeActivity } from "./actions";

export type Activity = { name: string; id: string };
type ActivityContextProps = {
  activities: Activity[];
  activeID?: string;
  activeSince: Date;
  setActivities: (val: Activity[]) => void;
  setActiveID: (val: string) => void;
  setActiveSince: (val: Date) => void;
};

const ActivityContext = createContext<ActivityContextProps>({
  activities: [],
  activeID: undefined,
  activeSince: new Date(),
  setActivities: () => {},
  setActiveSince: () => {},
  setActiveID: () => {},
});

function milisecondsToFormat(totalMilis: number) {
  const totalSeconds = totalMilis / 1000;

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

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
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-start py-32 px-48 min-w-2xl bg-white dark:bg-black sm:items-start">
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
          {" "}
          <div className="flex flex-col h-full w-full gap-5">
            <Timer />
            <ActivityView />
          </div>
        </ActivityContext>
      </main>
    </div>
  );
}

function Timer() {
  const ac = useContext(ActivityContext);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const updateInt = setInterval(() => {
      if (ac.activeID !== undefined) setUpdate(update + 1);
    }, 1000);

    return () => clearInterval(updateInt);
  });
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className="items-center justify-center text-2xl font-bold text-[#FFFFFF80]">
          {
            ac.activities.find((a) => {
              return a.id == ac.activeID;
            })?.name
          }
        </CardHeader>
        <CardContent className="text-5xl flex justify-center items-center">
          <div>{milisecondsToFormat(Date.now() - ac.activeSince.valueOf())}</div>
        </CardContent>
      </Card>
    </div>
  );
}

function ActivityView() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <ActivityList />
      <AddActivity />
    </div>
  );
}

function AddActivity() {
  const [inputText, setInputText] = useState("");
  const ac = useContext(ActivityContext);
  async function handleAddActivity() {
    const activityID = await addActivity(inputText);

    ac.setActivities([...ac.activities, { name: inputText, id: activityID }]);

    setInputText("");
  }
  return (
    <Field orientation={"horizontal"} className="h-10">
      <Input
        type="text"
        placeholder="Activity Name"
        className="border-none h-full"
        value={inputText}
        onChange={(ce) => {
          setInputText(ce.target.value);
        }}
      ></Input>
      <Button className={"h-full"} onClick={handleAddActivity}>
        Add Activity
      </Button>
    </Field>
  );
}
function ActivityList() {
  const ac = useContext(ActivityContext);
  return (
    <div className="flex flex-col w-full gap-3">
      {ac.activities.map((activity, i) => {
        return (
          <ActivityEl
            name={activity.name}
            active={activity.id === ac.activeID}
            id={activity.id}
            key={i}
            devMode={false}
          />
        );
      })}
    </div>
  );
}

function ActivityEl({
  name,
  active,
  id,
  devMode,
}: {
  name: string;
  active?: boolean;
  id: string;
  devMode?: boolean;
}) {
  const ac = useContext(ActivityContext);
  return (
    <Field orientation={"horizontal"} className="h-12">
      <Button
        className={`flex-1 min-w-0 overflow-hidden  rounded-md px-5 h-full justify-start items-center flex text-xl font-bold ${
          active ? "bg-primary" : "bg-zinc-900"
        }`}
        onClick={() => {
          activate(id);
          ac.setActiveID(id);
          ac.setActiveSince(new Date());
        }}
      >
        <span className="overflow-hidden">
          {name} {devMode ? `id: ${id}` : ""}
        </span>
      </Button>

      <Button
        size={"icon-lg"}
        variant={"destructive"}
        className="h-12 w-12 shrink-0"
        onClick={() => {
          removeActivity(id);
          let newActivities = ac.activities;
          newActivities = newActivities.filter((a) => {
            return a.id != id;
          });

          ac.setActivities(newActivities);
        }}
      >
        <IconX />
      </Button>
    </Field>
  );
}
