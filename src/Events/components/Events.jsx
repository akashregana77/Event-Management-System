import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Tag, ArrowRight, Users, SlidersHorizontal, X } from "lucide-react";
import SearchBar from "./SearchBar";
import eventsData from "../data/events.json";
import "./Events.css";
import Navbar from "../../Home/navbar";

export default function Events() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [club, setClub] = useState("All");

  const filteredEvents = eventsData.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchType = type === "All" || e.type === type;
    const matchClub = club === "All" || e.club === club;
    return matchSearch && matchType && matchClub;
  });

  const uniqueTypes = ["All", ...new Set(eventsData.map(e => e.type))];
  const uniqueClubs = ["All", ...new Set(eventsData.map(e => e.club))];

  const activeFilterCount = (type !== "All" ? 1 : 0) + (club !== "All" ? 1 : 0);

  const clearFilters = () => {
    setType("All");
    setClub("All");
  };

  const getTagClass = (eventType) => {
    const typeMap = {
      'Technical': 'technical',
      'Cultural': 'cultural',
      'Workshop': 'workshop',
      'Seminar': 'seminar'
    };
    return typeMap[eventType] || '';
  };

  const getCapacityInfo = (event) => {
    const registered = event.registered || 0;
    const capacity = event.capacity || 100;
    const percentage = (registered / capacity) * 100;
    const spotsLeft = capacity - registered;
    return { percentage, spotsLeft, isAlmostFull: spotsLeft <= 5 };
  };

  return (
    <>
      <Navbar />
      <div className="events-page">
        <aside className="filters">
          <div className="filters-header">
            <div className="filters-title">
              <SlidersHorizontal size={18} />
              <h3>Filters</h3>
            </div>
            {activeFilterCount > 0 && (
              <button className="clear-filters-btn" onClick={clearFilters}>
                <X size={14} />
                Clear ({activeFilterCount})
              </button>
            )}
          </div>

          <div className="filter-group">
            <label>Event Type</label>
            <div className="filter-pills">
              {uniqueTypes.map((t, i) => (
                <button
                  key={t}
                  className={`filter-pill ${type === t ? 'active' : ''} ${t !== 'All' ? getTagClass(t) : ''}`}
                  onClick={() => setType(t)}
                  style={{ '--pill-index': i }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label>Club</label>
            <div className="filter-pills">
              {uniqueClubs.map((c, i) => (
                <button
                  key={c}
                  className={`filter-pill ${club === c ? 'active' : ''}`}
                  onClick={() => setClub(c)}
                  style={{ '--pill-index': i }}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="events-content">
          <div className="events-header">
            <h1>Explore Events</h1>
            <p className="events-subtitle">
              Showing <strong>{filteredEvents.length}</strong> of{" "}
              <strong>{eventsData.length}</strong> events
            </p>
          </div>
          <SearchBar
            value={search}
            onChange={setSearch}
            resultCount={search ? filteredEvents.length : undefined}
          />

          <div className="events-grid">
            {filteredEvents.map((event, index) => {
              const { percentage, spotsLeft, isAlmostFull } = getCapacityInfo(event);
              const capacityClass = percentage >= 90 ? 'full' : percentage >= 70 ? 'high' : '';

              return (
                <div
                  className="event-card"
                  key={event.id}
                  style={{ '--card-index': index }}
                >
                  {/* Gradient banner */}
                  <div className={`event-card-banner ${getTagClass(event.type)}`}>
                    <span className="banner-pattern" />
                  </div>

                  <div className="shimmer-effect" />
                  <div className="event-card-body">
                    <div className="event-card-header">
                      <span className={`tag ${getTagClass(event.type)}`}>{event.type}</span>
                      {isAlmostFull && (
                        <span className="spots-badge">🔥 {spotsLeft} spots left!</span>
                      )}
                    </div>

                    <h3>{event.title}</h3>
                    <p className="event-description">{event.description}</p>

                    <div className="event-meta">
                      <div className="event-meta-item club">
                        <Tag size={16} />
                        <span>{event.club}</span>
                      </div>
                      <div className="event-meta-item">
                        <Calendar size={16} />
                        <span>{event.date}</span>
                      </div>
                      <div className="event-meta-item">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="event-meta-item">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                      {event.capacity && (
                        <div className="event-meta-item">
                          <Users size={16} />
                          <span>{event.registered || 0} / {event.capacity} registered</span>
                        </div>
                      )}
                    </div>

                    {event.capacity && (
                      <div className="capacity-bar">
                        <div
                          className={`capacity-fill ${capacityClass}`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    )}

                    <button onClick={() => navigate(`/events/${event.id}`)}>
                      View Details
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No events found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
