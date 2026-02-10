import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./AdminSidebar";
import SharedNavbar from "../../components/SharedNavbar";
import "../styles/AdminTheme.css";

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem("admin-theme") || "light");

    useEffect(() => {
        const isDark = theme === "dark";
        document.body.classList.toggle("theme-dark", isDark);
        localStorage.setItem("admin-theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    return (
        <div className="sa-page">
            <SharedNavbar
                role="Admin"
                toggleSidebar={() => setSidebarOpen((prev) => !prev)}
                sidebarOpen={sidebarOpen}
                theme={theme}
                toggleTheme={toggleTheme}
            />

            <div className="sa-dashboard-layout">
                <Sidebar
                    isOpen={sidebarOpen}
                    closeSidebar={() => setSidebarOpen(false)}
                />

                {sidebarOpen && <div className="sa-backdrop" onClick={() => setSidebarOpen(false)}></div>}

                <main className="sa-dashboard-main">
                    <Outlet context={{ theme }} />
                </main>
            </div>
        </div>
    );
};

export default Layout;
