import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import VerifyOtp from './pages/VerifyOtp';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify' element={<VerifyOtp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/user' element={<ProtectedRoute><UserDashboard/></ProtectedRoute>} />
        <Route path='/dashboard/admin' element={<ProtectedRoute><AdminDashboard/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}