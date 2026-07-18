"use server";

import TimerHome from "./timer";
import { getActiveId, getActiveSince, getActivities } from "./utils/actions";

export default async function Page() {
  const activities = await getActivities();
  const activeId = await getActiveId();
  const activeSince = await getActiveSince();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-sm flex-col items-center justify-start md:py-32 md:max-w-3xl md:px-48 py-6 px-6 bg-white dark:bg-black sm:items-start ">
        <TimerHome
          initActiveID={activeId}
          initActiveSince={activeSince}
          initActivities={activities}
        />
      </main>
    </div>
  );
}
