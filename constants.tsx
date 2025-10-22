import React from 'react';
import { NavItem, View, ResourceType } from './types';
import { DashboardIcon, UsersIcon, ChartBarIcon, MapIcon, BellAlertIcon, LightBulbIcon, CircleStackIcon, BeakerIcon, BriefcaseIcon, DocumentChartBarIcon, FlagIcon, GlobeAltIcon, ScaleIcon, CubeIcon, WrenchScrewdriverIcon, HomeIcon, SunIcon, UserCircleIcon, DocumentPlusIcon, AcademicCapIcon, SparklesIcon, ExclamationTriangleIcon, DocumentArrowDownIcon } from './components/icons/Icons';

export const NAVIGATION_ITEMS: NavItem[] = [
    { id: View.LandingPage, label: 'Landing Page', icon: <HomeIcon /> },
    { id: View.Dashboard, label: 'Dashboard', icon: <DashboardIcon /> },
    { id: View.Forecasting, label: 'Forecasting & Prediction', icon: <ChartBarIcon /> },
    { id: View.DataPerWilayah, label: 'Data per Wilayah', icon: <MapIcon /> },
    { id: View.EWSPerBidang, label: 'Analisis per Bidang', icon: <BellAlertIcon /> },
    // { id: View.AiAgentSelection, label: 'Asisten AI CERIA', icon: <SparklesIcon /> },
    // { id: View.Intervensi, label: 'Manajemen Intervensi', icon: <BeakerIcon /> },
    { id: View.UploadData, label: 'Upload Data', icon: <DocumentArrowDownIcon /> },
    // { id: View.DataProcessing, label: 'Manajemen Integrasi', icon: <WrenchScrewdriverIcon /> },
];

export const SUB_NAVIGATION_ITEMS: NavItem[] = [
    { id: View.ResourceAllocation, label: 'Resource Allocation', icon: <BriefcaseIcon /> },
    { id: View.Reports, label: 'Reports & Analytics', icon: <DocumentChartBarIcon /> },
];

export const PERSONAL_NAVIGATION_ITEMS: NavItem[] = [
    // { id: View.ParentDashboard, label: 'Dashboard Orang Tua', icon: <UserCircleIcon /> },
];

export const DOMAIN_FILTER_ITEMS = [
    { id: 'Semua', name: 'Semua Domain', icon: <GlobeAltIcon className="w-5 h-5" /> },
    { id: 'Kesehatan', name: 'Kesehatan', icon: <FlagIcon color="text-red-500" /> },
    { id: 'Gizi', name: 'Gizi', icon: <FlagIcon color="text-yellow-500" /> },
    { id: 'Pendidikan', name: 'Pendidikan', icon: <AcademicCapIcon className="w-5 h-5 text-purple-500" /> },
    { id: 'Pengasuhan', name: 'Pengasuhan', icon: <FlagIcon color="text-green-500" /> },
    { id: 'Perlindungan', name: 'Perlindungan', icon: <FlagIcon color="text-blue-500" /> },
    { id: 'Kesejahteraan', name: 'Kesejahteraan', icon: <FlagIcon color="text-indigo-500" /> },
    { id: 'Lingkungan', name: 'Lingkungan', icon: <SunIcon className="w-5 h-5 text-cyan-500" /> },
    { id: 'Bencana', name: 'Bencana', icon: <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" /> }
];

export const DOMAIN_ITEMS = DOMAIN_FILTER_ITEMS.filter(item => item.id !== 'Semua');

export const RESOURCE_TYPES: { id: ResourceType; name: string; icon: React.ReactNode }[] = [
    { id: 'SDM', name: 'Sumber Daya Manusia', icon: <UsersIcon className="w-6 h-6 text-blue-500" /> },
    { id: 'Anggaran', name: 'Anggaran', icon: <ScaleIcon className="w-6 h-6 text-emerald-500" /> },
    { id: 'Material', name: 'Material & Logistik', icon: <CubeIcon className="w-6 h-6 text-amber-500" /> },
];