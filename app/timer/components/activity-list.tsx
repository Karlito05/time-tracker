import { useContext } from "react";
import { ActivityContext } from "../utils/typedefs";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { activate, deactivate, removeActivity } from "../utils/actions";
import { IconX } from "@tabler/icons-react";

export function ActivityList() {
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
          if (id === ac.activeID) {
            deactivate();
            ac.setActiveID(undefined);
          } else {
            activate(id);
            ac.setActiveID(id);
          }

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

          if (id === ac.activeID) {
            ac.setActiveID(undefined);
            deactivate();
            ac.setActiveSince(new Date());
          }
        }}
      >
        <IconX />
      </Button>
    </Field>
  );
}
