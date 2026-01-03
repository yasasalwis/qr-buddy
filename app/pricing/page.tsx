import { Check } from "lucide-react";

export default function PricingPage() {
    const benefits = [
        "Unlimited QR Code Generation",
        "High-Resolution Downloads (PNG, SVG)",
        "Custom Colors & Logo Integration",
        "No Watermarks",
        "Ad-Free Experience",
        "Generation History",
        "Commercial Usage Rights"
    ];

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-3xl mx-auto text-center space-y-12">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
                        Always Free
                    </h1>
                    <p className="text-xl text-white/60">
                        Professional tools shouldn't always have a price tag.
                    </p>
                </div>

                <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-white/10 to-black border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-green-500/20 blur-3xl rounded-full"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <span className="text-5xl font-bold mb-2">$0</span>
                        <span className="text-white/50 mb-8">forever</span>

                        <ul className="text-left space-y-4 mb-10 w-full max-w-sm mx-auto">
                            {benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center space-x-3">
                                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <span className="text-white/80">{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors w-full max-w-xs">
                            Start Generating Now
                        </button>
                    </div>
                </div>

                <p className="text-sm text-white/40">
                    QR Buddy is an open-source project supported by the community.
                </p>
            </div>
        </div>
    );
}
