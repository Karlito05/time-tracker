"use server";

import { Overview } from "./overview";
import { getActivitiesTimes } from "./utils/actions";

export default async function Page() {
  const activitiesTimes = await getActivitiesTimes();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-start py-32 px-48 min-w-2xl bg-white dark:bg-black sm:items-start">
        <Overview activitiesTimes={activitiesTimes} />
      </main>
    </div>
  );
}
