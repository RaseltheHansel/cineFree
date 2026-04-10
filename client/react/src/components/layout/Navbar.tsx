import { NavLink } from 'react-router-dom'

export const Navbar = () => (
  <header className="nav">
    <div className="brand">
      <span className="brand-mark">O</span>
      <div>
        <p className="brand-name">ReelSphere</p>
        <p className="brand-tag">Global Cinema Radar</p>
      </div>
    </div>
    <nav className="nav-links">
      <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
        Home
      </NavLink>
      <NavLink
        to="/discover"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Discover
      </NavLink>
      <NavLink
        to="/search"
        className={({ isActive }) => (isActive ? 'active' : '')}
      >
        Search
      </NavLink>
    </nav>
    <div className="nav-actions">
      <button className="button ghost">Join Waitlist</button>
      <button className="button primary">Start Browsing</button>
    </div>
  </header>
)
