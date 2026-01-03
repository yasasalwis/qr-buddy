'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function saveQR(content: string, config: any) {
    if (!content) {
        throw new Error('Content is required');
    }

    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

    // Generate a simple 6 char random string
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';
    for (let i = 0; i < 6; i++) {
        shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Ensure uniqueness (simple retry mechanism)
    let isUnique = false;
    let attempts = 0;
    while (!isUnique && attempts < 5) {
        const existing = await prisma.qRCode.findUnique({
            where: { shortCode },
        });
        if (!existing) {
            isUnique = true;
        } else {
            shortCode = '';
            for (let i = 0; i < 6; i++) {
                shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            attempts++;
        }
    }

    const qrCode = await prisma.qRCode.create({
        data: {
            content,
            config: config || {},
            expiresAt: oneYearFromNow,
            shortCode,
        },
    });

    return { id: qrCode.id };
}
