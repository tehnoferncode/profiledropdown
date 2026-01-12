# React Profile Dropdown (Right-Aligned) – Admin Panel

This project demonstrates a **professional profile dropdown menu**
implemented in a React **admin panel topbar**, aligned perfectly to the
**right corner**, just like real-world dashboards.

The dropdown supports **click-outside close**, **ESC key close**, and
works smoothly with a **responsive sidebar layout**.

---

## 🚀 Features

- Profile dropdown in topbar (right aligned)
- Click outside to close dropdown
- ESC key support to close
- Shows user name & role
- Quick role switch (Demo purpose)
- Logout option
- Responsive & clean UI
- No external UI libraries used

---

## 🌍 Real-World Use Case

This pattern is used in almost every real admin panel:
- Admin dashboards
- SaaS products
- CRM systems
- E-commerce admin panels

Typical actions inside profile dropdown:
- View profile
- Settings
- Switch role (admin/demo)
- Logout

---

## 📂 File Structure

src/
├── layout/
│ └── RoleAdminShell.js
│
├── components/
│ └── ProfileMenuDropdown.js
│
├── auth/
│ └── authStore.js
│
└── styles/
├── roleSidebar.css
└── profileDropdown.css
