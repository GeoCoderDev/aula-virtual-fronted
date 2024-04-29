import { NextRequest, NextResponse } from "next/server";
import { isStaticAsset } from "./lib/utils/isStaticAsset";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const token = request.cookies.get("myToken");

  // Excluir las rutas de la API del middleware
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Permite cargar recursos estáticos sin autenticación
  if (isStaticAsset(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Si hay un token y el usuario intenta acceder a la ruta /login o sus subrutas
  if (token && (pathname === "/login" || pathname.startsWith("/login/"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si no hay token y no está en la ruta de inicio de sesión (/login)
  if (!token && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Si hay un token o está en la ruta de inicio de sesión, permitir el acceso
  return NextResponse.next();
}

// Opcional: Configura las rutas a las que se aplica el middleware
export const config = {
  matcher: "/:path*",
};