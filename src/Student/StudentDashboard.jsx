import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import StudentNavbar from "./StudentNavbar";
import "./dashboard.css";

const announcements = [];

const events = [
  {
    id: 1,
    title: "National Hackathon 2024",
    type: "Technical",
    description: "24-hour coding sprint to build real-world solutions.",
    date: "Jan 15, 2024",
    time: "9:00 AM",
  },
  {
    id: 2,
    title: "Cultural Fest – Rhythm 2024",
    type: "Cultural",
    description: "Music, dance, drama, and art performances across campus.",
    date: "Feb 20–22, 2024",
    time: "10:00 AM",
  },
];

const registrations = [
  { id: 1, eventTitle: "AI Bootcamp", registeredOn: "Jan 02, 2024", status: "registered" },
  { id: 2, eventTitle: "UI/UX Workshop", registeredOn: "Dec 18, 2023", status: "completed" },
  { id: 3, eventTitle: "Robotics Expo", registeredOn: "Dec 10, 2023", status: "registered" },
];

const statCards = [
  { id: 1, title: "Registered Events", value: "3", subtitle: "This semester", tone: "primary", iconClass: "fa-solid fa-clipboard-list" },
  { id: 2, title: "Upcoming Events", value: "2", subtitle: "Next 7 days", tone: "info", iconClass: "fa-regular fa-calendar-check" },
  { id: 3, title: "Completed", value: "5", subtitle: "Events attended", tone: "success", iconClass: "fa-solid fa-circle-check" },
  { id: 4, title: "Notifications", value: "3", subtitle: "Unread", tone: "warning", iconClass: "fa-regular fa-bell" },
];

const quickLinks = [
  { id: 1, label: "Browse Events", to: "/student/events", description: "Discover all active events" },
  { id: 2, label: "My Registrations", to: "/student/my-events", description: "Manage your seats" },
  { id: 3, label: "Support Desk", to: "/support", description: "Get help & FAQs" },
];

export default function StudentDashboard() {
  const [theme, setTheme] = useState(() => localStorage.getItem("student-theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isDark = theme === "dark";
    document.body.classList.toggle("theme-dark", isDark);
    localStorage.setItem("student-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className="page">
      <div className="navbar-shell">
        <StudentNavbar
          theme={theme}
          onToggleTheme={toggleTheme}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((s) => !s)}
        />
      </div>

      <div className="dashboard-layout">
        <Sidebar className={sidebarOpen ? "open" : ""} />

        {sidebarOpen && <div className="backdrop" onClick={() => setSidebarOpen(false)}></div>}

        <main className="dashboard-main">
          <section className="welcome-card glass animate-rise hover-gradient-border">
            <div>
              <p className="eyebrow">GMRIT Events • Student Dashboard</p>
              <h2>Welcome back, John! 👋</h2>
              <p className="muted">You have 3 upcoming events this week. Don’t miss out!</p>
              <div className="hero-actions">
                <Link to="/student/events" className="primary-btn elevated">
                  Explore Events
                </Link>
              </div>
            </div>
            <div className="hero-badge">
              <div className="badge-number animate-pulse-soft">3</div>
              <div>
                <p className="badge-label">Upcoming</p>
                <p className="badge-text">Events this week</p>
              </div>
            </div>
          </section>

          <section className="stats-grid">
            {statCards.map((card, idx) => (
              <div
                key={card.id}
                className={`stat-card ${card.tone} animate-stagger hover-gradient-border`}
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                <div className="stat-icon">
                  <i className={card.iconClass} aria-hidden="true"></i>
                </div>
                <div>
                  <p className="stat-title">{card.title}</p>
                  <h3 className="stat-value">{card.value}</h3>
                  <p className="stat-subtitle">{card.subtitle}</p>
                </div>
              </div>
            ))}
          </section>

          <section className="content-grid">
            <div className="card glass animate-fade hover-gradient-border">
              <div className="card-header">
                <h3>Recently Added Events</h3>
                <Link to="/student/events" className="text-link">
                  View all →
                </Link>
              </div>

              <div className="event-list">
                {events.map((ev, idx) => (
                  <div
                    key={ev.id}
                    className="event-item hover-card animate-stagger hover-gradient-border"
                    style={{ animationDelay: `${idx * 90}ms` }}
                  >
                    <div className="event-top">
                      <span className={`tag ${ev.type === "Technical" ? "technical" : "cultural"}`}>
                        {ev.type}
                      </span>
                      <span className="event-time">
                        {ev.date} • {ev.time}
                      </span>
                    </div>
                    <h4>{ev.title}</h4>
                    <p className="muted">{ev.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="card glass animate-fade hover-gradient-border" style={{ animationDelay: "140ms" }}>
              <div className="card-header">
                <h3>Quick Actions</h3>
                <span className="pill pill-primary">Updated</span>
              </div>
              <div className="quick-links">
                {quickLinks.map((link) => (
                  <Link key={link.id} to={link.to} className="quick-link hover-card hover-gradient-border">
                    <div>
                      <p className="quick-link-title">{link.label}</p>
                      <p className="quick-link-desc muted">{link.description}</p>
                    </div>
                    <span className="quick-link-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="card glass animate-fade hover-gradient-border" style={{ animationDelay: "180ms" }}>
            <div className="card-header">
              <h3>My Registrations</h3>
              <Link to="/student/my-events" className="text-link">
                View all →
              </Link>
            </div>
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Event</th>
                    <th className="hide-sm">Registered On</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((reg, idx) => (
                    <tr
                      key={reg.id}
                      className="hover-row animate-stagger"
                      style={{ animationDelay: `${idx * 70}ms` }}
                    >
                      <td>{reg.eventTitle}</td>
                      <td className="hide-sm muted">{reg.registeredOn}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            reg.status === "registered" ? "success" : "neutral"
                          }`}
                        >
                          {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}