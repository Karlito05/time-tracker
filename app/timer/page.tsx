"use server";

import TimerHome from "./timer";
import { getActiveId, getActiveSince, getActivities } from "./utils/actions";

export default async function Page() {
  const activities = await getActivities();
  const activeId = await getActiveId();
  const activeSince = await getActiveSince();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-start py-32 px-48 min-w-2xl bg-white dark:bg-black sm:items-start">
        <TimerHome
          initActiveID={activeId}
          initActiveSince={activeSince}
          initActivities={activities}
        />
      </main>
    </div>
  );
}
