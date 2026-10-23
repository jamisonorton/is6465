import { z } from "zod";

const courseValues = {
  IS_6465: "is6465",
  IS_6495: "is6495",
  IS_6570: "is6570",
} as const;

const timeValues = {
  Morning: "morning",
  Afternoon: "afternoon",
  Night: "night",
} as const;

export const courses = Object.entries(courseValues).map(([label, value]) => ({
  label: label.replace("_", " "),
  value,
}));

export const preferredTimes = Object.entries(timeValues).map(
  ([label, value]) => ({ label, value }),
);

export const formSchema = z.object({
  course: z
    .enum(courseValues)
    .nonoptional({ message: "Please choose a course." }),
  topic: z.string().nonempty({ message: "Topic is required." }),
  date: z.date().nonoptional({ message: "Please select a date." }),
  time: z
    .enum(timeValues)
    .nonoptional({ message: "Please choose a preferred time." }),
});
// Infer the TypeScript type from the schema
export type FormFields = z.infer<typeof formSchema>;
