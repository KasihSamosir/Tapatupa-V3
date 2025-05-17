import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; 
import JenisPermohonan from './pages/Jenispermohonan';
import PermohonanSewa from './pages/PermohonanSewa';
import WajibRetribusi from './pages/WajibRetribusi';
import ObjekRetribusi from './pages/ObjekRetribusi';
import LokasiObjekRetribusi from './pages/LokasiObjekRetribusi';
import JenisObjekRetribusi from './pages/JenisObjekRetribusi';
import TarifObjekRetribusi from './pages/TarifObjekRetribusi';
import JenisJangkaWaktu from './pages/JenisJangkaWaktu';
import JangkaWaktuSewa from './pages/JangkaWaktuSewa';
import PeruntukanSewa from './pages/PeruntukanSewa';
import JenisStatus from './pages/JenisStatus';
import StatusPermohonan from './pages/StatusPermohonan';
import AdminLogin from './components/AdminLogin';
import './App.css'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Jenis-permohonan" element={<Layout><JenisPermohonan /></Layout>} />
        <Route path="/permohonan-sewa" element={<Layout><PermohonanSewa /></Layout>} />
        <Route path="/wajib-retribusi" element={<Layout><WajibRetribusi /></Layout>} />
        <Route path="/objek-retribusi" element={<Layout><ObjekRetribusi /></Layout>} />
        <Route path="/lokasi-objek-retribusi" element={<Layout><LokasiObjekRetribusi /></Layout>} />
        <Route path="/jenis-objek-retribusi" element={<Layout><JenisObjekRetribusi /></Layout>} />
        <Route path="/tarif-objek-retribusi" element={<Layout><TarifObjekRetribusi /></Layout>} />
        <Route path="/jenis-jangka-waktu" element={<Layout><JenisJangkaWaktu /></Layout>} />
        <Route path="/jangka-waktu-sewa" element={<Layout><JangkaWaktuSewa /></Layout>} />
        <Route path="/peruntukan-sewa" element={<Layout><PeruntukanSewa /></Layout>} />
        <Route path="/jenis-status" element={<Layout><JenisStatus /></Layout>} />
        <Route path="/status-permohonan" element={<Layout><StatusPermohonan /></Layout>} />
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;