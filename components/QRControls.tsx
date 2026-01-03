'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Image as ImageIcon, Palette, Type, Link as LinkIcon, FileText, Mail, Wifi, Phone, MessageSquare } from 'lucide-react';

type QRType = 'link' | 'text' | 'email' | 'wifi' | 'phone' | 'sms';

interface QRControlsProps {
    value: string;
    setValue: (val: string) => void;
    config: any;
    setConfig: (cfg: any) => void;
}

export const QRControls: React.FC<QRControlsProps> = ({ value, setValue, config, setConfig }) => {
    const [activeType, setActiveType] = useState<QRType>('link');

    // Type-specific state
    const [wifiState, setWifiState] = useState({ ssid: '', password: '', encryption: 'WPA', hidden: false });
    const [emailState, setEmailState] = useState({ email: '', subject: '', body: '' });
    const [phoneState, setPhoneState] = useState('');
    const [smsState, setSmsState] = useState({ phone: '', message: '' });
    const [textState, setTextState] = useState('');

    const updateConfig = (updates: Partial<typeof config>) => {
        setConfig({ ...config, ...updates });
    };

    const handleChange = (key: string, val: any) => {
        updateConfig({ [key]: val });
    };

    // Sync state to value
    useEffect(() => {
        let newValue = '';
        switch (activeType) {
            case 'link':
                // For link, we just use the input directly normally, but here we might want to sync back if we switched types.
                // However, to avoid complexity, 'link' just directly updates value via the input's onChange.
                // We'll handle 'link' value separately or just use the current value if it looks like a URL?
                // Actually, let's keep it simple: When activeType is 'link', the text input controls `value` directly.
                // When we switch TO link, we might want to keep the value or clear it.
                break;
            case 'text':
                newValue = textState;
                setValue(newValue);
                break;
            case 'email':
                newValue = `mailto:${emailState.email}?subject=${encodeURIComponent(emailState.subject)}&body=${encodeURIComponent(emailState.body)}`;
                setValue(newValue);
                break;
            case 'wifi':
                newValue = `WIFI:S:${wifiState.ssid};T:${wifiState.encryption};P:${wifiState.password};H:${wifiState.hidden};;`;
                setValue(newValue);
                break;
            case 'phone':
                newValue = `tel:${phoneState}`;
                setValue(newValue);
                break;
            case 'sms':
                newValue = `smsto:${smsState.phone}:${smsState.message}`;
                setValue(newValue);
                break;
        }
    }, [activeType, wifiState, emailState, phoneState, smsState, textState]);

    const renderContentInputs = () => {
        switch (activeType) {
            case 'link':
                return (
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter URL (https://...)"
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all hover:bg-black/30"
                    />
                );
            case 'text':
                return (
                    <textarea
                        value={textState}
                        onChange={(e) => setTextState(e.target.value)}
                        placeholder="Enter your text here..."
                        rows={4}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all hover:bg-black/30 resize-none"
                    />
                );
            case 'email':
                return (
                    <div className="space-y-3">
                        <input
                            type="email"
                            value={emailState.email}
                            onChange={(e) => setEmailState({ ...emailState, email: e.target.value })}
                            placeholder="Email Address"
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all hover:bg-black/30"
                        />
                        <input
                            type="text"
                            value={emailState.subject}
                            onChange={(e) => setEmailState({ ...emailState, subject: e.target.value })}
                            placeholder="Subject"
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all hover:bg-black/30"
                        />
                        <textarea
                            value={emailState.body}
                            onChange={(e) => setEmailState({ ...emailState, body: e.target.value })}
                            placeholder="Message Body"
                            rows={3}
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all hover:bg-black/30 resize-none"
                        />
                    </div>
                );
            case 'wifi':
                return (
                    <div className="space-y-3">
                        <input
                            type="text"
                            value={wifiState.ssid}
                            onChange={(e) => setWifiState({ ...wifiState, ssid: e.target.value })}
                            placeholder="Network Name (SSID)"
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all hover:bg-black/30"
                        />
                        <input
                            type="text"
                            value={wifiState.password}
                            onChange={(e) => setWifiState({ ...wifiState, password: e.target.value })}
                            placeholder="Password"
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all hover:bg-black/30"
                        />
                        <div className="flex gap-4">
                            <select
                                value={wifiState.encryption}
                                onChange={(e) => setWifiState({ ...wifiState, encryption: e.target.value })}
                                className="flex-1 px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all hover:bg-black/30"
                            >
                                <option value="WPA">WPA/WPA2</option>
                                <option value="WEP">WEP</option>
                                <option value="nopass">No Encryption</option>
                            </select>
                            <label className="flex items-center gap-2 px-4 py-3 bg-black/20 border border-white/10 rounded-lg cursor-pointer hover:bg-black/30">
                                <input
                                    type="checkbox"
                                    checked={wifiState.hidden}
                                    onChange={(e) => setWifiState({ ...wifiState, hidden: e.target.checked })}
                                    className="w-4 h-4 rounded border-gray-500 text-blue-500 focus:ring-blue-500 bg-gray-700"
                                />
                                <span className="text-sm text-gray-300">Hidden</span>
                            </label>
                        </div>
                    </div>
                );
            case 'phone':
                return (
                    <input
                        type="tel"
                        value={phoneState}
                        onChange={(e) => setPhoneState(e.target.value)}
                        placeholder="Phone Number (e.g. +123456789)"
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all hover:bg-black/30"
                    />
                );
            case 'sms':
                return (
                    <div className="space-y-3">
                        <input
                            type="tel"
                            value={smsState.phone}
                            onChange={(e) => setSmsState({ ...smsState, phone: e.target.value })}
                            placeholder="Phone Number"
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all hover:bg-black/30"
                        />
                        <textarea
                            value={smsState.message}
                            onChange={(e) => setSmsState({ ...smsState, message: e.target.value })}
                            placeholder="Message"
                            rows={3}
                            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 transition-all hover:bg-black/30 resize-none"
                        />
                    </div>
                );
        }
    };

    return (
        <div className="flex flex-col gap-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl text-white">
            {/* Content Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-lg font-semibold text-blue-400">
                        <Type className="w-5 h-5" />
                        <h3>Content</h3>
                    </div>
                </div>

                {/* Type Selector */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                        { id: 'link', icon: LinkIcon, label: 'Link' },
                        { id: 'text', icon: FileText, label: 'Text' },
                        { id: 'email', icon: Mail, label: 'Email' },
                        { id: 'wifi', icon: Wifi, label: 'WiFi' },
                        { id: 'phone', icon: Phone, label: 'Phone' },
                        { id: 'sms', icon: MessageSquare, label: 'SMS' },
                    ].map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setActiveType(type.id as QRType)}
                            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg transition-all ${activeType === type.id
                                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/50'
                                : 'bg-black/20 text-gray-400 border border-transparent hover:bg-black/40 hover:text-gray-200'
                                }`}
                        >
                            <type.icon className="w-4 h-4" />
                            <span className="text-[10px] uppercase font-bold tracking-wider">{type.label}</span>
                        </button>
                    ))}
                </div>

                {renderContentInputs()}
            </div>

            {/* Appearance Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-purple-400">
                    <Palette className="w-5 h-5" />
                    <h3>Colors</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Data Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={config.fgColor}
                                onChange={(e) => handleChange('fgColor', e.target.value)}
                                className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                            />
                            <span className="text-xs font-mono text-gray-500">{config.fgColor}</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-gray-400">Background</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={config.bgColor}
                                onChange={(e) => handleChange('bgColor', e.target.value)}
                                className="w-10 h-10 rounded cursor-pointer bg-transparent border-none"
                            />
                            <span className="text-xs font-mono text-gray-500">{config.bgColor}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Design Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-pink-400">
                    <Settings className="w-5 h-5" />
                    <h3>Design</h3>
                </div>

                <div className="space-y-3">
                    <label className="text-sm text-gray-400">Style</label>
                    <div className="flex bg-black/20 p-1 rounded-lg">
                        <button
                            onClick={() => handleChange('qrStyle', 'squares')}
                            className={`flex-1 py-1 px-3 rounded text-sm transition-all ${config.qrStyle === 'squares' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Squares
                        </button>
                        <button
                            onClick={() => handleChange('qrStyle', 'dots')}
                            className={`flex-1 py-1 px-3 rounded text-sm transition-all ${config.qrStyle === 'dots' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                        >
                            Dots
                        </button>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-sm text-gray-400">Eye Radius</label>
                        <span className="text-sm text-gray-500">{config.eyeRadius}px</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        value={config.eyeRadius}
                        onChange={(e) => handleChange('eyeRadius', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                </div>
            </div>

            {/* Logo Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-emerald-400">
                    <ImageIcon className="w-5 h-5" />
                    <h3>Logo</h3>
                </div>
                <input
                    type="text"
                    value={config.logoImage || ''}
                    onChange={(e) => handleChange('logoImage', e.target.value)}
                    placeholder="Logo URL (optional)"
                    className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-gray-500 transition-all hover:bg-black/30 text-sm"
                />
                {config.logoImage && (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm text-gray-400">Logo Size</label>
                                <span className="text-sm text-gray-500">{config.logoWidth}px</span>
                            </div>
                            <input
                                type="range"
                                min="20"
                                max="80"
                                value={config.logoWidth}
                                onChange={(e) => {
                                    const size = parseInt(e.target.value);
                                    updateConfig({
                                        logoWidth: size,
                                        logoHeight: size
                                    });
                                }}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <label className="text-sm text-gray-400">Logo Padding</label>
                                <span className="text-sm text-gray-500">{config.logoPadding}px</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                value={config.logoPadding || 0}
                                onChange={(e) => handleChange('logoPadding', parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                            />
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors">
                            <input
                                type="checkbox"
                                checked={config.removeQrCodeBehindLogo}
                                onChange={(e) => handleChange('removeQrCodeBehindLogo', e.target.checked)}
                                className="w-4 h-4 rounded border-gray-500 text-emerald-500 focus:ring-emerald-500 bg-gray-700"
                            />
                            <span className="text-sm text-gray-300">Clean Background (Recommended)</span>
                        </label>
                    </div>
                )}
            </div>

        </div>
    );
};
