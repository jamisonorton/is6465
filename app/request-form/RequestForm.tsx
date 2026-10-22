"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";

import type { AvailableTutor } from "@/lib/available-tutors";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

const times = ["Morning", "Afternoon", "Night"] as const;

const formSchema = z.object({
  name: z.string().trim().min(5, "Name must be at least 5 characters."),
  course: z.string().min(1, "Choose a course."),
  tutor: z.string().min(1, "Choose a tutor."),
  topic: z.string().trim().min(1, "Topic is required."),
  date: z.date({ error: "Choose a session date." }),
  time: z.enum(times, { error: "Choose a preferred time." }),
});

type FormValues = z.infer<typeof formSchema>;

type RequestFormProps = {
  availableTutors: AvailableTutor[];
};

export default function RequestForm({ availableTutors }: RequestFormProps) {
  // Inside RequestForm:
  const [today, setToday] = useState<Date>();

  useEffect(() => {
    setToday(new Date());
  }, []);

  const courses = [...new Set(availableTutors.map((tutor) => tutor.className))];

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      course: "",
      tutor: "",
      topic: "",
      date: undefined,
      time: undefined,
    },
  });

  const selectedCourse = form.watch("course");
  const tutorsForCourse = availableTutors.filter(
    (tutor) => tutor.className === selectedCourse,
  );

  function onSubmit(values: FormValues) {
    // Send the validated values to your API or server action.
    console.log(values);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 px-6 py-16">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-lg"
        >
          <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-xl">
            <CardHeader className="border-b bg-slate-50 px-6 py-6">
              <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                Request a Tutoring Session
              </CardTitle>
              <CardDescription className="text-slate-600">
                Choose a course, tutor, date, and preferred time.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-6 py-6">
              <FieldGroup className="gap-5">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="Jordan Doe"
                        autoComplete="name"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="course"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Course</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          form.setValue("tutor", "", { shouldValidate: true });
                        }}
                      >
                        <SelectTrigger
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course} value={course}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="tutor"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Tutor</FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!selectedCourse}
                      >
                        <SelectTrigger
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select a tutor" />
                        </SelectTrigger>
                        <SelectContent>
                          {tutorsForCourse.map((tutor) => (
                            <SelectItem key={tutor.name} value={tutor.name}>
                              {tutor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="topic"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Topic</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        placeholder="What would you like help with?"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="date"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Session date</FieldLabel>
                      <Popover>
                        <PopoverTrigger
                          render={
                            <Button
                              id={field.name}
                              type="button"
                              variant="outline"
                              aria-invalid={fieldState.invalid}
                              className="w-full justify-start text-left font-normal"
                            />
                          }
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={today ? { before: today } : undefined}
                          />
                        </PopoverContent>
                      </Popover>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="time"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Preferred time
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="Select a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {times.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </CardContent>

            <CardFooter className="border-t bg-slate-50 px-6 py-4">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Request Session
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
