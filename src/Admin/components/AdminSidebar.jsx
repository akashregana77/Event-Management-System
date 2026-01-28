import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    CalendarDays,
    PlusCircle,
    CheckSquare,
    Users,
    UserCog,
    FileBarChart,
    Settings,
    LogOut,
    GraduationCap
} from 'lucide-react';
import '../styles/Sidebar.css';

const AdminSidebar = ({ isOpen, closeSidebar }) => {
    const menuItems = [
        { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/events', label: 'Manage Events', icon: <CalendarDays size={20} /> },
        { path: '/create-event', label: 'Create Event', icon: <PlusCircle size={20} /> },
        { path: '/approvals', label: 'Event Approvals', icon: <CheckSquare size={20} /> },
        { path: '/registrations', label: 'Registrations', icon: <Users size={20} /> },
        { path: '/users', label: 'Users', icon: <UserCog size={20} /> },
        { path: '/reports', label: 'Reports', icon: <FileBarChart size={20} /> },
        { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
    ];

    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
                onClick={closeSidebar}
            />
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="brand">
                        <GraduationCap size={28} />
                        <span>GMRIT Events</span>
                    </div>
                </div>

                <ul className="sidebar-menu">
                    {menuItems.map((item) => (
                        <li key={item.path} className="menu-item">
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => (isActive ? 'active' : '')}
                                onClick={() => window.innerWidth < 768 && closeSidebar()}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>

                <div className="sidebar-footer">
                    <button className="logout-btn">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;
