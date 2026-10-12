import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Compass, Menu, Search, Sun, Moon, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const links = [
  ["/", "Home"], ["/destinations", "Destinations"], ["/planner", "Trip planner"],
  ["/guides", "Travel guides"], ["/gallery", "Gallery"], ["/about", "About"]
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { darkMode, toggleDarkMode} = useTheme();
  const location = useLocation();
  return <div className={darkMode ? "site dark-mode" : "site"}>
    <header className="navbar">
      <Link to="/" className="brand"><span className="brand-mark"><Compass size={22}/></span><span>travel<span className="brand-light">sphere</span><small>FIND YOUR SOMEWHERE</small></span></Link>
      <button className="mobile-menu icon-button" aria-label="Toggle menu" onClick={() => setOpen(v => !v)}><Menu size={21}/></button>
      <nav className={open ? "nav-links nav-open" : "nav-links"}>
        {links.map(([to, label]) => <NavLink key={to} to={to} end={to === "/"} onClick={() => setOpen(false)}>{label}</NavLink>)}
        <Link className="nav-admin" to="/admin" onClick={() => setOpen(false)}>Admin <ArrowUpRight size={14}/></Link>
      </nav>
      <button
  className="icon-button theme-toggle"
  onClick={toggleDarkMode}
  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
  title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
>
  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
</button>
    </header>
    <main key={location.pathname}><Outlet/></main>
    <footer className="footer">
      <div className="footer-top"><div className="brand footer-brand"><span className="brand-mark"><Compass size={22}/></span><span>travel<span className="brand-light">sphere</span><small>FIND YOUR SOMEWHERE</small></span></div><p>The world is wide. Make room for wonder.</p><Link to="/destinations">Find your next place <ArrowUpRight size={16}/></Link></div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} TravelSphere · A travel discovery project</span><span>Made for curious minds, everywhere.</span></div>
    </footer>
  </div>;
}
