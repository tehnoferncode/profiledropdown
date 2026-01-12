import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, clearCurrentUser, setCurrentUser } from "../auth/authStore";
import "../styles/profileDropdown.css";

export default function ProfileMenuDropdown() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const boxRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Click outside to close
  useEffect(() => {
    const onDocClick = (e) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // ✅ ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ✅ Update label if role changed elsewhere (localStorage)
  useEffect(() => {
    const onStorage = () => setUser(getCurrentUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const switchRoleQuick = (role) => {
    const updated = { ...getCurrentUser(), role };
    setCurrentUser(updated);
    setUser(updated);
    setOpen(false);
  };

  const logout = () => {
    clearCurrentUser();
    setOpen(false);
    // Demo behavior: after logout, set default user again so app doesn't break
    setCurrentUser({ name: "Demo User", role: "User" });
    navigate("/role-dashboard");
  };

  return (
    <div className="pdd" ref={boxRef}>
      <button className="pdd-btn" onClick={() => setOpen((p) => !p)} type="button">
        <span className="pdd-avatar">👤</span>
        <span className="pdd-meta">
          <span className="pdd-name">{user?.name || "User"}</span>
          <span className="pdd-role">{user?.role || "User"}</span>
        </span>
        <span className={`pdd-caret ${open ? "up" : ""}`}>▾</span>
      </button>

      {open && (
        <div className="pdd-menu">
          <div className="pdd-head">
            <div className="pdd-headTitle">Signed in as</div>
            <div className="pdd-headName">{user?.name || "User"}</div>
            <div className="pdd-headRole">{user?.role || "User"}</div>
          </div>

          <div className="pdd-sep" />

          <Link className="pdd-item" to="/settings" onClick={() => setOpen(false)}>
            ⚙️ Settings
          </Link>
          <Link className="pdd-item" to="/role-dashboard" onClick={() => setOpen(false)}>
            📊 Dashboard
          </Link>

          <div className="pdd-sep" />

          {/* Quick role switch for demo (optional but useful) */}
          <div className="pdd-miniTitle">Quick Role Switch</div>
          <button className="pdd-itemBtn" onClick={() => switchRoleQuick("Admin")}>🔐 Admin</button>
          <button className="pdd-itemBtn" onClick={() => switchRoleQuick("Seller")}>🛒 Seller</button>
          <button className="pdd-itemBtn" onClick={() => switchRoleQuick("User")}>👤 User</button>

          <div className="pdd-sep" />

          <button className="pdd-itemBtn danger" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
}
