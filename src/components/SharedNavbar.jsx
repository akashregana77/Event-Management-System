import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Moon, Sun, GraduationCap, User, Search, ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import './SharedNavbar.css';

const SharedNavbar = ({ role = "Admin", theme, toggleTheme, toggleSidebar, sidebarOpen, userName = "User" }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const profileRef = useRef(null);
    const navigate = useNavigate();

    const getRoleBadgeClass = () => {
        switch (role.toLowerCase()) {
            case 'admin': return 'role-admin';
            case 'super admin': return 'role-superadmin';
            case 'student': return 'role-student';
            default: return '';
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        setProfileOpen(false);
        navigate('/');
    };

    return (
        <header className="shared-navbar">
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

            <div className="navbar-right">
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

                <button 
                    type="button" 
                    className="navbar-icon-btn notification-btn" 
                    aria-label="Notifications"
                >
                    <Bell size={18} />
                    <span className="notification-badge">3</span>
                </button>

                <div className="navbar-profile" ref={profileRef}>
                    <button 
                        type="button" 
                        className={`profile-btn ${profileOpen ? 'active' : ''}`}
                        onClick={() => setProfileOpen(!profileOpen)}
                        aria-label="Profile menu"
                        aria-expanded={profileOpen}
                    >
                        <div className="profile-avatar">
                            <User size={18} />
                        </div>
                        <div className="profile-info">
                            <span className="profile-name">{userName}</span>
                            <span className="profile-role">{role}</span>
                        </div>
                        <ChevronDown size={16} className={`profile-chevron ${profileOpen ? 'rotate' : ''}`} />
                    </button>

                    <div className={`profile-dropdown ${profileOpen ? 'show' : ''}`}>
                        <div className="dropdown-header">
                            <div className="dropdown-avatar">
                                <User size={24} />
                            </div>
                            <div className="dropdown-user-info">
                                <span className="dropdown-name">{userName}</span>
                                <span className="dropdown-email">{userName.toLowerCase().replace(' ', '.')}@gmrit.edu.in</span>
                            </div>
                        </div>
                        <div className="dropdown-divider"></div>
                        <button type="button" className="dropdown-item">
                            <UserCircle size={18} />
                            <span>My Profile</span>
                        </button>
                        <button type="button" className="dropdown-item">
                            <Settings size={18} />
                            <span>Settings</span>
                        </button>
                        <div className="dropdown-divider"></div>
                        <button type="button" className="dropdown-item logout" onClick={handleLogout}>
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default SharedNavbar;
