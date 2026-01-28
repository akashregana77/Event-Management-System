import React, { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { eventsData } from '../data/dummyData';
import '../styles/ManageEvents.css';

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
        <div className="manage-events-container">
            <div className="page-header">
                <h2 className="page-title">Manage Events</h2>
                <button className="btn btn-primary">Create New Event</button>
            </div>

            <div className="controls-bar card">
                <div className="search-box">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-box">
                    <Filter size={20} className="filter-icon" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div className="events-table-container card">
                <table className="events-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date & Time</th>
                            <th>Venue</th>
                            <th>Organizer</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map(event => (
                                <tr key={event.id}>
                                    <td className="font-medium">{event.title}</td>
                                    <td>
                                        <div className="datetime">
                                            <span>{event.date}</span>
                                            <small>{event.time}</small>
                                        </div>
                                    </td>
                                    <td>{event.venue}</td>
                                    <td>{event.organizer}</td>
                                    <td>
                                        <span className={`status-badge ${event.status.toLowerCase()}`}>
                                            {event.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="actions">
                                            <button className="icon-btn view" title="View">
                                                <Eye size={18} />
                                            </button>
                                            <button className="icon-btn edit" title="Edit">
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                className="icon-btn delete"
                                                title="Delete"
                                                onClick={() => handleDelete(event.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="no-data">No events found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageEvents;
