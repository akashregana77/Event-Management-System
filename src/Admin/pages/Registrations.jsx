import React, { useState } from 'react';
import { Download, Search } from 'lucide-react';
import { recentRegistrations } from '../data/dummyData';
import '../styles/Registrations.css';

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
        <div className="registrations-container">
            <div className="page-header">
                <h2 className="page-title">Registrations</h2>
                <button className="btn btn-outline export-btn" onClick={handleExport}>
                    <Download size={18} />
                    Export CSV
                </button>
            </div>

            <div className="registrations-card card">
                <div className="table-controls">
                    <div className="search-box">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search by student, roll no, or event..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="registrations-table">
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
                                filteredData.map(reg => (
                                    <tr key={reg.id}>
                                        <td className="font-medium">{reg.studentName}</td>
                                        <td>{reg.rollNo}</td>
                                        <td>{reg.eventName}</td>
                                        <td>{reg.date}</td>
                                        <td>
                                            <span className={`status-badge ${reg.status.toLowerCase()}`}>
                                                {reg.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="no-data">No registrations found</td>
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
