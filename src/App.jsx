import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { ProtectedUser, ProtectedAdmin } from './components/ProtectedRoute';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import Attractions from './pages/Attractions';
import Gallery from './pages/Gallery';
import Events from './pages/Events';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import ParkPage from './pages/parks/ParkPage';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AboutUs />} />
        <Route path="home" element={<Home />} />
        <Route path="attractions" element={<Attractions />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="events" element={<Events />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        <Route path="park/:parkId" element={<ParkPage />} />
        <Route path="login/:type" element={<Login />} />
        <Route path="dashboard" element={<ProtectedUser><UserDashboard /></ProtectedUser>} />
        <Route path="admin" element={<ProtectedAdmin><AdminDashboard /></ProtectedAdmin>} />
      </Route>
    </Routes>
  );
}

export default App;
