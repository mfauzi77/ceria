import React, { useState } from 'react';
import { SparklesIcon, DocumentArrowDownIcon, ArrowPathIcon, ExclamationTriangleIcon, CircleStackIcon, XCircleIcon, ShieldCheckIcon, DocumentPlusIcon } from '../icons/Icons';
import { extractDataFromFile } from '../../services/geminiService';
import DataTable from '../shared/DataTable';

interface DataIntegrationItemProps {
    kementerian: string;
    platform: string;
    dataName: string;
}

type DataRow = Record<string, any>;

export const DataIntegrationItem: React.FC<DataIntegrationItemProps> = ({ kementerian, platform, dataName }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [tableData, setTableData] = useState<{ headers: string[], rows: DataRow[] } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const handleFile = (selectedFile: File) => {
        const allowedTypes = [
            'text/csv', 
            'application/pdf',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ];
        if (selectedFile && allowedTypes.includes(selectedFile.type)) {
            setFile(selectedFile);
            setTableData(null);
            setError(null);
            setIsSaved(false);
        } else {
            setError('Tipe file tidak didukung. Harap unggah file CSV, Excel, atau PDF.');
        }
    };

    const handleProcessAI = async () => {
        if (!file) return;
        setIsLoading(true);
        setError(null);
        try {
            const result = await extractDataFromFile(file);
            if (result.rows.length === 0) {
                setError('AI tidak dapat mengekstrak data tabel dari file ini. Pastikan file berisi data tabular yang jelas.');
            } else {
                setTableData(result);
            }
        } catch (e: any) {
            console.error(e);
            setError(e.message || 'Terjadi kesalahan saat pemrosesan AI. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };
    
    const handleSave = () => {
        if (!tableData) return;
        // In a real app, this would send data to a backend.
        console.log("Saving data for:", dataName, tableData);
        setIsSaved(true);
    };

    const handleClear = () => {
        setIsExpanded(false);
        setFile(null);
        setTableData(null);
        setError(null);
        setIsSaved(false);
    };

    return (
        <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="font-semibold text-slate-800 dark:text-slate-100">{dataName}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{kementerian} • {platform}</p>
                </div>
                {!isExpanded ? (
                     <button onClick={() => setIsExpanded(true)} className="px-3 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition-colors">
                        Tambah Data
                    </button>
                ) : (
                    <button onClick={handleClear} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full">
                        <XCircleIcon className="w-6 h-6"/>
                    </button>
                )}
            </div>

            {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    {!tableData ? (
                        <div>
                             {!file ? (
                                <div
                                    onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800'}`}
                                >
                                    <DocumentArrowDownIcon className="mx-auto h-10 w-10 text-slate-400" />
                                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-200">Drag & drop file Excel atau PDF</p>
                                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">atau</p>
                                    <label htmlFor={`file-${dataName}`} className="relative cursor-pointer rounded-md font-semibold text-indigo-600 hover:text-indigo-500">
                                        <span>pilih dari perangkat Anda</span>
                                        <input id={`file-${dataName}`} name={`file-${dataName}`} type="file" className="sr-only" accept=".csv,.xlsx,.xls,.pdf" onChange={e => e.target.files && handleFile(e.target.files[0])} />
                                    </label>
                                </div>
                            ) : (
                                <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="text-sm">
                                        <p className="font-semibold text-slate-800 dark:text-slate-200">{file.name}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{(file.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <button onClick={() => setFile(null)} className="flex-1 sm:flex-none text-xs font-semibold text-slate-600 hover:text-slate-800">Ganti</button>
                                        <button onClick={handleProcessAI} disabled={isLoading} className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 disabled:bg-indigo-300">
                                            {isLoading ? <ArrowPathIcon className="w-5 h-5 animate-spin mr-2" /> : <SparklesIcon className="w-5 h-5 mr-2" />}
                                            {isLoading ? 'Memproses...' : 'Baca dengan AI'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                             <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center">
                                <CircleStackIcon className="w-5 h-5 mr-2 text-emerald-500"/>
                                Data Berhasil Diekstrak
                            </h5>
                             <div className="max-h-64 overflow-auto border border-slate-200 dark:border-slate-700 rounded-lg">
                                <DataTable headers={tableData.headers} data={tableData.rows} />
                            </div>
                            <div className="mt-4">
                                {isSaved ? (
                                    <div className="p-3 text-center bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-semibold flex items-center justify-center">
                                        <ShieldCheckIcon className="w-5 h-5 mr-2"/>
                                        Data berhasil disimpan!
                                    </div>
                                ) : (
                                    <button 
                                        onClick={handleSave} 
                                        className="w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-lg shadow-sm hover:bg-emerald-700">
                                        <DocumentPlusIcon className="w-5 h-5 mr-2"/>
                                        Simpan Data
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-sm rounded-lg flex items-start">
                            <ExclamationTriangleIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};