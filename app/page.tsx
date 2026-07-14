"use client";

import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconX } from "@tabler/icons-react";
import { Activity, useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";

type Activity = { name: string; id: number };
type ActivityContextProps = {
  activities: Activity[];
  setActivities: (val: Activity[]) => void;
  activeID: number | undefined;
  setActiveID: (val: number | undefined) => void;
  nextID: number;
  setNextID: (val: number) => void;
  curStartTime: number;
  setCurStartTime: (val: number) => void;
};

const ActivityContext = createContext<ActivityContextProps>({
  activities: [],
  setActivities: () => {},
  activeID: undefined,
  setActiveID: () => {},
  nextID: 1,
  setNextID: () => {},
  curStartTime: Date.now(),
  setCurStartTime: () => {},
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

export default function Home() {
  const [activeID, setActiveID] = useState<number | undefined>(undefined);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [nextID, setNextID] = useState<number>(1);
  const [curStartTime, setCurStartTime] = useState<number>(Date.now());
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-start py-32 px-48 min-w-2xl bg-white dark:bg-black sm:items-start">
        <ActivityContext
          value={{
            activities: activities,
            setActivities: setActivities,
            activeID: activeID,
            setActiveID: setActiveID,
            nextID: nextID,
            setNextID: setNextID,
            curStartTime: curStartTime,
            setCurStartTime: setCurStartTime,
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
          {ac.activities.find((a) => a.id == ac.activeID)?.name}
        </CardHeader>
        <CardContent className="text-5xl flex justify-center items-center">
          <div>{milisecondsToFormat(Date.now() - ac.curStartTime)}</div>
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
  function handleAddActivity() {
    let newActivites = [...ac.activities, { name: inputText, id: ac.nextID }];
    ac.setActivities(newActivites);
    ac.setNextID(ac.nextID + 1);
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
      {ac.activities.map((activity) => {
        return (
          <ActivityEl
            name={activity.name}
            active={activity.id === ac.activeID}
            id={activity.id}
            key={activity.id}
            devMode={true}
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
  id: number;
  devMode?: boolean;
}) {
  const ac = useContext(ActivityContext);

  function handleDelete() {
    let newActivities = [...ac.activities];
    newActivities = newActivities.filter((activity) => {
      return activity.id !== id;
    });
    if (id === ac.activeID) {
      ac.setActiveID(undefined);
    }

    ac.setActivities(newActivities);
  }

  function handleActivate() {
    ac.setCurStartTime(Date.now());
    ac.setActiveID(id);
  }

  return (
    <Field orientation={"horizontal"} className="h-12">
      <Button
        className={`flex-1 rounded-md px-5 h-full justify-start items-center flex text-xl font-bold ${
          active ? "bg-primary" : "bg-zinc-900"
        }`}
        onClick={handleActivate}
      >
        {name} {devMode ? `id: ${id}` : ""}
      </Button>
      <Button size={"icon-lg"} variant={"destructive"} className="h-12 w-12" onClick={handleDelete}>
        <IconX />
      </Button>
    </Field>
  );
}
