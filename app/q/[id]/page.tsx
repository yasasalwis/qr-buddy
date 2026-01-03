import { prisma } from '@/lib/prisma';
import { QRPreview } from '@/components/QRPreview';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function SharedQRPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const qrCode = await prisma.qRCode.findUnique({
        where: { id },
    });

    if (!qrCode) {
        notFound();
    }

    // Double check expiration just in case cron hasn't run
    if (new Date() > new Date(qrCode.expiresAt)) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <h1 className="text-2xl font-bold text-red-500 mb-4">QR Code Expired</h1>
                <p className="text-gray-400 mb-8">This QR code has passed its 1-year retention period and is no longer available.</p>
                <Link href="/" className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                    Generate New QR
                </Link>
            </div>
        );
    }

    const config = qrCode.config as any;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 font-sans flex flex-col items-center">
            <div className="w-full max-w-4xl mb-12">
                <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Generator
                </Link>
            </div>

            <div className="flex flex-col items-center gap-8 animate-fade-in-up">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                    Shared QR Code
                </h1>

                <div className="transform hover:scale-105 transition-duration-500">
                    <QRPreview
                        value={qrCode.content}
                        config={{
                            ...config,
                            size: 300 // ensure good viewing size
                        }}
                    />
                </div>

                <div className="text-center space-y-2">
                    <p className="text-gray-400">Content stored:</p>
                    <code className="block bg-black/40 px-4 py-2 rounded border border-white/10 text-emerald-400 break-all max-w-lg">
                        {qrCode.content}
                    </code>
                </div>

                {qrCode.shortCode && (
                    <div className="text-center space-y-2 mt-4">
                        <p className="text-gray-400">Short URL:</p>
                        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded border border-white/10 text-blue-400">
                            <span className="break-all">
                                {process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/s/{qrCode.shortCode}
                            </span>
                        </div>
                    </div>
                )}

                <p className="text-sm text-gray-500 mt-8">
                    Expires on: {new Date(qrCode.expiresAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
