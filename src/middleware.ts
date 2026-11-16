import { NextResponse, type NextRequest } from "next/server";

const isProd = process.env.NODE_ENV === "production";

// CSP stricte à nonce. Posée uniquement en prod : en dev, le HMR de Next
// a besoin d'inline/eval que la CSP casserait.
function buildCsp(nonce: string) {
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://*.vercel-insights.com",
    "manifest-src 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

// Le nonce est posé sur la requête (Next le lit dans la CSP de requête pour ses propres
// scripts, layout.tsx le lit dans x-nonce) et la CSP sur la réponse.
// Les redirections de /en et des anciennes URL sont dans next.config.ts.
export function middleware(req: NextRequest) {
  if (!isProd) return NextResponse.next();
  const nonce = crypto.randomUUID().replace(/-/g, "");
  const csp = buildCsp(nonce);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  // Tout sauf les internes Next, l'API et les fichiers statiques (avec extension).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
