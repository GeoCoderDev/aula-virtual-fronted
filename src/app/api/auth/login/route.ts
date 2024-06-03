import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const bodyString = await readStreamToString(req.body);

    const jsonData = JSON.parse(bodyString);

    const { token } = jsonData;

    if (!token) {
      return new Response(
        JSON.stringify({ message: "Missing token on request body" }),
        { status: 401 }
      );
    }

    const tokenSerialize = serialize("myToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours in ms
    });

    return new Response(null, {
      status: 201,
      headers: { "Set-Cookie": tokenSerialize },
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
