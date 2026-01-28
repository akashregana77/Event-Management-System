import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Users, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import DashboardChart from '../components/DashboardChart';
import RecentEventsTable from '../components/RecentEventsTable';
import Skeleton from '../components/Skeleton';
import { summaryStats, eventsData } from '../data/dummyData';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    // Get latest 5 events
    const recentEvents = eventsData.slice(0, 5);

    if (loading) {
        return (
            <div className="dashboard-container">
                <div className="stats-grid">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} height="120px" borderRadius="0.5rem" />
                    ))}
                </div>
                <div className="dashboard-content-grid">
                    <Skeleton height="300px" borderRadius="0.5rem" />
                    <Skeleton height="300px" borderRadius="0.5rem" />
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="stats-grid">
                <StatCard
                    title="Total Events"
                    value={summaryStats.totalEvents}
                    icon={<Calendar size={24} />}
                    color="#3b82f6"
                />
                <StatCard
                    title="Active Events"
                    value={summaryStats.activeEvents}
                    icon={<CheckCircle size={24} />}
                    color="#10b981"
                />
                <StatCard
                    title="Registered Students"
                    value={summaryStats.registeredStudents}
                    icon={<Users size={24} />}
                    color="#8b5cf6"
                />
                <StatCard
                    title="Pending Approvals"
                    value={summaryStats.pendingApprovals}
                    icon={<Clock size={24} />}
                    color="#f59e0b"
                />
            </div>

            <div className="dashboard-content-grid">
                <div className="chart-section">
                    <DashboardChart />
                </div>
                <div className="events-section">
                    <RecentEventsTable events={recentEvents} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
