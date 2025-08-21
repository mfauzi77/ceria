import React, { useState, useEffect } from 'react';
import { InterventionPlan, InterventionStatus, InterventionPriority, Domain } from '../../types';
import { getAvailableRegions } from '../../services/mockData';
import { DOMAIN_ITEMS } from '../../constants';
import { BeakerIcon } from '../icons/Icons';

interface InterventionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (plan: Omit<InterventionPlan, 'id' | 'actionItems'>) => void;
    initialData?: Partial<InterventionPlan> | null;
}

const InterventionFormModal: React.FC<InterventionFormModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        region: '',
        domain: 'Kesehatan' as Domain,
        status: InterventionStatus.Planning,
        priority: InterventionPriority.Medium,
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        budget: 0,
        kpi: '',
        relatedAlertId: undefined,
    });
    
    const availableRegions = getAvailableRegions();

    useEffect(() => {
        if (isOpen && initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                region: initialData.region || availableRegions[0]?.name || '',
                domain: initialData.domain || 'Kesehatan',
                status: initialData.status || InterventionStatus.Planning,
                priority: initialData.priority || InterventionPriority.Medium,
                startDate: initialData.startDate || new Date().toISOString().split('T')[0],
                endDate: initialData.endDate || '',
                budget: initialData.budget || 0,
                kpi: initialData.kpi || '',
                relatedAlertId: initialData.relatedAlertId,
            });
        } else if (isOpen && !initialData) {
             setFormData({
                title: '',
                description: '',
                region: availableRegions[0]?.name || '',
                domain: 'Kesehatan' as Domain,
                status: InterventionStatus.Planning,
                priority: InterventionPriority.Medium,
                startDate: new Date().toISOString().split('T')[0],
                endDate: '',
                budget: 0,
                kpi: '',
                relatedAlertId: undefined,
            });
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'domain' 
                ? value as Domain 
                : (type === 'number' ? parseFloat(value) : value),
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl transform transition-all" onClick={e => e.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="flex items-center">
                             <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                <BeakerIcon className="h-6 w-6 text-indigo-600" />
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {initialData?.title ? 'Edit Rencana Intervensi' : 'Buat Rencana Intervensi Baru'}
                                </h3>
                                <p className="text-sm text-gray-500">Isi detail rencana program intervensi Anda.</p>
                            </div>
                        </div>
                        
                        <div className="mt-6 space-y-4 max-h-[65vh] overflow-y-auto pr-3">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Judul Rencana</label>
                                <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md" />
                            </div>
                             <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Deskripsi</label>
                                <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="region" className="block text-sm font-medium text-slate-700">Wilayah</label>
                                    <select name="region" id="region" value={formData.region} onChange={handleChange} required className="mt-1 block w-full py-2 px-3 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        {availableRegions.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="domain" className="block text-sm font-medium text-slate-700">Domain</label>
                                    <select name="domain" id="domain" value={formData.domain} onChange={handleChange} required className="mt-1 block w-full py-2 px-3 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        {DOMAIN_ITEMS.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="priority" className="block text-sm font-medium text-slate-700">Prioritas</label>
                                    <select name="priority" id="priority" value={formData.priority} onChange={handleChange} required className="mt-1 block w-full py-2 px-3 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        {Object.values(InterventionPriority).map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="status" className="block text-sm font-medium text-slate-700">Status</label>
                                    <select name="status" id="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full py-2 px-3 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        {Object.values(InterventionStatus).map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-slate-700">Tanggal Mulai</label>
                                    <input type="date" name="startDate" id="startDate" value={formData.startDate} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md" />
                                </div>
                                <div>
                                    <label htmlFor="endDate" className="block text-sm font-medium text-slate-700">Tanggal Selesai</label>
                                    <input type="date" name="endDate" id="endDate" value={formData.endDate} onChange={handleChange} className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md" />
                                </div>
                            </div>
                             <div>
                                <label htmlFor="budget" className="block text-sm font-medium text-slate-700">Anggaran (IDR)</label>
                                <input type="number" name="budget" id="budget" value={formData.budget} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md" placeholder="500000000" />
                            </div>
                             <div>
                                <label htmlFor="kpi" className="block text-sm font-medium text-slate-700">Key Performance Indicator (KPI)</label>
                                <input type="text" name="kpi" id="kpi" value={formData.kpi} onChange={handleChange} required className="mt-1 block w-full shadow-sm sm:text-sm border-slate-300 rounded-md" placeholder="e.g., Menurunkan stunting sebesar 5%"/>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 px-6 py-4 flex flex-col-reverse sm:flex-row justify-end gap-3 sm:space-x-3">
                        <button type="button" onClick={onClose} className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50">
                            Batal
                        </button>
                        <button type="submit" className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700">
                            Simpan Rencana
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InterventionFormModal;
