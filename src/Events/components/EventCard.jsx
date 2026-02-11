import React from "react";
import { Calendar, Clock, MapPin, Users, Tag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const badgeColors = {
  Technical: "#D0E7FF", // light blue
  Cultural: "#D0FFD6",  // light green
  Workshop: "#FFF3C0",  // light yellow
  Seminar: "#FFD0D0",   // light red
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const spotsLeft = event.capacity - event.registered;
  const isAlmostFull = spotsLeft <= 5;

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    cursor: "pointer",
  };

  const badgeStyle = {
    backgroundColor: badgeColors[event.type],
    padding: "2px 6px",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "12px",
  };

  const redBadgeStyle = {
    backgroundColor: "#FFD0D0",
    padding: "2px 6px",
    borderRadius: "4px",
    fontWeight: "bold",
    fontSize: "12px",
  };

  return (
    <div style={cardStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={badgeStyle}>{event.type}</span>
        {isAlmostFull && <span style={redBadgeStyle}>{spotsLeft} spots left!</span>}
      </div>

      <h3 style={{ margin: "8px 0" }}>{event.title}</h3>
      <p style={{ color: "#555", marginBottom: "12px" }}>{event.description}</p>

      <div style={{ marginBottom: "12px", color: "#555", fontSize: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Tag size={16} /> {event.club}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Calendar size={16} /> {event.date}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Clock size={16} /> {event.time}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <MapPin size={16} /> {event.location}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <Users size={16} /> {event.registered} / {event.capacity} registered
        </div>
      </div>

      <button
        onClick={() => navigate("/event-details", { state: { event } })}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "8px 12px",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#007BFF",
          color: "#fff",
          fontWeight: "bold",
        }}
      >
        View Details <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default EventCard;
