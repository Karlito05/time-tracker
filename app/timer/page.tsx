"use server";

import { Activity } from "./typedefs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import TimerHome from "./timer";

export default async function Page() {
  const activities = await getActivities();
  const activeId = await getActiveId();
  const activeSince = await getActiveSince();

  return (
    <TimerHome initActiveID={activeId} initActiveSince={activeSince} initActivities={activities} />
  );
}

async function getActivities(): Promise<Activity[]> {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized");

  const prismaActivities = await prisma.activity.findMany({ where: { userId: session.user.id } });
  let activities: Activity[] = [];

  prismaActivities.map((r) => {
    activities.push({ id: r.id, name: r.name });
  });

  return activities;
}

async function getActiveId(): Promise<string | undefined> {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized");

  const timeEntry = await prisma.timeEntry.findFirst({
    where: { userId: session.user.id, endedAt: null },
  });

  if (!timeEntry) return undefined;

  return timeEntry?.activityId;
}

async function getActiveSince(): Promise<Date> {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized");

  const timeEntry = await prisma.timeEntry.findFirst({
    where: { userId: session.user.id, endedAt: null },
  });

  if (!timeEntry) return new Date();

  return timeEntry.startedAt;
}
