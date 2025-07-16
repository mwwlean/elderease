import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/AdminFormContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Settings } from "lucide-react";

const SystemSettings = () => {
    const [adminData, setAdminData] = useState(null);
    const { isAdminAuthenticated } = useFormContext();

    const [theme, setTheme] = useState('light');
    const [isTwoFAEnabled, setIsTwoFAEnabled] = useState(false);
    const [apiKey, setApiKey] = useState('your-api-key');

    useEffect(() => {
        if (isAdminAuthenticated) {
            const storedAdminData = JSON.parse(localStorage.getItem('adminFormData'));
            if (storedAdminData) {
                setAdminData(storedAdminData);
            }
        }
    }, [isAdminAuthenticated]);

    const getImagePath = (imagePath) => {
        return imagePath ? `${imagePath}` : './img/123.jpg';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex flex-col">
            <Navbar getImagePath={getImagePath} adminData={adminData} />
            <div className="flex flex-1">
                <Sidebar getImagePath={getImagePath} adminData={adminData}/>
                <main className="flex-1 px-8 py-8 ml-72">
                    <div className="flex items-center gap-4 mb-8">
                        <Settings size={32} className="text-purple-600" />
                        <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
                    </div>

                    <div className="bg-white/70 rounded-2xl shadow-xl p-8 space-y-10 max-w-3xl">
                        {/* Theme Settings */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">Theme Settings</label>
                            <div className="flex gap-4">
                                <button 
                                    type="button"
                                    onClick={() => setTheme('light')}
                                    className={`px-6 py-2 rounded-lg font-medium transition border 
                                        ${theme === 'light' 
                                            ? 'bg-purple-600 text-white border-purple-600 shadow' 
                                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`
                                    }
                                >
                                    Light Mode
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setTheme('dark')}
                                    className={`px-6 py-2 rounded-lg font-medium transition border 
                                        ${theme === 'dark' 
                                            ? 'bg-purple-600 text-white border-purple-600 shadow' 
                                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'}`
                                    }
                                >
                                    Dark Mode
                                </button>
                            </div>
                        </div>

                        {/* Security Settings */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">Security Settings</label>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-gray-700">Enable Two-Factor Authentication</span>
                                <button 
                                    type="button"
                                    onClick={() => setIsTwoFAEnabled(!isTwoFAEnabled)}
                                    className={`px-4 py-1 rounded-full border-2 transition
                                        ${isTwoFAEnabled
                                            ? 'bg-green-50 border-green-400 text-green-700 hover:bg-green-100'
                                            : 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200'
                                        }`}
                                >
                                    {isTwoFAEnabled ? 'Disable' : 'Enable'}
                                </button>
                            </div>
                        </div>

                        {/* Notification Settings */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">Notification Settings</label>
                            <div className="flex gap-8">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="accent-purple-500 w-5 h-5" />
                                    <span className="text-gray-700">Email Notifications</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="accent-purple-500 w-5 h-5" />
                                    <span className="text-gray-700">SMS Notifications</span>
                                </label>
                            </div>
                        </div>

                        {/* API Key Settings */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">API Key Settings</label>
                            <div className="flex justify-between items-center gap-4">
                                <input
                                    type="text"
                                    value={apiKey}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-800 font-mono focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                                    readOnly
                                />
                                <button
                                    type="button"
                                    className="ml-4 px-4 py-1 rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition"
                                    onClick={() => setApiKey('new-generated-api-key')}
                                >
                                    Regenerate Key
                                </button>
                            </div>
                        </div>

                        {/* Integration Settings */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">Integrations</label>
                            <button className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition">
                                Manage Integrations
                            </button>
                        </div>

                        {/* Role Management */}
                        <div>
                            <label className="block text-lg font-semibold text-gray-700 mb-2">Role Management</label>
                            <button className="px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 transition">
                                Manage Roles
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default SystemSettings;