import { useContext, useState } from "react";
import { ActivityContext } from "../utils/typedefs";
import { addActivity } from "../utils/actions";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddActivityInput() {
  const [inputText, setInputText] = useState("");
  const ac = useContext(ActivityContext);
  async function handleAddActivity() {
    const activityID = await addActivity(inputText);

    ac.setActivities([...ac.activities, { name: inputText, id: activityID }]);

    setInputText("");
  }
  return (
    <Field orientation={"horizontal"} className="h-10">
      <Input
        type="text"
        placeholder="Activity Name"
        className="border-none h-full"
        value={inputText}
        onChange={(ce) => {
          setInputText(ce.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddActivity();
          }
        }}
      ></Input>
      <Button className={"h-full"} onClick={handleAddActivity}>
        Add Activity
      </Button>
    </Field>
  );
}
