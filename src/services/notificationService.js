/**
 * Mock Notification Service — centralized notification store.
 * Notifications are generated when admins create events needing SuperAdmin approval.
 */

let notifications = [
    {
        id: 1,
        type: 'event_approval',
        eventId: 5,
        title: 'New Event Pending Approval',
        message: 'Robotics Workshop needs your review',
        eventTitle: 'Robotics Workshop',
        organizer: 'Robotics Club',
        category: 'Workshop',
        date: 'March 01, 2026',
        venue: 'Lab Block B',
        status: 'unread',
        actionTaken: null,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    },
    {
        id: 2,
        type: 'event_approval',
        eventId: 7,
        title: 'New Event Pending Approval',
        message: 'Cybersecurity Bootcamp needs your review',
        eventTitle: 'Cybersecurity Bootcamp',
        organizer: 'CSI',
        category: 'Technical',
        date: 'March 25, 2026',
        venue: 'Seminar Hall',
        status: 'unread',
        actionTaken: null,
        createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
    },
    {
        id: 3,
        type: 'event_approval',
        eventId: 8,
        title: 'New Event Pending Approval',
        message: 'Cultural Night 2026 needs your review',
        eventTitle: 'Cultural Night 2026',
        organizer: 'Cultural Club',
        category: 'Cultural',
        date: 'April 20, 2026',
        venue: 'Open Air Theatre',
        status: 'unread',
        actionTaken: null,
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(), // 10 min ago
    },
];

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

/** Listeners that get called whenever notifications change */
const listeners = new Set();

function notifyListeners() {
    listeners.forEach((fn) => fn([...notifications]));
}

/** Subscribe to notification changes — returns an unsubscribe function */
export function subscribeNotifications(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

export async function getNotifications() {
    await delay();
    return [...notifications].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getUnreadCount() {
    return notifications.filter((n) => n.status === 'unread' && !n.actionTaken).length;
}

export async function markAsRead(id) {
    await delay(100);
    notifications = notifications.map((n) =>
        n.id === Number(id) ? { ...n, status: 'read' } : n
    );
    notifyListeners();
    return true;
}

export async function markAllAsRead() {
    await delay(100);
    notifications = notifications.map((n) => ({ ...n, status: 'read' }));
    notifyListeners();
    return true;
}

export async function setNotificationAction(id, action) {
    await delay(100);
    notifications = notifications.map((n) =>
        n.id === Number(id) ? { ...n, actionTaken: action, status: 'read' } : n
    );
    notifyListeners();
    return notifications.find((n) => n.id === Number(id));
}

/** Called when an admin creates a new event — generates a notification for SuperAdmin */
export async function addEventApprovalNotification(event) {
    await delay(100);
    const newNotif = {
        id: Date.now(),
        type: 'event_approval',
        eventId: event.id,
        title: 'New Event Pending Approval',
        message: `${event.title} needs your review`,
        eventTitle: event.title,
        organizer: event.organizer || 'Unknown',
        category: event.category || event.type || 'General',
        date: event.date || 'TBD',
        venue: event.venue || event.location || 'TBD',
        status: 'unread',
        actionTaken: null,
        createdAt: new Date().toISOString(),
    };
    notifications = [newNotif, ...notifications];
    notifyListeners();
    return newNotif;
}
