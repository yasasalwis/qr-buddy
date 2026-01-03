

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-2xl mx-auto space-y-12">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <div className="space-y-8 text-white/70 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">1. Information We Collect</h2>
                        <p>
                            We do not collect any personal private information (PII). However, the QR codes you generate and their associated data are securely stored in our database to provide you with history and management features.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">2. Data Storage & Security</h2>
                        <p>
                            All generated QR code data stored in our database is fully encrypted at rest. We prioritize your privacy and security, ensuring that your content remains accessible only to you while maintaining the highest security standards. We do not analyze, share, or sell your generated content.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">3. Third Party Links</h2>
                        <p>
                            Our website may contain links to other websites. We are not responsible for the privacy practices of such other sites.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">4. Changes to This Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
