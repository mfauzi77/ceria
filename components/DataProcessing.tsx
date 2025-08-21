import React from 'react';
import DataSources from './dataprocessing/DataSources';
import ProcessingLogs from './dataprocessing/ProcessingLogs';
import DataQuality from './dataprocessing/DataQuality';
import ManualJobs from './dataprocessing/ManualJobs';

const DataProcessing: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-800">Manajemen Integrasi Data</h2>
                <p className="text-sm text-slate-500 mt-1">Monitor, kelola, dan validasi sumber data dari berbagai kementerian dan instansi.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                     <DataQuality />
                </div>
               
                <div className="lg:col-span-1 space-y-6">
                    <DataSources />
                    <ManualJobs />
                </div>
                
                 <div className="lg:col-span-2">
                    <ProcessingLogs />
                </div>
            </div>
        </div>
    );
};

export default DataProcessing;