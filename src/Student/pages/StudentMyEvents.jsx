/**
 * StudentMyEvents — My registered events page (refactored from MyEvents.jsx).
 * Now rendered inside StudentLayout, no Navbar/Sidebar here.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';
import EmptyState from '../../components/ui/EmptyState';

const mockEvents = [
    { id: 1, title: 'AI Bootcamp', type: 'technical', date: 'Jan 10, 2024', time: '10:00 AM', venue: 'Auditorium' },
    { id: 2, title: 'UI/UX Workshop', type: 'technical', date: 'Jan 18, 2024', time: '2:00 PM', venue: 'Lab 3' },
    { id: 3, title: 'Robotics Expo', type: 'technical', date: 'Feb 02, 2024', time: '11:00 AM', venue: 'Main Hall' },
];

const mockStudentRegistrations = [
    { id: 1, eventId: 1, eventTitle: 'AI Bootcamp', registeredOn: 'Jan 02, 2024', status: 'registered' },
    { id: 2, eventId: 2, eventTitle: 'UI/UX Workshop', registeredOn: 'Dec 18, 2023', status: 'completed' },
    { id: 3, eventId: 3, eventTitle: 'Robotics Expo', registeredOn: 'Dec 10, 2023', status: 'registered' },
];

export default function StudentMyEvents() {
    const registrations = mockStudentRegistrations.map((reg) => {
        const event = mockEvents.find((e) => e.id === reg.eventId);
        return { ...reg, event };
    });

    return (
        <>
            <header className="section-header">
                <h1>My Events</h1>
                <p className="muted">Track your registered events and participation history</p>
            </header>

            <div className="cards-vertical">
                {registrations.map((reg, idx) => (
                    <div
                        key={reg.id}
                        className="card event-card hover-card hover-gradient-border animate-stagger"
                        style={{ animationDelay: `${idx * 70}ms` }}
                    >
                        <div className="event-card-top">
                            <div className="badge-row">
                                <span className={`badge ${reg.status === 'registered' ? 'badge-solid' : 'badge-muted'}`}>
                                    {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                                </span>
                                {reg.event && (
                                    <span className="badge badge-outline">
                                        {reg.event.type.charAt(0).toUpperCase() + reg.event.type.slice(1)}
                                    </span>
                                )}
                            </div>
                            <h3 className="event-card-title">{reg.eventTitle}</h3>
                            {reg.event && (
                                <div className="event-meta">
                                    <span className="meta-item"><Calendar className="meta-icon" size={14} /> {reg.event.date}</span>
                                    <span className="meta-item"><Clock className="meta-icon" size={14} /> {reg.event.time}</span>
                                    <span className="meta-item"><MapPin className="meta-icon" size={14} /> {reg.event.venue}</span>
                                </div>
                            )}
                        </div>
                        <div className="event-card-actions">
                            <span className="muted small">Registered on {reg.registeredOn}</span>
                            <Link to={`/student/events/${reg.eventId}`} className="outline-btn">
                                View Details <ExternalLink size={16} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {registrations.length === 0 && (
                <EmptyState
                    icon={Calendar}
                    title="No registrations yet"
                    message="Start exploring events and register for ones you're interested in!"
                    action={() => { }}
                    actionLabel="Browse Events"
                />
            )}
        </>
    );
}
