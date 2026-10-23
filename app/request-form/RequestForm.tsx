"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { format, startOfToday } from "date-fns";
import {
  formSchema,
  FormFields,
  courses,
  preferredTimes,
} from "@/lib/formSchema";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { toast } from "@/components/ui/toast";
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

export default function RequestForm() {
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      course: undefined,
      topic: "",
      preferreddate: undefined,
      preferredtime: undefined,
    },
  });

  const onSubmit = async (data: FormFields) => {
    const response = await fetch("/api/process-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ?? "Could not submit the tutoring request.",
      );
    }

    const id = toast.add({
      title: result.message ?? "Request received",
      description: (
        <>
          <span className="block">
            <strong className="text-muted-foreground">Course:</strong>{" "}
            <span className="font-medium text-foreground">{result.course}</span>
          </span>
          <span className="block">
            <strong className="text-muted-foreground">Topic:</strong>{" "}
            <span className="font-medium text-foreground">{result.topic}</span>
          </span>
          <span className="block">
            <strong className="text-muted-foreground">Preferred date:</strong>{" "}
            <span className="font-medium text-foreground">
              {format(new Date(result.preferreddate), "PPP")}
            </span>
          </span>
          <span className="block">
            <strong className="text-muted-foreground">Preferred time:</strong>{" "}
            <span className="font-medium text-foreground">
              {result.preferredtime}
            </span>
          </span>
          <span className="block">
            <strong className="text-green-600">Status:</strong>{" "}
            <span className="font-semibold text-green-600">
              {result.status}
            </span>
          </span>
        </>
      ),
      actionProps: {
        onClick() {
          toast.close(id);
        },
      },
    });
  };

  const [firstAllowedDate, setFirstAllowedDate] = useState<Date | undefined>();

  useEffect(() => {
    setFirstAllowedDate(startOfToday());
  }, []);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Tutor Request</CardTitle>
        </CardHeader>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="pt-2 pb-4">
            <FieldGroup>
              <div className="grid gap-6 sm:grid-cols-2">
                <Controller
                  name="course"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Course</FieldLabel>
                      <Select
                        items={courses}
                        value={field.value ?? null}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.value} value={course.value}>
                              {course.label}
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
                  name="preferredtime"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Preferred time</FieldLabel>
                      <Select
                        items={preferredTimes}
                        value={field.value ?? null}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choose a time" />
                        </SelectTrigger>
                        <SelectContent>
                          {preferredTimes.map((time) => (
                            <SelectItem key={time.value} value={time.value}>
                              {time.label}
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
              </div>

              <Controller
                name="topic"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>What would you like help with?</FieldLabel>
                    <InputGroup>
                      <InputGroupTextarea
                        {...field}
                        aria-invalid={fieldState.invalid}
                        placeholder="Describe the topic or problem you’re working on."
                        className="min-h-28"
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText>
                          {field.value?.length ?? 0}/120
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="preferreddate"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Preferred date</FieldLabel>
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            type="button"
                            variant="outline"
                            aria-invalid={fieldState.invalid}
                            className="w-full justify-start text-left font-normal"
                          />
                        }
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Choose a date"}
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(date) => field.onChange(date ?? null)}
                          disabled={
                            firstAllowedDate
                              ? { before: firstAllowedDate }
                              : undefined
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </CardContent>

          <CardFooter className="border-t pt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting…" : "Submit request"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
