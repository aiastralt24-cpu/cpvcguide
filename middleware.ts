import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="CPVC Guide Internal"',
    },
  });
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/analytics")) {
    return NextResponse.next();
  }

  const expectedUser = process.env.INTERNAL_DASHBOARD_USERNAME;
  const expectedPassword = process.env.INTERNAL_DASHBOARD_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return unauthorizedResponse();
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const encoded = authHeader.split(" ")[1];
  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const [user, password] = decoded.split(":");

  if (user !== expectedUser || password !== expectedPassword) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/analytics/:path*"],
};
