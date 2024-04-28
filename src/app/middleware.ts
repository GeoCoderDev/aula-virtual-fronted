
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest){


    const token = request.cookies.get("myToken"); // get the jwt token from cookies
    
    if (token) {
        return NextResponse.redirect(new URL("/", request.url));
    }        

}

export const config = {
    matcher: '/login/:path*', // Esto coincidirá con todas las rutas que empiezan con '/login/'
  }