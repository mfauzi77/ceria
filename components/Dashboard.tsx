import React, { useState, useEffect, useMemo } from 'react';
import { DOMAIN_FILTER_ITEMS } from '../constants';
import { allActiveAlerts, keyIndicatorsByDomain, regionsDetails } from '../services/mockData';
import { getExecutiveBriefing } from '../services/geminiService';
import NationalRiskOverview from './dashboard/RiskAssessment';
import KeyHealthIndicators from './dashboard/KeyHealthIndicators';
import ActiveAlerts from './dashboard/ActiveAlerts';
import ExecutiveBriefing from './dashboard/ExecutiveBriefing';
import RecommendationModal from './dashboard/RecommendationModal';
import { ActiveAlertData, DomainFilter, KeyIndicatorData, InterventionPlan, InterventionPriority, InterventionStatus } from '../types';

interface DashboardProps {
    handleOpenInterventionModal: (initialData?: Partial<InterventionPlan>, navigate?: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ handleOpenInterventionModal }) => {
    const [activeDomain, setActiveDomain] = useState<DomainFilter>('Semua');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<ActiveAlertData | null>(null);

    const [briefing, setBriefing] = useState<string | null>(null);
    const [isBriefingLoading, setIsBriefingLoading] = useState(true);
    const [briefingError, setBriefingError] = useState<string | null>(null);

    const filteredIndicators = useMemo((): KeyIndicatorData[] => {
        return keyIndicatorsByDomain[activeDomain];
    }, [activeDomain]);

    const filteredAlerts = useMemo((): ActiveAlertData[] => {
        if (activeDomain === 'Semua') {
            return allActiveAlerts;
        }
        return allActiveAlerts.filter(alert => alert.domain === activeDomain);
    }, [activeDomain]);

    const dynamicRegionalRiskScores = useMemo(() => {
        const allRegionsData = Object.values(regionsDetails);
        if (activeDomain === 'Semua') {
            return allRegionsData.map(r => ({ name: r.name, score: r.overallRisk }));
        }
        return allRegionsData.map(r => ({
            name: r.name,
            score: r.domains[activeDomain].riskScore
        }));
    }, [activeDomain]);


    const fetchBriefing = async () => {
        setIsBriefingLoading(true);
        setBriefingError(null);
        try {
            const result = await getExecutiveBriefing(activeDomain, filteredIndicators, filteredAlerts);
            setBriefing(result);
        } catch (err) {
            setBriefingError('Gagal memuat ringkasan AI.');
        } finally {
            setIsBriefingLoading(false);
        }
    };

    useEffect(() => {
        fetchBriefing();
    }, [activeDomain]);


    const handleAnalyzeClick = (alert: ActiveAlertData) => {
        setSelectedAlert(alert);
        setIsModalOpen(true);
    };
    
    const handleCreatePlanFromAlert = (alert: ActiveAlertData) => {
        const initialData: Partial<InterventionPlan> = {
            title: `Rencana Intervensi untuk ${alert.title} di ${alert.region}`,
            description: `Menindaklanjuti alert "${alert.title}" dengan skor risiko ${alert.riskScore}.`,
            region: alert.region,
            domain: alert.domain,
            priority: alert.level === 'CRITICAL' || alert.level === 'HIGH' ? InterventionPriority.High : InterventionPriority.Medium,
            relatedAlertId: alert.id,
            status: InterventionStatus.Planning
        };
        handleOpenInterventionModal(initialData, true);
    }


    const DomainSelector: React.FC = () => (
        <div className="bg-white p-2 rounded-lg shadow-sm flex items-center justify-start space-x-1 overflow-x-auto">
            {DOMAIN_FILTER_ITEMS.map(item => {
                const isActive = activeDomain === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => setActiveDomain(item.id as DomainFilter)}
                        className={`flex items-center px-3 py-2 sm:px-4 text-sm font-medium rounded-md transition-colors duration-200 whitespace-nowrap ${
                            isActive
                                ? 'bg-indigo-600 text-white shadow'
                                : 'text-gray-600 hover:bg-slate-200'
                        }`}
                    >
                        <span className="mr-2">{item.icon}</span>
                        {item.name}
                    </button>
                )
            })}
        </div>
    );

    return (
        <div className="space-y-6">
            <DomainSelector />
            
            <ExecutiveBriefing 
                isLoading={isBriefingLoading}
                briefing={briefing}
                error={briefingError}
                onRegenerate={fetchBriefing}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                   <NationalRiskOverview data={dynamicRegionalRiskScores} />
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <KeyHealthIndicators data={filteredIndicators} domain={activeDomain} />
                </div>
            </div>
            
            <ActiveAlerts data={filteredAlerts} onAnalyze={handleAnalyzeClick} onCreatePlan={() => handleOpenInterventionModal({}, true)} />
            
            {selectedAlert && (
                 <RecommendationModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    alert={selectedAlert}
                    onCreatePlan={handleCreatePlanFromAlert}
                 />
            )}
        </div>
    );
};

export default Dashboard;