import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/index.css';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ManageEvents from './pages/ManageEvents';
import CreateEvent from './pages/CreateEvent';
import EventApprovals from './pages/EventApprovals';
import Registrations from './pages/Registrations';


function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="create-event" element={<CreateEvent />} />
          <Route path="approvals" element={<EventApprovals />} />
          <Route path="registrations" element={<Registrations />} />
          <Route path="users" element={<div>Users</div>} />
          <Route path="reports" element={<div>Reports</div>} />
          <Route path="settings" element={<div>Settings</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AdminRoutes;
