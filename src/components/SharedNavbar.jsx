import React from 'react';
import { Menu, Bell, Moon, Sun, GraduationCap, User, Search, ChevronDown } from 'lucide-react';
import './SharedNavbar.css';

const SharedNavbar = ({ role = "Admin", theme, toggleTheme, toggleSidebar, sidebarOpen, userName = "User" }) => {
    const getRoleBadgeClass = () => {
        switch (role.toLowerCase()) {
            case 'admin': return 'role-admin';
            case 'super admin': return 'role-superadmin';
            case 'student': return 'role-student';
            default: return '';
        }
    };

    return (
        <header className="shared-navbar">
            {/* Left Section */}
            <div className="navbar-left">
                <button
                    type="button"
                    className="navbar-icon-btn mobile-menu-btn"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                    aria-expanded={sidebarOpen}
                >
                    <Menu size={20} />
                </button>
                
                <div className="navbar-brand">
                    <div className="brand-logo">
                        <GraduationCap size={26} />
                    </div>
                    <div className="brand-text">
                        <span className="brand-name">GMRIT</span>
                        <span className="brand-accent">Events</span>
                    </div>
                </div>
                
                <span className={`navbar-role-badge ${getRoleBadgeClass()}`}>
                    {role}
                </span>
            </div>

            {/* Center Section - Search (optional, hidden on mobile) */}
            <div className="navbar-center">
                <div className="navbar-search">
                    <Search size={18} className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search events, clubs..."
                        className="search-input"
                    />
                    <kbd className="search-shortcut">⌘K</kbd>
                </div>
            </div>

            {/* Right Section */}
            <div className="navbar-right">
                {/* Theme Toggle */}
                <button
                    type="button"
                    className="navbar-icon-btn theme-toggle-btn"
                    onClick={toggleTheme}
                    title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    aria-label="Toggle theme"
                >
                    <div className="theme-icon-wrapper">
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </div>
                </button>

                {/* Notifications */}
                <button 
                    type="button" 
                    className="navbar-icon-btn notification-btn" 
                    aria-label="Notifications"
                >
                    <Bell size={18} />
                    <span className="notification-badge">3</span>
                </button>

                {/* Profile Dropdown */}
                <div className="navbar-profile">
                    <button type="button" className="profile-btn" aria-label="Profile menu">
                        <div className="profile-avatar">
                            <User size={18} />
                        </div>
                        <div className="profile-info">
                            <span className="profile-name">{userName}</span>
                            <span className="profile-role">{role}</span>
                        </div>
                        <ChevronDown size={16} className="profile-chevron" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default SharedNavbar;
