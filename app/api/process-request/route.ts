export async function POST(request: Request) {
  let data: unknown;

  try {
    data = await request.json();
  } catch {
    return Response.json(
      { message: "Request body must contain valid JSON." },
      { status: 400 },
    );
  }

  if (typeof data !== "object" || data === null) {
    return Response.json(
      { message: "Request body must be a JSON object." },
      { status: 400 },
    );
  }

  const body = data as Record<string, unknown>;
  const allowedCourses = ["IS 6465", "IS 6495", "IS 6570"];
  const allowedTimes = ["Morning", "Afternoon", "Evening"];
  const errors: string[] = [];

  const course = typeof body.course === "string" ? body.course : "";
  if (!allowedCourses.includes(course)) {
    errors.push("Please select a valid course.");
  }

  const topic = typeof body.topic === "string" ? body.topic : "";
  if (typeof body.topic !== "string" || topic.trim() === "") {
    errors.push("Topic is required.");
  } else if (topic.length > 120) {
    errors.push("Topic must be 120 characters or fewer.");
  }

  const preferredtime =
    typeof body.preferredtime === "string" ? body.preferredtime : "";
  if (!allowedTimes.includes(preferredtime)) {
    errors.push("Please select a valid preferred time.");
  }

  let parsedDate: Date | null = null;
  const dateValue = body.preferreddate;

  if (typeof dateValue !== "string") {
    errors.push("Please provide a valid preferred date.");
  } else {
    const candidate = new Date(dateValue);

    // The form sends Date values as ISO strings, so require the same format.
    if (
      Number.isNaN(candidate.getTime()) ||
      candidate.toISOString() !== dateValue
    ) {
      errors.push("Please provide a valid preferred date.");
    } else {
      parsedDate = candidate;

      const selectedDay = new Date(
        candidate.getFullYear(),
        candidate.getMonth(),
        candidate.getDate(),
      );
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDay < today) {
        errors.push("Preferred date cannot be in the past.");
      }
    }
  }

  if (errors.length > 0 || parsedDate === null) {
    return Response.json(
      {
        message: errors[0] ?? "Please correct the request.",
        errors,
      },
      { status: 400 },
    );
  }

  return Response.json({
    message: "Request received",
    course,
    topic: topic.trim(),
    preferreddate: parsedDate.toISOString(),
    preferredtime,
    status: "Pending review",
  });
}
