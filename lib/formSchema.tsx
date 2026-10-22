import { z } from "zod";

const courses = ["IS 6465", "IS 6495", "IS 6570"];
const preferredTime = ["Morning", "Afternoon", "Night"];

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Name must be at least 5 characters.")
    .nonempty({ message: "Name is required" }),
  course: z.enum(courses).nonoptional,
  topic: z.string().nonempty({ message: "Topic is required" }),
  date: z.date().nonoptional(),
  time: z.enum(preferredTime).nonoptional,
});
