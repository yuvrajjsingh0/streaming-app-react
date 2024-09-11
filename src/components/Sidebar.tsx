import { useState } from 'react';
import { FiHome, FiBarChart2, FiSettings, FiUser } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`md:flex flex-col ${isOpen ? 'w-64' : 'w-16'} transition-width duration-300 bg-gray-800 text-white h-full hidden`}>
      <div className="flex items-center justify-between p-4">
        {isOpen && <div className="text-lg font-bold">Streamify</div> }
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          ☰
        </button>
      </div>
      <nav className="flex flex-col gap-4 p-4">
        <a href="#" className="flex items-center gap-2">
          <FiHome size={20} /> {isOpen && <span>Dashboard</span>}
        </a>
        <a href="#" className="flex items-center gap-2">
          <FiBarChart2 size={20} /> {isOpen && <span>Analytics</span>}
        </a>
        <a href="#" className="flex items-center gap-2">
          <FiSettings size={20} /> {isOpen && <span>Settings</span>}
        </a>
        <a href="#" className="flex items-center gap-2 mt-auto">
          <FiUser size={20} /> {isOpen && <span>Profile</span>}
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
