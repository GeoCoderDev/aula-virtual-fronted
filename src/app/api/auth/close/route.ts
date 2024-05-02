import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("Set-Cookie", "myToken=; Max-Age=-1; Path=/");

  return new Response(null, {
    status: 200,
    headers: requestHeaders,
  });
}