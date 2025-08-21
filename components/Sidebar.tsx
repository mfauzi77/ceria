
import React from 'react';
import { NAVIGATION_ITEMS, SUB_NAVIGATION_ITEMS, PERSONAL_NAVIGATION_ITEMS } from '../constants';
import { NavItem, View } from '../types';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isOpen, setIsOpen }) => {
  const NavLink: React.FC<{ item: NavItem }> = ({ item }) => {
    const isActive = activeView === item.id;
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setActiveView(item.id);
          setIsOpen(false);
        }}
        className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-indigo-600 text-white shadow-lg'
            : 'text-gray-600 hover:bg-slate-200'
        }`}
      >
        <span className="mr-3">{item.icon}</span>
        {item.label}
      </a>
    );
  };

  return (
    <>
    {/* Overlay for mobile */}
    <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
    ></div>

    <aside className={`fixed lg:relative inset-y-0 left-0 w-64 flex-shrink-0 bg-white shadow-lg flex flex-col p-4 z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
      <div className="flex items-center mb-6 px-2">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Seal_of_the_Coordinating_Ministry_of_Human_Developments_and_Culture_of_the_Republic_of_Indonesia.svg" alt="Logo Kemenko PMK" className="h-12 w-12 mr-3"/>
        <div className="text-gray-800">
            <p className="font-bold text-sm">KEMENKO PMK</p>
            <p className="text-xs text-gray-500">CERIA</p>
        </div>
      </div>
      <nav className="flex-1 flex flex-col justify-between">
        <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Main Menu</h3>
            <div className="space-y-1">
                {NAVIGATION_ITEMS.map((item) => (
                <NavLink key={item.id} item={item} />
                ))}
            </div>
            <h3 className="px-4 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Actions</h3>
            <div className="space-y-1">
                {SUB_NAVIGATION_ITEMS.map((item) => (
                <NavLink key={item.id} item={item} />
                ))}
            </div>
            {PERSONAL_NAVIGATION_ITEMS.length > 0 && (
                <>
                    <h3 className="px-4 mt-6 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Personal</h3>
                    <div className="space-y-1">
                        {PERSONAL_NAVIGATION_ITEMS.map((item) => (
                            <NavLink key={item.id} item={item} />
                        ))}
                    </div>
                </>
            )}
        </div>
        <div className="p-4 bg-slate-100 rounded-lg text-center">
            <h4 className="font-bold text-sm text-slate-800">Need Help?</h4>
            <p className="text-xs text-slate-600 mt-1 mb-3">Check our documentation or contact support.</p>
            <button className="w-full bg-indigo-600 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                Contact Us
            </button>
        </div>
      </nav>
    </aside>
    </>
  );
};

export default Sidebar;