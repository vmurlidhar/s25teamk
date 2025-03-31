export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fastApiRes = await fetch("http://127.0.0.1:8000/diagnose", {
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
  } catch (error: any) {
    console.error("Error contacting FastAPI:", error.message);
    return new Response(
      JSON.stringify({ error: error.message || "Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
