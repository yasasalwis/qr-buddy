import Link from "next/link";
import { QrCode } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center space-x-2 transition-opacity hover:opacity-80"
                >
                    <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2 rounded-lg">
                        <QrCode className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                        QR Buddy
                    </span>
                </Link>

                <nav className="hidden md:flex items-center space-x-6">
                    <Link
                        href="/"
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                        Generator
                    </Link>

                    <Link
                        href="#"
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                        About
                    </Link>
                </nav>


            </div>
        </header>
    );
}
