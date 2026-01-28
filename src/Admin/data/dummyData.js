export const eventsData = [
  {
    id: 1,
    title: "Annual Tech Fest 2026",
    date: "2026-03-15",
    time: "10:00 AM",
    venue: "Main Auditorium",
    category: "Technical",
    status: "Approved",
    organizer: "Computer Science Dept",
    description: "A grand technical fest featuring hackathons, workshops, and tech talks.",
    poster: "techfest.jpg",
    registrationLimit: 500
  },
  {
    id: 2,
    title: "Cultural Night",
    date: "2026-04-20",
    time: "06:00 PM",
    venue: "Open Air Theatre",
    category: "Cultural",
    status: "Pending",
    organizer: "Student Council",
    description: "An evening of music, dance, and drama performances.",
    poster: "cultural.jpg",
    registrationLimit: 1000
  },
  {
    id: 3,
    title: "Alumni Meet",
    date: "2026-02-10",
    time: "11:00 AM",
    venue: "Conference Hall",
    category: "Networking",
    status: "Approved",
    organizer: "Alumni Association",
    description: "Reconnect with seniors and build professional networks.",
    poster: "alumni.jpg",
    registrationLimit: 200
  },
  {
    id: 4,
    title: "Robotics Workshop",
    date: "2026-03-01",
    time: "09:00 AM",
    venue: "Lab Block B",
    category: "Technical",
    status: "Rejected",
    organizer: "Robotics Club",
    description: "Hands-on workshop on building autonomous line follower robots.",
    poster: "robotics.jpg",
    registrationLimit: 50
  },
  {
    id: 5,
    title: "Sports Day",
    date: "2026-01-25",
    time: "08:00 AM",
    venue: "Sports Ground",
    category: "Sports",
    status: "Approved",
    organizer: "Sports Department",
    description: "Inter-departmental sports competitions.",
    poster: "sports.jpg",
    registrationLimit: 300
  }
];

export const usersData = [
  { id: 1, name: "Admin User", role: "Super Admin", email: "admin@college.edu", avatar: "admin.png" },
  { id: 2, name: "Event Coordinator", role: "Organizer", email: "coord@college.edu", avatar: "user1.png" }
];

export const summaryStats = {
  totalEvents: 12,
  activeEvents: 5,
  registeredStudents: 1250,
  pendingApprovals: 2
};

export const recentRegistrations = [
  { id: 101, studentName: "John Doe", rollNo: "CS21001", eventName: "Annual Tech Fest 2026", date: "2026-01-05", status: "Confirmed" },
  { id: 102, studentName: "Jane Smith", rollNo: "ECE21045", eventName: "Cultural Night", date: "2026-01-06", status: "Pending" },
  { id: 103, studentName: "Mike Ross", rollNo: "ME21022", eventName: "Sports Day", date: "2026-01-04", status: "Confirmed" },
  { id: 104, studentName: "Rachel Zane", rollNo: "CS21055", eventName: "Annual Tech Fest 2026", date: "2026-01-06", status: "Confirmed" }
];
