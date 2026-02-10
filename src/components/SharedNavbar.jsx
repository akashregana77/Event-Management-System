import React from 'react';
import { Menu, Bell, Moon, Sun, GraduationCap, User } from 'lucide-react';

const SharedNavbar = ({ role = "Admin", theme, toggleTheme, toggleSidebar, sidebarOpen }) => {
    return (
        <header className="sa-navbar">
            <div className="sa-nav-left">
                <button
                    type="button"
                    className="sa-icon-button sa-only-mobile"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <Menu size={20} />
                </button>
                <GraduationCap className="sa-logo" size={24} />
                <p className="sa-brand">
                    GMRIT<span>Events</span>
                </p>
                <span className="sa-pill">{role}</span>
            </div>

            <div className="sa-nav-right">
                <div className="sa-theme-toggle">
                    <button
                        type="button"
                        className="sa-icon-button"
                        onClick={toggleTheme}
                        title={theme === "dark" ? "Switch to light" : "Switch to dark"}
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                </div>

                <div className="sa-icon-button-wrap">
                    <button type="button" className="sa-icon-button" aria-label="Notifications">
                        <Bell size={18} />
                    </button>
                </div>

                <div className="sa-profile">
                    <button type="button" className="sa-icon-button" aria-label="Profile">
                        <User size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default SharedNavbar;
