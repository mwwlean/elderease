import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Search, User } from "lucide-react"

const Navbar = ({ getImagePath, adminData, setIsAdminAuthenticated }) => {
  const navigate = useNavigate()
  const [showOptions, setShowOptions] = useState(false)
  const [notifOptions, setNotifOptions] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('adminFormData')
    localStorage.removeItem('isAdminAuthenticated')
    setIsAdminAuthenticated(false)
    navigate('/admin/login')
  }

  return (
    <nav className="w-full bg-white/60 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto px-6 flex items-center justify-between h-16">
        
        <div className="flex items-center gap-4">
          <img src="/img/imglogo.png" alt="Logo" className="h-12 w-12 object-contain rounded-full shadow" />
          <span className="text-2xl font-bold tracking-tight text-gray-800">
            ELDER <span className="text-purple-700">EASE</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition px-3 py-1.5 rounded-full shadow-inner">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            name="search_citizen"
            placeholder="Search Citizens..."
            className="bg-transparent outline-none w-48 sm:w-64 text-gray-700 placeholder-gray-400"
          />
        </div>
        
        <div className="flex items-center gap-5">
          {/* Notif */}
          <div className="relative">
            <button
              onClick={() => setNotifOptions((v) => !v)}
              className="relative p-2 rounded-full hover:bg-purple-100 transition"
              aria-label="Show notifications"
            >
              <Bell size={22} className="text-purple-700" />
              <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center h-4 w-4 text-[10px] font-bold bg-red-500 text-white rounded-full border-2 border-white">2</span>
            </button>
            {notifOptions && (
              <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl py-3 px-4 z-40 animate-fade-in-up border border-purple-100">
                <div className="mb-2 pb-2 border-b">
                  <h1 className="font-semibold text-gray-900">Notifications</h1>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Bell size={18} className="text-purple-700" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">System Update</div>
                      <div className="text-xs text-gray-500">Platform maintenance on <span className="font-medium">Oct 7, 2024</span></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Bell size={18} className="text-purple-700" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Important Notice</div>
                      <div className="text-xs text-gray-500">Please verify your account settings.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* User */}
          <div className="relative">
            <button
              onClick={() => setShowOptions((v) => !v)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-purple-100 transition focus:outline-none"
            >
              {adminData?.image ? (
                <img
                  src={getImagePath(adminData.image)}
                  alt="Admin Profile"
                  className="h-10 w-10 rounded-full object-cover border border-purple-300"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                  <User />
                </div>
              )}
              <span className="font-semibold text-gray-800 hidden sm:inline">{adminData?.firstname} {adminData?.surname}</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 8l4 4 4-4" stroke="#a21caf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-52 bg-white shadow-xl rounded-xl z-50 border border-purple-100 animate-fade-in-up">
                <Link to="/admin/accountsettings" className="block px-5 py-3 text-gray-700 hover:bg-purple-50">Account Settings</Link>
                <Link to="/admin/systemsettings" className="block px-5 py-3 text-gray-700 hover:bg-purple-50">System Settings</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-5 py-3 text-red-500 hover:bg-red-50 font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar