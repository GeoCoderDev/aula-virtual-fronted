import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { isStaticAsset } from "./lib/helpers/isStaticAsset";
import validateCourseId from "./lib/helpers/validations/validateCursoID";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  // Excluir las rutas de la API del middleware
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Permite cargar recursos estáticos sin autenticación
  if (isStaticAsset(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("myToken");
  const role = request.cookies.get("myRole");

  // Si está en la ruta de inicio de sesión (/login) o sus subrutas, permitir el acceso
  if (!token && (pathname === "/login" || pathname.startsWith("/login/"))) {
    return NextResponse.next();
  }

  /*
    Explicación de la expresión regular:

    ^ y $ son los delimitadores de inicio y fin de la cadena, respectivamente.

    \s* coincide con cero o más espacios en blanco.

    (?:admin|superadmin|teacher|student) es un grupo sin captura que coincide con cualquiera de los roles válidos.

    \s* coincide con cero o más espacios en blanco al final.

    /i hace que la coincidencia sea insensible a mayúsculas y minúsculas.
  */

  // Comprobando si el rol es un rol válido
  if (
    !role ||
    !/^\s*(?:admin|superadmin|teacher|student)\s*$/i.test(role.value)
  ) {
    console.log("Valor de role.value:", role?.value);
    // Eliminar las cookies
    const deletedTokenCookie = serialize("myToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 0, // Expirar la cookie inmediatamente
    });

    const deletedRoleCookie = serialize("myRole", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 0, // Expirar la cookie inmediatamente
    });

    // Redirigir a la página de inicio de sesión
    return NextResponse.redirect(new URL("/login", request.url), {
      headers: {
        "Set-Cookie": `${deletedTokenCookie}, ${deletedRoleCookie}`,
      },
    });
  }

  // Si hay un token y el usuario intenta acceder a la ruta /login o sus subrutas
  if (token && (pathname === "/login" || pathname.startsWith("/login/"))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si no hay token y no está en la ruta de inicio de sesión (/login)
  if (!token && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    token &&
    (pathname.startsWith("/administradores") ||
      pathname.startsWith("/configuraciones"))
  ) {
  }

  if (pathname.startsWith("/mis-cursos/")) {
    // Obtener la parte de la URL después de "/mis-cursos/"
    const parts = pathname.replace("/mis-cursos/", "").split("/");
    const courseId = parts[0]; // El primer segmento será el ID del curso
    console.log("ID del curso:", courseId);

    const { status } = validateCourseId(courseId);
    console.log("Estado de la validación del ID del curso:", status);

    if (!status) {
      return NextResponse.redirect(new URL("/mis-cursos", request.url));
    }
  }

  // Si hay un token o está en la ruta de inicio de sesión, permitir el acceso
  return NextResponse.next();
}

// Opcional: Configura las rutas a las que se aplica el middleware
export const config = {
  matcher: "/:path*",
};
