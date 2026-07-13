import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconX } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-start py-32 px-48 min-w-2xl bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col h-full w-full gap-5">
          <Timer />
          <Activities />
        </div>
      </main>
    </div>
  );
}

function Timer() {
  return (
    <div className="w-full">
      <Card className="w-full">
        <CardHeader className="items-center justify-center text-2xl font-bold text-[#FFFFFF80]">
          Kodink
        </CardHeader>
        <CardContent className="text-5xl flex justify-center items-center">
          <div>0:00:00:00</div>
        </CardContent>
      </Card>
    </div>
  );
}

function Activities() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <ActivityList />
      <AddActivity />
    </div>
  );
}

function AddActivity() {
  return (
    <>
      <Field orientation={"horizontal"} className="h-10">
        <Input type="text" placeholder="Activity Name" className="border-none h-full"></Input>
        <Button className={"h-full"}>Add Activity</Button>
      </Field>
    </>
  );
}
function ActivityList() {
  return (
    <div className="flex flex-col w-full gap-3">
      <Activity name="Kodink" active={true} />
      <Activity name="Not Kodink" active={false} />
    </div>
  );
}

function Activity({ name, active }: { name: string; active?: boolean }) {
  return (
    <Field orientation={"horizontal"} className="h-12">
      <div
        className={`rounded-md px-5 h-full w-full justify-start items-center flex text-xl font-bold ${
          active ? "bg-primary" : "bg-zinc-900"
        }`}
      >
        {name}
      </div>
      <Button size={"icon-lg"} variant={"destructive"} className="h-12 w-12">
        <IconX />
      </Button>
    </Field>
  );
}
