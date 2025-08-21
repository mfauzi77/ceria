import React from 'react';
import { ActiveAlertData, AlertLevel, View } from '../../types';

interface NotificationDropdownProps {
    alerts: ActiveAlertData[];
    onNavigate: (view: View) => void;
    onNavigateToRegion: (regionName: string) => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ alerts, onNavigate, onNavigateToRegion }) => {

    const getLevelDotColor = (level: AlertLevel): string => {
        switch (level) {
            case AlertLevel.Critical: return 'bg-red-700';
            case AlertLevel.High: return 'bg-red-500';
            default: return 'bg-orange-500';
        }
    };

    const handleAllAlertsNavigation = () => {
        // Navigate to the dashboard where all alerts are visible
        onNavigate(View.Dashboard);
    }
    
    // Show top 5 alerts
    const displayedAlerts = alerts.slice(0, 5);

    return (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-20">
            <div className="p-4 border-b border-slate-200">
                <h3 className="text-base font-semibold text-slate-800">Notifikasi</h3>
            </div>
            
            <ul className="py-2 max-h-80 overflow-y-auto">
                {displayedAlerts.length > 0 ? (
                    displayedAlerts.map(alert => (
                        <li key={alert.id}>
                            <a 
                                href="#" 
                                onClick={(e) => { e.preventDefault(); onNavigateToRegion(alert.region); }} 
                                className="flex items-start px-4 py-3 hover:bg-slate-50 transition-colors"
                            >
                                <span className={`flex-shrink-0 w-2.5 h-2.5 mt-1.5 rounded-full ${getLevelDotColor(alert.level)}`}></span>
                                <div className="ml-3">
                                    <p className="text-sm font-semibold text-slate-800">{alert.title}</p>
                                    <p className="text-sm text-slate-500">{alert.region} - {alert.domain}</p>
                                </div>
                            </a>
                        </li>
                    ))
                ) : (
                    <li className="px-4 py-8 text-center text-sm text-slate-500">
                        Tidak ada notifikasi penting saat ini.
                    </li>
                )}
            </ul>

            <div className="p-2 border-t border-slate-200 bg-slate-50 rounded-b-lg">
                <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); handleAllAlertsNavigation(); }} 
                    className="block text-center text-sm font-semibold text-indigo-600 hover:text-indigo-800 py-2"
                >
                    Lihat Semua Alert
                </a>
            </div>
        </div>
    );
};

export default NotificationDropdown;