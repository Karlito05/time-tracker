"use server";

import Link from "next/link";

export default async function Page() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-full flex-col items-center justify-center py-32 px-48 min-w-2xl bg-white dark:bg-black ">
        <Link href={"/timer"}>Continue to the app</Link>
      </main>
    </div>
  );
}
