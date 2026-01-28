import React, { useState, useEffect } from 'react';
import { Menu, Bell, Moon, Sun, ChevronDown, GraduationCap } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = ({ toggleSidebar }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    return (
        <header className="navbar">
            <div className="nav-left">
                <button className="icon-button only-mobile" onClick={toggleSidebar} aria-label="Toggle sidebar">
                    <Menu size={20} />
                </button>

                <div className="brand-mark">
                    <GraduationCap className="logo" size={24} />
                    <p className="brand">
                        GMRIT<span>Events</span>
                    </p>
                    <span className="brand-pill">Admin</span>
                </div>
            </div>

            <div className="nav-right">
                <button className="nav-icon-btn" onClick={() => setDarkMode(!darkMode)} title="Toggle Dark Mode" aria-label="Toggle theme">
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <button className="nav-icon-btn" aria-label="Notifications">
                    <Bell size={18} />
                    <span className="badge"></span>
                </button>

                <div className="profile-dropdown" role="button" tabIndex={0}>
                    <div className="avatar">AD</div>
                    <div className="profile-info">
                        <span className="profile-name">Admin User</span>
                        <span className="profile-role">Super Admin</span>
                    </div>
                    <ChevronDown size={16} className="text-secondary" />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
