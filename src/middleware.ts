import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  const isPresensiSubdomain =
    hostname.startsWith("presensi.") ||
    hostname.includes("presensi.fastabiq.site");

  // 1. Logika untuk Subdomain Presensi (presensi.fastabiq.site)
  if (isPresensiSubdomain) {
    // Jika root tanpa slug (https://presensi.fastabiq.site/), tampilkan Laman Portal Presensi Private
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/presensi", request.url));
    }
    // Jika mengakses halaman profil umum di subdomain presensi, arahkan ke landing page
    if (
      pathname.startsWith("/program") ||
      pathname.startsWith("/tentang-kami") ||
      pathname.startsWith("/kontak-kami")
    ) {
      return NextResponse.redirect(
        new URL(`https://fastabiq.site${pathname}`, request.url)
      );
    }
    // Loloskan untuk slug presensi (misal: /majelis-sama, /tahsin-pagi, dll)
    return NextResponse.next();
  }

  // 2. Logika untuk Landing Page Utama (fastabiq.site & www.fastabiq.site)
  const isMainDomain =
    hostname.includes("fastabiq.site") && !isPresensiSubdomain;

  if (isMainDomain) {
    const isLandingPageRoute =
      pathname === "/" ||
      pathname.startsWith("/program") ||
      pathname.startsWith("/tentang-kami") ||
      pathname.startsWith("/kontak-kami") ||
      /^\/[1-8]$/.test(pathname);

    // Jika santri keliru membuka slug presensi di domain utama, alihkan otomatis ke subdomain presensi
    if (!isLandingPageRoute && pathname.length > 1) {
      return NextResponse.redirect(
        new URL(`https://presensi.fastabiq.site${pathname}`, request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

