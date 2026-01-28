import React from 'react';
import '../styles/RecentEventsTable.css';

const RecentEventsTable = ({ events }) => {
    return (
        <div className="recent-events-container card">
            <h3 className="section-title">Recent Events</h3>
            <div className="table-responsive">
                <table className="recent-events-table">
                    <thead>
                        <tr>
                            <th>Event Title</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>
                                    <span className={`status-badge ${event.status.toLowerCase()}`}>
                                        {event.status}
                                    </span>
                                </td>
                                <td>{event.category}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentEventsTable;
