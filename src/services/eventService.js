/**
 * Mock Event Service — centralized event data and CRUD operations.
 * Replace with real API calls when backend is ready.
 */

let events = [
    {
        id: 1,
        title: "National Hackathon 2024",
        type: "Technical",
        description: "24-hour coding competition to solve real-world problems.",
        club: "Computer Science Club",
        date: "January 15, 2024",
        time: "9:00 AM - 9:00 AM",
        location: "Main Auditorium",
        venue: "Main Auditorium",
        category: "Technical",
        status: "Approved",
        organizer: "Computer Science Dept",
        registered: "156 / 200",
        registrationLimit: 200,
        registeredCount: 156,
    },
    {
        id: 2,
        title: "Cultural Fest — Rhythm 2024",
        type: "Cultural",
        description: "Music, dance, drama, and art performances across campus.",
        club: "Cultural Committee",
        date: "February 20-22, 2024",
        time: "10:00 AM - 8:00 PM",
        location: "College Grounds",
        venue: "Open Air Theatre",
        category: "Cultural",
        status: "Approved",
        organizer: "Student Council",
        registered: "450 / 500",
        registrationLimit: 500,
        registeredCount: 450,
    },
    {
        id: 3,
        title: "AI/ML Workshop",
        type: "Workshop",
        description: "Hands-on ML workshop using Python and TensorFlow.",
        club: "AI/ML Society",
        date: "January 25, 2024",
        time: "2:00 PM - 6:00 PM",
        location: "Computer Lab 3",
        venue: "Computer Lab 3",
        category: "Technical",
        status: "Approved",
        organizer: "AI/ML Society",
        registered: "48 / 50",
        registrationLimit: 50,
        registeredCount: 48,
        spotsLeft: 2,
    },
    {
        id: 4,
        title: "Annual Tech Fest 2026",
        type: "Technical",
        description: "A grand technical fest featuring hackathons, workshops, and tech talks.",
        club: "Computer Science Club",
        date: "March 15, 2026",
        time: "10:00 AM",
        location: "Main Auditorium",
        venue: "Main Auditorium",
        category: "Technical",
        status: "Approved",
        organizer: "Computer Science Dept",
        registered: "320 / 500",
        registrationLimit: 500,
        registeredCount: 320,
    },
    {
        id: 5,
        title: "Robotics Workshop",
        type: "Workshop",
        description: "Hands-on workshop on building autonomous line follower robots.",
        club: "Robotics Club",
        date: "March 01, 2026",
        time: "9:00 AM",
        location: "Lab Block B",
        venue: "Lab Block B",
        category: "Technical",
        status: "Pending",
        organizer: "Robotics Club",
        registered: "30 / 50",
        registrationLimit: 50,
        registeredCount: 30,
    },
    {
        id: 6,
        title: "Sports Day",
        type: "Sports",
        description: "Inter-departmental sports competitions across all categories.",
        club: "Sports Department",
        date: "January 25, 2026",
        time: "8:00 AM",
        location: "Sports Ground",
        venue: "Sports Ground",
        category: "Sports",
        status: "Approved",
        organizer: "Sports Department",
        registered: "200 / 300",
        registrationLimit: 300,
        registeredCount: 200,
    },
    {
        id: 7,
        title: "Cybersecurity Bootcamp",
        type: "Technical",
        description: "Learn ethical hacking and penetration testing techniques.",
        club: "CSI",
        date: "March 25, 2026",
        time: "10:00 AM",
        location: "Seminar Hall",
        venue: "Seminar Hall",
        category: "Technical",
        status: "Pending",
        organizer: "CSI",
        registered: "0 / 100",
        registrationLimit: 100,
        registeredCount: 0,
    },
    {
        id: 8,
        title: "Cultural Night 2026",
        type: "Cultural",
        description: "Music, dance, and drama performances by students.",
        club: "Cultural Club",
        date: "April 20, 2026",
        time: "6:00 PM",
        location: "Open Air Theatre",
        venue: "Open Air Theatre",
        category: "Cultural",
        status: "Pending",
        organizer: "Cultural Club",
        registered: "0 / 1000",
        registrationLimit: 1000,
        registeredCount: 0,
    },
];

/** Simulate async delay */
const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

/** Pub/sub — listeners get called whenever events data changes */
const eventListeners = new Set();
function notifyEventListeners() {
    eventListeners.forEach((fn) => fn());
}

/** Subscribe to event changes — returns an unsubscribe function */
export function subscribeEvents(callback) {
    eventListeners.add(callback);
    return () => eventListeners.delete(callback);
}

export async function getAllEvents() {
    await delay();
    return [...events];
}

export async function getEventById(id) {
    await delay(200);
    return events.find((e) => e.id === Number(id)) || null;
}

export async function createEvent(eventData) {
    await delay(400);
    const newEvent = { ...eventData, id: Date.now(), status: "Pending", registeredCount: 0 };
    events = [newEvent, ...events];
    notifyEventListeners();
    return newEvent;
}

export async function updateEvent(id, updates) {
    await delay(300);
    events = events.map((e) => (e.id === Number(id) ? { ...e, ...updates } : e));
    notifyEventListeners();
    return events.find((e) => e.id === Number(id));
}

export async function deleteEvent(id) {
    await delay(300);
    events = events.filter((e) => e.id !== Number(id));
    notifyEventListeners();
    return true;
}

export async function approveEvent(id) {
    return updateEvent(id, { status: "Approved" });
}

export async function rejectEvent(id) {
    return updateEvent(id, { status: "Rejected" });
}

export async function getPendingEvents() {
    await delay();
    return events.filter((e) => e.status === "Pending");
}

export async function getEventStats() {
    await delay(200);
    return {
        total: events.length,
        approved: events.filter((e) => e.status === "Approved").length,
        pending: events.filter((e) => e.status === "Pending").length,
        rejected: events.filter((e) => e.status === "Rejected").length,
        totalRegistrations: events.reduce((a, e) => a + (e.registeredCount || 0), 0),
    };
}
