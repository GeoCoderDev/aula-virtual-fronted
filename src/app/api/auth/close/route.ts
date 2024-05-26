// import { NextRequest, NextResponse } from "next/server";

// export async function PUT(request: NextRequest) {
//   const requestHeaders = new Headers(request.headers);
//   requestHeaders.set("Set-Cookie", "myToken=; Max-Age=-1; Path=/");

//   return new Response(null, {
//     status: 200,
//     headers: requestHeaders,
//   });
// }

import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function PUT(request: NextRequest, res: NextResponse) {
  const token = request.cookies.get("myToken");

  if (!token) return new Response(null, { status: 401 });

  const cookie = serialize("myToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    maxAge: 0, // Expirar la cookie inmediatamente
  });

  return new Response(null, {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}