import { z } from "zod";

const courseValues = {
  IS_6465: "IS 6465",
  IS_6495: "IS 6495",
  IS_6570: "IS 6570",
} as const;

const timeValues = {
  Morning: "Morning",
  Afternoon: "Afternoon",
  Evening: "Evening",
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
  topic: z.string().max(120).trim().nonempty({ message: "Topic is required." }),
  preferreddate: z
    .date()
    .nonoptional({ message: "Please select a date." })
    .refine(
      (date) => {
        const selectedDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return selectedDay >= today;
      },
      { message: "Preferred date cannot be in the past." },
    ),
  preferredtime: z
    .enum(timeValues)
    .nonoptional({ message: "Please choose a preferred time." }),
});
// Infer the TypeScript type from the schema
export type FormFields = z.infer<typeof formSchema>;
