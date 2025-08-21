import React from 'react';
import { InterventionPlan, InterventionStatus } from '../types';
import InterventionCard from './interventions/InterventionCard';
import { DocumentPlusIcon } from './icons/Icons';

interface InterventionManagementProps {
    plans: InterventionPlan[];
    onOpenModal: (initialData?: Partial<InterventionPlan>, navigate?: boolean) => void;
}

const InterventionManagement: React.FC<InterventionManagementProps> = ({ plans, onOpenModal }) => {
    
    const columns: InterventionStatus[] = [
        InterventionStatus.Planning,
        InterventionStatus.Active,
        InterventionStatus.Completed,
        InterventionStatus.OnHold,
    ];

    const getColumnColor = (status: InterventionStatus) => {
        switch(status) {
            case InterventionStatus.Planning: return 'border-t-sky-500';
            case InterventionStatus.Active: return 'border-t-indigo-500';
            case InterventionStatus.Completed: return 'border-t-emerald-500';
            case InterventionStatus.OnHold: return 'border-t-slate-500';
        }
    }

    return (
        <div className="space-y-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">Manajemen Rencana Intervensi</h2>
                        <p className="text-sm text-slate-500">Lacak dan kelola semua program intervensi dari satu tempat.</p>
                    </div>
                    <button 
                        onClick={() => onOpenModal(null)}
                        className="mt-3 sm:mt-0 flex items-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <DocumentPlusIcon className="w-5 h-5 mr-2" />
                        Buat Rencana Baru
                    </button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="flex-grow min-h-0 overflow-x-auto">
                 <div className="flex lg:grid lg:grid-cols-4 gap-6 pb-4 h-full">
                    {columns.map(status => (
                        <div key={status} className={`bg-slate-100 rounded-lg p-3 flex flex-col border-t-4 ${getColumnColor(status)} w-[80vw] sm:w-[45vw] md:w-[35vw] lg:w-auto flex-shrink-0`}>
                            <h3 className="font-bold text-slate-700 p-2">{status}</h3>
                            <div className="space-y-4 overflow-y-auto flex-grow p-1">
                               {plans
                                .filter(plan => plan.status === status)
                                .map(plan => (
                                    <InterventionCard key={plan.id} plan={plan} onOpenModal={onOpenModal} />
                                ))
                               }
                               {plans.filter(plan => plan.status === status).length === 0 && (
                                   <div className="flex items-center justify-center h-full text-center text-slate-400 text-sm">
                                       <p>Tidak ada rencana dalam status ini.</p>
                                   </div>
                               )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterventionManagement;