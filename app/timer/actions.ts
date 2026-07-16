"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function activate(id: string) {
  const session = await auth();

  if (!session?.user?.id) throw new Error("Unauthorized");

  const timeEntry = await prisma.timeEntry.findFirst({
    where: { userId: session.user.id, endedAt: null },
  });

  if (timeEntry) {
    await prisma.timeEntry.update({
      where: {
        id: timeEntry.id,
      },
      data: {
        endedAt: new Date(),
      },
    });
  }
  await prisma.timeEntry.create({
    data: { activityId: id, userId: session.user.id, startedAt: new Date() },
  });
}
export async function addActivity(name: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const activity = await prisma.activity.create({
    data: {
      name,
      userId: session.user.id,
    },
  });

  return activity.id;
}

export async function removeActivity(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  await prisma.activity.delete({ where: { id, userId: session.user.id } });
}
