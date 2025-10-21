import React, { useState, useEffect, useMemo } from 'react';
import { getAvailableRegions, getRegionDetails, nationalHistoricalRisk, allActiveAlerts, domainsData, kabupatenKotaDetails } from '../services/mockData';
import { getRegionalAnalysisInsight } from '../services/geminiService';
import { RegionDetailData, ActiveAlertData, InterventionPlan, InterventionPriority, InterventionStatus, Domain, KabupatenKotaDetailData } from '../types';
import RegionSummary from './dataperwilayah/RegionSummary';
import DomainBreakdown from './dataperwilayah/DomainBreakdown';
import ActiveAlerts from './dashboard/ActiveAlerts';
import RecommendationModal from './dashboard/RecommendationModal';
import RegionalAnalysisInsight from './dataperwilayah/RegionalAnalysisInsight';
import RegionalProfileRadarChart from './dataperwilayah/RegionalProfileRadarChart';
import RegionalForecastTrendChart, { ForecastTrendPoint } from './dataperwilayah/RegionalForecastTrendChart';
import KabupatenKotaList from './dataperwilayah/KabupatenKotaList';
import { ArrowRightIcon } from './icons/Icons';

interface DataPerWilayahProps {
    handleOpenInterventionModal: (initialData?: Partial<InterventionPlan>, navigate?: boolean) => void;
    navigationContext: { regionId: string; kabupatenKotaId?: string } | null;
    onContextHandled: () => void;
}

const DataPerWilayah: React.FC<DataPerWilayahProps> = ({ handleOpenInterventionModal, navigationContext, onContextHandled }) => {
    const [regions, setRegions] = useState<{id: string, name: string}[]>([]);
    const [selectedRegionId, setSelectedRegionId] = useState<string>('');
    const [selectedKabupatenKotaId, setSelectedKabupatenKotaId] = useState<string | null>(null);
    const [regionData, setRegionData] = useState<RegionDetailData | null>(null);
    const [regionalAlerts, setRegionalAlerts] = useState<ActiveAlertData[]>([]);
    const [kabupatenKotaData, setKabupatenKotaData] = useState<KabupatenKotaDetailData[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<ActiveAlertData | null>(null);

    const [insight, setInsight] = useState<string | null>(null);
    const [isInsightLoading, setIsInsightLoading] = useState(false);
    const [insightError, setInsightError] = useState<string | null>(null);

    // Effect for handling external navigation context
    useEffect(() => {
        if (navigationContext) {
            if (selectedRegionId !== navigationContext.regionId) {
                setSelectedRegionId(navigationContext.regionId);
            }
            setSelectedKabupatenKotaId(navigationContext.kabupatenKotaId || null);
            window.scrollTo(0, 0);
            onContextHandled();
        }
    }, [navigationContext]);

    // Effect for initializing component and loading regions list
    useEffect(() => {
        const availableRegions = getAvailableRegions();
        setRegions(availableRegions);
        if (availableRegions.length > 0 && !selectedRegionId) {
            const defaultRegion = availableRegions.find(r => r.id === 'jawa-barat') || availableRegions[0];
            setSelectedRegionId(defaultRegion.id);
        }
    }, []);

    const fetchInsight = async (data: RegionDetailData | KabupatenKotaDetailData) => {
        if (!data) return;
        setIsInsightLoading(true);
        setInsightError(null);
        try {
            const result = await getRegionalAnalysisInsight(data as RegionDetailData);
            setInsight(result);
        } catch (err) {
            setInsightError('Gagal memuat analisis AI.');
        } finally {
            setIsInsightLoading(false);
        }
    };

    // Effect for fetching data when selected PROVINCE changes
    useEffect(() => {
        if (selectedRegionId) {
            const data = getRegionDetails(selectedRegionId);
            setRegionData(data);
            
            // Check if the current city is valid for the new province, reset if not
            const currentCityIsValid = data?.kabupatenKotaIds?.includes(selectedKabupatenKotaId || '');
            if (!currentCityIsValid) {
                setSelectedKabupatenKotaId(null);
            }
            
            if (data) {
                const subRegionNames = data.kabupatenKotaIds?.map(id => kabupatenKotaDetails[id]?.name).filter(Boolean) || [];
                const alerts = allActiveAlerts.filter(a => a.region === data.name || subRegionNames.includes(a.region));
                setRegionalAlerts(alerts);

                const subRegionData = data.kabupatenKotaIds
                    ?.map(id => kabupatenKotaDetails[id])
                    .filter((d): d is KabupatenKotaDetailData => !!d) || [];
                setKabupatenKotaData(subRegionData);
            } else {
                setRegionalAlerts([]);
                setKabupatenKotaData([]);
            }
        }
    }, [selectedRegionId]);
    
    // --- START: DERIVED STATE & HANDLERS FOR KABUPATEN/KOTA VIEW ---
    const handleSelectKabupatenKota = (id: string) => {
        window.scrollTo(0, 0); // Scroll to top for better UX
        setSelectedKabupatenKotaId(id);
    };

    const handleBackToProvince = () => {
        setSelectedKabupatenKotaId(null);
    };

    const selectedKabupatenKota = useMemo(() => {
        if (!selectedKabupatenKotaId) return null;
        return kabupatenKotaData.find(k => k.id === selectedKabupatenKotaId) ?? null;
    }, [selectedKabupatenKotaId, kabupatenKotaData]);

    // Effect for fetching INSIGHT when the view changes (province or city)
    useEffect(() => {
        if (selectedKabupatenKota) {
            fetchInsight(selectedKabupatenKota);
        } else if (regionData) {
            fetchInsight(regionData);
        }
    }, [selectedKabupatenKota, regionData]);


    const kabupatenKotaAlerts = useMemo(() => {
        if (!selectedKabupatenKota) return [];
        return allActiveAlerts.filter(a => a.region === selectedKabupatenKota.name);
    }, [selectedKabupatenKota]);

    const { regionalProfile: provinceProfile, nationalProfile } = useMemo(() => {
        const regional: { axis: Domain; value: number }[] = [];
        const national: { axis: Domain; value: number }[] = [];

        if (regionData) {
            (Object.keys(regionData.domains) as Domain[]).forEach(domainKey => {
                regional.push({ axis: domainKey, value: regionData.domains[domainKey].riskScore });
                national.push({ axis: domainKey, value: domainsData[domainKey].averageRisk });
            });
        }
        return { regionalProfile: regional, nationalProfile: national };
    }, [regionData]);
    
    const { regionalProfile: kabKotaProfile, nationalProfile: provinceProfileForKabKota } = useMemo(() => {
        const regional: { axis: Domain; value: number }[] = [];
        const national: { axis: Domain; value: number }[] = [];
        if (selectedKabupatenKota && regionData) {
            (Object.keys(selectedKabupatenKota.domains) as Domain[]).forEach(domainKey => {
                regional.push({ axis: domainKey, value: selectedKabupatenKota.domains[domainKey].riskScore });
                national.push({ axis: domainKey, value: regionData.domains[domainKey].riskScore });
            });
        }
        return { regionalProfile: regional, nationalProfile: national };
    }, [selectedKabupatenKota, regionData]);

    const forecastTrendData = useMemo((): ForecastTrendPoint[] => {
        if (!regionData) return [];
        // [Existing logic]
        const regionHistory = regionData.historicalRisk;
        const nationalHistory = nationalHistoricalRisk;
        const regionalTrend = regionHistory.length > 1 ? regionHistory[regionHistory.length - 1].score - regionHistory[regionHistory.length - 2].score : 0;
        const nationalTrend = nationalHistory.length > 1 ? nationalHistory[nationalHistory.length - 1].score - nationalHistory[nationalHistory.length - 2].score : 0;
        const historicalData: ForecastTrendPoint[] = regionHistory.map((rh, index) => ({
            month: rh.month,
            regionalActual: rh.score, regionalPredicted: rh.score,
            nationalActual: nationalHistory[index]?.score || null, nationalPredicted: nationalHistory[index]?.score || 0,
        }));
        const lastRegionalPoint = regionHistory[regionHistory.length - 1];
        const lastNationalPoint = nationalHistory[nationalHistory.length - 1];
        const predictionMonths = ['Jul', 'Agu', 'Sep'];
        const predictedData: ForecastTrendPoint[] = predictionMonths.map((month, i) => {
            const nextRegionalScore = Math.max(0, Math.min(100, lastRegionalPoint.score + (regionalTrend * (i + 1))));
            const nextNationalScore = Math.max(0, Math.min(100, lastNationalPoint.score + (nationalTrend * (i + 1))));
            return {
                month: month, regionalActual: null, regionalPredicted: parseFloat(nextRegionalScore.toFixed(1)),
                nationalActual: null, nationalPredicted: parseFloat(nextNationalScore.toFixed(1)),
            };
        });
        return [...historicalData, ...predictedData];
    }, [regionData]);
    
    const kabKotaForecastTrendData = useMemo((): ForecastTrendPoint[] => {
        if (!selectedKabupatenKota || !regionData) return [];
        const cityHistory = selectedKabupatenKota.historicalRisk;
        const provinceHistory = regionData.historicalRisk;
        const cityTrend = cityHistory.length > 1 ? cityHistory[cityHistory.length - 1].score - cityHistory[cityHistory.length - 2].score : 0;
        const provinceTrend = provinceHistory.length > 1 ? provinceHistory[provinceHistory.length - 1].score - provinceHistory[provinceHistory.length - 2].score : 0;
        const historicalData: ForecastTrendPoint[] = cityHistory.map((ch, index) => ({
            month: ch.month, regionalActual: ch.score, regionalPredicted: ch.score,
            nationalActual: provinceHistory.find(ph => ph.month === ch.month)?.score || null,
            nationalPredicted: provinceHistory.find(ph => ph.month === ch.month)?.score || 0,
        }));
        const lastCityPoint = cityHistory[cityHistory.length - 1];
        const lastProvincePoint = provinceHistory.find(p => p.month === lastCityPoint.month) || provinceHistory[provinceHistory.length - 1];
        const predictionMonths = ['Jul', 'Agu', 'Sep'];
        const predictedData: ForecastTrendPoint[] = predictionMonths.map((month, i) => {
            const nextCityScore = Math.max(0, Math.min(100, lastCityPoint.score + (cityTrend * (i + 1))));
            const nextProvinceScore = Math.max(0, Math.min(100, lastProvincePoint.score + (provinceTrend * (i + 1))));
            return {
                month: month, regionalActual: null, regionalPredicted: parseFloat(nextCityScore.toFixed(1)),
                nationalActual: null, nationalPredicted: parseFloat(nextProvinceScore.toFixed(1)),
            };
        });
        return [...historicalData, ...predictedData];
    }, [selectedKabupatenKota, regionData]);
     // --- END: DERIVED STATE & HANDLERS ---

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
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                 <div>
                    <h2 className="text-xl font-bold text-slate-800">Analisis Mendalam per Wilayah</h2>
                    <p className="text-sm text-slate-500 mt-1">Pilih wilayah dari daftar untuk melihat detail profil risikonya.</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <label htmlFor="region-select" className="sr-only">Pilih Wilayah</label>
                    <select
                        id="region-select"
                        value={selectedRegionId}
                        onChange={(e) => {
                            setSelectedRegionId(e.target.value);
                            setSelectedKabupatenKotaId(null); // Reset city when user manually changes province
                        }}
                        className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-64 p-2.5"
                    >
                        {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                    </select>
                </div>
            </div>

            {selectedKabupatenKota && regionData ? (
                // --- KABUPATEN/KOTA DETAIL VIEW ---
                <div className="space-y-6">
                    <div className="flex items-center text-sm font-semibold text-slate-600 bg-slate-100 p-2 rounded-md">
                        <button onClick={handleBackToProvince} className="hover:underline text-indigo-600">
                           {regionData.name}
                        </button>
                        <svg className="w-4 h-4 mx-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        <span className="text-slate-800">{selectedKabupatenKota.name}</span>
                    </div>

                    <RegionSummary data={selectedKabupatenKota} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                           <RegionalProfileRadarChart 
                                regionName={selectedKabupatenKota.name}
                                regionalProfile={kabKotaProfile}
                                nationalProfile={provinceProfileForKabKota}
                           />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <RegionalForecastTrendChart 
                                regionName={selectedKabupatenKota.name}
                                parentRegionName={regionData.name}
                                data={kabKotaForecastTrendData}
                            />
                        </div>
                    </div>
                    <DomainBreakdown domains={selectedKabupatenKota.domains} />
                    <RegionalAnalysisInsight
                        isLoading={isInsightLoading} insight={insight} error={insightError}
                        onRegenerate={() => fetchInsight(selectedKabupatenKota)}
                    />
                    <ActiveAlerts 
                        data={kabupatenKotaAlerts} onAnalyze={handleAnalyzeClick} 
                        onCreatePlan={() => handleOpenInterventionModal(undefined, true)} 
                    />
                </div>
            ) : regionData ? (
                // --- PROVINCE VIEW (Original) ---
                <div className="space-y-6">
                    <RegionSummary data={regionData} alertsCount={regionalAlerts.length} />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                           <RegionalProfileRadarChart 
                                regionName={regionData.name}
                                regionalProfile={provinceProfile}
                                nationalProfile={nationalProfile}
                           />
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <RegionalForecastTrendChart 
                                regionName={regionData.name} 
                                data={forecastTrendData}
                            />
                        </div>
                    </div>
                    {kabupatenKotaData.length > 0 && (
                        <KabupatenKotaList data={kabupatenKotaData} onSelectKabupatenKota={handleSelectKabupatenKota} />
                    )}
                    <DomainBreakdown domains={regionData.domains} />
                    <RegionalAnalysisInsight
                        isLoading={isInsightLoading} insight={insight} error={insightError}
                        onRegenerate={() => fetchInsight(regionData)}
                    />
                    <ActiveAlerts 
                        data={regionalAlerts} onAnalyze={handleAnalyzeClick} 
                        onCreatePlan={() => handleOpenInterventionModal(undefined, true)} 
                    />
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                    <p className="text-slate-500">Memuat data wilayah...</p>
                </div>
            )}
            
            {/* This modal serves both views */}
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

export default DataPerWilayah;