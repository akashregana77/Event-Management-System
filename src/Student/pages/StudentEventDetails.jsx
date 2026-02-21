/**
 * StudentEventDetails — event details page within student dashboard.
 * Shows full event info with register button.
 */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tag, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import { getEventById } from '../../services/eventService';
import { useToast } from '../../components/ui/Toast';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';

export default function StudentEventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registered, setRegistered] = useState(false);
    const { addToast } = useToast();

    useEffect(() => {
        async function load() {
            const data = await getEventById(id);
            setEvent(data);
            setLoading(false);
        }
        load();
    }, [id]);

    const handleRegister = () => {
        setRegistered(true);
        addToast(`Successfully registered for "${event.title}"!`, 'success');
    };

    if (loading) {
        return (
            <div>
                <LoadingSkeleton variant="text" count={8} />
            </div>
        );
    }

    if (!event) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
                <h3>Event not found</h3>
                <p className="muted">This event may have been removed or doesn't exist.</p>
                <Link to="/student/events" className="primary-btn" style={{ marginTop: '16px', display: 'inline-flex' }}>
                    <ArrowLeft size={16} /> Back to Events
                </Link>
            </div>
        );
    }

    const getTagClass = (t) => {
        const map = { Technical: 'technical', Cultural: 'cultural', Workshop: 'workshop', Sports: 'sports' };
        return map[t] || '';
    };

    return (
        <div>
            <Link to="/student/events" className="ghost-btn" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <ArrowLeft size={16} /> Back to Events
            </Link>

            <div className="card glass hover-gradient-border animate-rise">
                {/* Banner */}
                <div className={`student-event-banner large ${getTagClass(event.type)}`} />

                <div style={{ padding: '24px' }}>
                    <div className="badge-row" style={{ marginBottom: '12px' }}>
                        <span className={`badge badge-solid ${getTagClass(event.type)}`}>{event.type}</span>
                        <span className={`badge ${event.status === 'Approved' ? 'badge-solid' : 'badge-muted'}`}>{event.status}</span>
                    </div>

                    <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', color: 'var(--text)' }}>{event.title}</h1>
                    <p className="muted" style={{ fontSize: '15px', lineHeight: 1.6, marginBottom: '24px' }}>{event.description}</p>

                    {/* Meta grid */}
                    <div className="student-detail-meta">
                        <div className="meta-card">
                            <Calendar size={20} />
                            <div>
                                <small className="muted">Date</small>
                                <p>{event.date}</p>
                            </div>
                        </div>
                        <div className="meta-card">
                            <Clock size={20} />
                            <div>
                                <small className="muted">Time</small>
                                <p>{event.time}</p>
                            </div>
                        </div>
                        <div className="meta-card">
                            <MapPin size={20} />
                            <div>
                                <small className="muted">Venue</small>
                                <p>{event.venue || event.location}</p>
                            </div>
                        </div>
                        {event.club && (
                            <div className="meta-card">
                                <Tag size={20} />
                                <div>
                                    <small className="muted">Organizer</small>
                                    <p>{event.club || event.organizer}</p>
                                </div>
                            </div>
                        )}
                        {event.registrationLimit && (
                            <div className="meta-card">
                                <Users size={20} />
                                <div>
                                    <small className="muted">Capacity</small>
                                    <p>{event.registeredCount || 0} / {event.registrationLimit}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Register button */}
                    <div style={{ marginTop: '32px' }}>
                        {registered ? (
                            <button className="primary-btn" disabled style={{ opacity: 0.7, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CheckCircle size={18} /> Registered Successfully
                            </button>
                        ) : (
                            <button className="primary-btn elevated" onClick={handleRegister} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                Register for this Event
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
