import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdInventory2,
  MdShoppingCart,
  MdBarChart,
  MdMenu,
  MdClose,
} from "react-icons/md";

const navItems = [
  { label: "Dashboard", icon: MdDashboard, to: "/" },
  { label: "Stock Management", icon: MdInventory2, to: "/stock" },
  { label: "New Order", icon: MdShoppingCart, to: "/create-order" },
  { label: "Sales", icon: MdBarChart, to: "/sales" },
];

const user = {
  name: "Noor Ul Huddah",
  role: "Student",
  initials: "UR",
};

function NavItem({ item, collapsed }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.to === "/"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative
        ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        }
        ${collapsed ? "justify-center" : ""}`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`flex-shrink-0 text-xl transition-colors ${
              isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
            }`}
          />
          {!collapsed && <span className="truncate">{item.label}</span>}
          {collapsed && (
            <div className="absolute left-full ml-3 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
              {item.label}
            </div>
          )}
        </>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      <div className={`flex items-center gap-2 px-4 pt-5 pb-6 ${collapsed && !mobile ? "justify-center px-2" : ""}`}>
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <MdDashboard className="text-white text-lg" />
        </div>
        {(!collapsed || mobile) && (
          <div>
            <div className="text-base font-bold text-gray-900 leading-tight">StockPro</div>
            <div className="text-xs text-gray-400 leading-tight">Inventory Control</div>
          </div>
        )}
      </div>

      <nav className={`flex-1 px-3 space-y-0.5 ${collapsed && !mobile ? "px-2" : ""}`}>
        {navItems.map((item) => (
          <NavItem key={item.to} item={item} collapsed={collapsed && !mobile} />
        ))}
      </nav>

      <div className={`pb-4 px-3 space-y-0.5 ${collapsed && !mobile ? "px-2" : ""}`}>
        <hr className="border-gray-100 mb-3" />

        <div className={`flex items-center gap-3 px-3 py-2.5 mt-1 ${collapsed && !mobile ? "justify-center px-0" : ""}`}>
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 ring-2 ring-white">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-xs font-semibold text-blue-600">{user.initials}</span>
            )}
          </div>
          {(!collapsed || mobile) && (
            <div className="min-w-0">
              <div className="text-sm font-semibold text-gray-800 truncate">{user.name}</div>
              <div className="text-xs text-gray-400 truncate">{user.role}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <MdMenu className="text-xl text-gray-600" />
      </button>

      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-50 shadow-xl transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        >
          <MdClose className="text-lg" />
        </button>
        <SidebarContent mobile />
      </aside>

      <aside
        className={`hidden lg:flex flex-col h-screen sticky top-0 bg-white border-r border-gray-100 transition-all duration-300 flex-shrink-0
        ${collapsed ? "w-[68px]" : "w-56"}`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 z-10"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className={`w-3 h-3 text-gray-400 transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <SidebarContent />
      </aside>
    </>
  );
}