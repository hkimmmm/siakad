// Navbar.js
import React, { useState } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiSearch, FiBell, FiMessageSquare } from 'react-icons/fi';

const Navbar = ({ toggleSidebar }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-gray-100 text-white border-b-2 p-4 flex justify-between items-center relative">
      {/* Tombol Hamburger */}
      <button aria-label="Menu" className="ml-2" onClick={toggleSidebar}>
        <GiHamburgerMenu className="w-6 h-6 cursor-pointer text-black" />
      </button>

      <div className="relative flex-1 mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-50 px-3 py-2 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-gray-900"
          aria-label="Search"
        />
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <div className="flex items-center space-x-4 ">
        <button aria-label="Notifications">
          <FiBell className="w-6 h-6 cursor-pointer hover:text-gray-300 text-black" />
        </button>
        <button aria-label="Chat">
          <FiMessageSquare className="w-6 h-6 cursor-pointer hover:text-gray-300 md:mr-5 text-black" />
        </button>
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            aria-label="Profile"
          >
            <img
              src="/assets/images/profile.jpg"
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          </button>
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-gray-700 z-10">
              <div className="p-4 border-b bg-blue-400">
                <p className="font-medium">John Doe</p>
              </div>
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Settings
              </Link>
              <Link
                href="/logout"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
