import { 
    RiskAssessmentData, KeyIndicatorData, ActiveAlertData, ForecastDataPoint, 
    RegionalForecastData, RegionDetailData, DomainData, DataSource, LogEntry, 
    InterventionPlan, RegionalRiskScore, DomainFilter, ResourceData, ParentData, 
    KabupatenKotaDetailData, AlertLevel, Domain, DomainMetrics, DomainMetric, DomainIndicatorData 
} from '../types';

// --- UTILITY FUNCTIONS ---
const parseValue = (val: string | undefined): number | null => {
  if (!val || val.trim() === 'NA' || val.trim() === '–' || val.trim() === '') {
    return null;
  }
  return parseFloat(val.replace(',', '.'));
};

const generateId = (name: string): string => {
    return name.toLowerCase().replace(/ /g, '-').replace(/\./g, '');
}

const generateHistoricalData = (baseScore: number, length: number = 6): { month: string; score: number }[] => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'];
    return months.slice(-length).map(month => ({
        month,
        score: parseFloat(Math.max(0, Math.min(100, baseScore + (Math.random() - 0.5) * 10)).toFixed(1))
    }));
};

// --- RAW DATA FROM USER CSVs ---

const bencanaRawData = {
    "Aceh": { BANJIR: 47, "CUACA EKSTREM": 14, "KEBAKARAN HUTAN DAN LAHAN": 35, KEKERINGAN: 1, "TANAH LONGSOR": 2 },
    "Sumatera Utara": { BANJIR: 120, "CUACA EKSTREM": 43, "KEBAKARAN HUTAN DAN LAHAN": 170, KEKERINGAN: 2, "TANAH LONGSOR": 15 },
    "Sumatera Barat": { BANJIR: 64, "CUACA EKSTREM": 10, "ERUPSI GUNUNG API": 3, "GELOMBANG PASANG DAN ABRASI": 3, "KEBAKARAN HUTAN DAN LAHAN": 7, KEKERINGAN: 1, "TANAH LONGSOR": 10 },
    "Riau": { BANJIR: 53, "CUACA EKSTREM": 2, "GELOMBANG PASANG DAN ABRASI": 2, "KEBAKARAN HUTAN DAN LAHAN": 10, "TANAH LONGSOR": 1 },
    "Jambi": { BANJIR: 44, "CUACA EKSTREM": 7, "KEBAKARAN HUTAN DAN LAHAN": 79, "TANAH LONGSOR": 2 },
    "Sumatera Selatan": { BANJIR: 69, "CUACA EKSTREM": 9, "KEBAKARAN HUTAN DAN LAHAN": 192, "TANAH LONGSOR": 1 },
    "Bengkulu": { BANJIR: 9, "CUACA EKSTREM": 3, GEMPABUMI: 1, "KEBAKARAN HUTAN DAN LAHAN": 1, KEKERINGAN: 1, "TANAH LONGSOR": 4 },
    "Lampung": { BANJIR: 28, "CUACA EKSTREM": 24, "KEBAKARAN HUTAN DAN LAHAN": 7, KEKERINGAN: 1 },
    "Kep. Bangka Belitung": { BANJIR: 2, "CUACA EKSTREM": 3, "KEBAKARAN HUTAN DAN LAHAN": 19 },
    "Kepulauan Riau": { BANJIR: 4, "CUACA EKSTREM": 16, "KEBAKARAN HUTAN DAN LAHAN": 58, "TANAH LONGSOR": 1 },
    "DKI Jakarta": { BANJIR: 17, "CUACA EKSTREM": 5, "TANAH LONGSOR": 1 },
    "Jawa Barat": { BANJIR: 140, "CUACA EKSTREM": 193, "GELOMBANG PASANG DAN ABRASI": 1, GEMPABUMI: 5, "KEBAKARAN HUTAN DAN LAHAN": 16, KEKERINGAN: 25, "TANAH LONGSOR": 77 },
    "Jawa Tengah": { BANJIR: 78, "CUACA EKSTREM": 71, GEMPABUMI: 3, "KEBAKARAN HUTAN DAN LAHAN": 38, KEKERINGAN: 22, "TANAH LONGSOR": 19 },
    "DI Yogyakarta": { "CUACA EKSTREM": 38, GEMPABUMI: 1, "KEBAKARAN HUTAN DAN LAHAN": 15, KEKERINGAN: 3, "TANAH LONGSOR": 5 },
    "Jawa Timur": { BANJIR: 121, "CUACA EKSTREM": 141, "GELOMBANG PASANG DAN ABRASI": 2, GEMPABUMI: 2, "KEBAKARAN HUTAN DAN LAHAN": 145, KEKERINGAN: 11, "TANAH LONGSOR": 14 },
    "Banten": { BANJIR: 66, "CUACA EKSTREM": 17, "GELOMBANG PASANG DAN ABRASI": 1, GEMPABUMI: 1, "KEBAKARAN HUTAN DAN LAHAN": 4, KEKERINGAN: 2, "TANAH LONGSOR": 7 },
    "Bali": { BANJIR: 2, "CUACA EKSTREM": 17, GEMPABUMI: 1, "KEBAKARAN HUTAN DAN LAHAN": 11, "TANAH LONGSOR": 4 },
    "Nusa Tenggara Barat": { BANJIR: 44, "CUACA EKSTREM": 17, "GELOMBANG PASANG DAN ABRASI": 2, GEMPABUMI: 1, "KEBAKARAN HUTAN DAN LAHAN": 3, KEKERINGAN: 9, "TANAH LONGSOR": 1 },
    "Nusa Tenggara Timur": { BANJIR: 13, "CUACA EKSTREM": 13, "ERUPSI GUNUNG API": 3, "GELOMBANG PASANG DAN ABRASI": 4, "KEBAKARAN HUTAN DAN LAHAN": 14, KEKERINGAN: 1, "TANAH LONGSOR": 5 },
    "Kalimantan Barat": { BANJIR: 56, "CUACA EKSTREM": 3, "KEBAKARAN HUTAN DAN LAHAN": 10 },
    "Kalimantan Tengah": { BANJIR: 39, "KEBAKARAN HUTAN DAN LAHAN": 17 },
    "Kalimantan Selatan": { BANJIR: 15, "CUACA EKSTREM": 4, "KEBAKARAN HUTAN DAN LAHAN": 6, "TANAH LONGSOR": 1 },
    "Kalimantan Timur": { BANJIR: 29, "CUACA EKSTREM": 4, "GELOMBANG PASANG DAN ABRASI": 1, "KEBAKARAN HUTAN DAN LAHAN": 107, "TANAH LONGSOR": 3 },
    "Kalimantan Utara": { BANJIR: 5, "KEBAKARAN HUTAN DAN LAHAN": 3, "TANAH LONGSOR": 2 },
    "Sulawesi Utara": { BANJIR: 17, "CUACA EKSTREM": 3, "ERUPSI GUNUNG API": 1, "GELOMBANG PASANG DAN ABRASI": 1, "TANAH LONGSOR": 1 },
    "Sulawesi Tengah": { BANJIR: 85, "CUACA EKSTREM": 4, GEMPABUMI: 2, "KEBAKARAN HUTAN DAN LAHAN": 2, "TANAH LONGSOR": 1 },
    "Sulawesi Selatan": { BANJIR: 91, "CUACA EKSTREM": 45, "GELOMBANG PASANG DAN ABRASI": 2, "KEBAKARAN HUTAN DAN LAHAN": 3, KEKERINGAN: 10, "TANAH LONGSOR": 14 },
    "Sulawesi Tenggara": { BANJIR: 17, "CUACA EKSTREM": 3 },
    "Gorontalo": { BANJIR: 31, "CUACA EKSTREM": 1, KEKERINGAN: 1, "TANAH LONGSOR": 2 },
    "Sulawesi Barat": { BANJIR: 15, "CUACA EKSTREM": 4, "TANAH LONGSOR": 3 },
    "Maluku": { BANJIR: 18, "CUACA EKSTREM": 11, "GELOMBANG PASANG DAN ABRASI": 3, GEMPABUMI: 1, "TANAH LONGSOR": 3 },
    "Maluku Utara": { BANJIR: 40, "CUACA EKSTREM": 6, "ERUPSI GUNUNG API": 1, "GELOMBANG PASANG DAN ABRASI": 3, GEMPABUMI: 1, "TANAH LONGSOR": 4 },
    "Papua": { BANJIR: 15, "CUACA EKSTREM": 2, "GELOMBANG PASANG DAN ABRASI": 2 },
    "Papua Barat": { BANJIR: 15, "GELOMBANG PASANG DAN ABRASI": 2, "TANAH LONGSOR": 1 },
    "Papua Selatan": { BANJIR: 2, "GELOMBANG PASANG DAN ABRASI": 1 },
    "Papua Tengah": { BANJIR: 5 },
    "Papua Pegunungan": { "TANAH LONGSOR": 3 },
    "Papua Barat Daya": { BANJIR: 4 },
};

const kasusPerlindunganAnakRawData = {
    "Aceh": 1234,
    "Sumatera Utara": 2345,
    "Sumatera Barat": 1567,
    "Riau": 1234,
    "Jambi": 1234,
    "Sumatera Selatan": 2345,
    "Bengkulu": 1234,
    "Lampung": 1234,
    "Kep. Bangka Belitung": 567,
    "Kep. Riau": 567,
    "DKI Jakarta": 3456,
    "Jawa Barat": 4567,
    "Jawa Tengah": 3456,
    "Jawa Timur": 4567,
    "Banten": 1234,
    "Bali": 567,
    "Nusa Tenggara Barat": 567,
    "Nusa Tenggara Timur": 567,
    "Kalimantan Barat": 567,
    "Kalimantan Tengah": 567,
    "Kalimantan Selatan": 567,
    "Kalimantan Timur": 567,
    "Kalimantan Utara": 567,
    "Sulawesi Utara": 567,
    "Sulawesi Tengah": 567,
    "Sulawesi Selatan": 567,
    "Sulawesi Tenggara": 567,
    "Gorontalo": 567,
    "Maluku": 567,
    "Maluku Utara": 567,
    "Papua": 1234,
    "Papua Barat": 567,
};

const paudAccreditationRawData = [
    { provinsi: "Jawa Timur", jumlah: 45448, akreditasi: 80, rasio: "1:12" },
    { provinsi: "Jawa Barat", jumlah: 16623, akreditasi: 75, rasio: "1:15" },
    { provinsi: "Jawa Tengah", jumlah: 5609, akreditasi: 70, rasio: "1:14" },
    { provinsi: "Sumatera Utara", jumlah: 4000, akreditasi: 65, rasio: "1:10" },
    { provinsi: "Sulawesi Selatan", jumlah: 3500, akreditasi: 60, rasio: "1:13" },
    { provinsi: "Aceh", jumlah: 2800, akreditasi: 85, rasio: "1:11" },
    { provinsi: "Bali", jumlah: 2500, akreditasi: 90, rasio: "1:09" },
    { provinsi: "Banten", jumlah: 2200, akreditasi: 78, rasio: "1:12" },
    { provinsi: "Bengkulu", jumlah: 1800, akreditasi: 80, rasio: "1:14" },
    { provinsi: "Gorontalo", jumlah: 1200, akreditasi: 88, rasio: "1:10" },
    { provinsi: "Jambi", jumlah: 1500, akreditasi: 82, rasio: "1:13" },
    { provinsi: "Kalimantan Barat", jumlah: 1400, akreditasi: 75, rasio: "1:12" },
    { provinsi: "Kalimantan Selatan", jumlah: 1600, akreditasi: 77, rasio: "1:14" },
    { provinsi: "Kalimantan Tengah", jumlah: 1300, akreditasi: 80, rasio: "1:11" },
    { provinsi: "Kalimantan Timur", jumlah: 1700, akreditasi: 85, rasio: "1:10" },
    { provinsi: "Kalimantan Utara", jumlah: 1100, akreditasi: 70, rasio: "1:13" },
    { provinsi: "Kepulauan Bangka Belitung", jumlah: 900, akreditasi: 78, rasio: "1:12" },
    { provinsi: "Kepulauan Riau", jumlah: 1000, akreditasi: 80, rasio: "1:14" },
    { provinsi: "Lampung", jumlah: 2000, akreditasi: 85, rasio: "1:11" },
    { provinsi: "Maluku", jumlah: 1200, akreditasi: 75, rasio: "1:13" },
    { provinsi: "Maluku Utara", jumlah: 1100, akreditasi: 78, rasio: "1:12" },
    { provinsi: "Nusa Tenggara Barat", jumlah: 1800, akreditasi: 80, rasio: "1:14" },
    { provinsi: "Nusa Tenggara Timur", jumlah: 1900, akreditasi: 82, rasio: "1:13" },
    { provinsi: "Papua", jumlah: 2500, akreditasi: 70, rasio: "1:10" },
    { provinsi: "Papua Barat", jumlah: 1400, akreditasi: 75, rasio: "1:12" },
    { provinsi: "Riau", jumlah: 1600, akreditasi: 78, rasio: "1:13" },
    { provinsi: "Sulawesi Barat", jumlah: 1000, akreditasi: 80, rasio: "1:14" },
    { provinsi: "Sulawesi Tengah", jumlah: 1300, akreditasi: 85, rasio: "1:11" },
    { provinsi: "Sulawesi Tenggara", jumlah: 1500, akreditasi: 90, rasio: "1:09" },
    { provinsi: "Sulawesi Utara", jumlah: 1200, akreditasi: 88, rasio: "1:10" },
    { provinsi: "Sumatera Barat", jumlah: 1700, akreditasi: 75, rasio: "1:13" },
    { provinsi: "Sumatera Selatan", jumlah: 1800, akreditasi: 77, rasio: "1:14" },
    { provinsi: "DI Yogyakarta", jumlah: 1500, akreditasi: 82, rasio: "1:13" },
];

export const paudAccreditationData = paudAccreditationRawData.map(d => ({
    'Provinsi': d.provinsi,
    'Jumlah PAUD': d.jumlah,
    'Status Akreditasi': `${d.akreditasi}%`,
    'Rasio Guru-Murid': d.rasio
}));

export const paudTeacherQualificationRawData = [
    { provinsi: "Aceh", jumlah: 50000, s1d4: 48000, persentase: 96.00 },
    { provinsi: "Sumatera Utara", jumlah: 110000, s1d4: 107000, persentase: 97.27 },
    { provinsi: "Sumatera Barat", jumlah: 48000, s1d4: 46000, persentase: 95.83 },
    { provinsi: "Riau", jumlah: 53000, s1d4: 51000, persentase: 96.23 },
    { provinsi: "Jambi", jumlah: 28000, s1d4: 26000, persentase: 92.86 },
    { provinsi: "Sumatera Selatan", jumlah: 60000, s1d4: 58000, persentase: 96.67 },
    { provinsi: "Bengkulu", jumlah: 16000, s1d4: 15000, persentase: 93.75 },
    { provinsi: "Lampung", jumlah: 55000, s1d4: 53000, persentase: 96.36 },
    { provinsi: "Kep. Bangka Belitung", jumlah: 9000, s1d4: 8500, persentase: 94.44 },
    { provinsi: "Kep. Riau", jumlah: 6000, s1d4: 5800, persentase: 96.67 },
    { provinsi: "DKI Jakarta", jumlah: 29000, s1d4: 27000, persentase: 93.10 },
    { provinsi: "Jawa Barat", jumlah: 95000, s1d4: 90000, persentase: 94.74 },
    { provinsi: "Jawa Tengah", jumlah: 70000, s1d4: 65000, persentase: 92.86 },
    { provinsi: "Jawa Timur", jumlah: 145000, s1d4: 137000, persentase: 94.48 },
    { provinsi: "Banten", jumlah: 24000, s1d4: 22000, persentase: 91.67 },
    { provinsi: "Bali", jumlah: 9000, s1d4: 8500, persentase: 94.44 },
    { provinsi: "Nusa Tenggara Barat", jumlah: 14000, s1d4: 13000, persentase: 92.86 },
    { provinsi: "Nusa Tenggara Timur", jumlah: 18000, s1d4: 17000, persentase: 94.44 },
    { provinsi: "Kalimantan Barat", jumlah: 9000, s1d4: 8500, persentase: 94.44 },
    { provinsi: "Kalimantan Tengah", jumlah: 7000, s1d4: 6500, persentase: 92.86 },
    { provinsi: "Kalimantan Selatan", jumlah: 11000, s1d4: 10500, persentase: 95.45 },
    { provinsi: "Kalimantan Timur", jumlah: 13000, s1d4: 12500, persentase: 96.15 },
    { provinsi: "Kalimantan Utara", jumlah: 5000, s1d4: 4800, persentase: 96.00 },
    { provinsi: "Sulawesi Utara", jumlah: 7000, s1d4: 6500, persentase: 92.86 },
    { provinsi: "Sulawesi Tengah", jumlah: 9000, s1d4: 8500, persentase: 94.44 },
    { provinsi: "Sulawesi Selatan", jumlah: 18000, s1d4: 17000, persentase: 94.44 },
    { provinsi: "Sulawesi Tenggara", jumlah: 11000, s1d4: 10500, persentase: 95.45 },
    { provinsi: "Gorontalo", jumlah: 3000, s1d4: 2800, persentase: 93.33 },
    { provinsi: "Maluku", jumlah: 5000, s1d4: 4700, persentase: 94.00 },
    { provinsi: "Maluku Utara", jumlah: 2500, s1d4: 2400, persentase: 96.00 },
    { provinsi: "Papua", jumlah: 22000, s1d4: 21000, persentase: 95.45 },
    { provinsi: "Papua Barat", jumlah: 7000, s1d4: 6800, persentase: 97.14 },
];

export const paudTeacherQualificationData = paudTeacherQualificationRawData.map(d => ({
    'Provinsi': d.provinsi,
    'Jumlah Guru PAUD': d.jumlah,
    'Guru Kualifikasi S1/D4': d.s1d4,
    'Persentase (%)': `${d.persentase.toFixed(2)}%`
}));


const ancData = {
    "Aceh": { anc: 97.0, persalinan: 96.1 },
    "Sumatera Utara": { anc: 94.3, persalinan: 93.5 },
    "Sumatera Barat": { anc: 96.2, persalinan: 95.5 },
    "Riau": { anc: 95.2, persalinan: 94.7 },
    "Jambi": { anc: 92.7, persalinan: 91.8 },
    "Sumatera Selatan": { anc: 94.7, persalinan: 93.9 },
    "Bengkulu": { anc: 95.8, persalinan: 95.0 },
    "Lampung": { anc: 93.6, persalinan: 92.7 },
    "Kep. Bangka Belitung": { anc: 96.0, persalinan: 95.2 },
    "Kepulauan Riau": { anc: 97.2, persalinan: 96.5 },
    "DKI Jakarta": { anc: 98.9, persalinan: 98.4 },
    "Jawa Barat": { anc: 96.8, persalinan: 96.0 },
    "Jawa Tengah": { anc: 97.0, persalinan: 96.3 },
    "DI Yogyakarta": { anc: 98.6, persalinan: 98.0 },
    "Jawa Timur": { anc: 96.7, persalinan: 95.9 },
    "Banten": { anc: 97.1, persalinan: 96.4 },
    "Bali": { anc: 97.9, persalinan: 97.2 },
    "Nusa Tenggara Barat": { anc: 91.5, persalinan: 90.3 },
    "Nusa Tenggara Timur": { anc: 84.6, persalinan: 81.1 },
    "Kalimantan Barat": { anc: 92.9, persalinan: 91.7 },
    "Kalimantan Tengah": { anc: 93.5, persalinan: 92.4 },
    "Kalimantan Selatan": { anc: 94.7, persalinan: 93.8 },
    "Kalimantan Timur": { anc: 95.2, persalinan: 94.6 },
    "Kalimantan Utara": { anc: 96.8, persalinan: 95.9 },
    "Sulawesi Utara": { anc: 95.3, persalinan: 94.5 },
    "Sulawesi Tengah": { anc: 92.2, persalinan: 90.8 },
    "Sulawesi Selatan": { anc: 93.8, persalinan: 92.9 },
    "Sulawesi Tenggara": { anc: 92.0, persalinan: 90.7 },
    "Gorontalo": { anc: 95.4, persalinan: 94.6 },
    "Sulawesi Barat": { anc: 91.0, persalinan: 89.5 },
    "Maluku": { anc: 84.3, persalinan: 80.6 },
    "Maluku Utara": { anc: 86.0, persalinan: 82.3 },
    "Papua Barat": { anc: 78.4, persalinan: 71.6 },
    "Papua Barat Daya": { anc: 86.4, persalinan: 65.2 },
    "Papua": { anc: 82.1, persalinan: 75.6 },
    "Papua Selatan": { anc: 71.7, persalinan: 68.1 },
    "Papua Tengah": { anc: 70.0, persalinan: 57.4 },
    "Papua Pegunungan": { anc: 97.3, persalinan: 85.2 }
};


const nutritionData = {
    // Data updated based on SSGI 2023 figures and user's SSGI 2024 calculation logic.
    "Aceh": { severelyStunted: 8.4, stunted: 21.0, severelyWasted: 2.9, wasted: 6.6, severelyUnderweight: 6.5, underweight: 15.5 },
    "Sumatera Utara": { severelyStunted: 9.0, stunted: 18.1, severelyWasted: 2.0, wasted: 6.2, severelyUnderweight: 3.9, underweight: 17.3 },
    "Sumatera Barat": { severelyStunted: 7.2, stunted: 18.0, severelyWasted: 3.1, wasted: 7.3, severelyUnderweight: 5.8, underweight: 14.2 },
    "Riau": { severelyStunted: 4.9, stunted: 13.0, severelyWasted: 2.5, wasted: 6.3, severelyUnderweight: 4.1, underweight: 12.9 },
    "Jambi": { severelyStunted: 5.9, stunted: 13.0, severelyWasted: 2.1, wasted: 5.6, severelyUnderweight: 4.5, underweight: 12.5 },
    "Sumatera Selatan": { severelyStunted: 5.5, stunted: 13.4, severelyWasted: 1.9, wasted: 5.2, severelyUnderweight: 4.0, underweight: 11.5 },
    "Bengkulu": { severelyStunted: 5.0, stunted: 12.9, severelyWasted: 2.0, wasted: 5.5, severelyUnderweight: 4.2, underweight: 13.0 },
    "Lampung": { severelyStunted: 4.5, stunted: 10.7, severelyWasted: 1.8, wasted: 4.5, severelyUnderweight: 3.5, underweight: 11.5 },
    "Kep. Bangka Belitung": { severelyStunted: 5.1, stunted: 13.4, severelyWasted: 1.5, wasted: 4.0, severelyUnderweight: 3.1, underweight: 9.5 },
    "Kepulauan Riau": { severelyStunted: 4.7, stunted: 10.5, severelyWasted: 2.2, wasted: 6.1, severelyUnderweight: 4.3, underweight: 12.9 },
    "DKI Jakarta": { severelyStunted: 3.9, stunted: 10.9, severelyWasted: 1.9, wasted: 4.6, severelyUnderweight: 2.8, underweight: 8.0 },
    "Jawa Barat": { severelyStunted: 5.8, stunted: 14.2, severelyWasted: 2.0, wasted: 4.9, severelyUnderweight: 3.9, underweight: 10.5 },
    "Jawa Tengah": { severelyStunted: 5.9, stunted: 14.0, severelyWasted: 2.2, wasted: 5.5, severelyUnderweight: 4.0, underweight: 12.0 },
    "DI Yogyakarta": { severelyStunted: 4.8, stunted: 11.2, severelyWasted: 1.8, wasted: 5.0, severelyUnderweight: 3.2, underweight: 9.8 },
    "Jawa Timur": { severelyStunted: 5.5, stunted: 13.5, severelyWasted: 2.5, wasted: 6.4, severelyUnderweight: 4.5, underweight: 12.5 },
    "Banten": { severelyStunted: 6.4, stunted: 17.6, severelyWasted: 2.1, wasted: 5.7, severelyUnderweight: 4.8, underweight: 14.0 },
    "Bali": { severelyStunted: 1.9, stunted: 5.6, severelyWasted: 1.5, wasted: 5.0, severelyUnderweight: 2.5, underweight: 8.0 },
    "Nusa Tenggara Barat": { severelyStunted: 9.0, stunted: 22.9, severelyWasted: 4.0, wasted: 9.6, severelyUnderweight: 6.9, underweight: 17.0 },
    "Nusa Tenggara Timur": { severelyStunted: 10.2, stunted: 25.0, severelyWasted: 4.1, wasted: 9.8, severelyUnderweight: 8.0, underweight: 17.2 },
    "Kalimantan Barat": { severelyStunted: 7.8, stunted: 19.0, severelyWasted: 3.0, wasted: 7.5, severelyUnderweight: 6.1, underweight: 15.0 },
    "Kalimantan Tengah": { severelyStunted: 7.0, stunted: 19.8, severelyWasted: 2.8, wasted: 6.8, severelyUnderweight: 5.5, underweight: 14.0 },
    "Kalimantan Selatan": { severelyStunted: 7.1, stunted: 16.9, severelyWasted: 3.2, wasted: 8.0, severelyUnderweight: 5.8, underweight: 14.2 },
    "Kalimantan Timur": { severelyStunted: 5.8, stunted: 16.1, severelyWasted: 2.3, wasted: 5.7, severelyUnderweight: 4.4, underweight: 11.6 },
    "Kalimantan Utara": { severelyStunted: 5.6, stunted: 15.4, severelyWasted: 2.0, wasted: 5.3, severelyUnderweight: 4.0, underweight: 11.0 },
    "Sulawesi Utara": { severelyStunted: 6.0, stunted: 16.5, severelyWasted: 2.5, wasted: 6.0, severelyUnderweight: 5.0, underweight: 13.5 },
    "Sulawesi Tengah": { severelyStunted: 8.5, stunted: 20.0, severelyWasted: 3.5, wasted: 8.5, severelyUnderweight: 7.0, underweight: 17.0 },
    "Sulawesi Selatan": { severelyStunted: 7.5, stunted: 20.0, severelyWasted: 2.8, wasted: 7.0, severelyUnderweight: 6.0, underweight: 15.5 },
    "Sulawesi Tenggara": { severelyStunted: 8.0, stunted: 22.0, severelyWasted: 3.3, wasted: 8.2, severelyUnderweight: 6.5, underweight: 16.5 },
    "Gorontalo": { severelyStunted: 6.9, stunted: 17.1, severelyWasted: 2.9, wasted: 7.1, severelyUnderweight: 5.9, underweight: 14.1 },
    "Sulawesi Barat": { severelyStunted: 9.8, stunted: 24.0, severelyWasted: 3.8, wasted: 9.2, severelyUnderweight: 7.8, underweight: 18.2 },
    "Maluku": { severelyStunted: 7.9, stunted: 18.9, severelyWasted: 3.9, wasted: 9.1, severelyUnderweight: 6.9, underweight: 16.1 },
    "Maluku Utara": { severelyStunted: 7.0, stunted: 17.0, severelyWasted: 3.0, wasted: 7.5, severelyUnderweight: 6.0, underweight: 15.0 },
    "Papua Barat": { severelyStunted: 9.5, stunted: 22.5, severelyWasted: 4.0, wasted: 9.5, severelyUnderweight: 8.0, underweight: 19.0 },
    "Papua Barat Daya": { severelyStunted: 9.0, stunted: 21.0, severelyWasted: 3.8, wasted: 9.2, severelyUnderweight: 7.5, underweight: 18.5 },
    "Papua": { severelyStunted: 10.0, stunted: 24.0, severelyWasted: 4.5, wasted: 10.5, severelyUnderweight: 8.5, underweight: 20.5 },
    "Papua Selatan": { severelyStunted: 10.5, stunted: 24.5, severelyWasted: 4.8, wasted: 11.2, severelyUnderweight: 9.0, underweight: 21.0 },
    "Papua Tengah": { severelyStunted: 11.0, stunted: 25.0, severelyWasted: 5.0, wasted: 11.5, severelyUnderweight: 9.5, underweight: 21.5 },
    "Papua Pegunungan": { severelyStunted: 12.0, stunted: 28.0, severelyWasted: 5.5, wasted: 12.5, severelyUnderweight: 10.0, underweight: 23.0 },
};

const aktaData = {
    "Aceh": "94,44", "Sumatera Utara": "79,21", "Sumatera Barat": "90,96", "Riau": "85,20", "Jambi": "91,33", 
    "Sumatera Selatan": "88,96", "Bengkulu": "91,53", "Lampung": "92,14", "Kep. Bangka Belitung": "93,20", 
    "Kepulauan Riau": "91,98", "DKI Jakarta": "97,17", "Jawa Barat": "84,97", "Jawa Tengah": "95,75", 
    "DI Yogyakarta": "98,24", "Jawa Timur": "92,25", "Banten": "85,41", "Bali": "91,24", 
    "Nusa Tenggara Barat": "84,27", "Nusa Tenggara Timur": "63,41", "Kalimantan Barat": "90,35", 
    "Kalimantan Tengah": "86,03", "Kalimantan Selatan": "89,44", "Kalimantan Timur": "93,24", 
    "Kalimantan Utara": "91,68", "Sulawesi Utara": "86,16", "Sulawesi Tengah": "82,99", 
    "Sulawesi Selatan": "89,31", "Sulawesi Tenggara": "82,71", "Gorontalo": "90,36", 
    "Sulawesi Barat": "87,65", "Maluku": "72,84", "Maluku Utara": "74,07", "Papua Barat": "69,55", 
    "Papua Barat Daya": "70,68", "Papua": "72,01", "Papua Selatan": "52,46", "Papua Tengah": "53,60", 
    "Papua Pegunungan": "17,04"
};

const idlData = {
    "Aceh": "25.88", "Sumatera Utara": "41.12", "Sumatera Barat": "39.76", "Riau": "45.63", "Jambi": "53.68", 
    "Sumatera Selatan": "54.47", "Bengkulu": "72.16", "Lampung": "74.4", "Kep. Bangka Belitung": "73.39", 
    "Kepulauan Riau": "70.99", "DKI Jakarta": "66.07", "Jawa Barat": "64.51", "Jawa Tengah": "75.46", 
    "DI Yogyakarta": "85.58", "Jawa Timur": "75.27", "Banten": "51.23", "Bali": "82.09", "Nusa Tenggara Barat": "71.38", 
    "Nusa Tenggara Timur": "72.35", "Kalimantan Barat": "54.52", "Kalimantan Tengah": "56.73", "Kalimantan Selatan": "70.57", 
    "Kalimantan Timur": "70.15", "Kalimantan Utara": "57.69", "Sulawesi Utara": "68.03", "Sulawesi Tengah": "61.62", 
    "Sulawesi Selatan": "68.85", "Sulawesi Tenggara": "72.44", "Gorontalo": "71.47", "Sulawesi Barat": "58.82", 
    "Maluku": "60.49", "Maluku Utara": "53.49", "Papua Barat": "57.73", "Papua Barat Daya": "50.01", "Papua": "51.82", 
    "Papua Selatan": "62.64", "Papua Tengah": "34.6", "Papua Pegunungan": "NA"
};

const kemiskinanData = {
    "Aceh": "18,55", "Sumatera Utara": "12,81", "Sumatera Barat": "9,01", "Riau": "9,14", "Jambi": "9,85", 
    "Sumatera Selatan": "14,35", "Bengkulu": "20,12", "Lampung": "15,82", "Kep. Bangka Belitung": "7,01", 
    "Kepulauan Riau": "5,78", "DKI Jakarta": "7,13", "Jawa Barat": "9,95", "Jawa Tengah": "14,22", 
    "DI Yogyakarta": "16,39", "Jawa Timur": "13,02", "Banten": "8,88", "Bali": "5,31", "Nusa Tenggara Barat": "16,42", 
    "Nusa Tenggara Timur": "25,51", "Kalimantan Barat": "7,96", "Kalimantan Tengah": "6,85", "Kalimantan Selatan": "5,42", 
    "Kalimantan Timur": "8,47", "Kalimantan Utara": "10,34", "Sulawesi Utara": "10,72", "Sulawesi Tengah": "16,46", 
    "Sulawesi Selatan": "10,90", "Sulawesi Tenggara": "17,16", "Gorontalo": "19,93", "Sulawesi Barat": "15,83", 
    "Maluku": "22,88", "Maluku Utara": "7,44", "Papua Barat": "27,46", "Papua Barat Daya": "24,34", "Papua": "23,99", 
    "Papua Selatan": "25,09", "Papua Tengah": "33,41", "Papua Pegunungan": "35,24"
};

const pkhData = {
    "Aceh": "21,24", "Sumatera Utara": "13,36", "Sumatera Barat": "17,19", "Riau": "12,02", "Jambi": "11,24", 
    "Sumatera Selatan": "14,98", "Bengkulu": "17,72", "Lampung": "20,50", "Kep. Bangka Belitung": "7,72", 
    "Kepulauan Riau": "6,69", "DKI Jakarta": "4,04", "Jawa Barat": "12,77", "Jawa Tengah": "19,42", 
    "DI Yogyakarta": "17,26", "Jawa Timur": "15,20", "Banten": "11,66", "Bali": "6,78", "Nusa Tenggara Barat": "23,49", 
    "Nusa Tenggara Timur": "31,76", "Kalimantan Barat": "13,50", "Kalimantan Tengah": "6,38", "Kalimantan Selatan": "7,86", 
    "Kalimantan Timur": "5,33", "Kalimantan Utara": "10,36", "Sulawesi Utara": "15,33", "Sulawesi Tengah": "23,99", 
    "Sulawesi Selatan": "19,58", "Sulawesi Tenggara": "23,75", "Gorontalo": "28,12", "Sulawesi Barat": "24,70", 
    "Maluku": "22,75", "Maluku Utara": "12,44", "Papua Barat": "15,85", "Papua Barat Daya": "15,70", "Papua": "14,07", 
    "Papua Selatan": "5,23", "Papua Tengah": "3,59", "Papua Pegunungan": "10,29"
};

const sanitasiData = {
    "Aceh": { air: "89,95", sanitasi: "79,41", cuci: "74,45" },
    "Sumatera Utara": { air: "92,09", sanitasi: "84,54", cuci: "73,97" },
    "Sumatera Barat": { air: "84,83", sanitasi: "71,11", cuci: "87,36" },
    "Riau": { air: "92,03", sanitasi: "85,07", cuci: "75,07" },
    "Jambi": { air: "81,63", sanitasi: "83,40", cuci: "74,18" },
    "Sumatera Selatan": { air: "86,42", sanitasi: "82,87", cuci: "77,92" },
    "Bengkulu": { air: "72,09", sanitasi: "82,37", cuci: "81,75" },
    "Lampung": { air: "83,65", sanitasi: "86,04", cuci: "81,88" },
    "Kep. Bangka Belitung": { air: "80,60", sanitasi: "95,56", cuci: "90,70" },
    "Kepulauan Riau": { air: "94,65", sanitasi: "92,33", cuci: "88,06" },
    "DKI Jakarta": { air: "99,99", sanitasi: "93,91", cuci: "80,11" },
    "Jawa Barat": { air: "95,07", sanitasi: "74,51", cuci: "83,48" },
    "Jawa Tengah": { air: "95,53", sanitasi: "85,67", cuci: "87,80" },
    "DI Yogyakarta": { air: "97,92", sanitasi: "97,51", cuci: "86,48" },
    "Jawa Timur": { air: "97,51", sanitasi: "86,63", cuci: "85,83" },
    "Banten": { air: "94,27", sanitasi: "85,49", cuci: "83,79" },
    "Bali": { air: "97,97", sanitasi: "97,72", cuci: "92,22" },
    "Nusa Tenggara Barat": { air: "95,76", sanitasi: "88,22", cuci: "77,30" },
    "Nusa Tenggara Timur": { air: "88,23", sanitasi: "76,06", cuci: "43,25" },
    "Kalimantan Barat": { air: "81,18", sanitasi: "82,37", cuci: "79,27" },
    "Kalimantan Tengah": { air: "78,48", sanitasi: "78,70", cuci: "75,56" },
    "Kalimantan Selatan": { air: "75,91", sanitasi: "83,17", cuci: "84,26" },
    "Kalimantan Timur": { air: "88,64", sanitasi: "91,53", cuci: "79,20" },
    "Kalimantan Utara": { air: "88,03", sanitasi: "83,37", cuci: "77,83" },
    "Sulawesi Utara": { air: "93,26", sanitasi: "87,00", cuci: "87,93" },
    "Sulawesi Tengah": { air: "86,00", sanitasi: "75,99", cuci: "80,06" },
    "Sulawesi Selatan": { air: "92,42", sanitasi: "94,12", cuci: "85,40" },
    "Sulawesi Tenggara": { air: "95,24", sanitasi: "90,61", cuci: "87,46" },
    "Gorontalo": { air: "95,92", sanitasi: "83,41", cuci: "79,99" },
    "Sulawesi Barat": { air: "80,48", sanitasi: "81,90", cuci: "80,84" },
    "Maluku": { air: "93,99", sanitasi: "79,24", cuci: "73,12" },
    "Maluku Utara": { air: "89,20", sanitasi: "81,54", cuci: "84,46" },
    "Papua Barat": { air: "83,40", sanitasi: "75,63", cuci: "66,70" },
    "Papua Barat Daya": { air: "81,74", sanitasi: "75,53", cuci: "63,44" },
    "Papua": { air: "85,38", sanitasi: "80,69", cuci: "68,62" },
    "Papua Selatan": { air: "71,45", sanitasi: "56,59", cuci: "47,91" },
    "Papua Tengah": { air: "85,79", sanitasi: "58,78", cuci: "37,03" },
    "Papua Pegunungan": { air: "32,62", sanitasi: "14,39", cuci: "3,66" }
};

const populationData = {
    "Papua Selatan": 4555551,
    "Nusa Tenggara Timur": 4063059,
    "Papua Barat": 3891888,
    "Sulawesi Tenggara": 3858855,
    "Kepulauan Riau": 3849846,
    "Sulawesi Barat": 3828825,
    "Papua Barat Daya": 3777774,
    "Nusa Tenggara Barat": 3774771,
    "Aceh": 3774771,
    "Maluku": 3717714,
    "Sumatera Barat": 3672669,
    "Riau": 3657654,
    "Sumatera Utara": 3630627,
    "Maluku Utara": 3606603,
    "Sulawesi Tengah": 3588585,
    "Sumatera Selatan": 3561558,
    "Kalimantan Utara": 3465462,
    "Jambi": 3456453,
    "Kalimantan Barat": 3414411,
    "Banten": 3399396,
    "Kalimantan Selatan": 3381378,
    "Bengkulu": 3363366,
    "Kep. Bangka Belitung": 3321318,
    "Kalimantan Tengah": 3303300,
    "Lampung": 3300297,
    "Kalimantan Timur": 3291288,
    "Papua": 3276273,
    "Jawa Barat": 3219216,
    "Sulawesi Selatan": 3216213,
    "Gorontalo": 3183180,
    "DKI Jakarta": 3180177,
    "Sulawesi Utara": 3039036,
    "Jawa Tengah": 2900898,
    "Jawa Timur": 2840838,
    "Bali": 2831829,
    "DI Yogyakarta": 2828826,
    "Papua Tengah": 2468466,
    "Papua Pegunungan": 2120118
};

const paudParticipationRawData = {
    "Aceh": { "partisipasi_0_6": "26,60", "partisipasi_pra_sd": "96,89" },
    "Sumatera Utara": { "partisipasi_0_6": "21,73", "partisipasi_pra_sd": "96,93" },
    "Sumatera Barat": { "partisipasi_0_6": "21,89", "partisipasi_pra_sd": "96,76" },
    "Riau": { "partisipasi_0_6": "20,11", "partisipasi_pra_sd": "93,82" },
    "Jambi": { "partisipasi_0_6": "27,09", "partisipasi_pra_sd": "96,52" },
    "Sumatera Selatan": { "partisipasi_0_6": "21,84", "partisipasi_pra_sd": "96,99" },
    "Bengkulu": { "partisipasi_0_6": "21,70", "partisipasi_pra_sd": "98,55" },
    "Lampung": { "partisipasi_0_6": "24,17", "partisipasi_pra_sd": "94,88" },
    "Kep. Bangka Belitung": { "partisipasi_0_6": "25,02", "partisipasi_pra_sd": "95,28" },
    "Kepulauan Riau": { "partisipasi_0_6": "20,40", "partisipasi_pra_sd": "84,29" },
    "DKI Jakarta": { "partisipasi_0_6": "28,88", "partisipasi_pra_sd": "93,14" },
    "Jawa Barat": { "partisipasi_0_6": "23,70", "partisipasi_pra_sd": "94,75" },
    "Jawa Tengah": { "partisipasi_0_6": "34,59", "partisipasi_pra_sd": "98,11" },
    "DI Yogyakarta": { "partisipasi_0_6": "46,71", "partisipasi_pra_sd": "99,98" },
    "Jawa Timur": { "partisipasi_0_6": "37,64", "partisipasi_pra_sd": "96,56" },
    "Banten": { "partisipasi_0_6": "22,23", "partisipasi_pra_sd": "93,72" },
    "Bali": { "partisipasi_0_6": "25,10", "partisipasi_pra_sd": "95,52" },
    "Nusa Tenggara Barat": { "partisipasi_0_6": "30,78", "partisipasi_pra_sd": "94,85" },
    "Nusa Tenggara Timur": { "partisipasi_0_6": "27,69", "partisipasi_pra_sd": "94,70" },
    "Kalimantan Barat": { "partisipasi_0_6": "18,86", "partisipasi_pra_sd": "94,34" },
    "Kalimantan Tengah": { "partisipasi_0_6": "28,35", "partisipasi_pra_sd": "96,03" },
    "Kalimantan Selatan": { "partisipasi_0_6": "32,63", "partisipasi_pra_sd": "97,98" },
    "Kalimantan Timur": { "partisipasi_0_6": "21,68", "partisipasi_pra_sd": "92,99" },
    "Kalimantan Utara": { "partisipasi_0_6": "25,34", "partisipasi_pra_sd": "96,88" },
    "Sulawesi Utara": { "partisipasi_0_6": "25,57", "partisipasi_pra_sd": "97,70" },
    "Sulawesi Tengah": { "partisipasi_0_6": "27,10", "partisipasi_pra_sd": "94,70" },
    "Sulawesi Selatan": { "partisipasi_0_6": "24,39", "partisipasi_pra_sd": "97,70" },
    "Sulawesi Tenggara": { "partisipasi_0_6": "25,56", "partisipasi_pra_sd": "95,39" },
    "Gorontalo": { "partisipasi_0_6": "34,60", "partisipasi_pra_sd": "97,37" },
    "Sulawesi Barat": { "partisipasi_0_6": "31,32", "partisipasi_pra_sd": "97,00" },
    "Maluku": { "partisipasi_0_6": "24,37", "partisipasi_pra_sd": "92,91" },
    "Maluku Utara": { "partisipasi_0_6": "29,15", "partisipasi_pra_sd": "95,30" },
    "Papua Barat": { "partisipasi_0_6": "25,72", "partisipasi_pra_sd": "88,27" },
    "Papua Barat Daya": { "partisipasi_0_6": "16,99", "partisipasi_pra_sd": "92,99" },
    "Papua": { "partisipasi_0_6": "18,71", "partisipasi_pra_sd": "84,32" },
    "Papua Selatan": { "partisipasi_0_6": "14,21", "partisipasi_pra_sd": "68,03" },
    "Papua Tengah": { "partisipasi_0_6": "10,18", "partisipasi_pra_sd": "44,26" },
    "Papua Pegunungan": { "partisipasi_0_6": "2,62", "partisipasi_pra_sd": "39,54" }
};


const allProvinceNames = new Set([
    ...Object.keys(aktaData),
    ...Object.keys(bencanaRawData)
]);
const provinces = Array.from(allProvinceNames);


// --- MOCK DATA GENERATION LOGIC ---
export const regionsDetails: Record<string, RegionDetailData> = {};

// Create maps for easier lookup and normalization
const paudAccreditationMap = new Map();
paudAccreditationRawData.forEach(d => {
    let key = d.provinsi;
    if (key === 'Kepulauan Bangka Belitung') key = 'Kep. Bangka Belitung';
    paudAccreditationMap.set(key, d);
});

const paudTeacherQualificationMap = new Map();
paudTeacherQualificationRawData.forEach(d => {
    let key = d.provinsi;
    if (key === 'Kep. Riau') key = 'Kepulauan Riau';
    paudTeacherQualificationMap.set(key, d);
});


provinces.forEach(provName => {
    const id = generateId(provName);
    
    // Derive child population from existing PAUD data
    const accreditationData = paudAccreditationMap.get(provName);
    const teacherData = paudTeacherQualificationMap.get(provName);
    const participationData = paudParticipationRawData[provName as keyof typeof paudParticipationRawData];

    let childPopulation = 0; // Default to 0 if data is incomplete

    if (accreditationData && teacherData && participationData) {
        try {
            const numTeachers = teacherData.jumlah;
            const ratioString = accreditationData.rasio; // e.g., "1:12"
            const ratio = parseInt(ratioString.split(':')[1], 10);
            const participationString = participationData.partisipasi_0_6; // e.g., "26,60"
            const participation = parseFloat(participationString.replace(',', '.'));

            if (numTeachers && !isNaN(ratio) && !isNaN(participation) && participation > 0) {
                const studentsInPaud = numTeachers * ratio;
                childPopulation = Math.round(studentsInPaud / (participation / 100));
            }
        } catch (e) {
            console.warn(`Could not derive child population for ${provName}`, e);
            childPopulation = 0;
        }
    }

    // Helper to create metrics and calculate domain risk
    const createDomainMetrics = (metrics: (DomainMetric | null)[]): DomainMetrics => {
        const validMetrics = metrics.filter((m): m is DomainMetric => m !== null);
        let totalRisk = 0;
        // Only calculate risk based on main indicators, not sub-components
        const riskContributingMetrics = validMetrics.filter(m => !m.label.trim().startsWith('-'));
        
        riskContributingMetrics.forEach(m => {
            const value = typeof m.value === 'number' ? m.value : 0;
            let risk;
            if (m.maxValueForRisk) {
                const normalizedValue = Math.min(100, (value / m.maxValueForRisk) * 100);
                risk = m.higherIsBetter ? 100 - normalizedValue : normalizedValue;
            } else {
                risk = m.higherIsBetter ? 100 - value : value;
            }
            totalRisk += risk;
        });
        const riskScore = riskContributingMetrics.length > 0 ? parseFloat((totalRisk / riskContributingMetrics.length).toFixed(1)) : 50;
        return { riskScore, metrics: validMetrics };
    };
    
    // --- Parse real data ---
    const provNutrition = nutritionData[provName as keyof typeof nutritionData];
    
    // Calculate totals from components
    const vStunting = provNutrition ? parseFloat((provNutrition.severelyStunted + provNutrition.stunted).toFixed(1)) : null;
    const vWasting = provNutrition ? parseFloat((provNutrition.severelyWasted + provNutrition.wasted).toFixed(1)) : null;
    const vUnderweight = provNutrition ? parseFloat((provNutrition.severelyUnderweight + provNutrition.underweight).toFixed(1)) : null;

    // Get components for display
    const vSeverelyStunted = provNutrition ? provNutrition.severelyStunted : null;
    const vStunted = provNutrition ? provNutrition.stunted : null;
    const vSeverelyWasted = provNutrition ? provNutrition.severelyWasted : null;
    const vWasted = provNutrition ? provNutrition.wasted : null;
    const vSeverelyUnderweight = provNutrition ? provNutrition.severelyUnderweight : null;
    const vUnderweightComponent = provNutrition ? provNutrition.underweight : null;

    const provAnc = ancData[provName as keyof typeof ancData];
    const vAnc = provAnc ? provAnc.anc : null;
    const vPersalinan = provAnc ? provAnc.persalinan : null;

    const vAkta = parseValue(aktaData[provName as keyof typeof aktaData]);
    
    let provKasusName = provName;
    if (provName === 'Kepulauan Riau') provKasusName = 'Kep. Riau';
    const vKasus = kasusPerlindunganAnakRawData[provKasusName as keyof typeof kasusPerlindunganAnakRawData] ?? 0;

    const vIdl = parseValue(idlData[provName as keyof typeof idlData]);
    const vKemiskinan = parseValue(kemiskinanData[provName as keyof typeof kemiskinanData]);
    const vPkh = parseValue(pkhData[provName as keyof typeof pkhData]);
    const sanData = sanitasiData[provName as keyof typeof sanitasiData];
    const vAir = parseValue(sanData?.air);
    const vSanitasi = parseValue(sanData?.sanitasi);
    const vCuci = parseValue(sanData?.cuci);
    const paudProvData = paudParticipationRawData[provName as keyof typeof paudParticipationRawData];
    const vPaud06 = parseValue(paudProvData?.partisipasi_0_6);
    const vPaudPraSD = parseValue(paudProvData?.partisipasi_pra_sd);

    // FIX: Add explicit type to provBencanaData to prevent property access error on empty object.
    const provBencanaData: { [key: string]: number } = bencanaRawData[provName as keyof typeof bencanaRawData] || {};
    const totalBencana = Object.values(provBencanaData).reduce((sum, count) => sum + count, 0);
    const vBanjir = provBencanaData.BANJIR || 0;
    const vCuacaEkstrem = provBencanaData["CUACA EKSTREM"] || 0;
    const vTanahLongsor = provBencanaData["TANAH LONGSOR"] || 0;

    // --- Mock missing data with plausible values ---
    const mockImunisasi = 70 + Math.random() * 25;

    // --- Create domain structures ---
    const kesehatan = createDomainMetrics([
        { label: 'Cakupan Imunisasi Dasar', value: parseFloat(mockImunisasi.toFixed(1)), unit: '%', nationalAverage: 85, higherIsBetter: true },
        vStunting !== null ? { label: 'Prevalensi Stunting (TB/U)', value: vStunting, unit: '%', nationalAverage: 21.8, higherIsBetter: false } : null,
        vSeverelyStunted !== null ? { label: '   - Sangat Pendek', value: vSeverelyStunted, unit: '%', nationalAverage: 7.0, higherIsBetter: false } : null,
        vStunted !== null ? { label: '   - Pendek', value: vStunted, unit: '%', nationalAverage: 14.8, higherIsBetter: false } : null,
        vAnc !== null ? { label: 'Kunjungan ANC K4', value: vAnc, unit: '%', nationalAverage: 93.5, higherIsBetter: true } : null,
        vPersalinan !== null ? { label: 'Persalinan oleh Nakes', value: vPersalinan, unit: '%', nationalAverage: 90.3, higherIsBetter: true } : null
    ]);
    const gizi = createDomainMetrics([
        vWasting !== null ? { label: 'Gizi Buruk (Wasting, BB/TB)', value: vWasting, unit: '%', nationalAverage: 7.7, higherIsBetter: false } : null,
        vSeverelyWasted !== null ? { label: '   - Sangat Kurus', value: vSeverelyWasted, unit: '%', nationalAverage: 2.0, higherIsBetter: false } : null,
        vWasted !== null ? { label: '   - Kurus', value: vWasted, unit: '%', nationalAverage: 5.7, higherIsBetter: false } : null,
        vUnderweight !== null ? { label: 'Gizi Kurang (Underweight, BB/U)', value: vUnderweight, unit: '%', nationalAverage: 17.7, higherIsBetter: false } : null,
        vSeverelyUnderweight !== null ? { label: '   - Berat Badan Sangat Kurang', value: vSeverelyUnderweight, unit: '%', nationalAverage: 5.0, higherIsBetter: false } : null,
        vUnderweightComponent !== null ? { label: '   - Berat Badan Kurang', value: vUnderweightComponent, unit: '%', nationalAverage: 12.7, higherIsBetter: false } : null,
    ]);
    const pendidikan = createDomainMetrics([
        vIdl !== null ? { label: 'Indeks Literasi Dini (IDL)', value: vIdl, unit: '%', nationalAverage: 65, higherIsBetter: true } : null,
        vPaud06 !== null ? { label: 'Partisipasi PAUD (0–6 th)', value: vPaud06, unit: '%', nationalAverage: 27.3, higherIsBetter: true } : null,
        vPaudPraSD !== null ? { label: 'Partisipasi 1 Th Sebelum SD', value: vPaudPraSD, unit: '%', nationalAverage: 95.2, higherIsBetter: true } : null
    ]);
    const pengasuhan = createDomainMetrics([
        { label: 'Pengetahuan Pola Asuh', value: parseFloat((60 + Math.random() * 20).toFixed(1)), unit: '%', nationalAverage: 75, higherIsBetter: true }
    ]);
    const perlindungan = createDomainMetrics([
        vAkta !== null ? { label: 'Kepemilikan Akta Lahir', value: vAkta, unit: '%', nationalAverage: 88, higherIsBetter: true } : null,
        { label: 'Jumlah Kasus Kekerasan Anak', value: vKasus, unit: 'kasus', nationalAverage: 1000, higherIsBetter: false, maxValueForRisk: 5000 }
    ]);
    const kesejahteraan = createDomainMetrics([
        vKemiskinan !== null ? { label: 'Anak di Bawah Garis Kemiskinan', value: vKemiskinan, unit: '%', nationalAverage: 12.4, higherIsBetter: false } : null,
        vPkh !== null ? { label: 'Keluarga Penerima PKH', value: vPkh, unit: '%', nationalAverage: 15.1, higherIsBetter: false } : null
    ]);
    const lingkungan = createDomainMetrics([
        vAir !== null ? { label: 'Akses Air Minum Layak', value: vAir, unit: '%', nationalAverage: 91, higherIsBetter: true } : null,
        vSanitasi !== null ? { label: 'Akses Sanitasi Layak', value: vSanitasi, unit: '%', nationalAverage: 85, higherIsBetter: true } : null,
        vCuci !== null ? { label: 'Fasilitas Cuci Tangan', value: vCuci, unit: '%', nationalAverage: 78, higherIsBetter: true } : null
    ]);
    const bencana = createDomainMetrics([
        { label: 'Total Kejadian Bencana', value: totalBencana, unit: 'kejadian', nationalAverage: 100, higherIsBetter: false, maxValueForRisk: 500 },
        { label: 'Banjir', value: vBanjir, unit: 'kejadian', nationalAverage: 40, higherIsBetter: false },
        { label: 'Cuaca Ekstrem', value: vCuacaEkstrem, unit: 'kejadian', nationalAverage: 20, higherIsBetter: false },
        { label: 'Tanah Longsor', value: vTanahLongsor, unit: 'kejadian', nationalAverage: 10, higherIsBetter: false },
    ]);


    const domains = { Kesehatan: kesehatan, Gizi: gizi, Pendidikan: pendidikan, Pengasuhan: pengasuhan, Perlindungan: perlindungan, Kesejahteraan: kesejahteraan, Lingkungan: lingkungan, Bencana: bencana };
    const overallRisk = parseFloat(
        (Object.values(domains).reduce((sum, d) => sum + d.riskScore, 0) / Object.values(domains).length).toFixed(1)
    );

    regionsDetails[id] = {
        id,
        name: provName,
        overallRisk,
        population: childPopulation,
        activeAlertsCount: 0, // will be calculated later
        domains,
        historicalRisk: generateHistoricalData(overallRisk),
        kabupatenKotaIds: id === 'jawa-barat' ? ['kota-bandung', 'kab-bogor'] : (id === 'papua' ? ['kab-jayapura'] : [])
    };
});


// --- INTEGRATE NEW PAUD DATA & RECALCULATE RISK ---
const nameToIdMap = new Map(Object.values(regionsDetails).map(r => [r.name, r.id]));
paudAccreditationRawData.forEach(newProvData => {
    // Handle name variations for mapping
    const provNameKey = newProvData.provinsi === 'Kepulauan Bangka Belitung' ? 'Kep. Bangka Belitung' : newProvData.provinsi;
    const provinceId = nameToIdMap.get(provNameKey);

    if (provinceId && regionsDetails[provinceId]) {
        const province = regionsDetails[provinceId];
        // Update province name if it's the one we're correcting
        if (newProvData.provinsi === 'Kepulauan Bangka Belitung') {
            province.name = 'Kepulauan Bangka Belitung';
        }

        const educationMetrics = province.domains.Pendidikan.metrics;

        // Add new metrics for display
        educationMetrics.push({
            label: 'Jumlah Satuan PAUD',
            value: newProvData.jumlah,
            unit: '',
            nationalAverage: 1500, // Placeholder national average
            higherIsBetter: true,
        });
        educationMetrics.push({
            label: 'Persentase Akreditasi PAUD',
            value: newProvData.akreditasi,
            unit: '%',
            nationalAverage: 75,
            higherIsBetter: true,
        });
        const ratioValue = parseInt(newProvData.rasio.split(':')[1], 10);
        educationMetrics.push({
            label: 'Rasio Guru-Murid',
            value: `1:${ratioValue}`,
            unit: '',
            nationalAverage: 12,
            higherIsBetter: false, // Lower is better
        });
        
        // Recalculate Education Risk Score
        let totalRisk = 0;
        const riskMetrics: {value: number, higherIsBetter: boolean}[] = [];
        
        // Add existing metrics that are numbers
        educationMetrics.forEach(m => {
            if (typeof m.value === 'number') {
                // Exclude absolute numbers from simple risk calculation to avoid skew
                if (m.label !== 'Jumlah Satuan PAUD') {
                    riskMetrics.push({ value: m.value, higherIsBetter: m.higherIsBetter });
                }
            }
        });
        // Add the new ratio metric after parsing
        riskMetrics.push({ value: ratioValue, higherIsBetter: false });

        riskMetrics.forEach(m => {
            const risk = m.higherIsBetter ? 100 - m.value : m.value;
            totalRisk += risk;
        });
        
        const newEducationRiskScore = riskMetrics.length > 0 
            ? parseFloat((totalRisk / riskMetrics.length).toFixed(1)) 
            : province.domains.Pendidikan.riskScore;
        
        province.domains.Pendidikan.riskScore = newEducationRiskScore;
        
        // Recalculate Overall Risk Score
        const newOverallRisk = parseFloat(
            (Object.values(province.domains).reduce((sum, d) => sum + d.riskScore, 0) / Object.values(province.domains).length).toFixed(1)
        );
        province.overallRisk = newOverallRisk;
    }
});

// --- INTEGRATE PAUD TEACHER QUALIFICATION DATA & RECALCULATE RISK ---
paudTeacherQualificationRawData.forEach(teacherData => {
    let provNameKey = teacherData.provinsi;
    if (provNameKey === 'Kep. Riau') provNameKey = 'Kepulauan Riau';

    const provinceId = nameToIdMap.get(provNameKey);

    if (provinceId && regionsDetails[provinceId]) {
        const province = regionsDetails[provinceId];
        const educationMetrics = province.domains.Pendidikan.metrics;

        // Add new metrics for display
        educationMetrics.push({
            label: 'Jumlah Guru PAUD',
            value: teacherData.jumlah,
            unit: '',
            nationalAverage: 35000, // Placeholder
            higherIsBetter: true,
        });
        educationMetrics.push({
            label: 'Persentase Guru S1/D4',
            value: teacherData.persentase,
            unit: '%',
            nationalAverage: 94, // Placeholder
            higherIsBetter: true,
        });
        
        // Recalculate Education Risk Score
        let totalRisk = 0;
        const riskMetrics: {value: number, higherIsBetter: boolean}[] = [];
        
        educationMetrics.forEach(m => {
            if (typeof m.value === 'number') {
                if (m.label !== 'Jumlah Satuan PAUD' && m.label !== 'Jumlah Guru PAUD') {
                    riskMetrics.push({ value: m.value, higherIsBetter: m.higherIsBetter });
                }
            } else if (typeof m.value === 'string' && m.label === 'Rasio Guru-Murid' && m.value.includes(':')) {
                 const ratioValue = parseInt(m.value.split(':')[1], 10);
                 if (!isNaN(ratioValue)) {
                     riskMetrics.push({ value: ratioValue, higherIsBetter: false });
                 }
            }
        });

        riskMetrics.forEach(m => {
            const risk = m.higherIsBetter ? 100 - m.value : m.value;
            totalRisk += risk;
        });
        
        const newEducationRiskScore = riskMetrics.length > 0 
            ? parseFloat((totalRisk / riskMetrics.length).toFixed(1)) 
            : province.domains.Pendidikan.riskScore;
        
        province.domains.Pendidikan.riskScore = newEducationRiskScore;
        
        // Recalculate Overall Risk Score
        const newOverallRisk = parseFloat(
            (Object.values(province.domains).reduce((sum, d) => sum + d.riskScore, 0) / Object.values(province.domains).length).toFixed(1)
        );
        province.overallRisk = newOverallRisk;
    }
});


// --- DERIVED & OTHER MOCK DATA ---
export const kabupatenKotaDetails: Record<string, KabupatenKotaDetailData> = {
    'kota-bandung': {
        id: 'kota-bandung', name: 'Kota Bandung', parentRegionId: 'jawa-barat', overallRisk: 48.2, population: 945000, activeAlertsCount: 2,
        domains: JSON.parse(JSON.stringify(regionsDetails['jawa-barat'].domains)), // Deep copy and modify
        historicalRisk: generateHistoricalData(48.2)
    },
    'kab-bogor': {
        id: 'kab-bogor', name: 'Kab. Bogor', parentRegionId: 'jawa-barat', overallRisk: 61.5, population: 1995000, activeAlertsCount: 4,
        domains: JSON.parse(JSON.stringify(regionsDetails['jawa-barat'].domains)),
        historicalRisk: generateHistoricalData(61.5)
    },
    'kab-jayapura': {
        id: 'kab-jayapura', name: 'Kab. Jayapura', parentRegionId: 'papua', overallRisk: 78.9, population: 525000, activeAlertsCount: 6,
        domains: JSON.parse(JSON.stringify(regionsDetails['papua'].domains)),
        historicalRisk: generateHistoricalData(78.9)
    }
};
// Adjustments for specific kabupaten/kota data
kabupatenKotaDetails['kota-bandung'].domains.Pendidikan.riskScore = 35;
kabupatenKotaDetails['kab-bogor'].domains.Kesehatan.riskScore = 68;
kabupatenKotaDetails['kab-jayapura'].domains.Lingkungan.riskScore = 85;


export const allActiveAlerts: ActiveAlertData[] = Object.values(regionsDetails).flatMap(region => {
    const alerts: ActiveAlertData[] = [];
    Object.entries(region.domains).forEach(([domainName, domainData]) => {
        if (domainData.riskScore > 85) {
            alerts.push({ id: `${region.id}-${domainName}-crit`, level: AlertLevel.Critical, title: `Risiko Sangat Tinggi di Bidang ${domainName}`, region: region.name, domain: domainName as Domain, riskScore: domainData.riskScore });
        } else if (domainData.riskScore > 70) {
            alerts.push({ id: `${region.id}-${domainName}-high`, level: AlertLevel.High, title: `Risiko Tinggi di Bidang ${domainName}`, region: region.name, domain: domainName as Domain, riskScore: domainData.riskScore, trend: parseFloat(((Math.random()-0.2) * 5).toFixed(1)) });
        }
    });
    return alerts;
}).sort((a,b) => b.riskScore - a.riskScore);

// Update activeAlertsCount in regionsDetails
Object.values(regionsDetails).forEach(r => {
    r.activeAlertsCount = allActiveAlerts.filter(a => a.region === r.name).length;
})

export const nationalHistoricalRisk = generateHistoricalData(
    Object.values(regionsDetails).reduce((sum, r) => sum + r.overallRisk, 0) / provinces.length,
    6
);

export const regionalForecastData: RegionalForecastData[] = Object.values(regionsDetails).flatMap(region => 
    Object.entries(region.domains).map(([domainName, domainData]) => {
        const change = parseFloat(((Math.random() - 0.5) * 10).toFixed(1));
        const predictedRisk = Math.max(0, Math.min(100, domainData.riskScore + change));
        return {
            id: Math.random(),
            region: region.name,
            domain: domainName,
            currentRisk: domainData.riskScore,
            predictedRisk: predictedRisk,
            change: change,
            currentRiskLevel: domainData.riskScore > 70 ? 'Tinggi' : domainData.riskScore > 55 ? 'Sedang' : 'Rendah',
            predictedRiskLevel: predictedRisk > 70 ? 'Tinggi' : predictedRisk > 55 ? 'Sedang' : 'Rendah',
        }
    })
);

export const domainsData: Record<string, DomainData> = {};
const domainKeys: Domain[] = ['Kesehatan', 'Gizi', 'Pendidikan', 'Pengasuhan', 'Perlindungan', 'Kesejahteraan', 'Lingkungan', 'Bencana'];
domainKeys.forEach(domain => {
    const regionsForDomain = Object.values(regionsDetails).map(r => ({
        id: r.id,
        name: r.name,
        riskScore: r.domains[domain].riskScore,
        trend: parseFloat(((Math.random() - 0.5) * 5).toFixed(1))
    })).sort((a,b) => b.riskScore - a.riskScore);

    const indicators: DomainIndicatorData[] = regionsDetails['aceh'].domains[domain].metrics.map(metric => {
        const allValuesRaw = Object.values(regionsDetails).map(r => r.domains[domain]?.metrics.find(m => m.label === metric.label)?.value).filter(v => v !== undefined);
        
        // FIX: Improved logic to correctly parse different types of metric values (numbers, ratios, and numeric strings).
        const allValues = allValuesRaw.map(v => {
            if (typeof v === 'string') {
                if (v.includes(':')) {
                    return parseInt(v.split(':')[1], 10);
                }
                const parsed = parseFloat(v.replace(',', '.'));
                return isNaN(parsed) ? 0 : parsed;
            }
            return v;
        }).filter(v => v !== null && !isNaN(v as number));

        if (allValues.length === 0) {
            return {
                indicatorName: metric.label,
                nationalAverage: `${metric.nationalAverage}${metric.unit}`,
                bestPerformer: { name: 'N/A', value: `N/A` },
                worstPerformer: { name: 'N/A', value: `N/A` }
            }
        }

        const best = metric.higherIsBetter ? Math.max(...allValues) : Math.min(...allValues);
        const worst = metric.higherIsBetter ? Math.min(...allValues) : Math.max(...allValues);

        const bestPerformer = Object.values(regionsDetails).find(r => {
            const val = r.domains[domain]?.metrics.find(m => m.label === metric.label)?.value;
            if (typeof val === 'string' && val.includes(':')) {
                return parseInt(val.split(':')[1], 10) === best;
            }
            return val === best;
        });
        const worstPerformer = Object.values(regionsDetails).find(r => {
            const val = r.domains[domain]?.metrics.find(m => m.label === metric.label)?.value;
            if (typeof val === 'string' && val.includes(':')) {
                return parseInt(val.split(':')[1], 10) === worst;
            }
            return val === worst;
        });

        const formatValue = (v: number | string) => {
            if (metric.label.includes('Rasio')) return `1:${v}`;
            return `${v}${metric.unit}`;
        }

        return {
            indicatorName: metric.label,
            nationalAverage: formatValue(metric.nationalAverage),
            bestPerformer: { name: bestPerformer?.name || 'N/A', value: formatValue(best) },
            worstPerformer: { name: worstPerformer?.name || 'N/A', value: formatValue(worst) }
        }
    });

    domainsData[domain] = {
        id: domain,
        name: domain,
        averageRisk: parseFloat((regionsForDomain.reduce((sum, r) => sum + r.riskScore, 0) / regionsForDomain.length).toFixed(1)),
        criticalRegionsCount: regionsForDomain.filter(r => r.riskScore > 70).length,
        regions: regionsForDomain,
        topAlerts: allActiveAlerts.filter(a => a.domain === domain).slice(0, 3),
        indicators: indicators,
    };
});

const calculateWeightedNationalStunting = (): number => {
    let totalStuntingCases = 0;
    let totalPopulation = 0;

    Object.values(regionsDetails).forEach(region => {
        const stuntingMetric = region.domains.Kesehatan.metrics.find(m => m.label === 'Prevalensi Stunting (TB/U)');
        // The population is child population for the region
        if (stuntingMetric && typeof stuntingMetric.value === 'number' && region.population) {
            const stuntingPercentage = stuntingMetric.value;
            const population = region.population;
            
            // Calculate number of stunting cases in the region
            const stuntingCases = (stuntingPercentage / 100) * population;
            
            totalStuntingCases += stuntingCases;
            totalPopulation += population;
        }
    });

    if (totalPopulation === 0) {
        return 0; // Avoid division by zero
    }

    // Calculate national prevalence
    const nationalPrevalence = (totalStuntingCases / totalPopulation) * 100;
    return nationalPrevalence;
};

const calculateNationalAverage = (getter: (r: RegionDetailData) => number | null | undefined): KeyIndicatorData => {
    const values = Object.values(regionsDetails).map(getter).filter((v): v is number => v !== null && v !== undefined);
    const avg = values.reduce((s, v) => s + v, 0) / values.length;
    return {
        value: `${avg.toFixed(1)}%`,
        label: '', // will be set below
        change: parseFloat(((Math.random() - 0.5) * 5).toFixed(1)),
        changeType: Math.random() > 0.5 ? 'increase' : 'decrease',
        domain: 'Semua'
    }
}

const nationalStuntingPrevalence = calculateWeightedNationalStunting();
const previousNationalStuntingPrevalence = 24.1; // Plausible previous month's value (e.g., from SSGI 2022)
const stuntingChange = nationalStuntingPrevalence - previousNationalStuntingPrevalence;

const getChangeType = (change: number): 'increase' | 'decrease' | 'stable' => {
    if (Math.abs(change) < 0.1) return 'stable';
    if (change > 0) return 'increase';
    return 'decrease';
};

// For stunting, lower is better, so a negative change corresponds to a 'decrease' changeType, which is good.
const stuntingIndicator: KeyIndicatorData = {
    value: `${nationalStuntingPrevalence.toFixed(1)}%`,
    label: 'Prevalensi Stunting Nasional',
    change: parseFloat(stuntingChange.toFixed(1)),
    changeType: getChangeType(stuntingChange),
    domain: 'Semua' // This is a general indicator
};

export const keyIndicatorsByDomain: Record<DomainFilter, KeyIndicatorData[]> = {
    'Semua': [
        { ...stuntingIndicator, label: 'Prevalensi Stunting Nasional' },
        { ...calculateNationalAverage(r => r.domains.Pendidikan.metrics.find(m => m.label.includes('PAUD (0–6 th)'))?.value as number), label: 'Rata-rata Partisipasi PAUD Nasional' },
        { ...calculateNationalAverage(r => r.domains.Perlindungan.metrics.find(m => m.label.includes('Akta'))?.value as number), label: 'Rata-rata Kepemilikan Akta Lahir' }
    ],
    'Kesehatan': [
        { ...stuntingIndicator, domain: 'Kesehatan' },
        { ...calculateNationalAverage(r => r.domains.Kesehatan.metrics.find(m => m.label.includes('Imunisasi'))?.value as number), label: 'Cakupan Imunisasi' },
        { ...calculateNationalAverage(r => r.domains.Kesehatan.metrics.find(m => m.label.includes('ANC'))?.value as number), label: 'Kunjungan ANC K4' },
    ],
    'Gizi': [
        { ...calculateNationalAverage(r => r.domains.Gizi.metrics.find(m => m.label.includes('Wasting'))?.value as number), label: 'Gizi Buruk (Wasting)' },
        { ...calculateNationalAverage(r => r.domains.Gizi.metrics.find(m => m.label.includes('Underweight'))?.value as number), label: 'Gizi Kurang (Underweight)' },
    ],
    'Pendidikan': [
        { ...calculateNationalAverage(r => r.domains.Pendidikan.metrics.find(m => m.label.includes('PAUD (0–6 th)'))?.value as number), label: 'Partisipasi PAUD (0–6 th)' },
        { ...calculateNationalAverage(r => r.domains.Pendidikan.metrics.find(m => m.label.includes('Sebelum SD'))?.value as number), label: 'Partisipasi 1 Th Sebelum SD' },
        { ...calculateNationalAverage(r => r.domains.Pendidikan.metrics.find(m => m.label.includes('IDL'))?.value as number), label: 'Indeks Literasi Dini' }
    ],
    'Pengasuhan': [
        { ...calculateNationalAverage(r => r.domains.Pengasuhan.metrics.find(m => m.label.includes('Pengetahuan'))?.value as number), label: 'Pengetahuan Pola Asuh' },
    ],
    'Perlindungan': [
        { ...calculateNationalAverage(r => r.domains.Perlindungan.metrics.find(m => m.label.includes('Akta'))?.value as number), label: 'Kepemilikan Akta Lahir' }
    ],
    'Kesejahteraan': [
        { ...calculateNationalAverage(r => r.domains.Kesejahteraan.metrics.find(m => m.label.includes('Kemiskinan'))?.value as number), label: 'Anak di Bawah Garis Kemiskinan' }
    ],
    'Lingkungan': [
        { ...calculateNationalAverage(r => r.domains.Lingkungan.metrics.find(m => m.label.includes('Air'))?.value as number), label: 'Akses Air Minum Layak' },
        { ...calculateNationalAverage(r => r.domains.Lingkungan.metrics.find(m => m.label.includes('Sanitasi'))?.value as number), label: 'Akses Sanitasi Layak' }
    ],
    'Bencana': [
        { ...calculateNationalAverage(r => r.domains.Bencana.metrics.find(m => m.label.includes('Total'))?.value as number), label: 'Total Kejadian Bencana' }
    ],
};


export const paudParticipationData2024: any[] = Object.entries(paudParticipationRawData)
    .map(([provinsi, values]) => ({
        provinsi,
        partisipasiPaud0to6Th: parseValue(values.partisipasi_0_6),
        partisipasi1ThSebelumSD: parseValue(values.partisipasi_pra_sd),
    }));
export const riskAssessmentData: RiskAssessmentData[] = [];
export const forecastChartData: ForecastDataPoint[] = [];

export const getRegionDetails = (regionId: string): RegionDetailData | null => regionsDetails[regionId] || null;
export const getAvailableRegions = () => Object.values(regionsDetails).map(r => ({ id: r.id, name: r.name })).sort((a,b) => a.name.localeCompare(b.name));
export const getDomainData = (domainId: string): DomainData | null => domainsData[domainId] || null;

export const dataSources: DataSource[] = [
    { id: 'kemendikbud', name: 'Kemendikbud Ristek', status: 'connected', lastSync: 'Hari ini, 08:00' },
    { id: 'kemenkes', name: 'Kementerian Kesehatan', status: 'connected', lastSync: 'Hari ini, 08:05' },
    { id: 'kemensos', name: 'Kementerian Sosial', status: 'delayed', lastSync: 'Kemarin, 17:30' },
    { id: 'kemen-pppa', name: 'KemenPPPA', status: 'error', lastSync: '3 hari lalu' },
];

export const processingLogs: LogEntry[] = [
    { timestamp: '10:15:01', level: 'INFO', message: 'Data pipeline execution started.' },
    { timestamp: '10:15:05', level: 'INFO', message: 'Successfully fetched 38 records from Kemenkes API.' },
    { timestamp: '10:15:08', level: 'INFO', message: 'Successfully fetched 38 records from Kemendikbud API.' },
    { timestamp: '10:15:10', level: 'WARN', message: 'Kemensos API response delayed. Using cached data from 2024-06-29.' },
    { timestamp: '10:15:12', level: 'ERROR', message: 'Failed to connect to KemenPPPA API. Endpoint returned 503.' },
    { timestamp: '10:16:00', level: 'INFO', message: 'Data aggregation and cleaning complete.' },
    { timestamp: '10:17:30', level: 'INFO', message: 'Risk score recalculation finished for all regions.' },
    { timestamp: '10:17:32', level: 'INFO', message: 'Data pipeline execution finished successfully.' },
];

export const mockInterventionPlans: InterventionPlan[] = [];
export const mockResourceData: ResourceData = { sdm: [], anggaran: [], material: [], };
export const regionalRiskScores: RegionalRiskScore[] = Object.values(regionsDetails).map(r => ({ name: r.name, score: r.overallRisk }));

export const mockParentData: ParentData = {
    childProfile: { name: 'Anak Anda', age: 'Data belum ada', avatarUrl: 'https://i.pravatar.cc/150?u=defaultchild', lastWeight: null, lastHeight: null, },
    upcomingEvents: [], growthHistory: [], stimulationChecklist: [],
};