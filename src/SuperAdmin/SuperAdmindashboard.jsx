import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SharedNavbar from "../components/SharedNavbar";
import "./SuperAdmindashboard.css";

const navItems = [
	{ id: "overview", label: "Dashboard", icon: "fa-solid fa-gauge-high" },
	{ id: "clubs", label: "Manage Clubs", icon: "fa-solid fa-building-columns" },
	{ id: "admins", label: "Manage Admins", icon: "fa-solid fa-user-shield" },
	{ id: "settings", label: "System Settings", icon: "fa-solid fa-gear" },
];

const mockClubs = [
	{ id: 1, name: "IEEE", category: "Technical", events: 12, members: 240 },
	{ id: 2, name: "ACM", category: "Technical", events: 9, members: 180 },
	{ id: 3, name: "CSI", category: "Technical", events: 7, members: 140 },
	{ id: 4, name: "NSS", category: "Social", events: 5, members: 120 },
	{ id: 5, name: "Cultural Club", category: "Cultural", events: 8, members: 160 },
	{ id: 6, name: "Robotics Club", category: "Innovation", events: 6, members: 110 },
];

const mockEvents = [
	{ id: 1, title: "National Hackathon", date: "Jan 22, 2024", registered: 320, status: "Open" },
	{ id: 2, title: "Robotics Expo", date: "Feb 05, 2024", registered: 190, status: "Open" },
	{ id: 3, title: "Cultural Fest", date: "Feb 20, 2024", registered: 410, status: "Closed" },
];

const mockAdmins = [
	{ id: 1, name: "Anita Rao", role: "Lead Admin", clubs: 5 },
	{ id: 2, name: "Vikram Patel", role: "Event Manager", clubs: 3 },
	{ id: 3, name: "Sara Thomas", role: "Finance", clubs: 2 },
];

const statCards = [
	{ id: 1, title: "Total Clubs", value: mockClubs.length, subtitle: "Across all categories", tone: "primary", iconClass: "fa-solid fa-building" },
	{ id: 2, title: "Total Events", value: mockEvents.length, subtitle: "Upcoming & active", tone: "info", iconClass: "fa-regular fa-calendar-check" },
	{ id: 3, title: "Registrations", value: mockEvents.reduce((a, e) => a + e.registered, 0), subtitle: "This quarter", tone: "success", iconClass: "fa-solid fa-users" },
	{ id: 4, title: "Active Admins", value: mockAdmins.length, subtitle: "Across clubs", tone: "warning", iconClass: "fa-solid fa-user-shield" },
];

export default function SuperAdminDashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("overview");
	const [theme, setTheme] = useState(() => localStorage.getItem("superadmin-theme") || "light");

	const totalRegistrations = useMemo(
		() => mockEvents.reduce((acc, e) => acc + e.registered, 0),
		[]
	);

	useEffect(() => {
		const isDark = theme === "dark";
		document.body.classList.toggle("theme-dark", isDark);
		localStorage.setItem("superadmin-theme", theme);
	}, [theme]);

	const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

	const handleNav = (id) => {
		setActiveTab(id);
		setSidebarOpen(false);
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	};

	return (
		<div className="sa-page">
			<SharedNavbar
				role="Super Admin"
				theme={theme}
				toggleTheme={toggleTheme}
				toggleSidebar={() => setSidebarOpen((s) => !s)}
				sidebarOpen={sidebarOpen}
			/>

			<div className="sa-dashboard-layout">
				<aside className={`sa-sidebar ${sidebarOpen ? "open" : ""}`}>
					<nav>
						{navItems.map((item) => (
							<button
								key={item.id}
								type="button"
								className={`sa-nav-link ${activeTab === item.id ? "active" : ""}`}
								onClick={() => handleNav(item.id)}
							>
								<i className={item.icon} aria-hidden="true"></i>
								{item.label}
							</button>
						))}
					</nav>
				</aside>

				{sidebarOpen && <div className="sa-backdrop" onClick={() => setSidebarOpen(false)}></div>}

				<main className="sa-dashboard-main">
					<section id="overview" className="sa-welcome-card glass hover-gradient-border">
						<div>
							<p className="sa-eyebrow">CampusEvents • Super Admin</p>
							<h2>Welcome back, Admin! 👋</h2>
							<p className="sa-muted">You have {mockEvents.length} active events to monitor today.</p>
							<div className="sa-hero-actions">
								<Link to="/" className="primary-btn">View Portal</Link>
								<button type="button" className="ghost-btn">Generate Report</button>
							</div>
						</div>
						<div className="sa-hero-badge">
							<div className="sa-badge-number">{totalRegistrations}</div>
							<div>
								<p className="sa-badge-label">Total registrations</p>
								<p className="sa-badge-text">This quarter</p>
							</div>
						</div>
					</section>

					<section className="sa-stats-grid">
						{statCards.map((card, idx) => (
							<div
								key={card.id}
								className={`sa-stat-card ${card.tone} hover-gradient-border animate-stagger`}
								style={{ animationDelay: `${idx * 80}ms` }}
							>
								<div className="sa-stat-icon">
									<i className={card.iconClass} aria-hidden="true"></i>
								</div>
								<div>
									<p className="sa-stat-title">{card.title}</p>
									<h3 className="sa-stat-value">{card.value}</h3>
									<p className="sa-stat-subtitle">{card.subtitle}</p>
								</div>
							</div>
						))}
					</section>

					<section id="clubs" className="sa-card glass">
						<div className="sa-card-header">
							<h3>Clubs & Professional Bodies</h3>
							<button type="button" className="primary-btn sa-compact">
								<i className="fa-solid fa-plus"></i> Add Club
							</button>
						</div>
						<div className="sa-table-wrapper">
							<table className="sa-data-table">
								<thead>
									<tr>
										<th>Club Name</th>
										<th className="sa-hide-sm">Category</th>
										<th className="sa-hide-md">Events</th>
										<th className="sa-hide-md">Members</th>
										<th className="sa-text-right">Actions</th>
									</tr>
								</thead>
								<tbody>
									{mockClubs.map((club, idx) => (
										<tr key={club.id} className="hover-row animate-stagger" style={{ animationDelay: `${idx * 60}ms` }}>
											<td>{club.name}</td>
											<td className="sa-hide-sm">
												<span className="sa-pill sa-pill-soft">{club.category}</span>
											</td>
											<td className="sa-hide-md sa-muted">{club.events}</td>
											<td className="sa-hide-md sa-muted">{club.members}</td>
											<td className="sa-text-right">
												<div className="sa-table-actions">
													<button type="button" className="ghost-btn sa-compact">
														<i className="fa-regular fa-pen-to-square"></i>
													</button>
													<button type="button" className="ghost-btn sa-compact">
														<i className="fa-regular fa-trash-can"></i>
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</section>

					<section className="sa-content-grid">
						<div id="admins" className="sa-card glass">
							<div className="sa-card-header">
								<h3>Admin Team</h3>
								<span className="sa-pill sa-pill-primary">Updated</span>
							</div>
							<div className="sa-list">
								{mockAdmins.map((admin, idx) => (
									<div key={admin.id} className="sa-list-item hover-card animate-stagger" style={{ animationDelay: `${idx * 70}ms` }}>
										<div>
											<p className="sa-list-title">{admin.name}</p>
											<p className="sa-muted">{admin.role} • Manages {admin.clubs} clubs</p>
										</div>
										<button type="button" className="ghost-btn sa-compact">View</button>
									</div>
								))}
							</div>
						</div>

						<div id="settings" className="sa-card glass">
							<div className="sa-card-header">
								<h3>Recent Events</h3>
								<Link to="/" className="sa-text-link">View all →</Link>
							</div>
							<div className="sa-event-list">
								{mockEvents.map((ev, idx) => (
									<div key={ev.id} className="sa-event-item hover-card animate-stagger" style={{ animationDelay: `${idx * 80}ms` }}>
										<div className="sa-event-top">
											<span className={`sa-tag ${ev.status === "Open" ? "sa-tag-open" : "sa-tag-closed"}`}>
												{ev.status}
											</span>
											<span className="sa-event-time">{ev.date}</span>
										</div>
										<h4>{ev.title}</h4>
										<p className="sa-muted">Registrations: {ev.registered}</p>
									</div>
								))}
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
