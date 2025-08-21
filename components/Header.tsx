
import React, { useState, useEffect, useRef } from 'react';
import { UserCircleIcon, ArrowLeftOnRectangleIcon, CalendarIcon, BellAlertIcon } from './icons/Icons';
import { View, ActiveAlertData, AlertLevel } from '../types';
import { allActiveAlerts } from '../services/mockData';
import NotificationDropdown from './header/NotificationDropdown';


interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
  onLogout: () => void;
  setActiveView: (view: View) => void;
  onNavigateToRegion: (regionName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen, onLogout, setActiveView, onNavigateToRegion }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const highPriorityAlerts = allActiveAlerts.filter(
    alert => alert.level === AlertLevel.Critical || alert.level === AlertLevel.High
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationNavigate = (view: View) => {
    setActiveView(view);
    setIsNotificationsOpen(false);
  };

  const handleNotificationRegionNavigate = (regionName: string) => {
    onNavigateToRegion(regionName);
    setIsNotificationsOpen(false);
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center z-10 border-b border-slate-200">
      <div className="flex items-center">
         <button onClick={() => setIsSidebarOpen(true)} className="text-slate-500 mr-4 lg:hidden" aria-label="Open sidebar">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-800">CERIA (Cerdas, Efektif, Responsif, Inovatif, Akurat)</h1>
          <p className="text-xs sm:text-sm text-slate-500">Sistem Pendukung Keputusan Cerdas untuk Pemerataan Layanan PAUD HI</p>
          <div className="flex items-center text-xs text-slate-500 font-medium mt-1.5">
            <CalendarIcon className="w-4 h-4 mr-1.5 text-slate-400" />
            <span>Data diproses per 30 Juni 2024</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="relative" ref={notificationsRef}>
            <button 
                className="relative" 
                aria-label="Notifications"
                onClick={() => setIsNotificationsOpen(prev => !prev)}
                aria-expanded={isNotificationsOpen}
            >
                {highPriorityAlerts.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
                )}
                <BellAlertIcon className="h-6 w-6 text-slate-500 hover:text-slate-700" />
            </button>
            {isNotificationsOpen && (
              <NotificationDropdown
                alerts={highPriorityAlerts}
                onNavigate={handleNotificationNavigate}
                onNavigateToRegion={handleNotificationRegionNavigate}
              />
            )}
        </div>
        <div className="relative" ref={profileMenuRef}>
          <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="flex items-center" aria-expanded={isProfileMenuOpen} aria-haspopup="true">
            <img
              src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
              alt="User Avatar"
              className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover ring-2 ring-offset-2 ring-transparent group-hover:ring-indigo-500 transition-all"
            />
            <div className="ml-2 md:ml-3 text-right hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">Hai, Administrator</p>
            </div>
          </button>
          
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-20" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                <UserCircleIcon className="w-5 h-5 mr-2 text-gray-500"/>
                Profil
              </a>
              <button
                onClick={onLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                role="menuitem"
              >
                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2 text-red-500" />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;