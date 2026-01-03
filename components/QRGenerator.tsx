'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { QRControls } from './QRControls';
import { QRPreview } from './QRPreview';
import { saveQR } from '@/app/actions/save-qr';
import { Save, Loader2, Share2 } from 'lucide-react';

const DEFAULT_CONFIG = {
    size: 250,
    fgColor: '#000000',
    bgColor: '#ffffff',
    qrStyle: 'squares' as 'squares' | 'dots',
    eyeRadius: 0,
    ecLevel: 'H' as 'L' | 'M' | 'Q' | 'H',
    logoImage: '',
    logoWidth: 40,
    logoHeight: 40,
    logoOpacity: 1,
    removeQrCodeBehindLogo: true,
    logoPadding: 5,
    logoPaddingStyle: 'square' as 'square' | 'circle',
};

export default function QRGenerator() {
    const [content, setContent] = useState('https://example.com');
    const [config, setConfig] = useState(DEFAULT_CONFIG);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSave = () => {
        startTransition(async () => {
            try {
                const result = await saveQR(content, config);
                router.push(`/q/${result.id}`);
            } catch (error) {
                console.error('Failed to save QR:', error);
                alert('Failed to save QR code. Please try again.');
            }
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header */}
                <header className="text-center space-y-4 pt-10">
                    <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        QR Buddy
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Generate premium QR codes for your guests.
                        <span className="block text-sm mt-2 text-gray-500">Designs are saved for 1 year securely.</span>
                    </p>
                </header>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Controls Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-300 mb-4 px-2">Configuration</h2>
                        <QRControls
                            value={content}
                            setValue={setContent}
                            config={config}
                            setConfig={setConfig}
                        />
                    </div>

                    {/* Preview Column */}
                    <div className="lg:col-span-8 flex flex-col items-center justify-start pt-10 space-y-8">
                        <div className="transform hover:scale-105 transition-transform duration-500">
                            <QRPreview
                                value={content}
                                config={{ ...config, size: 300 }} // Fixed size for preview to look good
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleSave}
                                disabled={isPending}
                                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isPending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Save className="w-6 h-6" />}
                                {isPending ? 'Saving...' : 'Save & Share'}
                            </button>
                        </div>

                        <p className="text-sm text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                            <Share2 className="w-3 h-3 inline mr-2 text-blue-400" />
                            Generated codes get a unique link valid for 365 days.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
