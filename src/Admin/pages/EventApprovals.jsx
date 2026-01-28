import React, { useState } from 'react';
import { Check, X as XIcon } from 'lucide-react';
import ConfirmationModal from '../components/ConfirmationModal';
import { eventsData } from '../data/dummyData';
import '../styles/EventApprovals.css';

const EventApprovals = () => {
    const [pendingEvents, setPendingEvents] = useState(
        eventsData.filter(e => e.status === 'Pending')
    );

    const [modalState, setModalState] = useState({
        isOpen: false,
        eventId: null,
        action: null // 'approve' or 'reject'
    });

    const openModal = (id, action) => {
        setModalState({ isOpen: true, eventId: id, action });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, eventId: null, action: null });
    };

    const handleConfirm = () => {
        // In a real app, API call here
        // For now, remove from the list
        setPendingEvents(prev => prev.filter(e => e.id !== modalState.eventId));
        closeModal();
        // Use setTimeout to ensure closing animation finishes or just simple alert
        // alert(`Event ${modalState.action}ed successfully!`);
    };

    return (
        <div className="approvals-container">
            <h2 className="page-title">Pending Approvals</h2>

            <div className="approvals-list-card card">
                {pendingEvents.length > 0 ? (
                    <div className="approvals-list">
                        {pendingEvents.map(event => (
                            <div key={event.id} className="approval-item">
                                <div className="event-info">
                                    <h3 className="event-title">{event.title}</h3>
                                    <div className="event-meta">
                                        <span>{event.date}</span> • <span>{event.organizer}</span>
                                    </div>
                                    <p className="event-desc">{event.description}</p>
                                </div>
                                <div className="approval-actions">
                                    <button
                                        className="action-btn reject"
                                        onClick={() => openModal(event.id, 'reject')}
                                    >
                                        <XIcon size={18} />
                                        Reject
                                    </button>
                                    <button
                                        className="action-btn approve"
                                        onClick={() => openModal(event.id, 'approve')}
                                    >
                                        <Check size={18} />
                                        Approve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No pending approvals found.</p>
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                title={modalState.action === 'approve' ? 'Approve Event' : 'Reject Event'}
                message={`Are you sure you want to ${modalState.action} this event? This action cannot be undone.`}
                type={modalState.action === 'approve' ? 'success' : 'danger'}
            />
        </div>
    );
};

export default EventApprovals;
