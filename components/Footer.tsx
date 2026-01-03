import Link from "next/link";
import { Github, Twitter, Heart } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 mb-4 inline-block">
                            QR Buddy
                        </Link>
                        <p className="text-sm text-white/50 max-w-xs leading-relaxed">
                            Create beautiful, custom QR codes instantly.
                            Review, edit, and download your codes with ease.
                            Designed for professionals.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/features" className="text-sm text-white/50 hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/pricing" className="text-sm text-white/50 hover:text-white transition-colors">
                                    Pricing
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-white mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors">
                                    Privacy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-white/50 hover:text-white transition-colors">
                                    Terms
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/40 flex items-center">
                        © {new Date().getFullYear()} QR Buddy. Made with <Heart className="w-3 h-3 mx-1 text-red-500 fill-red-500" /> by Yasas Alwis & Community.
                    </p>

                    <div className="flex items-center space-x-4">
                        <Link href="https://github.com/yasasalwis/qr-buddy" target="_blank" className="text-white/40 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="text-white/40 hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
