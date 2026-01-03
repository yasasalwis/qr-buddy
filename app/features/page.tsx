import { Zap, Shield, Smartphone, History, Palette, QrCode } from "lucide-react";

export default function FeaturesPage() {
    const features = [
        {
            icon: <Zap className="w-6 h-6 text-blue-400" />,
            title: "Instant Generation",
            description: "Create QR codes in milliseconds. No loading times, streamlined for efficiency."
        },
        {
            icon: <Palette className="w-6 h-6 text-purple-400" />,
            title: "Custom Customization",
            description: "Match your brand identity with custom colors, shapes, and logo integration."
        },
        {
            icon: <History className="w-6 h-6 text-green-400" />,
            title: "History Tracking",
            description: "Never lose a code. Your generated QR codes are securely saved in the cloud for future access."
        },
        {
            icon: <Shield className="w-6 h-6 text-red-400" />,
            title: "Privacy First",
            description: "Your data is encrypted and stored securely. We don't track your scans or collect personal info."
        },
        {
            icon: <Smartphone className="w-6 h-6 text-yellow-400" />,
            title: "Mobile Optimized",
            description: "Perfect experience on any device. Create and manage codes on the go."
        },
        {
            icon: <QrCode className="w-6 h-6 text-pink-400" />,
            title: "High Resolution",
            description: "Download in SVG or PNG formats for crisp printing at any size."
        }
    ];

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        Powerful Features
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Everything you need to create, manage, and share QR codes professionally.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                            <div className="mb-4 p-3 bg-white/5 rounded-xl inline-block">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-white/60 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
