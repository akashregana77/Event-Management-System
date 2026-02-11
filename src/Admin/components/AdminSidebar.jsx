import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminSidebar = ({ isOpen, closeSidebar }) => {
    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: 'fa-solid fa-gauge-high', end: true },
        { path: '/admin/events', label: 'Manage Events', icon: 'fa-regular fa-calendar-check' },
        { path: '/admin/create-event', label: 'Create Event', icon: 'fa-solid fa-plus' },
        { path: '/admin/approvals', label: 'Event Approvals', icon: 'fa-solid fa-clipboard-check' },
        { path: '/admin/registrations', label: 'Registrations', icon: 'fa-solid fa-users' },
        { path: '/admin/users', label: 'Users', icon: 'fa-solid fa-user-gear' },
        { path: '/admin/reports', label: 'Reports', icon: 'fa-solid fa-chart-pie' },
        { path: '/admin/settings', label: 'Settings', icon: 'fa-solid fa-gear' },
    ];

    return (
        <aside className={`sa-sidebar ${isOpen ? 'open' : ''}`}>
            <nav>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.end}
                        className={({ isActive }) => `sa-nav-link ${isActive ? 'active' : ''}`}
                        onClick={() => window.innerWidth < 900 && closeSidebar()}
                    >
                        <i className={item.icon} aria-hidden="true"></i>
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div style={{ marginTop: 'auto' }}>
                <button className="sa-nav-link" type="button">
                    <i className="fa-solid fa-right-from-bracket" aria-hidden="true"></i>
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
