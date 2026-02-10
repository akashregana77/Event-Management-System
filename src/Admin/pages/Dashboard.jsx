import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import DashboardChart from '../components/DashboardChart';
import RecentEventsTable from '../components/RecentEventsTable';
import Skeleton from '../components/Skeleton';
import { summaryStats, eventsData } from '../data/dummyData';
// import '../styles/Dashboard.css'; // Deprecated

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
            <div className="sa-dashboard-main"> {/* Use sa-dashboard-main even for skeleton */}
                <div className="sa-stats-grid">
                    {[1, 2, 3, 4].map(i => (
                        <Skeleton key={i} height="120px" borderRadius="16px" />
                    ))}
                </div>
                <div className="sa-content-grid">
                    <Skeleton height="300px" borderRadius="16px" />
                    <Skeleton height="300px" borderRadius="16px" />
                </div>
            </div>
        );
    }

    return (
        <div className="sa-dashboard-content"> {/* sa-dashboard-main is already in Layout, so we can just use a wrapper or fragments */}
            {/* 
                Wait, Layout has <main className="sa-dashboard-main"><Outlet/></main>
                So this component content goes INSIDE sa-dashboard-main.
                We don't need another sa-dashboard-main here.
             */}

            <section className="sa-welcome-card glass hover-gradient-border">
                <div>
                    <p className="sa-eyebrow">CampusEvents • Admin Portal</p>
                    <h2>Welcome back, Admin! 👋</h2>
                    <p className="sa-muted">You have {summaryStats.pendingApprovals} pending approvals to review.</p>
                    <div className="sa-hero-actions">
                        <Link to="/create-event" className="primary-btn">Create Event</Link>
                        <Link to="/approvals" className="ghost-btn">View Approvals</Link>
                    </div>
                </div>
                <div className="sa-hero-badge">
                    <div className="sa-badge-number">{summaryStats.totalEvents}</div>
                    <div>
                        <p className="sa-badge-label">Total Events</p>
                        <p className="sa-badge-text">All time</p>
                    </div>
                </div>
            </section>

            <section className="sa-stats-grid" style={{ marginTop: '20px' }}>
                <StatCard
                    title="Total Events"
                    value={summaryStats.totalEvents}
                    icon={<Calendar size={24} />}
                    tone="primary"
                    subtitle="All categories"
                />
                <StatCard
                    title="Active Events"
                    value={summaryStats.activeEvents}
                    icon={<CheckCircle size={24} />}
                    tone="success"
                    subtitle="Currently ongoing"
                />
                <StatCard
                    title="Registered Students"
                    value={summaryStats.registeredStudents}
                    icon={<Users size={24} />}
                    tone="info"
                    subtitle="Total participants"
                />
                <StatCard
                    title="Pending Approvals"
                    value={summaryStats.pendingApprovals}
                    icon={<Clock size={24} />}
                    tone="warning"
                    subtitle="Requires attention"
                />
            </section>

            <section className="sa-content-grid" style={{ marginTop: '20px' }}>
                <div className="sa-card glass">
                    <div className="sa-card-header">
                        <h3>Analytics</h3>
                    </div>
                    {/* DashboardChart might need styling updates too, but let's wrap it in sa-card for now */}
                    <DashboardChart />
                </div>
                <div className="events-section">
                    <RecentEventsTable events={recentEvents} />
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
