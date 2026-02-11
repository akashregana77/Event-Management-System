import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Tag, ArrowRight, Users } from "lucide-react";
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

  // Helper function to get tag class based on event type
  const getTagClass = (eventType) => {
    const typeMap = {
      'Technical': 'technical',
      'Cultural': 'cultural',
      'Workshop': 'workshop',
      'Seminar': 'seminar'
    };
    return typeMap[eventType] || '';
  };

  // Calculate capacity percentage
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
          <h3>Filters</h3>

          <label>Event Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {uniqueTypes.map(t => <option key={t}>{t}</option>)}
          </select>

          <label>Club</label>
          <select value={club} onChange={(e) => setClub(e.target.value)}>
            {uniqueClubs.map(c => <option key={c}>{c}</option>)}
          </select>
        </aside>

        <main className="events-content">
          <h1>Explore Events</h1>
          <SearchBar value={search} onChange={setSearch} />

          <div className="events-grid">
            {filteredEvents.map(event => {
              const { percentage, spotsLeft, isAlmostFull } = getCapacityInfo(event);
              const capacityClass = percentage >= 90 ? 'full' : percentage >= 70 ? 'high' : '';

              return (
                <div className="event-card" key={event.id}>
                  <div className="event-card-header">
                    <span className={`tag ${getTagClass(event.type)}`}>{event.type}</span>
                    {isAlmostFull && (
                      <span className="spots-badge">{spotsLeft} spots left!</span>
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
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
