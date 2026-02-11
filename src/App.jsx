import { Route, Routes } from 'react-router-dom';
import StudentDashboard from './Student/StudentDashboard';
import MyEvents from './Student/MyEvents';
import SuperAdminDashboard from './SuperAdmin/SuperAdmindashboard';
import Main from './Home/main';
import Navbar from './Home/navbar';
import DomeGallery from './Home/globe/DomeGallery';
import AdminRoutes from './Admin/AdminRoutes';
import Events from './Events/components/Events';
import EventDetails from './Events/components/EventDetails';
import Clubs from './Home/Bodies/clubs';
import './Home/HomePage.css';

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <Main />
      <div className="home-section-divider">
        <span className="divider-dot" />
      </div>
      <DomeGallery />
      <div className="home-section-divider">
        <span className="divider-dot" />
      </div>
      <Clubs />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/my-events" element={<MyEvents />} />
      <Route path="/superadmin" element={<SuperAdminDashboard />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetails />} />
    </Routes>
  );
}

export default App;


