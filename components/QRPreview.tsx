'use client';

import React, { useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import { Download } from 'lucide-react';

interface QRPreviewProps {
    value: string;
    config: {
        size: number;
        fgColor: string;
        bgColor: string;
        logoImage?: string;
        qrStyle: 'squares' | 'dots';
        ecLevel: 'L' | 'M' | 'Q' | 'H';
        eyeRadius: number;
    };
}

export const QRPreview: React.FC<QRPreviewProps> = ({ value, config }) => {
    const ref = useRef<any>(null);

    const downloadQR = () => {
        const canvas = document.getElementById('react-qrcode-logo') as HTMLCanvasElement;
        if (canvas) {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qrcode.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
            <div className="p-4 bg-white rounded-xl shadow-inner mb-6">
                <QRCode
                    {...config}
                    value={value}
                    id="react-qrcode-logo"
                    ref={ref}
                />
            </div>
            <button
                onClick={downloadQR}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
            >
                <Download className="w-5 h-5" />
                Download PNG
            </button>
        </div>
    );
};
