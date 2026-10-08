export async function POST() {
  return new Response("Your tutoring request was received.", {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
