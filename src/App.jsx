import { Navigate, Route, Routes } from 'react-router-dom';
import StudentDashboard from './Student/StudentDashboard';
import MyEvents from './Student/MyEvents';
import SuperAdminDashboard from './SuperAdmin/SuperAdmindashboard';
import Main from './Home/main';
import Navbar from './Home/navbar';
import DomeGallery from './Home/globe/DomeGallery';
import AdminRoutes from './Admin/AdminRoutes';
function App() {
  return (
    <div className="container">
      {/* <Routes>
        <Route path="/" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/my-events" element={<MyEvents />} />
        <Route path="*" element={<Navigate to="/student/dashboard" replace />} />
      </Routes> */}
      <AdminRoutes></AdminRoutes>

      {/* <SuperAdminDashboard></SuperAdminDashboard> */}
        {/* <Main></Main> */}


      {/* <Navbar></Navbar>
        <Main></Main>
        <DomeGallery></DomeGallery> */}
    </div>
  );
}

export default App;






