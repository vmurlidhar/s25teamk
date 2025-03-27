import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inputText = body.input;

    return new Promise((resolve, reject) => {
      const python = spawn("python", ["gemini.py", inputText], {
        cwd: process.cwd() + "/team-k", 
        shell: true,
      });

      let result = "";
      python.stdout.on("data", (data) => {
        result += data.toString();
      });

      python.stderr.on("data", (data) => {
        console.error("Python stderr:", data.toString());
      });

      python.on("close", (code) => {
        if (code !== 0) {
          return reject(
            NextResponse.json({ error: "Python script failed" }, { status: 500 })
          );
        } else {
          try {
            const parsed = JSON.parse(result);
            return resolve(NextResponse.json(parsed));
          } catch (e) {
            return reject(
              NextResponse.json({ error: "Invalid JSON from Python script" }, { status: 500 })
            );
          }
        }
      });
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
} 
