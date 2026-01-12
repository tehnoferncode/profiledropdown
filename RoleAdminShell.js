import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import RoleSidebarNav from "../navigation/RoleSidebarNav";
import "../styles/roleSidebar.css";
import ProfileMenuDropdown from "../components/ProfileMenuDropdown";

function RoleAdminShell() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // close on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // esc close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="r-shell">
      <div
        className={`r-overlay ${open ? "show" : ""}`}
        onClick={() => setOpen(false)}
      />

      <RoleSidebarNav isOpen={open} onClose={() => setOpen(false)} />

      <div className="r-main">
        <header className="r-top">
          {/* ✅ LEFT */}
          <div className="r-topLeft">
            <button className="r-menuBtn" onClick={() => setOpen(true)}>
              ☰
            </button>
            <div className="r-topTitle">Role Based Admin Panel</div>
          </div>

          {/* ✅ RIGHT (Force right corner) */}
          <div className="r-topRight">
            <ProfileMenuDropdown />
          </div>
        </header>

        <div className="r-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RoleAdminShell;
