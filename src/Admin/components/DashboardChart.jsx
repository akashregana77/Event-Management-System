import React from 'react';
import '../styles/DashboardChart.css';

const DashboardChart = () => {
    // Dummy data for monthly events
    const data = [
        { label: 'Jan', value: 4 },
        { label: 'Feb', value: 2 },
        { label: 'Mar', value: 8 },
        { label: 'Apr', value: 6 },
        { label: 'May', value: 5 },
        { label: 'Jun', value: 3 },
    ];

    const maxValue = Math.max(...data.map(d => d.value));

    return (
        <div className="chart-container card">
            <h3 className="chart-title">Events Overview</h3>
            <div className="chart-area">
                {data.map((item, index) => (
                    <div key={index} className="chart-bar-group">
                        <div
                            className="chart-bar"
                            style={{ height: `${(item.value / maxValue) * 100}%` }}
                            title={`${item.value} Events`}
                        >
                            <span className="tooltip">{item.value} Events</span>
                        </div>
                        <span className="chart-label">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardChart;
