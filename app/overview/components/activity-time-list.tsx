import { Field } from "@/components/ui/field";

export function ActivityTimeList({
  activitiesTimes,
}: {
  activitiesTimes: { name: string; time: string }[];
}) {
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
