import React, { useEffect, useState } from 'react';
import { useFormContext } from '../context/AdminFormContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Settings } from "lucide-react";

const AccountSettings = () => {
    const { formData, setFormData, isAdminAuthenticated } = useFormContext();
    const [adminData, setAdminData] = useState(null);
    const [newUsername, setNewUsername] = useState(formData.username || '');
    const [newPassword, setNewPassword] = useState('');
    const [isTwoFAEnabled, setIsTwoFAEnabled] = useState(false);

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

    const handleUsernameChange = (e) => setNewUsername(e.target.value);
    const handlePasswordChange = (e) => setNewPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data to be sent to the backend (skip empty fields)
        const updateData = {};
        if (newUsername.trim()) updateData.username = newUsername;
        if (newPassword.trim()) updateData.password = newPassword;

        // Get oscaID from formData to update the correct user
        const oscaID = formData.oscaID;

        if (!oscaID) {
            alert('OSCA ID is required to update the account');
            return;
        }

        // Send the data to the backend to update the account
        try {
            const response = await fetch('http://localhost/seniorpayment/update-admin.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ oscaID, ...updateData }),
            });

            // Check if the response is valid JSON
            const data = await response.json();

            if (data.status === 1) {
                setFormData((prev) => ({
                    ...prev,
                    username: newUsername,
                }));
                localStorage.setItem('adminFormData', JSON.stringify({ ...formData, ...updateData }));
                alert('Account updated successfully!');
            } else {
                alert(data.message || 'Failed to update account');
            }
        } catch (error) {
            console.error('Error updating account:', error);
            alert('There was an error updating the account.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex flex-col">
            <Navbar getImagePath={getImagePath} adminData={adminData} />
            <div className="flex flex-1">
                <Sidebar getImagePath={getImagePath} adminData={adminData} />
                <main className="flex-1 px-8 py-8 ml-72">
                    <div className="flex items-center gap-4 mb-8">
                        <Settings size={32} className="text-purple-600" />
                        <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white/70 rounded-2xl shadow-xl p-8 space-y-10 max-w-3xl"
                    >
                        {/* Profile Section */}
                        <div className="flex items-center gap-6">
                            {adminData && (
                                <img
                                    src={getImagePath(adminData.image)}
                                    alt="User Profile"
                                    className="w-24 h-24 rounded-full object-cover border-4 border-purple-200 shadow"
                                />
                            )}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{newUsername}</h2>
                                <p className="text-gray-500">Update your profile and settings</p>
                                <button
                                    type="button"
                                    className="mt-2 px-4 py-1 rounded-lg bg-purple-100 text-purple-700 text-sm font-medium hover:bg-purple-200 transition"
                                >
                                    Change Profile Picture
                                </button>
                            </div>
                        </div>

                        {/* Username Update */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Change Username
                            </label>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={handleUsernameChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none bg-white text-gray-900 transition"
                                placeholder="Enter new username"
                            />
                        </div>

                        {/* Password Update */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Change Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none bg-white text-gray-900 transition"
                                placeholder="Enter new password"
                            />
                        </div>

                        {/* Two-Factor Authentication */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Two-Factor Authentication
                            </label>
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
                            {isTwoFAEnabled && (
                                <p className="text-gray-600 text-sm mt-2">
                                    Two-factor authentication is enabled. You’ll need to verify your identity.
                                </p>
                            )}
                        </div>

                        {/* Notification Settings */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Notification Settings
                            </label>
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

                        {/* Personal Preferences */}
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                                Personal Preferences
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-600">Language</label>
                                    <select className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white text-gray-900 transition">
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-600">Time Zone</label>
                                    <select className="w-full px-4 py-2 mt-1 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 bg-white text-gray-900 transition">
                                        <option value="UTC">UTC</option>
                                        <option value="GMT">GMT</option>
                                        <option value="EST">EST</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Update Account Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                className="w-full py-2 rounded-lg bg-purple-600 text-white font-semibold text-lg shadow hover:bg-purple-700 transition"
                            >
                                Update Account
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default AccountSettings;