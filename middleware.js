import { NextResponse } from "next/server";

// Basic Auth (náhrada .htpasswd, na Vercelu není Apache).
// Zapne se jen když jsou nastavené BASIC_AUTH_USER a BASIC_AUTH_PASSWORD.
export function middleware(req) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;
  if (!user || !pass) return NextResponse.next();

  const auth = req.headers.get("authorization") ?? "";
  if (auth.startsWith("Basic ")) {
    const [u, ...rest] = atob(auth.slice(6)).split(":");
    if (u === user && rest.join(":") === pass) return NextResponse.next();
  }

  return new NextResponse("Přístup chráněn heslem.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="MANDIK", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
