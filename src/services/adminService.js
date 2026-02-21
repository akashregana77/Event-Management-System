/**
 * Mock Admin Service — CRUD operations for admin user management.
 */

let admins = [
    { id: 1, name: "Anita Rao", email: "anita@college.edu", role: "Lead Admin", department: "CSE", clubName: "Computer Science Club", status: "active", joinedOn: "Jan 10, 2023" },
    { id: 2, name: "Vikram Patel", email: "vikram@college.edu", role: "Event Manager", department: "ECE", clubName: "Robotics Club", status: "active", joinedOn: "Mar 15, 2023" },
    { id: 3, name: "Sara Thomas", email: "sara@college.edu", role: "Finance", department: "MECH", clubName: "MESA", status: "active", joinedOn: "Jun 22, 2023" },
    { id: 4, name: "Rahul Sharma", email: "rahul@college.edu", role: "Coordinator", department: "CSE", clubName: "CSI Student Chapter", status: "inactive", joinedOn: "Aug 05, 2023" },
    { id: 5, name: "Priya Menon", email: "priya@college.edu", role: "Event Manager", department: "IT", clubName: "Cultural Club", status: "active", joinedOn: "Nov 18, 2023" },
];

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms));

export async function getAllAdmins() {
    await delay();
    return [...admins];
}

export async function getAdminById(id) {
    await delay(200);
    return admins.find((a) => a.id === Number(id)) || null;
}

export async function createAdmin(data) {
    await delay(400);
    const newAdmin = { ...data, id: Date.now(), status: "active", joinedOn: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) };
    admins = [newAdmin, ...admins];
    return newAdmin;
}

export async function updateAdmin(id, updates) {
    await delay(300);
    admins = admins.map((a) => (a.id === Number(id) ? { ...a, ...updates } : a));
    return admins.find((a) => a.id === Number(id));
}

export async function deleteAdmin(id) {
    await delay(300);
    admins = admins.filter((a) => a.id !== Number(id));
    return true;
}

export async function toggleAdminStatus(id) {
    await delay(300);
    admins = admins.map((a) =>
        a.id === Number(id) ? { ...a, status: a.status === "active" ? "inactive" : "active" } : a
    );
    return admins.find((a) => a.id === Number(id));
}
