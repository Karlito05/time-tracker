"use server";

import { Overview } from "./overview";
import { getActivitiesTimes } from "./utils/actions";

export default async function Page() {
  const activitiesTimes = await getActivitiesTimes();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-sm flex-col items-center justify-start md:py-32 md:max-w-3xl md:px-48 py-6 px-6 bg-white dark:bg-black sm:items-start">
        <Overview activitiesTimes={activitiesTimes} />
      </main>
    </div>
  );
}
