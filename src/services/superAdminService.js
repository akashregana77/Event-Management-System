/**
 * Mock SuperAdmin Service — analytics and system-wide data.
 */

import { getEventStats } from './eventService';
import { getStudentStats } from './studentService';
import { getAllAdmins } from './adminService';

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function getAnalytics() {
    await delay(400);
    const [eventStats, studentStats, admins] = await Promise.all([
        getEventStats(),
        getStudentStats(),
        getAllAdmins(),
    ]);

    return {
        totalUsers: studentStats.total + admins.length + 1, // +1 for superadmin
        totalAdmins: admins.length,
        activeAdmins: admins.filter((a) => a.status === "active").length,
        totalStudents: studentStats.total,
        activeStudents: studentStats.active,
        suspendedStudents: studentStats.suspended,
        totalEvents: eventStats.total,
        approvedEvents: eventStats.approved,
        pendingEvents: eventStats.pending,
        rejectedEvents: eventStats.rejected,
        totalRegistrations: eventStats.totalRegistrations,
        studentRegistrations: studentStats.totalRegistrations,
    };
}

export async function getMonthlyData() {
    await delay(200);
    return [
        { month: "Jan", events: 4, registrations: 120 },
        { month: "Feb", events: 6, registrations: 210 },
        { month: "Mar", events: 8, registrations: 340 },
        { month: "Apr", events: 3, registrations: 150 },
        { month: "May", events: 5, registrations: 280 },
        { month: "Jun", events: 7, registrations: 390 },
    ];
}
