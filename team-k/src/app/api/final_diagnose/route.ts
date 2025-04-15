export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fastApiRes = await fetch("/final_diagnose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symptoms: body.input, // Convert 'input' to expected 'symptoms'
      }),
    });

    const result = await fastApiRes.json();

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    let errorMessage = "Server Error";
    if (error instanceof Error) {
      console.error("Error contacting FastAPI:", error.message);
      errorMessage = error.message;
    } else {
      console.error("Unknown error contacting FastAPI:", error);
    }

    return new Response(
      JSON.stringify({ error: errorMessage || "Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
