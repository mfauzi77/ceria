import React from 'react';
import { paudParticipationData2024 } from '../services/mockData';
import { CircleStackIcon } from './icons/Icons';

// Helper to format header text from camelCase to Title Case
const formatHeader = (key: string) => {
    // Handle specific cases like 'apm' and 'apk'
    if (key === 'apm') return 'APM PAUD 3-6 Tahun';
    if (key === 'apk') return 'APK PAUD 3-6 Tahun';
    
    const result = key.replace(/([A-Z])/g, ' $1');
    return result.charAt(0).toUpperCase() + result.slice(1);
};

// DataTable component to display data in an Excel-like format
const DataTable = ({ data }: { data: any[] }) => {
    if (!Array.isArray(data) || data.length === 0) {
        return <p className="text-center text-slate-500 dark:text-slate-400 py-8">No data available to display in table format.</p>;
    }

    const headers = Object.keys(data[0]);

    const renderCell = (value: any) => {
        if (value === null || value === undefined) {
            return <span className="text-slate-400 dark:text-slate-500">N/A</span>;
        }
        if (typeof value === 'boolean') {
            return value ? <span className="text-emerald-600 font-semibold">Yes</span> : <span className="text-red-600 font-semibold">No</span>;
        }
        if (typeof value === 'object') {
            const jsonString = JSON.stringify(value);
            const displayString = jsonString.length > 50 ? `${jsonString.substring(0, 50)}...` : jsonString;
            return (
                <pre className="text-xs bg-slate-100 dark:bg-slate-700 p-1 rounded max-w-xs overflow-x-auto" title={jsonString}>
                    <code>{displayString}</code>
                </pre>
            );
        }
        return value;
    };

    return (
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
            <table className="w-full text-sm text-left text-slate-500 dark:text-slate-400">
                <thead className="text-xs text-slate-700 dark:text-slate-300 uppercase bg-slate-100 dark:bg-slate-800">
                    <tr>
                        {headers.map(header => (
                            <th key={header} scope="col" className="px-6 py-3 whitespace-nowrap">
                                {formatHeader(header)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className="bg-white dark:bg-slate-900 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            {headers.map(header => (
                                <td key={`${rowIndex}-${header}`} className="px-6 py-4 align-top">
                                    <div className="max-w-md">{renderCell(row[header])}</div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const Data: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
                    <CircleStackIcon className="w-6 h-6 mr-3 text-indigo-500"/>
                    Data Partisipasi PAUD
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Menampilkan data Angka Partisipasi Murni (APM) dan Angka Partisipasi Kasar (APK) PAUD per Kabupaten/Kota.
                </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm">
                <div className="max-h-[75vh] overflow-y-auto">
                    <DataTable data={paudParticipationData2024} />
                </div>
            </div>
        </div>
    );
};

export default Data;
