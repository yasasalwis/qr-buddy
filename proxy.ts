import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Only run on /api routes
    if (!path.startsWith('/api')) {
        return NextResponse.next();
    }

    // 1. Allow Cron Jobs with Secret
    // Check for Authorization header: Bearer <CRON_SECRET>
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader === `Bearer ${cronSecret}`) {
        return NextResponse.next();
    }

    // Also allow if the request has the exact CRON_SECRET as a header value (common convention)
    // or checks specifically for cron paths if you want to be more specific, but header check is cleaner.

    // 2. Allow Same Origin (Browser Requests from the App)
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const host = request.headers.get('host') || '';

    // Construct the expected origin base (protocol + host)
    // Note: request.nextUrl.origin might be 'null' or local details, so we rely on headers.
    // In production (Vercel), host header is reliable.

    const isSameOrigin =
        (origin && origin.includes(host)) ||
        (referer && referer.includes(host));

    if (isSameOrigin) {
        return NextResponse.next();
    }

    // 3. Allow Server-Side calls (no origin/referer often) ??? 
    // Actually, Server Actions don't hit /api usually, they hit the route handler directly or through Next internals.
    // But if you use fetch('/api/...') in a server component, it might fail if we don't handle it.
    // However, usually fetch from server to server sets 'host' correctly but no 'origin'.
    // If this is strictly for "FE client" accessing "API", then blocking no-origin is fine.
    // But local dev tools like Postman send no origin/referer by default? No, they can be configured.
    // To be safe, if NO origin and NO referer, we generally block it if we want to "protect" from scripts.
    // But valid server-to-server calls inside the cluster might be blocked.
    // Given the user request: "protect the API routs only to serve the app FE and not outside requests"
    // I will block if origin/referer is missing or doesn't match.

    // Allow localhost in development explicitly if needed, but 'host' check usually covers it.

    // Block request
    return new NextResponse(
        JSON.stringify({ error: 'Unauthorized', message: 'API accessible only from application frontend.' }),
        { status: 403, headers: { 'content-type': 'application/json' } }
    );
}

export const config = {
    matcher: ['/api/:path*'],
};
