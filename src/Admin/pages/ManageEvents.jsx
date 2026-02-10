import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventsData } from '../data/dummyData';

const ManageEvents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [events, setEvents] = useState(eventsData);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            setEvents(events.filter(event => event.id !== id));
        }
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.organizer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || event.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="sa-dashboard-content">
            <div className="sa-card-header" style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Manage Events</h2>
                <Link to="/admin/create-event" className="primary-btn">
                    <Plus size={18} />
                    Create New Event
                </Link>
            </div>

            <div className="sa-card glass" style={{ marginBottom: '20px', padding: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div className="search-box" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        flex: 1,
                        maxWidth: '400px'
                    }}>
                        <Search size={18} color="var(--muted)" />
                        <input
                            type="text"
                            placeholder="Search events..."
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

                    <div className="filter-box" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        padding: '8px 12px',
                        borderRadius: '10px'
                    }}>
                        <Filter size={18} color="var(--muted)" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            style={{
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                color: 'var(--text)',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="All">All Status</option>
                            <option value="Approved">Approved</option>
                            <option value="Pending">Pending</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="sa-card glass">
                <div className="sa-table-wrapper">
                    <table className="sa-data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date & Time</th>
                                <th>Venue</th>
                                <th>Organizer</th>
                                <th>Status</th>
                                <th className="sa-text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event, idx) => (
                                    <tr key={event.id} className="hover-row animate-stagger" style={{ animationDelay: `${idx * 50}ms` }}>
                                        <td style={{ fontWeight: '600' }}>{event.title}</td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span>{event.date}</span>
                                                <small className="sa-muted" style={{ fontSize: '12px' }}>{event.time}</small>
                                            </div>
                                        </td>
                                        <td>{event.venue}</td>
                                        <td>{event.organizer}</td>
                                        <td>
                                            <span className={`sa-tag ${event.status === 'Approved' ? 'sa-tag-open' : event.status === 'Pending' ? 'sa-tag-closed' : ''}`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="sa-text-right">
                                            <div className="sa-table-actions">
                                                <button className="ghost-btn sa-compact" title="View">
                                                    <Eye size={16} />
                                                </button>
                                                <button className="ghost-btn sa-compact" title="Edit">
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    className="ghost-btn sa-compact"
                                                    title="Delete"
                                                    onClick={() => handleDelete(event.id)}
                                                    style={{ color: '#ef4444', borderColor: '#fee2e2', background: '#fef2f2' }}
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>No events found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageEvents;
