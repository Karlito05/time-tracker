import { useContext, useEffect, useState } from "react";
import { ActivityContext } from "../typedefs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { milisecondsToFormat } from "../helpers";

export function TimeCard() {
  const ac = useContext(ActivityContext);
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    const updateInt = setInterval(() => {
      if (ac.activeID !== undefined) setUpdate(update + 1);
    }, 1000);

    return () => clearInterval(updateInt);
  });
  return (
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
  );
}
