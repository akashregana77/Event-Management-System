import React from 'react';
// import '../styles/DashboardChart.css'; // Deprecated

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

    // Refactored to match SuperAdmin simple styling or just keep bar chart but standardise container
    // We'll keep the logic but remove the card wrapper and title as they are in Dashboard.jsx now
    return (
        <div style={{ padding: '20px', display: 'flex', alignItems: 'flex-end', gap: '20px', height: '250px' }}>
            {data.map((item, index) => (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <div
                        style={{
                            width: '100%',
                            background: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
                            borderRadius: '8px',
                            height: `${(item.value / maxValue) * 100}%`,
                            minHeight: '4px',
                            opacity: 0.85,
                            transition: 'all 0.3s ease'
                        }}
                        title={`${item.value} Events`}
                    ></div>
                    <span style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: '600' }}>{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default DashboardChart;
