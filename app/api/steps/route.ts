let steps = [
  { type: "step1", state: "ready" },
  { type: "step2", state: "ready" },
  { type: "step3", state: "ready" },
];
export async function GET(request: Request) {
  return new Response(JSON.stringify(steps));
}

export async function POST(request: Request) {
  let body = await request.json();
  steps = steps.map((step) => {
    if (step.type === body.type) {
      return { ...step, state: "completed" };
    }
    return step;
  });
  return new Response("OK", { status: 200 });
}
