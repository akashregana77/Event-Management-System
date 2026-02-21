/**
 * StudentEvents — Browse all events page within student dashboard.
 * Reuses filter/search patterns from the public Events component.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, MapPin, Tag, ArrowRight, SlidersHorizontal, X } from 'lucide-react';
import { getAllEvents } from '../../services/eventService';
import LoadingSkeleton from '../../components/ui/LoadingSkeleton';
import EmptyState from '../../components/ui/EmptyState';

export default function StudentEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [type, setType] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        async function load() {
            const data = await getAllEvents();
            setEvents(data.filter((e) => e.status === 'Approved'));
            setLoading(false);
        }
        load();
    }, []);

    const filtered = events.filter((e) => {
        const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
        const matchType = type === 'All' || e.type === type;
        return matchSearch && matchType;
    });

    const uniqueTypes = ['All', ...new Set(events.map((e) => e.type))];

    const getTagClass = (t) => {
        const map = { Technical: 'technical', Cultural: 'cultural', Workshop: 'workshop', Sports: 'sports' };
        return map[t] || '';
    };

    if (loading) {
        return (
            <div>
                <header className="section-header">
                    <h1>Browse Events</h1>
                    <p className="muted">Discover and register for upcoming events</p>
                </header>
                <LoadingSkeleton variant="card" count={4} />
            </div>
        );
    }

    return (
        <div>
            <header className="section-header">
                <h1>Browse Events</h1>
                <p className="muted">
                    Showing <strong>{filtered.length}</strong> of <strong>{events.length}</strong> events
                </p>
            </header>

            {/* Search and filters */}
            <div className="student-filters-bar">
                <div className="student-search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="ghost-btn student-filter-toggle" onClick={() => setShowFilters(!showFilters)}>
                    <SlidersHorizontal size={16} />
                    Filters
                    {type !== 'All' && <span className="filter-count">1</span>}
                </button>
            </div>

            {showFilters && (
                <div className="student-filter-pills" style={{ marginBottom: '16px' }}>
                    {uniqueTypes.map((t) => (
                        <button
                            key={t}
                            className={`sa-filter-pill ${type === t ? 'active' : ''}`}
                            onClick={() => setType(t)}
                        >
                            {t}
                        </button>
                    ))}
                    {type !== 'All' && (
                        <button className="sa-filter-pill" onClick={() => setType('All')} style={{ color: '#ef4444' }}>
                            <X size={14} /> Clear
                        </button>
                    )}
                </div>
            )}

            {/* Event cards */}
            {filtered.length === 0 ? (
                <EmptyState
                    icon={Calendar}
                    title="No events found"
                    message="Try adjusting your search or check back later for new events."
                />
            ) : (
                <div className="cards-grid">
                    {filtered.map((event, idx) => (
                        <div
                            key={event.id}
                            className="card hover-card hover-gradient-border animate-stagger"
                            style={{ animationDelay: `${idx * 70}ms` }}
                        >
                            {/* Color banner */}
                            <div className={`student-event-banner ${getTagClass(event.type)}`} />

                            <div className="student-event-card-body">
                                <div className="badge-row" style={{ marginBottom: '8px' }}>
                                    <span className={`badge badge-solid ${getTagClass(event.type)}`}>{event.type}</span>
                                </div>

                                <h3 className="event-card-title">{event.title}</h3>
                                <p className="muted" style={{ fontSize: '13px', marginBottom: '12px', lineHeight: 1.5 }}>{event.description}</p>

                                <div className="event-meta" style={{ marginBottom: '16px' }}>
                                    <span className="meta-item"><Calendar size={14} className="meta-icon" /> {event.date}</span>
                                    <span className="meta-item"><Clock size={14} className="meta-icon" /> {event.time}</span>
                                    <span className="meta-item"><MapPin size={14} className="meta-icon" /> {event.location || event.venue}</span>
                                    {event.club && <span className="meta-item"><Tag size={14} className="meta-icon" /> {event.club}</span>}
                                </div>

                                <Link to={`/student/events/${event.id}`} className="primary-btn" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    View Details <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
