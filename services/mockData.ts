


import { RiskAssessmentData, KeyIndicatorData, ActiveAlertData, RiskCategory, AlertLevel, ForecastDataPoint, RegionalForecastData, RegionDetailData, DomainData, DataSource, LogEntry, InterventionPlan, InterventionStatus, InterventionPriority, RegionalRiskScore, DomainFilter, ResourceData, Domain, RegionPerformance, DomainIndicatorData, DomainMetric, ParentData, KabupatenKotaDetailData, DomainMetrics } from '../types';

export const riskAssessmentData: RiskAssessmentData[] = [
    { category: RiskCategory.Complete, count: 367, color: 'bg-emerald-500' },
    { category: RiskCategory.Medium, count: 142, color: 'bg-yellow-500' },
    { category: RiskCategory.Low, count: 23, color: 'bg-orange-500' },
    { category: RiskCategory.Critical, count: 6, color: 'bg-red-500' },
];

export const keyIndicatorsByDomain: Record<DomainFilter, KeyIndicatorData[]> = {
    'Semua': [
        { value: '78.5%', label: 'Cakupan Imunisasi Dasar', change: 2.3, changeType: 'increase', domain: 'Semua' },
        { value: '21.6%', label: 'Prevalensi Stunting', change: -1.2, changeType: 'decrease', domain: 'Semua' },
        { value: '72.3', label: 'Indeks Pembangunan Manusia (IPM)', change: 0.2, changeType: 'increase', domain: 'Kesejahteraan' },
        { value: '90.3%', label: 'Pemeriksaan Antenatal (K4)', change: 1.5, changeType: 'increase', domain: 'Semua' },
    ],
    'Kesehatan': [
        { value: '78.5%', label: 'Cakupan Imunisasi Dasar', change: 2.3, changeType: 'increase', domain: 'Kesehatan' },
        { value: '91.0%', label: 'Persalinan di Faskes', change: 0.5, changeType: 'increase', domain: 'Kesehatan' },
        { value: '12.4%', label: 'Prevalensi Diare', change: -0.8, changeType: 'decrease', domain: 'Kesehatan' },
        { value: '21/1000', label: 'Angka Kematian Bayi (AKB)', change: -0.5, changeType: 'decrease', domain: 'Kesehatan'},
        { value: '90.3%', label: 'Pemeriksaan Antenatal (K4)', change: 1.5, changeType: 'increase', domain: 'Kesehatan'},
        { value: '82.1%', label: 'Kunjungan Pasca Melahirkan', change: 2.1, changeType: 'increase', domain: 'Kesehatan'},
        { value: '89.2%', label: 'Perawatan Anak Pneumonia', change: 0.9, changeType: 'increase', domain: 'Kesehatan'},
        { value: '95.5%', label: 'Penanganan Ibu Hamil HIV+', change: 0.5, changeType: 'increase', domain: 'Kesehatan'},
    ],
    'Gizi': [
        { value: '21.6%', label: 'Prevalensi Stunting', change: -1.2, changeType: 'decrease', domain: 'Gizi' },
        { value: '88.3%', label: 'Pemberian ASI Eksklusif', change: 3.1, changeType: 'increase', domain: 'Gizi' },
        { value: '7.1%', label: 'Gizi Buruk (Wasting)', change: -0.5, changeType: 'decrease', domain: 'Gizi' },
        { value: '28.4%', label: 'Anemia pada Ibu Hamil', change: 0.3, changeType: 'increase', domain: 'Gizi'},
    ],
    'Pengasuhan': [
       { value: '85.2%', label: 'Partisipasi PAUD', change: 1.8, changeType: 'increase', domain: 'Pengasuhan' },
       { value: '75.6%', label: 'Stimulasi Dini (SDIDTK)', change: 4.2, changeType: 'increase', domain: 'Pengasuhan' },
       { value: '68.0%', label: 'Keluarga Paham Pola Asuh', change: 2.0, changeType: 'increase', domain: 'Pengasuhan' },
       { value: '45.1%', label: 'Keluarga Terapkan Batas Screen-Time', change: 5.1, changeType: 'increase', domain: 'Pengasuhan'},
    ],
    'Perlindungan': [
        { value: '92.1%', label: 'Kepemilikan Akta Lahir', change: 1.5, changeType: 'increase', domain: 'Perlindungan' },
        { value: '3.4%', label: 'Prevalensi Perkawinan Anak', change: -0.4, changeType: 'decrease', domain: 'Perlindungan' },
        { value: '8.7%', label: 'Tingkat Kekerasan pada Anak', change: 0.2, changeType: 'increase', domain: 'Perlindungan' },
        { value: '4.2%', label: 'Prevalensi Pekerja Anak', change: -0.1, changeType: 'decrease', domain: 'Perlindungan'},
    ],
    'Kesejahteraan': [
        { value: '72.3', label: 'Indeks Pembangunan Manusia (IPM)', change: 0.2, changeType: 'increase', domain: 'Kesejahteraan' },
        { value: '82.5%', label: 'Akses Air Bersih Layak', change: 2.1, changeType: 'increase', domain: 'Kesejahteraan' },
        { value: '79.8%', label: 'Akses Sanitasi Layak', change: 2.5, changeType: 'increase', domain: 'Kesejahteraan' },
        { value: '95.3%', label: 'Keluarga dengan Jaminan Sosial', change: 3.0, changeType: 'increase', domain: 'Kesejahteraan' },
    ],
    'Lingkungan': [
        { value: 'Sedang', label: 'Indeks Risiko Bencana (BNPB)', change: 0.5, changeType: 'increase', domain: 'Lingkungan' },
        { value: '82 AQI', label: 'Kualitas Udara Rata-rata (BMKG)', change: 3, changeType: 'increase', domain: 'Lingkungan' },
        { value: '4.2 M', label: 'Gempa Terkini Dirasakan (BMKG)', change: 0, changeType: 'stable', domain: 'Lingkungan' },
        { value: 'Siaga', label: 'Peringatan Dini Cuaca (BMKG)', change: 0, changeType: 'stable', domain: 'Lingkungan' },
    ]
};


export const allActiveAlerts: ActiveAlertData[] = [
    { id: 'alert-1', level: AlertLevel.High, title: 'Cakupan Imunisasi Rendah', region: 'Papua', domain: 'Kesehatan', riskScore: 85, target: 90 },
    { id: 'alert-17', level: AlertLevel.High, title: 'Wabah DBD', region: 'Kota Surabaya', domain: 'Kesehatan', riskScore: 76, trend: 20 },
    { id: 'alert-3', level: AlertLevel.Critical, title: 'Lonjakan Stunting', region: 'Nusa Tenggara Timur', domain: 'Gizi', riskScore: 91, trend: 5 },
    { id: 'alert-4', level: AlertLevel.High, title: 'Akses PAUD Terbatas', region: 'Sulawesi Barat', domain: 'Pengasuhan', riskScore: 72 },
    { id: 'alert-5', level: AlertLevel.Medium, title: 'Kekerasan Anak', region: 'Banten', domain: 'Perlindungan', riskScore: 68, trend: 8 },
    { id: 'alert-6', level: AlertLevel.High, title: 'Sanitasi Buruk', region: 'Aceh', domain: 'Kesejahteraan', riskScore: 78 },
    { id: 'alert-7', level: AlertLevel.Critical, title: 'Gizi Buruk Akut', region: 'Kab. Asmat', domain: 'Gizi', riskScore: 95, trend: 9 },
    { id: 'alert-8', level: AlertLevel.Medium, title: 'Penurunan Partisipasi PAUD', region: 'Kalimantan Timur', domain: 'Pengasuhan', riskScore: 65, trend: -3 },
    { id: 'alert-9', level: AlertLevel.High, title: 'Angka Perkawinan Anak Tinggi', region: 'Kab. Indramayu', domain: 'Perlindungan', riskScore: 81 },
    { id: 'alert-10', level: AlertLevel.High, title: 'Angka Anemia Ibu Hamil Tinggi', region: 'Nusa Tenggara Barat', domain: 'Gizi', riskScore: 79, trend: 4 },
    { id: 'alert-11', level: AlertLevel.Critical, title: 'Kualitas Udara Buruk (Kabut Asap)', region: 'Riau', domain: 'Kesehatan', riskScore: 88, trend: 25 },
    { id: 'alert-12', level: AlertLevel.Medium, title: 'Akses Air Bersih Kritis', region: 'Kab. Gunungkidul', domain: 'Kesejahteraan', riskScore: 73 },
    { id: 'alert-13', level: AlertLevel.High, title: 'Pekerja Anak Sektor Informal', region: 'Kalimantan Barat', domain: 'Perlindungan', riskScore: 75, trend: 2 },
    { id: 'alert-14', level: AlertLevel.Medium, title: 'Kepadatan & Sanitasi Pemukiman', region: 'Kota Adm. Jakarta Timur', domain: 'Kesejahteraan', riskScore: 69 },
    { id: 'alert-15', level: AlertLevel.High, title: 'Potensi Banjir Rob', region: 'Kota Adm. Jakarta Utara', domain: 'Lingkungan', riskScore: 75, target: 0, trend: 10 },
    { id: 'alert-16', level: AlertLevel.Medium, title: 'Kekeringan Lahan Pertanian', region: 'Nusa Tenggara Timur', domain: 'Lingkungan', riskScore: 68, trend: 5 },
    { id: 'alert-18', level: AlertLevel.Critical, title: 'Risiko Gempa & Tsunami', region: 'Kota Palu', domain: 'Lingkungan', riskScore: 89, trend: 2 },
    { id: 'alert-19', level: AlertLevel.High, title: 'Tingkat Stunting Tinggi', region: 'Kab. Brebes', domain: 'Gizi', riskScore: 79, trend: 3 },
    { id: 'alert-20', level: AlertLevel.Critical, title: 'Akses Kesehatan Sangat Terbatas', region: 'Kab. Nias Utara', domain: 'Kesehatan', riskScore: 94, trend: 6 },
];

export const forecastChartData: ForecastDataPoint[] = [
    { month: 'Jan', actual: 68, predicted: 68, predicted_upper: 68, predicted_lower: 68 },
    { month: 'Feb', actual: 70, predicted: 70, predicted_upper: 70, predicted_lower: 70 },
    { month: 'Mar', actual: 69, predicted: 69, predicted_upper: 69, predicted_lower: 69 },
    { month: 'Apr', actual: 72, predicted: 72, predicted_upper: 72, predicted_lower: 72 },
    { month: 'May', actual: 71, predicted: 71, predicted_upper: 71, predicted_lower: 71 },
    { month: 'Jun', actual: 73, predicted: 73, predicted_upper: 73, predicted_lower: 73 },
    { month: 'Jul', actual: null, predicted: 75, predicted_upper: 78, predicted_lower: 72 },
    { month: 'Aug', actual: null, predicted: 76, predicted_upper: 80, predicted_lower: 72 },
    { month: 'Sep', actual: null, predicted: 78, predicted_upper: 83, predicted_lower: 73 },
];

// --- Mock Data for Data Per Wilayah ---
export const nationalHistoricalRisk = [
    { month: 'Jan', score: 65 }, { month: 'Feb', score: 66 }, { month: 'Mar', score: 65 },
    { month: 'Apr', score: 67 }, { month: 'May', score: 66 }, { month: 'Jun', score: 68 }
];

// --- DATA GENERATION LOGIC ---

// Helper to create kebab-case ID from a name
const toKebabCase = (str: string) => str.toLowerCase()
  .replace(/ /g, '-')
  .replace(/[().]/g, '')
  .replace(/[^a-z0-9-]/g, '');

// Helper to generate a random integer within a range
const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate plausible metrics for a given domain and base risk score
const generateDomainMetrics = (baseRisk: number, domain: Domain): DomainMetrics => {
    const score = Math.max(0, Math.min(100, baseRisk + rand(-8, 8)));
    let metrics: DomainMetric[] = [];
    switch(domain) {
        case 'Kesehatan':
            metrics = [
                { label: 'Cakupan Imunisasi', value: Math.max(40, Math.min(100, 100 - score + rand(-10, 10))), unit: '%', nationalAverage: 85, higherIsBetter: true },
                { label: 'Prevalensi ISPA', value: Math.max(5, Math.min(40, score/3 + rand(-5, 5))), unit: '%', nationalAverage: 15, higherIsBetter: false }
            ]; break;
        case 'Gizi':
            metrics = [
                { label: 'Prevalensi Stunting', value: Math.max(10, Math.min(50, score/2 + rand(-5, 5))), unit: '%', nationalAverage: 28, higherIsBetter: false },
                { label: 'Gizi Buruk', value: Math.max(2, Math.min(25, score/4 + rand(-3, 3))), unit: '%', nationalAverage: 7, higherIsBetter: false }
            ]; break;
        case 'Pengasuhan':
            metrics = [
                { label: 'Akses PAUD', value: Math.max(30, Math.min(95, 100 - score + rand(-10, 10))), unit: '%', nationalAverage: 70, higherIsBetter: true },
            ]; break;
        case 'Perlindungan':
             metrics = [
                { label: 'Akta Kelahiran', value: Math.max(50, Math.min(100, 100 - score + rand(-10, 10))), unit: '%', nationalAverage: 90, higherIsBetter: true },
            ]; break;
        case 'Kesejahteraan':
             metrics = [
                { label: 'Akses Air Bersih', value: Math.max(40, Math.min(100, 100 - score + rand(-15, 15))), unit: '%', nationalAverage: 80, higherIsBetter: true },
                { label: 'Sanitasi Layak', value: Math.max(40, Math.min(100, 100 - score + rand(-15, 15))), unit: '%', nationalAverage: 75, higherIsBetter: true },
            ]; break;
        case 'Lingkungan':
            metrics = [
                { label: 'Risiko Bencana (BNPB)', value: Math.max(1, Math.min(10, score/10 + rand(-2, 2))), unit: '/10', nationalAverage: 5, higherIsBetter: false },
            ]; break;
    }
    return { riskScore: score, metrics: metrics.map(m => ({...m, value: typeof m.value === 'number' ? parseFloat(m.value.toFixed(1)) : m.value})) };
};

// Generate 6 months of historical risk data
const generateHistoricalRisk = (baseScore: number) => {
    const history: { month: string; score: number }[] = [];
    let currentScore = baseScore + rand(-3, 3);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    for (let i = 0; i < 6; i++) {
        history.push({ month: months[i], score: Math.min(100, Math.max(20, Math.round(currentScore))) });
        currentScore += rand(-1.5, 1.5);
    }
    return history;
};

// Raw data of provinces and their cities/regencies
const indonesiaData: Record<string, string[]> = {
    "Aceh": ["Kab. Aceh Selatan", "Kab. Aceh Tenggara", "Kab. Aceh Timur", "Kab. Aceh Tengah", "Kab. Aceh Barat", "Kab. Aceh Besar", "Kab. Pidie", "Kab. Aceh Utara", "Kab. Simeulue", "Kab. Aceh Singkil", "Kab. Bireuen", "Kab. Aceh Barat Daya", "Kab. Gayo Lues", "Kab. Aceh Jaya", "Kab. Nagan Raya", "Kab. Aceh Tamiang", "Kab. Bener Meriah", "Kab. Pidie Jaya", "Kota Banda Aceh", "Kota Sabang", "Kota Lhokseumawe", "Kota Langsa", "Kota Subulussalam"],
    "Sumatera Utara": ["Kab. Tapanuli Tengah", "Kab. Tapanuli Utara", "Kab. Tapanuli Selatan", "Kab. Nias", "Kab. Langkat", "Kab. Karo", "Kab. Deli Serdang", "Kab. Simalungun", "Kab. Asahan", "Kab. Labuhanbatu", "Kab. Dairi", "Kab. Toba Samosir", "Kab. Mandailing Natal", "Kab. Nias Selatan", "Kab. Pakpak Bharat", "Kab. Humbang Hasundutan", "Kab. Samosir", "Kab. Serdang Bedagai", "Kab. Batubara", "Kab. Padang Lawas Utara", "Kab. Padang Lawas", "Kab. Labuhanbatu Selatan", "Kab. Labuhanbatu Utara", "Kab. Nias Utara", "Kab. Nias Barat", "Kota Medan", "Kota Pematangsiantar", "Kota Sibolga", "Kota Tanjung Balai", "Kota Binjai", "Kota Tebing Tinggi", "Kota Padangsidimpuan", "Kota Gunungsitoli"],
    "Sumatera Barat": ["Kab. Pesisir Selatan", "Kab. Solok", "Kab. Sijunjung", "Kab. Tanah Datar", "Kab. Padang Pariaman", "Kab. Agam", "Kab. Lima Puluh Kota", "Kab. Pasaman", "Kab. Kepulauan Mentawai", "Kab. Dharmasraya", "Kab. Solok Selatan", "Kab. Pasaman Barat", "Kota Padang", "Kota Solok", "Kota Sawahlunto", "Kota Padang Panjang", "Kota Bukittinggi", "Kota Payakumbuh", "Kota Pariaman"],
    "Riau": ["Kab. Kampar", "Kab. Indragiri Hulu", "Kab. Bengkalis", "Kab. Indragiri Hilir", "Kab. Pelalawan", "Kab. Rokan Hulu", "Kab. Rokan Hilir", "Kab. Siak", "Kab. Kuantan Singingi", "Kab. Kepulauan Meranti", "Kota Pekanbaru", "Kota Dumai"],
    "Jambi": ["Kab. Kerinci", "Kab. Merangin", "Kab. Sarolangun", "Kab. Batanghari", "Kab. Muaro Jambi", "Kab. Tanjung Jabung Barat", "Kab. Tanjung Jabung Timur", "Kab. Bungo", "Kab. Tebo", "Kota Jambi", "Kota Sungai Penuh"],
    "Sumatera Selatan": ["Kab. Ogan Komering Ulu", "Kab. Ogan Komering Ilir", "Kab. Muara Enim", "Kab. Lahat", "Kab. Musi Rawas", "Kab. Musi Banyuasin", "Kab. Banyuasin", "Kab. Ogan Komering Ulu Timur", "Kab. Ogan Komering Ulu Selatan", "Kab. Ogan Ilir", "Kab. Empat Lawang", "Kab. Penukal Abab Lematang Ilir", "Kab. Musi Rawas Utara", "Kota Palembang", "Kota Pagar Alam", "Kota Lubuk Linggau", "Kota Prabumulih"],
    "Bengkulu": ["Kab. Bengkulu Selatan", "Kab. Rejang Lebong", "Kab. Bengkulu Utara", "Kab. Kaur", "Kab. Seluma", "Kab. Muko Muko", "Kab. Lebong", "Kab. Kepahiang", "Kab. Bengkulu Tengah", "Kota Bengkulu"],
    "Lampung": ["Kab. Lampung Selatan", "Kab. Lampung Tengah", "Kab. Lampung Utara", "Kab. Lampung Barat", "Kab. Tulang Bawang", "Kab. Tanggamus", "Kab. Lampung Timur", "Kab. Way Kanan", "Kab. Pesawaran", "Kab. Pringsewu", "Kab. Mesuji", "Kab. Tulang Bawang Barat", "Kab. Pesisir Barat", "Kota Bandar Lampung", "Kota Metro"],
    "Kepulauan Bangka Belitung": ["Kab. Bangka", "Kab. Belitung", "Kab. Bangka Selatan", "Kab. Bangka Tengah", "Kab. Bangka Barat", "Kab. Belitung Timur", "Kota Pangkal Pinang"],
    "Kepulauan Riau": ["Kab. Bintan", "Kab. Karimun", "Kab. Natuna", "Kab. Lingga", "Kab. Kepulauan Anambas", "Kota Batam", "Kota Tanjung Pinang"],
    "DKI Jakarta": ["Kab. Kepulauan Seribu", "Kota Adm. Jakarta Pusat", "Kota Adm. Jakarta Utara", "Kota Adm. Jakarta Barat", "Kota Adm. Jakarta Selatan", "Kota Adm. Jakarta Timur"],
    "Jawa Barat": ["Kab. Bogor", "Kab. Sukabumi", "Kab. Cianjur", "Kab. Bandung", "Kab. Garut", "Kab. Tasikmalaya", "Kab. Ciamis", "Kab. Kuningan", "Kab. Cirebon", "Kab. Majalengka", "Kab. Sumedang", "Kab. Indramayu", "Kab. Subang", "Kab. Purwakarta", "Kab. Karawang", "Kab. Bekasi", "Kab. Bandung Barat", "Kab. Pangandaran", "Kota Bogor", "Kota Sukabumi", "Kota Bandung", "Kota Cirebon", "Kota Bekasi", "Kota Depok", "Kota Cimahi", "Kota Tasikmalaya", "Kota Banjar"],
    "Jawa Tengah": ["Kab. Cilacap", "Kab. Banyumas", "Kab. Purbalingga", "Kab. Banjarnegara", "Kab. Kebumen", "Kab. Purworejo", "Kab. Wonosobo", "Kab. Magelang", "Kab. Boyolali", "Kab. Klaten", "Kab. Sukoharjo", "Kab. Wonogiri", "Kab. Karanganyar", "Kab. Sragen", "Kab. Grobogan", "Kab. Blora", "Kab. Rembang", "Kab. Pati", "Kab. Kudus", "Kab. Jepara", "Kab. Demak", "Kab. Semarang", "Kab. Temanggung", "Kab. Kendal", "Kab. Batang", "Kab. Pekalongan", "Kab. Pemalang", "Kab. Tegal", "Kab. Brebes", "Kota Magelang", "Kota Surakarta", "Kota Salatiga", "Kota Semarang", "Kota Pekalongan", "Kota Tegal"],
    "DI Yogyakarta": ["Kab. Kulon Progo", "Kab. Bantul", "Kab. Gunungkidul", "Kab. Sleman", "Kota Yogyakarta"],
    "Jawa Timur": ["Kab. Pacitan", "Kab. Ponorogo", "Kab. Trenggalek", "Kab. Tulungagung", "Kab. Blitar", "Kab. Kediri", "Kab. Malang", "Kab. Lumajang", "Kab. Jember", "Kab. Banyuwangi", "Kab. Bondowoso", "Kab. Situbondo", "Kab. Probolinggo", "Kab. Pasuruan", "Kab. Sidoarjo", "Kab. Mojokerto", "Kab. Jombang", "Kab. Nganjuk", "Kab. Madiun", "Kab. Magetan", "Kab. Ngawi", "Kab. Bojonegoro", "Kab. Tuban", "Kab. Lamongan", "Kab. Gresik", "Kab. Bangkalan", "Kab. Sampang", "Kab. Pamekasan", "Kab. Sumenep", "Kota Kediri", "Kota Blitar", "Kota Malang", "Kota Probolinggo", "Kota Pasuruan", "Kota Mojokerto", "Kota Madiun", "Kota Surabaya", "Kota Batu"],
    "Banten": ["Kab. Pandeglang", "Kab. Lebak", "Kab. Tangerang", "Kab. Serang", "Kota Tangerang", "Kota Cilegon", "Kota Serang", "Kota Tangerang Selatan"],
    "Bali": ["Kab. Jembrana", "Kab. Tabanan", "Kab. Badung", "Kab. Gianyar", "Kab. Klungkung", "Kab. Bangli", "Kab. Karangasem", "Kab. Buleleng", "Kota Denpasar"],
    "Nusa Tenggara Barat": ["Kab. Lombok Barat", "Kab. Lombok Tengah", "Kab. Lombok Timur", "Kab. Sumbawa", "Kab. Dompu", "Kab. Bima", "Kab. Sumbawa Barat", "Kab. Lombok Utara", "Kota Mataram", "Kota Bima"],
    "Nusa Tenggara Timur": ["Kab. Kupang", "Kab. Timor Tengah Selatan", "Kab. Timor Tengah Utara", "Kab. Belu", "Kab. Alor", "Kab. Flores Timur", "Kab. Sikka", "Kab. Ende", "Kab. Ngada", "Kab. Manggarai", "Kab. Sumba Timur", "Kab. Sumba Barat", "Kab. Lembata", "Kab. Rote Ndao", "Kab. Manggarai Barat", "Kab. Nagekeo", "Kab. Sumba Tengah", "Kab. Sumba Barat Daya", "Kab. Manggarai Timur", "Kab. Sabu Raijua", "Kab. Malaka", "Kota Kupang"],
    "Kalimantan Barat": ["Kab. Sambas", "Kab. Mempawah", "Kab. Sanggau", "Kab. Ketapang", "Kab. Sintang", "Kab. Kapuas Hulu", "Kab. Bengkayang", "Kab. Landak", "Kab. Sekadau", "Kab. Melawi", "Kab. Kayong Utara", "Kab. Kubu Raya", "Kota Pontianak", "Kota Singkawang"],
    "Kalimantan Tengah": ["Kab. Kotawaringin Barat", "Kab. Kotawaringin Timur", "Kab. Kapuas", "Kab. Barito Selatan", "Kab. Barito Utara", "Kab. Katingan", "Kab. Seruyan", "Kab. Sukamara", "Kab. Lamandau", "Kab. Gunung Mas", "Kab. Pulang Pisau", "Kab. Murung Raya", "Kab. Barito Timur", "Kota Palangkaraya"],
    "Kalimantan Selatan": ["Kab. Tanah Laut", "Kab. Kotabaru", "Kab. Banjar", "Kab. Barito Kuala", "Kab. Tapin", "Kab. Hulu Sungai Selatan", "Kab. Hulu Sungai Tengah", "Kab. Hulu Sungai Utara", "Kab. Tabalong", "Kab. Tanah Bumbu", "Kab. Balangan", "Kota Banjarmasin", "Kota Banjarbaru"],
    "Kalimantan Timur": ["Kab. Paser", "Kab. Kutai Kartanegara", "Kab. Berau", "Kab. Kutai Barat", "Kab. Kutai Timur", "Kab. Penajam Paser Utara", "Kab. Mahakam Ulu", "Kota Balikpapan", "Kota Samarinda", "Kota Bontang"],
    "Kalimantan Utara": ["Kab. Bulungan", "Kab. Malinau", "Kab. Nunukan", "Kab. Tana Tidung", "Kota Tarakan"],
    "Sulawesi Utara": ["Kab. Bolaang Mongondow", "Kab. Minahasa", "Kab. Kepulauan Sangihe", "Kab. Kepulauan Talaud", "Kab. Minahasa Selatan", "Kab. Minahasa Utara", "Kab. Minahasa Tenggara", "Kab. Bolaang Mongondow Utara", "Kab. Kepulauan Siau Tagulandang Biaro", "Kab. Bolaang Mongondow Timur", "Kab. Bolaang Mongondow Selatan", "Kota Manado", "Kota Bitung", "Kota Tomohon", "Kota Kotamobagu"],
    "Sulawesi Tengah": ["Kab. Banggai", "Kab. Poso", "Kab. Donggala", "Kab. Toli Toli", "Kab. Buol", "Kab. Morowali", "Kab. Banggai Kepulauan", "Kab. Parigi Moutong", "Kab. Tojo Una Una", "Kab. Sigi", "Kab. Banggai Laut", "Kab. Morowali Utara", "Kota Palu"],
    "Sulawesi Selatan": ["Kab. Selayar", "Kab. Bulukumba", "Kab. Bantaeng", "Kab. Jeneponto", "Kab. Takalar", "Kab. Gowa", "Kab. Sinjai", "Kab. Bone", "Kab. Maros", "Kab. Pangkajene Kepulauan", "Kab. Barru", "Kab. Soppeng", "Kab. Wajo", "Kab. Sidenreng Rappang", "Kab. Pinrang", "Kab. Enrekang", "Kab. Luwu", "Kab. Tana Toraja", "Kab. Luwu Utara", "Kab. Luwu Timur", "Kab. Toraja Utara", "Kota Makassar", "Kota Pare Pare", "Kota Palopo"],
    "Sulawesi Tenggara": ["Kab. Kolaka", "Kab. Konawe", "Kab. Muna", "Kab. Buton", "Kab. Konawe Selatan", "Kab. Bombana", "Kab. Wakatobi", "Kab. Kolaka Utara", "Kab. Konawe Utara", "Kab. Buton Utara", "Kab. Kolaka Timur", "Kab. Konawe Kepulauan", "Kab. Muna Barat", "Kab. Buton Tengah", "Kab. Buton Selatan", "Kota Kendari", "Kota Bau Bau"],
    "Gorontalo": ["Kab. Gorontalo", "Kab. Boalemo", "Kab. Bone Bolango", "Kab. Pohuwato", "Kab. Gorontalo Utara", "Kota Gorontalo"],
    "Sulawesi Barat": ["Kab. Mamuju", "Kab. Polewali Mandar", "Kab. Majene", "Kab. Mamasa", "Kab. Pasangkayu", "Kab. Mamuju Tengah"],
    "Maluku": ["Kab. Maluku Tengah", "Kab. Maluku Tenggara", "Kab. Kepulauan Tanimbar", "Kab. Buru", "Kab. Seram Bagian Timur", "Kab. Seram Bagian Barat", "Kab. Kepulauan Aru", "Kab. Maluku Barat Daya", "Kab. Buru Selatan", "Kota Ambon", "Kota Tual"],
    "Maluku Utara": ["Kab. Halmahera Barat", "Kab. Halmahera Tengah", "Kab. Halmahera Utara", "Kab. Halmahera Selatan", "Kab. Kepulauan Sula", "Kab. Halmahera Timur", "Kab. Pulau Morotai", "Kab. Pulau Taliabu", "Kota Ternate", "Kota Tidore Kepulauan"],
    "Papua": ["Kab. Merauke", "Kab. Jayawijaya", "Kab. Jayapura", "Kab. Nabire", "Kab. Kepulauan Yapen", "Kab. Biak Numfor", "Kab. Puncak Jaya", "Kab. Paniai", "Kab. Mimika", "Kab. Sarmi", "Kab. Keerom", "Kab. Waropen", "Kab. Supiori", "Kab. Mamberamo Raya", "Kab. Dogiyai", "Kab. Lanny Jaya", "Kab. Mamberamo Tengah", "Kab. Nduga", "Kab. Tolikara", "Kab. Yahukimo", "Kab. Yalimo", "Kab. Puncak", "Kab. Intan Jaya", "Kab. Deiyai", "Kota Jayapura"],
    "Papua Barat": ["Kab. Manokwari", "Kab. Fak Fak", "Kab. Kaimana", "Kab. Teluk Wondama", "Kab. Teluk Bintuni", "Kab. Manokwari Selatan", "Kab. Pegunungan Arfak"],
    "Papua Barat Daya": ["Kab. Sorong", "Kab. Sorong Selatan", "Kab. Raja Ampat", "Kab. Tambrauw", "Kab. Maybrat", "Kota Sorong"],
    "Papua Tengah": ["Kab. Nabire", "Kab. Puncak Jaya", "Kab. Paniai", "Kab. Mimika", "Kab. Puncak", "Kab. Dogiyai", "Kab. Intan Jaya", "Kab. Deiyai"],
    "Papua Pegunungan": ["Kab. Jayawijaya", "Kab. Pegunungan Bintang", "Kab. Yahukimo", "Kab. Tolikara", "Kab. Mamberamo Tengah", "Kab. Yalimo", "Kab. Lanny Jaya", "Kab. Nduga"],
    "Papua Selatan": ["Kab. Merauke", "Kab. Boven Digoel", "Kab. Mappi", "Kab. Asmat"]
};

const generatedRegionsDetails: Record<string, RegionDetailData> = {};
const generatedKabupatenKotaDetails: Record<string, KabupatenKotaDetailData> = {};

Object.entries(indonesiaData).forEach(([provinceName, cities]) => {
    const provinceId = toKebabCase(provinceName);
    const kabKotaIds = cities.map(city => toKebabCase(city));
    const baseProvinceRisk = rand(40, 85);

    generatedRegionsDetails[provinceId] = {
        id: provinceId,
        name: provinceName,
        overallRisk: baseProvinceRisk,
        population: rand(500000, 15000000),
        activeAlertsCount: rand(0, 5),
        domains: {
            Kesehatan: generateDomainMetrics(baseProvinceRisk, 'Kesehatan'),
            Gizi: generateDomainMetrics(baseProvinceRisk + rand(-5, 5), 'Gizi'),
            Pengasuhan: generateDomainMetrics(baseProvinceRisk + rand(-10, 2), 'Pengasuhan'),
            Perlindungan: generateDomainMetrics(baseProvinceRisk + rand(-10, 5), 'Perlindungan'),
            Kesejahteraan: generateDomainMetrics(baseProvinceRisk + rand(-5, 5), 'Kesejahteraan'),
            Lingkungan: generateDomainMetrics(baseProvinceRisk + rand(-15, 15), 'Lingkungan'),
        },
        historicalRisk: generateHistoricalRisk(baseProvinceRisk),
        kabupatenKotaIds: kabKotaIds,
    };

    cities.forEach(cityName => {
        const kabKotaId = toKebabCase(cityName);
        const baseCityRisk = Math.min(100, Math.max(20, baseProvinceRisk + rand(-12, 12)));
        generatedKabupatenKotaDetails[kabKotaId] = {
            id: kabKotaId,
            name: cityName,
            parentRegionId: provinceId,
            overallRisk: baseCityRisk,
            population: rand(50000, 2000000),
            activeAlertsCount: rand(0, 3),
            domains: {
                Kesehatan: generateDomainMetrics(baseCityRisk, 'Kesehatan'),
                Gizi: generateDomainMetrics(baseCityRisk + rand(-5, 5), 'Gizi'),
                Pengasuhan: generateDomainMetrics(baseCityRisk + rand(-10, 2), 'Pengasuhan'),
                Perlindungan: generateDomainMetrics(baseCityRisk + rand(-10, 5), 'Perlindungan'),
                Kesejahteraan: generateDomainMetrics(baseCityRisk + rand(-5, 5), 'Kesejahteraan'),
                Lingkungan: generateDomainMetrics(baseCityRisk + rand(-15, 15), 'Lingkungan'),
            },
            historicalRisk: generateHistoricalRisk(baseCityRisk),
        };
    });
});

export const regionsDetails: Record<string, RegionDetailData> = generatedRegionsDetails;
export const kabupatenKotaDetails: Record<string, KabupatenKotaDetailData> = generatedKabupatenKotaDetails;

// --- END OF DATA GENERATION ---


export const getRegionDetails = (regionId: string): RegionDetailData | null => {
    return regionsDetails[regionId] || null;
}

export const getAvailableRegions = () => {
    return Object.values(regionsDetails).map(r => ({ id: r.id, name: r.name })).sort((a,b) => a.name.localeCompare(b.name));
}

// --- Dynamic Regional Forecast Data ---
const generateRegionalForecastData = (): RegionalForecastData[] => {
    const allForecasts: RegionalForecastData[] = [];
    let idCounter = 1;

    const getRiskLevel = (score: number): 'Kritis' | 'Tinggi' | 'Sedang' | 'Rendah' => {
        if (score > 85) return 'Kritis';
        if (score > 70) return 'Tinggi';
        if (score > 55) return 'Sedang';
        return 'Rendah';
    };

    Object.values(regionsDetails).forEach(region => {
        (Object.keys(region.domains) as Domain[]).forEach(domain => {
            const currentRisk = region.domains[domain].riskScore;
            
            // Domain-specific volatility
            const domainVolatility: Record<Domain, number> = {
                'Kesehatan': 6,
                'Gizi': 8,
                'Pengasuhan': 4,
                'Perlindungan': 3,
                'Kesejahteraan': 5,
                'Lingkungan': 7
            };

            // Base trend on current risk (higher risk tends to be more volatile)
            const baseTrend = (currentRisk - 50) / 10; 
            
            // Add some randomness
            const randomFactor = (Math.random() - 0.5) * domainVolatility[domain];

            let change = baseTrend + randomFactor;

            const predictedRisk = Math.max(0, Math.min(100, currentRisk + change));

            allForecasts.push({
                id: idCounter++,
                region: region.name,
                domain: domain,
                currentRisk: currentRisk,
                predictedRisk: parseFloat(predictedRisk.toFixed(1)),
                change: parseFloat(change.toFixed(1)),
                currentRiskLevel: getRiskLevel(currentRisk),
                predictedRiskLevel: getRiskLevel(predictedRisk),
            });
        });
    });
    return allForecasts;
};

export const regionalForecastData: RegionalForecastData[] = generateRegionalForecastData();


// --- Mock Data for EWS Per Bidang (Dynamically Generated) ---
const getPerformanceForDomain = (domain: Domain): RegionPerformance[] => {
    return Object.values(regionsDetails).map(regionDetail => {
        const domainMetrics = regionDetail.domains[domain];
        const history = regionDetail.historicalRisk;
        const trend = history.length > 1 ? history[history.length - 1].score - history[history.length - 2].score : 0;
        
        return {
            id: regionDetail.id,
            name: regionDetail.name,
            riskScore: domainMetrics.riskScore,
            trend: trend,
        };
    });
};

const generateDomainData = (domain: Domain): DomainData => {
    const regionsInDomain = getPerformanceForDomain(domain);
    const totalRisk = regionsInDomain.reduce((acc, r) => acc + r.riskScore, 0);
    const averageRisk = regionsInDomain.length > 0 ? totalRisk / regionsInDomain.length : 0;
    const criticalRegionsCount = regionsInDomain.filter(r => r.riskScore > 70).length;
    const topAlerts = allActiveAlerts
        .filter(a => a.domain === domain)
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 3);

    const indicators: DomainIndicatorData[] = [];
    const indicatorLabels = new Set<string>();
    
    Object.values(regionsDetails).forEach(region => {
        region.domains[domain].metrics.forEach(metric => {
            indicatorLabels.add(metric.label);
        });
    });

    indicatorLabels.forEach(label => {
        const performers: { name: string; value: number | string }[] = [];
        let nationalAverage = 0;
        let unit = '';
        let higherIsBetter = true;

        Object.values(regionsDetails).forEach(region => {
            const metric = region.domains[domain].metrics.find(m => m.label === label);
            if (metric) { // Check if metric exists
                 if (typeof metric.value === 'number') {
                    performers.push({ name: region.name, value: metric.value });
                } else {
                    performers.push({ name: region.name, value: metric.value });
                }
                nationalAverage = metric.nationalAverage;
                unit = metric.unit;
                higherIsBetter = metric.higherIsBetter;
            }
        });

        if (performers.length > 0 && typeof performers[0].value === 'number') {
            const numericPerformers = performers as { name: string; value: number }[];
            numericPerformers.sort((a, b) => {
                return higherIsBetter ? b.value - a.value : a.value - b.value;
            });

            const best = numericPerformers[0];
            const worst = numericPerformers[numericPerformers.length - 1];

            indicators.push({
                indicatorName: label,
                nationalAverage: `${nationalAverage}${unit}`,
                bestPerformer: { name: best.name, value: `${best.value}${unit}` },
                worstPerformer: { name: worst.name, value: `${worst.value}${unit}` }
            });
        }
    });

    return {
        id: domain,
        name: domain,
        averageRisk: parseFloat(averageRisk.toFixed(1)),
        criticalRegionsCount,
        regions: regionsInDomain,
        topAlerts,
        indicators,
    };
};

export const domainsData: Record<string, DomainData> = {
    'Kesehatan': generateDomainData('Kesehatan'),
    'Gizi': generateDomainData('Gizi'),
    'Pengasuhan': generateDomainData('Pengasuhan'),
    'Perlindungan': generateDomainData('Perlindungan'),
    'Kesejahteraan': generateDomainData('Kesejahteraan'),
    'Lingkungan': generateDomainData('Lingkungan'),
};


export const getDomainData = (domainId: string): DomainData | null => {
    return domainsData[domainId] || null;
}


// --- Mock Data for Data Processing ---
export const dataSources: DataSource[] = [
    { id: 'kemenkes-satusehat', name: 'Kemenkes - SatuSehat Platform', status: 'connected', lastSync: '30 minutes ago' },
    { id: 'kemdikbud-dapodik', name: 'Kemendikbud - Dapodik', status: 'delayed', lastSync: '1 day ago' },
    { id: 'bps-sosial', name: 'BPS - Sensus & Survei Sosial', status: 'connected', lastSync: '2 hours ago' },
    { id: 'dukcapil', name: 'Dukcapil - Data Kependudukan', status: 'connected', lastSync: '6 hours ago' },
    { id: 'bnpb-inarisk', name: 'BNPB - InaRISK Platform', status: 'connected', lastSync: '4 hours ago' },
    { id: 'bmkg-cuaca', name: 'BMKG - Prakiraan Cuaca & Iklim', status: 'connected', lastSync: '1 hour ago' },
    { id: 'kemen-pppa', name: 'KemenPPA - Simfoni PPA', status: 'error', lastSync: '3 days ago' },
];

export const processingLogs: LogEntry[] = [
    { timestamp: '10:15:02', level: 'INFO', message: 'Data processing pipeline finished successfully.' },
    { timestamp: '10:15:01', level: 'INFO', message: 'Risk scores recalculated for 514 regions.' },
    { timestamp: '10:14:30', level: 'INFO', message: 'Successfully fetched new data from Kemenkes - SatuSehat.' },
    { timestamp: '10:13:05', level: 'INFO', message: 'Successfully fetched new data from BPS - Survei Sosial.' },
    { timestamp: '10:12:35', level: 'INFO', message: 'Successfully fetched 15,234 new records from Dukcapil.' },
    { timestamp: '10:10:11', level: 'WARN', message: 'Kemendikbud - Dapodik API response delayed. Using cached data.' },
    { timestamp: '10:09:45', level: 'INFO', message: 'Aggregating regional data for Papua.' },
    { timestamp: '10:08:19', level: 'ERROR', message: 'Failed to connect to KemenPPA - Simfoni PPA API. Endpoint timeout.' },
    { timestamp: '10:05:00', level: 'INFO', message: 'Starting daily data aggregation job...' },
];


// --- Mock Data for Intervention Management ---
export const mockInterventionPlans: InterventionPlan[] = [
    {
        id: 'plan-001',
        title: 'Program Kejar Imunisasi Mobile',
        description: 'Meluncurkan unit imunisasi mobile untuk menjangkau desa-desa terpencil di Papua.',
        region: 'Papua',
        domain: 'Kesehatan',
        status: InterventionStatus.Active,
        priority: InterventionPriority.High,
        startDate: '2024-07-01',
        endDate: '2024-12-31',
        budget: 500000000,
        kpi: 'Meningkatkan cakupan imunisasi dasar lengkap (IDL) dari 65% menjadi 80%',
        actionItems: [
            { id: 'ai-1-1', text: 'Pengadaan 2 unit mobil operasional', completed: true },
            { id: 'ai-1-2', text: 'Rekrutmen 4 tenaga kesehatan lapangan', completed: true },
            { id: 'ai-1-3', text: 'Sosialisasi program dengan kepala suku', completed: false },
            { id: 'ai-1-4', text: 'Pelaksanaan imunisasi gelombang pertama', completed: false },
        ],
        relatedAlertId: 'alert-1'
    },
    {
        id: 'plan-002',
        title: 'Penanganan Lonjakan Stunting NTT',
        description: 'Intervensi gizi spesifik dan sensitif untuk menekan angka stunting di NTT.',
        region: 'Nusa Tenggara Timur',
        domain: 'Gizi',
        status: InterventionStatus.Active,
        priority: InterventionPriority.High,
        startDate: '2024-06-15',
        endDate: '2025-01-15',
        budget: 1200000000,
        kpi: 'Menurunkan prevalensi stunting sebesar 5% di 3 kabupaten prioritas',
        actionItems: [
            { id: 'ai-2-1', text: 'Distribusi 10,000 paket PMT', completed: true },
            { id: 'ai-2-2', text: 'Pelatihan 500 kader Posyandu tentang PM-TBA', completed: true },
            { id: 'ai-2-3', text: 'Kampanye media tentang 1000 HPK', completed: false },
        ],
        relatedAlertId: 'alert-3'
    },
    {
        id: 'plan-005',
        title: 'Pemberian Tablet Tambah Darah (TTD) Ibu Hamil',
        description: 'Program pemberian TTD dan edukasi gizi untuk menekan anemia pada ibu hamil di NTB.',
        region: 'Nusa Tenggara Barat',
        domain: 'Gizi',
        status: InterventionStatus.Planning,
        priority: InterventionPriority.High,
        startDate: '2024-08-01',
        endDate: '2025-02-01',
        budget: 450000000,
        kpi: 'Menurunkan prevalensi anemia pada ibu hamil sebesar 10%',
        actionItems: [
            { id: 'ai-5-1', text: 'Koordinasi dengan Dinas Kesehatan Provinsi', completed: false },
            { id: 'ai-5-2', text: 'Pengadaan 50,000 strip TTD', completed: false },
            { id: 'ai-5-3', text: 'Pelatihan Bidan dan Kader', completed: false },
        ],
        relatedAlertId: 'alert-10'
    },
    {
        id: 'plan-003',
        title: 'Peningkatan Kualitas Sanitasi',
        description: 'Program pembangunan sanitasi layak dan edukasi PHBS di Aceh.',
        region: 'Aceh',
        domain: 'Kesejahteraan',
        status: InterventionStatus.Planning,
        priority: InterventionPriority.Medium,
        startDate: '2024-09-01',
        endDate: '2025-03-01',
        budget: 350000000,
        kpi: 'Meningkatkan akses sanitasi layak sebesar 10% di wilayah target',
        actionItems: [
            { id: 'ai-3-1', text: 'Pemetaan wilayah dengan sanitasi buruk', completed: false },
            { id: 'ai-3-2', text: 'Rapat koordinasi dengan dinas PUPR', completed: false },
        ],
        relatedAlertId: 'alert-6'
    },
     {
        id: 'plan-004',
        title: 'Gerakan Rumah Bebas Asap',
        description: 'Kampanye dan edukasi untuk mengurangi paparan asap rokok pada anak.',
        region: 'Jawa Barat',
        domain: 'Kesehatan',
        status: InterventionStatus.Completed,
        priority: InterventionPriority.Medium,
        startDate: '2024-01-10',
        endDate: '2024-06-10',
        budget: 150000000,
        kpi: 'Mencapai 50 RT/RW percontohan bebas asap rokok di dalam rumah',
        actionItems: [
            { id: 'ai-4-1', text: 'Workshop dengan tokoh masyarakat', completed: true },
            { id: 'ai-4-2', text: 'Distribusi materi edukasi', completed: true },
            { id: 'ai-4-3', text: 'Monitoring dan evaluasi akhir', completed: true },
        ],
        relatedAlertId: 'alert-2'
    },
     {
        id: 'plan-006',
        title: 'Mitigasi Banjir Rob di Pesisir Jakarta',
        description: 'Program mitigasi dampak banjir rob pada kesehatan anak, termasuk penyediaan MCK darurat dan layanan kesehatan mobile.',
        region: 'DKI Jakarta',
        domain: 'Lingkungan',
        status: InterventionStatus.Planning,
        priority: InterventionPriority.High,
        startDate: '2024-08-15',
        endDate: '2024-11-15',
        budget: 750000000,
        kpi: 'Mengurangi insiden penyakit berbasis air sebesar 20% di area terdampak',
        actionItems: [],
        relatedAlertId: 'alert-15'
    },
];

export const regionalRiskScores: RegionalRiskScore[] = Object.values(regionsDetails).map(r => ({ name: r.name, score: r.overallRisk }));

// --- Mock Data for Resource Allocation ---
export const mockResourceData: ResourceData = {
    sdm: [
        { name: 'Tenaga Kesehatan', unit: 'orang', current: 2500, forecast: 3000, needed: 500, color: 'text-blue-500' },
        { name: 'Kader Posyandu', unit: 'orang', current: 15000, forecast: 18000, needed: 3000, color: 'text-blue-500' },
        { name: 'Guru PAUD', unit: 'orang', current: 8000, forecast: 9000, needed: 1000, color: 'text-blue-500' },
        { name: 'Ahli Gizi', unit: 'orang', current: 850, forecast: 1200, needed: 350, color: 'text-blue-500' },
    ],
    anggaran: [
        { name: 'Operasional', unit: 'Miliar IDR', current: 150, forecast: 180, needed: 30, color: 'text-emerald-500' },
        { name: 'Program Gizi', unit: 'Miliar IDR', current: 240, forecast: 300, needed: 60, color: 'text-emerald-500' },
        { name: 'Program Kesehatan', unit: 'Miliar IDR', current: 220, forecast: 260, needed: 40, color: 'text-emerald-500' },
        { name: 'Edukasi & Sosialisasi', unit: 'Miliar IDR', current: 80, forecast: 100, needed: 20, color: 'text-emerald-500' },
    ],
    material: [
        { name: 'Paket PMT', unit: 'paket', current: 500000, forecast: 600000, needed: 100000, color: 'text-amber-500' },
        { name: 'Vaksin Lengkap', unit: 'dosis', current: 2500000, forecast: 3000000, needed: 500000, color: 'text-amber-500' },
        { name: 'APE Kit', unit: 'kit', current: 30000, forecast: 36000, needed: 6000, color: 'text-amber-500' },
        { name: 'Buku KIA', unit: 'buku', current: 1000000, forecast: 1200000, needed: 200000, color: 'text-amber-500' },
    ]
};

// --- Mock Data for Parent Dashboard ---
export const mockParentData: ParentData = {
    childProfile: {
        name: 'Budi',
        age: '2 tahun 3 bulan',
        avatarUrl: 'https://i.pravatar.cc/150?u=budi',
        lastWeight: 12.5,
        lastHeight: 88,
    },
    upcomingEvents: [
        { id: 'ev1', title: 'Imunisasi DPT-HB-Hib 4', dueDate: '2024-08-15', type: 'immunization' },
        { id: 'ev2', title: 'Penimbangan Posyandu Melati', dueDate: '2024-08-25', type: 'posyandu' },
    ],
    growthHistory: [
        { ageInMonths: 18, weight: 10.9, height: 82 },
        { ageInMonths: 21, weight: 11.8, height: 85 },
        { ageInMonths: 24, weight: 12.1, height: 87 },
        { ageInMonths: 27, weight: 12.5, height: 88 },
    ],
    stimulationChecklist: [
        { id: 'stim1', text: 'Berlari tanpa sering jatuh', completed: true, ageGroup: '24-36 bulan', category: 'Motorik Kasar' },
        { id: 'stim2', text: 'Menendang bola', completed: true, ageGroup: '24-36 bulan', category: 'Motorik Kasar' },
        { id: 'stim3', text: 'Menyusun menara 4-6 balok', completed: true, ageGroup: '24-36 bulan', category: 'Motorik Halus' },
        { id: 'stim4', text: 'Mencoret-coret dengan pensil/krayon', completed: false, ageGroup: '24-36 bulan', category: 'Motorik Halus' },
        { id: 'stim5', text: 'Menggunakan 2-3 kata dalam kalimat', completed: true, ageGroup: '24-36 bulan', category: 'Bahasa' },
        { id: 'stim6', text: 'Menyebut nama sendiri', completed: false, ageGroup: '24-36 bulan', category: 'Bahasa' },
        { id: 'stim7', text: 'Meniru pekerjaan rumah tangga', completed: true, ageGroup: '24-36 bulan', category: 'Sosial & Emosional' },
    ],
};