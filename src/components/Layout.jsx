import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main className="main" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
