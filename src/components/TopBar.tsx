import React, { useState, useEffect } from 'react';
import { FiSearch, FiBell, FiSun, FiMoon } from 'react-icons/fi'; // Icons for theme switcher

const TopBar: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check the initial theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Toggle theme function
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md">
      <div className="hidden md:block text-lg font-bold text-gray-900 dark:text-white">Dashboard</div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white focus:outline-none"
        />
        <FiSearch className="text-gray-500 dark:text-gray-300" size={20} />
        <FiBell className="text-gray-500 dark:text-gray-300" size={20} />
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full focus:outline-none"
        >
          {isDarkMode ? <FiMoon className="text-yellow-400" /> : <FiSun className="text-yellow-500" />}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
