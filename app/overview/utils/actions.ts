import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { milisecondsToFormat } from "./helpers";

export async function getActivitiesTimes() {
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
