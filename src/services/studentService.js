/**
 * Mock Student Service — CRUD operations for student management.
 */

let students = [
    { id: 1, name: "John Doe", email: "john@student.edu", rollNo: "CS21001", department: "CSE", year: "3rd", status: "active", registeredEvents: 3, joinedOn: "Aug 01, 2021" },
    { id: 2, name: "Jane Smith", email: "jane@student.edu", rollNo: "ECE21045", department: "ECE", year: "3rd", status: "active", registeredEvents: 5, joinedOn: "Aug 01, 2021" },
    { id: 3, name: "Mike Ross", email: "mike@student.edu", rollNo: "ME21022", department: "MECH", year: "3rd", status: "active", registeredEvents: 2, joinedOn: "Aug 01, 2021" },
    { id: 4, name: "Rachel Zane", email: "rachel@student.edu", rollNo: "CS21055", department: "CSE", year: "3rd", status: "suspended", registeredEvents: 4, joinedOn: "Aug 01, 2021" },
    { id: 5, name: "Harvey Specter", email: "harvey@student.edu", rollNo: "IT21010", department: "IT", year: "4th", status: "active", registeredEvents: 6, joinedOn: "Aug 01, 2020" },
    { id: 6, name: "Donna Paulsen", email: "donna@student.edu", rollNo: "CSE22003", department: "CSE", year: "2nd", status: "active", registeredEvents: 1, joinedOn: "Aug 01, 2022" },
    { id: 7, name: "Louis Litt", email: "louis@student.edu", rollNo: "ECE22018", department: "ECE", year: "2nd", status: "active", registeredEvents: 3, joinedOn: "Aug 01, 2022" },
    { id: 8, name: "Jessica Pearson", email: "jessica@student.edu", rollNo: "ME20015", department: "MECH", year: "4th", status: "active", registeredEvents: 7, joinedOn: "Aug 01, 2020" },
];

let registrations = [
    { id: 1, studentId: 1, eventId: 1, eventTitle: "AI Bootcamp", registeredOn: "Jan 02, 2024", status: "registered" },
    { id: 2, studentId: 1, eventId: 2, eventTitle: "UI/UX Workshop", registeredOn: "Dec 18, 2023", status: "completed" },
    { id: 3, studentId: 1, eventId: 3, eventTitle: "Robotics Expo", registeredOn: "Dec 10, 2023", status: "registered" },
    { id: 4, studentId: 2, eventId: 1, eventTitle: "AI Bootcamp", registeredOn: "Jan 03, 2024", status: "registered" },
    { id: 5, studentId: 2, eventId: 4, eventTitle: "Annual Tech Fest 2026", registeredOn: "Jan 06, 2024", status: "registered" },
    { id: 6, studentId: 3, eventId: 6, eventTitle: "Sports Day", registeredOn: "Jan 04, 2024", status: "registered" },
    { id: 7, studentId: 5, eventId: 1, eventTitle: "AI Bootcamp", registeredOn: "Jan 05, 2024", status: "completed" },
    { id: 8, studentId: 5, eventId: 2, eventTitle: "UI/UX Workshop", registeredOn: "Jan 06, 2024", status: "registered" },
];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function getAllStudents() {
    await delay();
    return [...students];
}

export async function getStudentById(id) {
    await delay(200);
    return students.find((s) => s.id === Number(id)) || null;
}

export async function getStudentRegistrations(studentId) {
    await delay(200);
    if (studentId) {
        return registrations.filter((r) => r.studentId === Number(studentId));
    }
    return [...registrations];
}

export async function suspendStudent(id) {
    await delay(300);
    students = students.map((s) =>
        s.id === Number(id) ? { ...s, status: s.status === "active" ? "suspended" : "active" } : s
    );
    return students.find((s) => s.id === Number(id));
}

export async function deleteStudent(id) {
    await delay(300);
    students = students.filter((s) => s.id !== Number(id));
    registrations = registrations.filter((r) => r.studentId !== Number(id));
    return true;
}

export async function getStudentStats() {
    await delay(200);
    return {
        total: students.length,
        active: students.filter((s) => s.status === "active").length,
        suspended: students.filter((s) => s.status === "suspended").length,
        totalRegistrations: registrations.length,
    };
}
