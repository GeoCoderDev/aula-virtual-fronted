import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const bodyString = await readStreamToString(req.body!);

    const jsonData = JSON.parse(bodyString);

    const { token, role } = jsonData;

    if (!token) {
      return new Response(
        JSON.stringify({ message: "Missing token on request body" }),
        { status: 401 }
      );
    }

    if (!role) {
      return new Response(
        JSON.stringify({ message: "Missing role on request body" }),
        { status: 401 }
      );
    }

    const tokenSerialize = serialize("myToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours in seg
    });

    const roleSerialize = serialize("myRole", role, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours in seg
    });

    return new Response(null, {
      status: 201,
      headers: { "Set-Cookie": `${tokenSerialize}, ${roleSerialize}` },
    });
  } catch (error) {
    console.log(error);
  }
}

// For Next.js v13 and above, use the TextDecoder API
async function readStreamToString(stream: ReadableStream) {
  const decoder = new TextDecoder();
  let result = "";
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    result += decoder.decode(value);
  }
  reader.releaseLock();
  return result;
}
