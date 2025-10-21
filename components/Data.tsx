import React, { useState } from 'react';
import { paudAccreditationData, paudTeacherQualificationData } from '../services/mockData';
import { CircleStackIcon, AcademicCapIcon } from './icons/Icons';
import DataTable from './shared/DataTable';

type Tab = 'akreditasi' | 'kualifikasi';

const Data: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('kualifikasi');

    const datasets = {
        akreditasi: {
            title: 'Data Akreditasi & Rasio PAUD',
            description: 'Menampilkan data Jumlah PAUD, Status Akreditasi, dan Rasio Guru-Murid per Provinsi.',
            data: paudAccreditationData,
            icon: <CircleStackIcon className="w-6 h-6 mr-3 text-indigo-500"/>
        },
        kualifikasi: {
            title: 'Data Kualifikasi Guru PAUD',
            description: 'Menampilkan data Jumlah Guru PAUD dan persentase yang memiliki kualifikasi S1/D4 per Provinsi.',
            data: paudTeacherQualificationData,
            icon: <AcademicCapIcon className="w-6 h-6 mr-3 text-indigo-500"/>
        }
    };

    const activeDataset = datasets[activeTab];
    const headers = activeDataset.data.length > 0 ? Object.keys(activeDataset.data[0]) : [];

    const TabButton: React.FC<{tabId: Tab, label: string}> = ({ tabId, label }) => {
        const isActive = activeTab === tabId;
        return (
            <button
                onClick={() => setActiveTab(tabId)}
                className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 transition-colors ${
                    isActive
                        ? 'text-indigo-600 border-indigo-600'
                        : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
                }`}
            >
                {label}
            </button>
        )
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
                    {activeDataset.icon}
                    {activeDataset.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {activeDataset.description}
                </p>
            </div>

            <div className="border-b border-slate-200 dark:border-slate-700">
                <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <TabButton tabId="kualifikasi" label="Kualifikasi Guru" />
                    <TabButton tabId="akreditasi" label="Akreditasi & Rasio" />
                </nav>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm">
                <div className="max-h-[70vh] overflow-y-auto">
                    <DataTable headers={headers} data={activeDataset.data} />
                </div>
            </div>
        </div>
    );
};

export default Data;