import React, { useState } from 'react';
import { Users, ChevronDown, ChevronUp, Search, Download } from 'lucide-react';

// ── Dummy Data: Events with registered participants ─────────────
const eventsWithRegistrations = [
    {
        id: 1,
        title: 'Annual Tech Fest 2026',
        tag: 'Tech',
        date: '2026-03-15',
        organizer: 'Computer Science Dept',
        registeredCount: 6,
        participants: [
            { id: 1, name: 'Akash Regana', jntuNumber: '21341A0501', branch: 'CSE' },
            { id: 2, name: 'Priya Sharma', jntuNumber: '21341A0502', branch: 'CSE' },
            { id: 3, name: 'Rahul Verma', jntuNumber: '21341A0403', branch: 'ECE' },
            { id: 4, name: 'Sneha Reddy', jntuNumber: '21341A0504', branch: 'CSE' },
            { id: 5, name: 'Vikram Patel', jntuNumber: '21341A0305', branch: 'EEE' },
            { id: 6, name: 'Anjali Nair', jntuNumber: '21341A0406', branch: 'ECE' },
        ],
    },
    {
        id: 2,
        title: 'AI & ML Workshop',
        tag: 'Workshop',
        date: '2026-03-10',
        organizer: 'IEEE',
        registeredCount: 5,
        participants: [
            { id: 7, name: 'Karthik Rao', jntuNumber: '21341A0507', branch: 'CSE' },
            { id: 8, name: 'Meena Kumari', jntuNumber: '21341A0408', branch: 'ECE' },
            { id: 9, name: 'Sai Krishna', jntuNumber: '21341A0509', branch: 'CSE' },
            { id: 10, name: 'Divya Teja', jntuNumber: '21341A0210', branch: 'MECH' },
            { id: 11, name: 'Ravi Teja', jntuNumber: '21341A0511', branch: 'CSE' },
        ],
    },
    {
        id: 3,
        title: 'Cultural Night',
        tag: 'Non-Tech',
        date: '2026-04-20',
        organizer: 'Cultural Club',
        registeredCount: 4,
        participants: [
            { id: 12, name: 'Lakshmi Prasad', jntuNumber: '21341A0312', branch: 'EEE' },
            { id: 13, name: 'Nikhil Varma', jntuNumber: '21341A0213', branch: 'MECH' },
            { id: 14, name: 'Pooja Rani', jntuNumber: '21341A0414', branch: 'ECE' },
            { id: 15, name: 'Harish Kumar', jntuNumber: '21341A0515', branch: 'CSE' },
        ],
    },
    {
        id: 4,
        title: 'Robotics Bootcamp',
        tag: 'Workshop',
        date: '2026-03-25',
        organizer: 'Robotics Club',
        registeredCount: 5,
        participants: [
            { id: 16, name: 'Arun Kumar', jntuNumber: '21341A0216', branch: 'MECH' },
            { id: 17, name: 'Bhavya Sri', jntuNumber: '21341A0417', branch: 'ECE' },
            { id: 18, name: 'Charan Deep', jntuNumber: '21341A0518', branch: 'CSE' },
            { id: 19, name: 'Deepika Reddy', jntuNumber: '21341A0319', branch: 'EEE' },
            { id: 20, name: 'Eswar Rao', jntuNumber: '21341A0220', branch: 'MECH' },
        ],
    },
    {
        id: 5,
        title: 'Sports Day 2026',
        tag: 'Non-Tech',
        date: '2026-01-25',
        organizer: 'Sports Department',
        registeredCount: 4,
        participants: [
            { id: 21, name: 'Ganesh Babu', jntuNumber: '21341A0221', branch: 'MECH' },
            { id: 22, name: 'Hari Priya', jntuNumber: '21341A0522', branch: 'CSE' },
            { id: 23, name: 'Indira Devi', jntuNumber: '21341A0323', branch: 'EEE' },
            { id: 24, name: 'Jayesh Naidu', jntuNumber: '21341A0424', branch: 'ECE' },
        ],
    },
];

// ── Tag Styles ──────────────────────────────────────────────────
const tagStyles = {
    'Tech': { bg: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff' },
    'Non-Tech': { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff' },
    'Workshop': { bg: 'linear-gradient(135deg, #10b981, #059669)', color: '#fff' },
};

const Registrations = () => {
    const [expandedEvent, setExpandedEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleExpand = (eventId) => {
        setExpandedEvent(prev => prev === eventId ? null : eventId);
    };

    const filteredEvents = eventsWithRegistrations.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = (event) => {
        alert(`Exporting registration data for "${event.title}" to CSV...`);
    };

    return (
        <div className="sa-dashboard-content">
            <div className="sa-card-header" style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Registrations</h2>
            </div>

            {/* Search */}
            <div className="sa-card glass" style={{ marginBottom: '24px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--card)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: '10px', maxWidth: '400px' }}>
                    <Search size={18} color="var(--muted)" />
                    <input
                        type="text"
                        placeholder="Search by event name, tag, or organizer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            width: '100%',
                            color: 'var(--text)',
                            fontSize: '14px'
                        }}
                    />
                </div>
            </div>

            {/* Event Cards Grid */}
            <div className="reg-events-grid">
                {filteredEvents.map((event, idx) => {
                    const isExpanded = expandedEvent === event.id;
                    const tag = tagStyles[event.tag] || tagStyles['Tech'];

                    return (
                        <div
                            key={event.id}
                            className={`reg-event-card sa-card glass animate-stagger ${isExpanded ? 'expanded' : ''}`}
                            style={{ animationDelay: `${idx * 80}ms` }}
                        >
                            {/* Card Header */}
                            <div className="reg-card-top">
                                <div className="reg-card-info">
                                    <div className="reg-card-title-row">
                                        <h3 className="reg-card-title">{event.title}</h3>
                                        <span
                                            className="reg-tag"
                                            style={{ background: tag.bg, color: tag.color }}
                                        >
                                            {event.tag}
                                        </span>
                                    </div>
                                    <p className="reg-card-meta">
                                        <i className="fa-regular fa-calendar" style={{ marginRight: '6px' }}></i>
                                        {event.date}
                                        <span style={{ margin: '0 8px', opacity: 0.5 }}>•</span>
                                        <span style={{ color: 'var(--brand)', fontWeight: '600' }}>{event.organizer}</span>
                                    </p>
                                </div>

                                <div className="reg-card-stats">
                                    <div className="reg-stat-badge">
                                        <Users size={16} />
                                        <span>{event.registeredCount}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="reg-card-actions">
                                <button
                                    className={`reg-view-btn ${isExpanded ? 'active' : ''}`}
                                    onClick={() => toggleExpand(event.id)}
                                >
                                    <Users size={16} />
                                    <span>{isExpanded ? 'Hide Members' : 'View Registered Members'}</span>
                                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                </button>

                                <button
                                    className="reg-export-btn"
                                    onClick={() => handleExport(event)}
                                    title="Export CSV"
                                >
                                    <Download size={16} />
                                </button>
                            </div>

                            {/* Expandable Participant List */}
                            <div className={`reg-participants ${isExpanded ? 'visible' : ''}`}>
                                <div className="reg-participants-inner">
                                    <div className="reg-participants-header">
                                        <h4>
                                            <i className="fa-solid fa-user-group" style={{ marginRight: '8px', color: 'var(--brand)' }}></i>
                                            Registered Participants ({event.participants.length})
                                        </h4>
                                    </div>
                                    <div className="sa-table-wrapper">
                                        <table className="sa-data-table">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>JNTU Number</th>
                                                    <th>Branch</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {event.participants.map((p, pIdx) => (
                                                    <tr key={p.id} className="hover-row">
                                                        <td style={{ color: 'var(--muted)', fontWeight: '500' }}>{pIdx + 1}</td>
                                                        <td style={{ fontWeight: '600' }}>{p.name}</td>
                                                        <td>
                                                            <code style={{
                                                                background: 'var(--bg, #f1f5f9)',
                                                                padding: '3px 8px',
                                                                borderRadius: '6px',
                                                                fontSize: '13px',
                                                                fontWeight: '600',
                                                                color: 'var(--brand, #6366f1)'
                                                            }}>
                                                                {p.jntuNumber}
                                                            </code>
                                                        </td>
                                                        <td>
                                                            <span className="reg-branch-badge">{p.branch}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredEvents.length === 0 && (
                <div className="sa-card glass" style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)' }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '32px', marginBottom: '12px', display: 'block', opacity: 0.5 }}></i>
                    <p>No events found matching "<strong>{searchTerm}</strong>"</p>
                </div>
            )}
        </div>
    );
};

export default Registrations;
