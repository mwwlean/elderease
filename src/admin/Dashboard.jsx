import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useFormContext } from '../context/AdminFormContext';
import { Pie, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { Users, UserCheck, UserPlus, LayoutDashboard, } from "lucide-react";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const CARD_GRADIENT = "bg-gradient-to-br from-purple-500 via-purple-400 to-purple-300";

const Dashboard = () => {
    const { isAdminAuthenticated } = useFormContext();
    const [adminData, setAdminData] = useState(null);
    const [scChapterCount, setScChapterCount] = useState(0);
    const [dswdCount, setDswdCount] = useState(0);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const storedAdminData = JSON.parse(localStorage.getItem('adminFormData'));
        if (storedAdminData && isAdminAuthenticated) {
            setAdminData(storedAdminData);
        }

        const fetchCounts = async () => {
            try {
                const scChapterRes = await fetch('http://localhost/seniorpayment/scChapter.php');
                const scChapterData = await scChapterRes.json();
                if (scChapterData.status === 1) setScChapterCount(scChapterData.data.length);

                const dswdRes = await fetch('http://localhost/seniorpayment/dswd.php');
                const dswdData = await dswdRes.json();
                if (dswdData.status === 1) setDswdCount(dswdData.data.length);

                const lineChartRes = await fetch('http://localhost/seniorpayment/getApplicantsOvertime.php');
                const lineChartData = await lineChartRes.json();
                if (lineChartData.status === 1) setChartData(processChartData(lineChartData.data));
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, [isAdminAuthenticated]);

    // Helper to align line chart data
    const processChartData = (data) => {
        const scChapterData = [];
        const dswdData = [];
        const days = [];
        data.forEach(item => {
            const dayLabel = item.day;
            if (!days.includes(dayLabel)) days.push(dayLabel);
            if (item.type === 'scChapter') scChapterData.push({ day: dayLabel, count: item.count });
            else if (item.type === 'dswd') dswdData.push({ day: dayLabel, count: item.count });
        });
        return days.map(day => ({
            day,
            scChapterCount: scChapterData.find(item => item.day === day)?.count || 0,
            dswdCount: dswdData.find(item => item.day === day)?.count || 0,
        }));
    };

    // Pie Chart Data
    const pieData = {
        labels: ['SC Chapter', 'DSWD'],
        datasets: [
            {
                data: [scChapterCount, dswdCount],
                backgroundColor: ['#a78bfa', '#c4b5fd'],
                hoverBackgroundColor: ['#8b5cf6', '#a78bfa'],
                borderWidth: 2,
            },
        ],
    };

    // Line Chart Data
    const lineData = {
        labels: chartData.map(data => data.day),
        datasets: [
            {
                label: 'SC Chapter Applicants',
                data: chartData.map(data => data.scChapterCount),
                fill: false,
                borderColor: '#a78bfa',
                tension: 0.3,
                pointBackgroundColor: '#a78bfa',
                pointBorderColor: '#fff',
                pointRadius: 5,
            },
            {
                label: 'DSWD Applicants',
                data: chartData.map(data => data.dswdCount),
                fill: false,
                borderColor: '#a78bfa',
                tension: 0.3,
                pointBackgroundColor: '#a78bfa',
                pointBorderColor: '#fff',
                pointRadius: 5,
            },
        ],
    };

    const getImagePath = (imagePath) => (imagePath ? `${imagePath}` : '/img/123.jpg');

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex flex-col">
            <Navbar getImagePath={getImagePath} adminData={adminData} />
            
            <div className="flex flex-1">
               
                <Sidebar />
                
                <main className="flex-1 px-8 py-8 ml-72">
                    <div className="flex items-center gap-4 mb-8">
                        <LayoutDashboard size={32} className="text-purple-600" />
                        <h1 className="text-3xl font-bold  text-gray-800">Dashboard</h1>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className={`flex items-center gap-4 rounded-xl shadow-lg p-5 border border-purple-100 ${CARD_GRADIENT}`}>
                            <div className="bg-white/30 text-purple-900 rounded-xl p-3 shadow-md">
                                <UserPlus size={28} />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white/80 mb-1">New Applicants</div>
                                <div className="text-2xl font-bold text-white">{scChapterCount}</div>
                            </div>
                        </div>
                        <div className={`flex items-center gap-4 rounded-xl shadow-lg p-5 border border-purple-100 ${CARD_GRADIENT}`}>
                            <div className="bg-white/30 text-purple-900 rounded-xl p-3 shadow-md">
                                <Users size={28} />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white/80 mb-1">All Applicants</div>
                                <div className="text-2xl font-bold text-white">{scChapterCount + dswdCount}</div>
                            </div>
                        </div>
                        <div className={`flex items-center gap-4 rounded-xl shadow-lg p-5 border border-purple-100 ${CARD_GRADIENT}`}>
                            <div className="bg-white/30 text-purple-900 rounded-xl p-3 shadow-md">
                                <UserCheck size={28} />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-white/80 mb-1">DSWD Applicants</div>
                                <div className="text-2xl font-bold text-white">{dswdCount}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white rounded-xl shadow p-6 border border-purple-100 flex flex-col items-center">
                            <div className="text-lg font-bold text-gray-700 mb-2">Applicants Distribution</div>
                            <div className="w-full flex justify-center">
                                <Pie data={pieData} options={{
                                    plugins: {
                                        legend: { position: 'bottom', labels: { color: '#6b21a8', font: { size: 14, weight: 'bold' } } }
                                    }
                                }} />
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-6 border border-purple-100 flex flex-col items-center">
                            <div className="text-lg font-bold text-gray-700 mb-2">Applicants Over Time</div>
                            <div className="w-full flex justify-center">
                                <Line data={lineData} options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: 'bottom', labels: { color: '#6b21a8', font: { size: 14, weight: 'bold' } } }
                                    },
                                    scales: {
                                        x: { ticks: { color: '#a78bfa' } },
                                        y: { ticks: { color: '#a78bfa' }, beginAtZero: true }
                                    }
                                }} />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;