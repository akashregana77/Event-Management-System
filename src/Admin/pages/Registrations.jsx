import React, { useState } from 'react';
import { Download, Search } from 'lucide-react';
import { recentRegistrations } from '../data/dummyData';
// import '../styles/Registrations.css'; // Deprecated

const Registrations = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Generating more dummy data for demonstration
    const [registrations] = useState([
        ...recentRegistrations,
        { id: 105, studentName: "Alice Cooper", rollNo: "CS21099", eventName: "Robotics Workshop", date: "2026-01-08", status: "Confirmed" },
        { id: 106, studentName: "Bob Marley", rollNo: "ME21056", eventName: "Sports Day", date: "2026-01-09", status: "Cancelled" },
        { id: 107, studentName: "Charlie Puth", rollNo: "EE21012", eventName: "Cultural Night", date: "2026-01-10", status: "Pending" },
    ]);

    const handleExport = () => {
        alert("Exporting registration data to CSV...");
    };

    const filteredData = registrations.filter(reg =>
        reg.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="sa-dashboard-content">
            <div className="sa-card-header" style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Registrations</h2>
                <button className="ghost-btn" onClick={handleExport}>
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            <div className="sa-card glass" style={{ marginBottom: '20px', padding: '16px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div className="search-box" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: 'var(--card)',
                        border: '1px solid var(--border)',
                        padding: '8px 12px',
                        borderRadius: '10px',
                        flex: 1,
                        maxWidth: '400px'
                    }}>
                        <Search size={18} color="var(--muted)" />
                        <input
                            type="text"
                            placeholder="Search by student, roll no, or event..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                width: '100%',
                                color: 'var(--text)',
                                fontSize: '14px'
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="sa-card glass">
                <div className="sa-table-wrapper">
                    <table className="sa-data-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Roll Number</th>
                                <th>Event Name</th>
                                <th>Registration Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((reg, idx) => (
                                    <tr key={reg.id} className="hover-row animate-stagger" style={{ animationDelay: `${idx * 50}ms` }}>
                                        <td style={{ fontWeight: '600' }}>{reg.studentName}</td>
                                        <td>{reg.rollNo}</td>
                                        <td>{reg.eventName}</td>
                                        <td>{reg.date}</td>
                                        <td>
                                            <span className={`sa-tag ${reg.status === 'Confirmed' ? 'sa-tag-open' : reg.status === 'Cancelled' ? 'sa-tag-closed' : ''}`}>
                                                {reg.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: 'var(--muted)' }}>No registrations found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Registrations;
