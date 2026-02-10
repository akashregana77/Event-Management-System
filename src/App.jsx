import { Route, Routes } from 'react-router-dom';
import StudentDashboard from './Student/StudentDashboard';
import MyEvents from './Student/MyEvents';
import SuperAdminDashboard from './SuperAdmin/SuperAdmindashboard';
import Main from './Home/main';
import Navbar from './Home/navbar';
import DomeGallery from './Home/globe/DomeGallery';
import AdminRoutes from './Admin/AdminRoutes';

function Home() {
  return (
    <>
      <Navbar />
      <Main />
      <DomeGallery />
    </>
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
    </Routes>
  );
}

export default App;


