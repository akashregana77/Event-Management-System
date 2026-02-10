import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import DashboardChart from '../components/DashboardChart';
import RecentEventsTable from '../components/RecentEventsTable';
import Skeleton from '../components/Skeleton';
import { summaryStats, eventsData } from '../data/dummyData';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const recentEvents = eventsData.slice(0, 5);

    if (loading) {
        return (
            <div className="sa-dashboard-main">
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
        <div className="sa-dashboard-content">

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
