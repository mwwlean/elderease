import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { CreditCard } from "lucide-react";
import { useFormContext } from '../context/AdminFormContext';

const PaymentManagement = () => {
    const { isAdminAuthenticated } = useFormContext();
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const storedAdminData = JSON.parse(localStorage.getItem('adminFormData'));
        if (storedAdminData && isAdminAuthenticated) {
            setAdminData(storedAdminData);
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
                        <CreditCard size={32} className="text-purple-600" />
                        <h1 className="text-3xl font-bold text-gray-800">Payment Management</h1>
                    </div>
                   
                </main>
            </div>
        </div>
    );
}

export default PaymentManagement;