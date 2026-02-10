import React from 'react';
import { Link } from 'react-router-dom'; // Assuming we might want a link
// import '../styles/RecentEventsTable.css'; // Deprecated

const RecentEventsTable = ({ events }) => {
    return (
        <div className="sa-card glass">
            <div className="sa-card-header">
                <h3>Recent Events</h3>
                <Link to="/admin/events" className="sa-text-link">View all →</Link>
            </div>
            <div className="sa-table-wrapper">
                <table className="sa-data-table">
                    <thead>
                        <tr>
                            <th>Event Title</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, idx) => (
                            <tr key={event.id} className="hover-row animate-stagger" style={{ animationDelay: `${idx * 60}ms` }}>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>
                                    <span className={`sa-tag ${event.status === 'Approved' ? 'sa-tag-open' : event.status === 'Pending' ? 'sa-tag-closed' : ''}`}>
                                        {/* Mapping 'Approved' -> open style, 'Pending' -> closed/warning style equivalent. 
                                        SuperAdmin has 'Open' and 'Closed'. 
                                        Let's reuse sa-tag-open for positive/neutral and sa-tag-closed for negative?
                                        Actually SuperAdmin CSS has:
                                        .sa-tag-open (blue)
                                        .sa-tag-closed (red)
                                        
                                        For 'Approved', blue/green is good.
                                        For 'Pending', yellow/orange is better but isn't in SuperAdmin CSS explicitly.
                                        I might need to add .sa-tag-pending to AdminTheme.css if I want yellow.
                                        
                                        For now I will just use sa-tag-open for Approved and leave Pending plain or use inline style.
                                        Let's use sa-tag-open for Approved.
                                    */}
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
