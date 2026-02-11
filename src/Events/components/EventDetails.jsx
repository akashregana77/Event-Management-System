import { useParams, useNavigate } from "react-router-dom";
import eventsData from "../data/events.json";
import "./EventDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = eventsData.find(e => e.id === Number(id));

  if (!event) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Event not found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="details">
      <h1>{event.title}</h1>
      <h3>{event.club}</h3>

      <p>{event.description}</p>

      <p>📅 {event.date}</p>
      <p>⏰ {event.time}</p>
      <p>📍 {event.location}</p>
      <p>👥 {event.registered} / {event.capacity}</p>

      <button onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}
