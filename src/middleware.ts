import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { isStaticAsset } from "./lib/helpers/isStaticAsset";
import validateCourseId from "./lib/helpers/validations/validateCursoID";

const urlAPIBackend = "https://api.aula-virtual-jbsf.com";
// const urlAPIBackend = "http://localhost";

export async function middleware(request: NextRequest) {
  const deleteCookies = () => {
    const deletedTokenCookie = serialize("myToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 0,
    });

    const deletedRoleCookie = serialize("myRole", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "strict",
      maxAge: 0,
    });

    return NextResponse.redirect(new URL("/login", request.url), {
      headers: {
        "Set-Cookie": `${deletedTokenCookie}, ${deletedRoleCookie}`,
      },
    });
  };

  try {
    const url = request.nextUrl;
    const pathname = url.pathname;

    if (pathname.startsWith("/api")) {
      return NextResponse.next();
    }

    if (isStaticAsset(request.nextUrl.pathname)) {
      return NextResponse.next();
    }

    const token = request.cookies.get("myToken");
    const role = request.cookies.get("myRole");

    if (!token && (pathname === "/login" || pathname.startsWith("/login/"))) {
      return NextResponse.next();
    }

    if (!token || !role) {
      return deleteCookies();
    }

    if (!/^\s*(?:admin|superadmin|teacher|student)\s*$/i.test(role.value)) {
      throw new Error("ROLE-NOT-VALID");
    }

    if (token && (pathname === "/login" || pathname.startsWith("/login/"))) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      token &&
      (pathname.startsWith("/administradores") ||
        pathname.startsWith("/configuraciones"))
    ) {
      // Realiza acciones específicas para roles administrativos si es necesario
    }

    if (pathname.startsWith("/mis-cursos/")) {
      const parts = pathname.replace("/mis-cursos/", "").split("/");
      const courseId = parts[0];

      const { status } = validateCourseId(courseId);

      if (!status) {
        return NextResponse.redirect(new URL("/mis-cursos", request.url));
      }

      const accessRes = await fetch(
        `${urlAPIBackend}/api/myCourses/${courseId}/access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token?.value as any, // Lamentablemente por alguna razón no se puede enviar info en los headers
          },
          body: JSON.stringify({ Authorization: token?.value }),
        }
      );

      const { access } = await accessRes.json();

      if (!access) {
        return NextResponse.redirect(new URL("/mis-cursos", request.url));
      }
    }

    return NextResponse.next();
  } catch (e) {
    return deleteCookies();
  }
}

export const config = {
  matcher: "/:path*",
};
