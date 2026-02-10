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
} from 'lucide-react';

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
        <aside className={`sa-sidebar ${isOpen ? 'open' : ''}`}>

            <nav>
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `sa-nav-link ${isActive ? 'active' : ''}`}
                        onClick={() => window.innerWidth < 900 && closeSidebar()}
                    >
                        {item.icon}
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            <div style={{ marginTop: 'auto' }}>
                <button className="sa-nav-link" type="button">
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
