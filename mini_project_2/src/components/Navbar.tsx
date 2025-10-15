import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Mangalist</Link>
      </div>
      <div className="flex-none gap-2">
        <NavLink to="/" className="btn btn-ghost">Home</NavLink>
        <NavLink to="/seasonal" className="btn btn-ghost">Seasonal Manga</NavLink>
        <NavLink to="/favorites" className="btn btn-ghost">Favorites</NavLink>
        <NavLink to="/about" className="btn btn-ghost">About</NavLink>
      </div>
    </div>
  );
}