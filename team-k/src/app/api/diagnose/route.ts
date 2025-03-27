export async function POST(request: Request) {
    const { pathname } = new URL(request.url);
    
    if (pathname === "/api/diagnose") {
      try {
        const text = await request.text();
        console.log("Diagnose route:", text);
        return new Response(
          JSON.stringify({ message: "Diagnose Success!" }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({ error: `Diagnose Webhook error: ${error.message}` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
    }
    
    return new Response(
      JSON.stringify({ error: "Invalid route" }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }