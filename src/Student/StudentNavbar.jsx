
function StudentNavbar({ theme = "light", onToggleTheme, sidebarOpen = false, onToggleSidebar }) {
    return (
        <nav className="navbar">
            <div className="nav-left">
                <button
                    type="button"
                    className="icon-button only-mobile"
                    aria-label="Toggle sidebar"
                    onClick={() => onToggleSidebar && onToggleSidebar()}
                >
                    <i className={`fa-solid ${sidebarOpen ? "fa-xmark" : "fa-bars"}`}></i>
                </button>
                <i className="fa-solid fa-graduation-cap logo"></i>
                <p className="brand">
                    GMRIT<span>Events</span>
                </p>
                <span className="brand-pill">Student</span>
            </div>
            <div className="nav-right">
                <div className="theme-toggle">
                    <button
                        type="button"
                        aria-label="Toggle color theme"
                        title={theme === "dark" ? "Switch to light" : "Switch to dark"}
                        onClick={() => onToggleTheme && onToggleTheme()}
                    >
                        <i className={theme === "dark" ? "fa-regular fa-sun" : "fa-regular fa-moon"}></i>
                    </button>
                </div>
                <div className="notify-icon">
                    <button type="button" aria-label="Notifications">
                        <i className="fa-regular fa-bell"></i>
                    </button>
                </div>
                <div className="profile">
                    <button type="button" aria-label="Profile">
                        <i className="fa-regular fa-user"></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default StudentNavbar;
