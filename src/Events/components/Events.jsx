import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            {filteredEvents.map(event => (
              <div className="event-card" key={event.id}>
                <span className="tag">{event.type}</span>

                <h3>{event.title}</h3>
                <p>{event.description}</p>

                <p>🏷 {event.club}</p>
                <p>📅 {event.date}</p>
                <p>⏰ {event.time}</p>
                <p>📍 {event.location}</p>

                <button onClick={() => navigate(`/events/${event.id}`)}>
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
