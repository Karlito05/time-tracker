import { createContext } from "react";

export type Activity = { name: string; id: string };
type ActivityContextProps = {
  activities: Activity[];
  activeID?: string | undefined;
  activeSince: Date;
  setActivities: (val: Activity[]) => void;
  setActiveID: (val: string | undefined) => void;
  setActiveSince: (val: Date) => void;
};

export const ActivityContext = createContext<ActivityContextProps>({
  activities: [],
  activeID: undefined,
  activeSince: new Date(),
  setActivities: () => {},
  setActiveSince: () => {},
  setActiveID: () => {},
});
