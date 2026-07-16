"use server";

import { auth } from "@/auth";
import { Overview } from "./overview";
import { prisma } from "@/lib/prisma";

export default async function Page() {
  const activitiesTimes = await getActivitiesTimes();

  return <Overview activitiesTimes={activitiesTimes} />;
}

async function getActivitiesTimes() {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized");

  const timeEntries = await prisma.timeEntry.findMany({ where: { userId: session.user.id } });

  let activitiesTimes: { name: string; time: string }[] = [];
  let idTimes: { id: string; time: number }[] = [];

  for (const entry of timeEntries) {
    const index = idTimes.findIndex((el) => {
      return el.id === entry.activityId;
    });
    if (index !== -1) {
      idTimes[index].time +=
        (entry.endedAt ? entry.endedAt.valueOf() : Date.now()) - entry.startedAt.valueOf();
    } else {
      idTimes.push({
        id: entry.activityId,
        time: (entry.endedAt ? entry.endedAt.valueOf() : Date.now()) - entry.startedAt.valueOf(),
      });
    }
  }

  idTimes.sort((a, b) => {
    return b.time - a.time; // What in the fuck are JS devs on
  });

  for (const activity of idTimes) {
    const dbActivity = await prisma.activity.findUnique({ where: { id: activity.id } });

    activitiesTimes.push({
      name: dbActivity?.name ?? "Unknown activity",
      time: milisecondsToFormat(activity.time),
    });
  }

  return activitiesTimes;
}

function milisecondsToFormat(totalMilis: number) {
  const totalSeconds = totalMilis / 1000;

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const pad = (num: number) => String(num).padStart(2, "0");

  return `${pad(days)}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
