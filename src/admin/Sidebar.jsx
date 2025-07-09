import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Landmark,
  CreditCard,
  ShieldCheck,
  UserCog,
} from "lucide-react";

const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors
   ${
     isActive
       ? "bg-purple-100 text-purple-700"
       : "text-gray-700 hover:bg-purple-50 hover:text-purple-700"
   }`;

const subLinkClasses = ({ isActive }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
   ${
     isActive
       ? "bg-purple-50 text-purple-700"
       : "text-gray-600 hover:bg-purple-50 hover:text-purple-700"
   }`;

const Sidebar = () => {
  return (
    <aside className="fixed w-72 bg-white border-r border-gray-200 flex flex-col py-6 px-4">
      <nav className="flex-1 flex flex-col gap-2">
        <NavLink to="/admin/dashboard" className={linkClasses}>
          <LayoutDashboard size={22} className="shrink-0" />
          Dashboard
        </NavLink>

        <NavLink to="/admin/scchapter" className={linkClasses}>
          <Users size={22} className="shrink-0" />
          Senior Citizen Management
        </NavLink>

        <NavLink to="/admin/paymentmanagement" className={linkClasses}>
          <CreditCard size={22} className="shrink-0" />
          Payment Management
        </NavLink>

        <div className="mt-5 mb-1 px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          System Utilities
        </div>
        <div className="flex flex-col gap-1 pl-2">
          <NavLink to="/admin/changeaccuser" className={subLinkClasses}>
            <ShieldCheck size={20} />
            Change User Access Level
          </NavLink>
          <NavLink to="/admin/changeofficers" className={subLinkClasses}>
            <UserCog size={20} />
            Change Officers
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
