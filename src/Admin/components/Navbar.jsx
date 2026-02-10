import React from 'react';
import { Menu, Bell, Moon, Sun, ChevronDown, GraduationCap } from 'lucide-react';
// import '../styles/Navbar.css'; // Deprecated in favor of AdminTheme.css

const Navbar = ({ toggleSidebar, sidebarOpen, theme, toggleTheme }) => {
    return (
        <header className="sa-navbar">
            <div className="sa-nav-left">
                <button
                    type="button"
                    className="sa-icon-button sa-only-mobile"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    {sidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
                </button>
                {/* Note: In SuperAdmin, the logo/brand is in the nav-left, not sidebar. 
                    If we want to match SuperAdmin exactly, we should put it here.
                    The original AdminSidebar had the brand. 
                    Let's follow SuperAdmin pattern and put it here. */}
                <GraduationCap className="sa-logo" size={24} />
                <p className="sa-brand">
                    GMRIT<span>Events</span>
                </p>
                <span className="sa-pill">Admin</span>
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
                    {/* Keep existing profile structure but maybe style it? 
                         SuperAdmin just used an icon. Let's keep the user detailed view if possible 
                         or simplify to match SuperAdmin. 
                         SuperAdmin: 
                         <div className="sa-profile">
                            <button type="button" className="sa-icon-button" aria-label="Profile">
                                <i className="fa-solid fa-user-shield"></i>
                            </button>
                        </div>
                        
                        Admin had:
                        <div className="profile-dropdown">...</div>

                        I will wrap the Admin profile in a way that fits, or just stick to the icon to perfectly match "UI like same as superadmin".
                        "i want ui like same as superadmin".
                        I'll switch to the icon button for consistency, maybe keep the dropdown functionality later if needed.
                        For now, visual parity is the goal.
                     */}
                    <button type="button" className="sa-icon-button" aria-label="Profile">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>AD</span>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
