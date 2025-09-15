



import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Forecasting from './components/Forecasting';
import DataPerWilayah from './components/DataPerWilayah';
import EWSPerBidang from './components/EWSPerBidang';
import SmartRecommendations from './components/SmartRecommendations';
import DataProcessing from './components/DataProcessing';
import InterventionManagement from './components/InterventionManagement';
import Placeholder from './components/Placeholder';
import { View, InterventionPlan, ActiveAlertData, AlertLevel, ActionItem } from './types';
import ResourceAllocation from './components/ResourceAllocation';
import InterventionFormModal from './components/interventions/InterventionFormModal';
import { mockInterventionPlans, regionsDetails, kabupatenKotaDetails, allActiveAlerts } from './services/mockData';
import LandingPage from './components/LandingPage';
import WelcomeScreen from './components/WelcomeScreen';
import Reports from './components/Reports';
import ParentDashboard from './components/ParentDashboard';
import InputData from './components/InputData';
import ToastNotification from './components/shared/ToastNotification';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  const [activeView, setActiveView] = useState<View>(View.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [interventionPlans, setInterventionPlans] = useState<InterventionPlan[]>(mockInterventionPlans);
  const [isInterventionModalOpen, setIsInterventionModalOpen] = useState(false);
  const [interventionInitialData, setInterventionInitialData] = useState<Partial<InterventionPlan> | null>(null);
  const [navigationContext, setNavigationContext] = useState<{ regionId: string; kabupatenKotaId?: string } | null>(null);
  const [toastAlert, setToastAlert] = useState<ActiveAlertData | null>(null);

  useEffect(() => {
    // This check runs only once on component mount
    if (sessionStorage.getItem('ceriaAppHasVisited')) {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
    setIsLoading(false);

    // Simulate receiving a high-priority alert after a delay
    const timer = setTimeout(() => {
        const highPriorityAlerts = allActiveAlerts.filter(
            a => a.level === AlertLevel.Critical || a.level === AlertLevel.High
        );
        if (highPriorityAlerts.length > 0) {
            const randomAlert = highPriorityAlerts[Math.floor(Math.random() * highPriorityAlerts.length)];
            setToastAlert(randomAlert);
        }
    }, 7000); // 7-second delay after app loads

    return () => clearTimeout(timer);
  }, []);

  const handleWelcomeComplete = () => {
    sessionStorage.setItem('ceriaAppHasVisited', 'true');
    setShowWelcome(false);
  };
  
  const handleLogout = () => {
      sessionStorage.removeItem('ceriaAppHasVisited');
      setActiveView(View.Dashboard); // Reset view to default for next login
      setShowWelcome(true);
  };

  const handleOpenInterventionModal = (initialData: Partial<InterventionPlan> | null = null, navigateToInterventions: boolean = false) => {
    setInterventionInitialData(initialData);
    setIsInterventionModalOpen(true);
    if (navigateToInterventions) {
      setActiveView(View.Intervensi);
    }
  };

  const handleCloseInterventionModal = () => {
    setIsInterventionModalOpen(false);
    setInterventionInitialData(null);
  };
  
  const handleNavigateToDashboard = () => {
    setActiveView(View.Dashboard);
  };

  const regionNameToIdMap = useMemo(() => {
    const map = new Map<string, { regionId: string, kabKotaId?: string }>();
    Object.values(regionsDetails).forEach(prov => {
      map.set(prov.name.toLowerCase(), { regionId: prov.id });
      prov.kabupatenKotaIds?.forEach(kabKotaId => {
        const kabKota = kabupatenKotaDetails[kabKotaId];
        if (kabKota) {
          map.set(kabKota.name.toLowerCase(), { regionId: prov.id, kabKotaId: kabKota.id });
        }
      });
    });
    return map;
  }, []);

  const handleNavigateToRegion = (regionName: string) => {
    const locationInfo = regionNameToIdMap.get(regionName.toLowerCase());
    if (locationInfo) {
      setNavigationContext({
        regionId: locationInfo.regionId,
        kabupatenKotaId: locationInfo.kabKotaId,
      });
      setActiveView(View.DataPerWilayah);
    } else {
      console.warn(`Region '${regionName}' not found for navigation.`);
      setActiveView(View.Dashboard);
    }
  };

  const handleSaveIntervention = (planData: Omit<InterventionPlan, 'id'> & { id?: string; actionItems: ActionItem[] }) => {
    setInterventionPlans(prevPlans => {
        // Check if it's an update by looking for an existing ID
        if (planData.id && prevPlans.some(p => p.id === planData.id)) {
            return prevPlans.map(p => 
                p.id === planData.id 
                ? { ...p, ...planData, id: p.id } // Merge data, ensure ID remains constant
                : p
            );
        } else {
            // It's a new plan, create it
            const newPlan: InterventionPlan = {
                ...planData,
                id: `plan-${Date.now()}`,
                actionItems: planData.actionItems || [],
            };
            return [newPlan, ...prevPlans];
        }
    });
    handleCloseInterventionModal();
};

  const handleCloseToast = () => {
    setToastAlert(null);
  };

  const handleToastNavigate = (regionName: string) => {
      handleNavigateToRegion(regionName);
      handleCloseToast();
  };

  const renderContent = () => {
    switch (activeView) {
      case View.LandingPage:
        return <LandingPage onNavigate={handleNavigateToDashboard} />;
      case View.Dashboard:
        return <Dashboard handleOpenInterventionModal={handleOpenInterventionModal} />;
      case View.Forecasting:
        return <Forecasting handleOpenInterventionModal={handleOpenInterventionModal} />;
      case View.DataPerWilayah:
        return <DataPerWilayah 
                    handleOpenInterventionModal={handleOpenInterventionModal}
                    navigationContext={navigationContext}
                    onContextHandled={() => setNavigationContext(null)}
                />;
      case View.EWSPerBidang:
        return <EWSPerBidang />;
      case View.SmartRecommendations:
        return <SmartRecommendations />;
       case View.Intervensi:
        return <InterventionManagement plans={interventionPlans} onOpenModal={handleOpenInterventionModal} />;
      case View.DataProcessing:
        return <DataProcessing />;
      case View.InputData:
        return <InputData />;
      case View.ResourceAllocation:
        return <ResourceAllocation />;
      case View.Reports:
        return <Reports />;
      case View.ParentDashboard:
        return <ParentDashboard />;
      default:
        return <Placeholder title={activeView} />;
    }
  };
  
  if (isLoading) {
    return <div className="fixed inset-0 bg-white" />; // Prevent flash of unstyled content
  }

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }


  return (
    <div className={`relative flex h-screen bg-slate-100 font-sans transition-opacity duration-500 ease-in-out opacity-100`}>
      <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView} 
          isOpen={isSidebarOpen} 
          setIsOpen={setIsSidebarOpen} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
              setIsSidebarOpen={setIsSidebarOpen} 
              onLogout={handleLogout} 
              setActiveView={setActiveView}
              onNavigateToRegion={handleNavigateToRegion}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 sm:p-6 print:bg-white print:p-0">
          {renderContent()}
          </main>
      </div>
      <InterventionFormModal
          isOpen={isInterventionModalOpen}
          onClose={handleCloseInterventionModal}
          onSave={handleSaveIntervention}
          initialData={interventionInitialData}
      />
      {toastAlert && (
          <ToastNotification
              alert={toastAlert}
              onClose={handleCloseToast}
              onNavigate={handleToastNavigate}
          />
      )}
    </div>
  );
};

export default App;