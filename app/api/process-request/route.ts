export async function POST(request: Request) {
  const data = await request.json();

  return Response.json({
    message: "Request received",
    course: data.course,
    topic: data.topic,
    date: data.date,
    time: data.time,
    status: "Pending review",
  });
}
