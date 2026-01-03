import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_request: Request) {
    try {
        const deleted = await prisma.qRCode.deleteMany({
            where: {
                expiresAt: {
                    lt: new Date(),
                },
            },
        });

        return NextResponse.json({ success: true, deletedCount: deleted.count });
    } catch (error) {
        console.error('Cleanup failed:', error);
        return NextResponse.json({ success: false, error: 'Cleanup failed' }, { status: 500 });
    }
}
