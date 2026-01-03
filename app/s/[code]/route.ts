import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { decrypt } from '@/lib/crypto';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;

    if (!code) {
        return new Response('Invalid code', { status: 400 });
    }

    const qrCode = await prisma.qRCode.findUnique({
        where: { shortCode: code },
    });

    if (!qrCode) {
        return new Response('Short URL not found', { status: 404 });
    }

    // Add http/https if missing
    let target = decrypt(qrCode.content);
    if (!/^https?:\/\//i.test(target)) {
        target = 'https://' + target;
    }

    redirect(target);
}
