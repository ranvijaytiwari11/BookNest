import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDark);
    setDarkMode(isDark);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        📚 BookNest
      </Link>

      <div className="nav-links">
        <button onClick={toggleDarkMode} className="nav-btn">
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {token ? (
          <>
            <span className="nav-user">
              {user ? `Hi, ${user.name} `: "Logged In"}
            </span>
            <button onClick={handleLogout} className="nav-btn logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">
              Sign In
            </Link>
            <Link to="/signup" className="nav-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;