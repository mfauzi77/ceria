import { RiskAssessmentData, KeyIndicatorData, ActiveAlertData, RiskCategory, AlertLevel, ForecastDataPoint, RegionalForecastData, RegionDetailData, DomainData, DataSource, LogEntry, InterventionPlan, InterventionStatus, InterventionPriority, RegionalRiskScore, DomainFilter, ResourceData, Domain, RegionPerformance, DomainIndicatorData, DomainMetric, ParentData, KabupatenKotaDetailData, DomainMetrics } from '../types';

// Data partisipasi PAUD 2024 dari pengguna
export const paudParticipationData2024 = [
    { province: "Aceh", code: 1101, cityName: "Simeulue", apm: 26.39, apk: 26.66 },
    { province: "Aceh", code: 1102, cityName: "Aceh Singkil", apm: 34.44, apk: 34.44 },
    { province: "Aceh", code: 1103, cityName: "Aceh Selatan", apm: 41.18, apk: 43.95 },
    { province: "Aceh", code: 1104, cityName: "Aceh Tenggara", apm: 24.67, apk: 25.44 },
    { province: "Aceh", code: 1105, cityName: "Aceh Timur", apm: 11.53, apk: 11.53 },
    { province: "Aceh", code: 1106, cityName: "Aceh Tengah", apm: 30.54, apk: 32.82 },
    { province: "Aceh", code: 1107, cityName: "Aceh Barat", apm: 32.93, apk: 32.93 },
    { province: "Aceh", code: 1108, cityName: "Aceh Besar", apm: 46.21, apk: 46.21 },
    { province: "Aceh", code: 1109, cityName: "Pidie", apm: 25.52, apk: 25.52 },
    { province: "Aceh", code: 1110, cityName: "Bireuen", apm: 30.35, apk: 30.35 },
    { province: "Aceh", code: 1111, cityName: "Aceh Utara", apm: 24.37, apk: 24.37 },
    { province: "Aceh", code: 1112, cityName: "Aceh Barat Daya", apm: 46.07, apk: 46.50 },
    { province: "Aceh", code: 1113, cityName: "Gayo Lues", apm: 29.17, apk: 29.17 },
    { province: "Aceh", code: 1114, cityName: "Aceh Tamiang", apm: 32.45, apk: 32.45 },
    { province: "Aceh", code: 1115, cityName: "Nagan Raya", apm: 24.86, apk: 24.86 },
    { province: "Aceh", code: 1116, cityName: "Aceh Jaya", apm: 53.59, apk: 56.66 },
    { province: "Aceh", code: 1117, cityName: "Bener Meriah", apm: 30.15, apk: 30.86 },
    { province: "Aceh", code: 1118, cityName: "Pidie Jaya", apm: 20.19, apk: 20.19 },
    { province: "Aceh", code: 1171, cityName: "Banda Aceh", apm: 32.65, apk: 32.65 },
    { province: "Aceh", code: 1172, cityName: "Sabang", apm: 29.76, apk: 29.76 },
    { province: "Aceh", code: 1173, cityName: "Langsa", apm: 29.39, apk: 29.39 },
    { province: "Aceh", code: 1174, cityName: "Lhokseumawe", apm: 39.92, apk: 39.92 },
    { province: "Aceh", code: 1175, cityName: "Subulussalam", apm: 39.37, apk: 39.67 },
    { province: "Sumatera Utara", code: 1201, cityName: "Nias", apm: 25.22, apk: 26.47 },
    { province: "Sumatera Utara", code: 1202, cityName: "Mandailing Natal", apm: 22.79, apk: 22.79 },
    { province: "Sumatera Utara", code: 1203, cityName: "Tapanuli Selatan", apm: 23.15, apk: 23.15 },
    { province: "Sumatera Utara", code: 1204, cityName: "Tapanuli Tengah", apm: 20.73, apk: 20.73 },
    { province: "Sumatera Utara", code: 1205, cityName: "Tapanuli Utara", apm: 25.40, apk: 25.40 },
    { province: "Sumatera Utara", code: 1206, cityName: "Toba", apm: 25.64, apk: 25.64 },
    { province: "Sumatera Utara", code: 1207, cityName: "Labuhanbatu", apm: 25.41, apk: 25.41 },
    { province: "Sumatera Utara", code: 1208, cityName: "Asahan", apm: 18.53, apk: 18.99 },
    { province: "Sumatera Utara", code: 1209, cityName: "Simalungun", apm: 19.16, apk: 19.67 },
    { province: "Sumatera Utara", code: 1210, cityName: "Dairi", apm: 13.50, apk: 13.50 },
    { province: "Sumatera Utara", code: 1211, cityName: "Karo", apm: 23.50, apk: 23.50 },
    { province: "Sumatera Utara", code: 1212, cityName: "Deli Serdang", apm: 21.75, apk: 21.75 },
    { province: "Sumatera Utara", code: 1213, cityName: "Langkat", apm: 16.89, apk: 16.89 },
    { province: "Sumatera Utara", code: 1214, cityName: "Nias Selatan", apm: 12.30, apk: 12.30 },
    { province: "Sumatera Utara", code: 1215, cityName: "Humbang Hasunduta", apm: 27.47, apk: 27.97 },
    { province: "Sumatera Utara", code: 1216, cityName: "Pakpak Bharat", apm: 23.65, apk: 25.65 },
    { province: "Sumatera Utara", code: 1217, cityName: "Samosir", apm: 37.88, apk: 37.88 },
    { province: "Sumatera Utara", code: 1218, cityName: "Serdang Bedagai", apm: 32.38, apk: 33.80 },
    { province: "Sumatera Utara", code: 1219, cityName: "Batu Bara", apm: 31.90, apk: 32.29 },
    { province: "Sumatera Utara", code: 1220, cityName: "Padang Lawas Utara", apm: 21.71, apk: 22.20 },
    { province: "Sumatera Utara", code: 1221, cityName: "Padang Lawas", apm: 26.22, apk: 26.22 },
    { province: "Sumatera Utara", code: 1222, cityName: "Labuhanbatu Selatan", apm: 23.87, apk: 23.87 },
    { province: "Sumatera Utara", code: 1223, cityName: "Labuhanbatu Utara", apm: 27.66, apk: 27.66 },
    { province: "Sumatera Utara", code: 1224, cityName: "Nias Utara", apm: 25.09, apk: 25.66 },
    { province: "Sumatera Utara", code: 1225, cityName: "Nias Barat", apm: 22.62, apk: 23.06 },
    { province: "Sumatera Utara", code: 1271, cityName: "Sibolga", apm: 33.87, apk: 35.55 },
    { province: "Sumatera Utara", code: 1272, cityName: "Tanjungbalai", apm: 24.60, apk: 24.60 },
    { province: "Sumatera Utara", code: 1273, cityName: "Pematang Siantar", apm: 33.40, apk: 33.40 },
    { province: "Sumatera Utara", code: 1274, cityName: "Tebing Tinggi", apm: 33.82, apk: 34.55 },
    { province: "Sumatera Utara", code: 1275, cityName: "Medan", apm: 21.35, apk: 21.35 },
    { province: "Sumatera Utara", code: 1276, cityName: "Binjai", apm: 31.71, apk: 31.71 },
    { province: "Sumatera Utara", code: 1277, cityName: "Padangsidimpuan", apm: 24.45, apk: 24.45 },
    { province: "Sumatera Utara", code: 1278, cityName: "Gunungsitoli", apm: 33.16, apk: 35.15 },
    { province: "Sumatera Barat", code: 1301, cityName: "Kepulauan Mentawai", apm: 32.47, apk: 32.47 },
    { province: "Sumatera Barat", code: 1302, cityName: "Pesisir Selatan", apm: 25.36, apk: 25.41 },
    { province: "Sumatera Barat", code: 1303, cityName: "Solok", apm: 25.88, apk: 25.88 },
    { province: "Sumatera Barat", code: 1304, cityName: "Sijunjung", apm: 33.22, apk: 33.22 },
    { province: "Sumatera Barat", code: 1305, cityName: "Tanah Datar", apm: 21.23, apk: 21.23 },
    { province: "Sumatera Barat", code: 1306, cityName: "Padang Pariaman", apm: 19.59, apk: 19.59 },
    { province: "Sumatera Barat", code: 1307, cityName: "Agam", apm: 24.42, apk: 24.42 },
    { province: "Sumatera Barat", code: 1308, cityName: "Lima Puluh Kota", apm: 31.85, apk: 31.85 },
    { province: "Sumatera Barat", code: 1309, cityName: "Pasaman", apm: 31.14, apk: 31.87 },
    { province: "Sumatera Barat", code: 1310, cityName: "Solok Selatan", apm: 22.80, apk: 23.21 },
    { province: "Sumatera Barat", code: 1311, cityName: "Dharmasraya", apm: 27.48, apk: 27.48 },
    { province: "Sumatera Barat", code: 1312, cityName: "Pasaman Barat", apm: 25.02, apk: 25.02 },
    { province: "Sumatera Barat", code: 1371, cityName: "Padang", apm: 32.70, apk: 33.13 },
    { province: "Sumatera Barat", code: 1372, cityName: "Kota Solok", apm: 34.53, apk: 34.53 },
    { province: "Sumatera Barat", code: 1373, cityName: "Sawahlunto", apm: 39.53, apk: 39.53 },
    { province: "Sumatera Barat", code: 1374, cityName: "Padang Panjang", apm: 39.62, apk: 41.41 },
    { province: "Sumatera Barat", code: 1375, cityName: "Bukittinggi", apm: 25.93, apk: 26.35 },
    { province: "Sumatera Barat", code: 1376, cityName: "Payakumbuh", apm: 36.52, apk: 36.52 },
    { province: "Sumatera Barat", code: 1377, cityName: "Pariaman", apm: 29.50, apk: 30.51 },
    { province: "Riau", code: 1401, cityName: "Kuantan Singingi", apm: 33.21, apk: 33.21 },
    { province: "Riau", code: 1402, cityName: "Indragiri Hulu", apm: 18.63, apk: 19.08 },
    { province: "Riau", code: 1403, cityName: "Indragiri Hilir", apm: 17.83, apk: 17.83 },
    { province: "Riau", code: 1404, cityName: "Pelalawan", apm: 21.34, apk: 21.34 },
    { province: "Riau", code: 1405, cityName: "Siak", apm: 30.18, apk: 30.18 },
    { province: "Riau", code: 1406, cityName: "Kampar", apm: 19.70, apk: 19.70 },
    { province: "Riau", code: 1407, cityName: "Rokan Hulu", apm: 24.31, apk: 24.31 },
    { province: "Riau", code: 1408, cityName: "Bengkalis", apm: 23.87, apk: 23.87 },
    { province: "Riau", code: 1409, cityName: "Rokan Hilir", apm: 19.50, apk: 19.50 },
    { province: "Riau", code: 1410, cityName: "Kepulauan Meranti", apm: 27.53, apk: 27.73 },
    { province: "Riau", code: 1471, cityName: "Pekanbaru", apm: 24.71, apk: 24.71 },
    { province: "Riau", code: 1473, cityName: "Dumai", apm: 17.81, apk: 17.81 },
    { province: "Jambi", code: 1501, cityName: "Kerinci", apm: 53.51, apk: 54.29 },
    { province: "Jambi", code: 1502, cityName: "Merangin", apm: 31.50, apk: 31.50 },
    { province: "Jambi", code: 1503, cityName: "Sarolangun", apm: 34.27, apk: 34.27 },
    { province: "Jambi", code: 1504, cityName: "Batang Hari", apm: 31.26, apk: 31.26 },
    { province: "Jambi", code: 1505, cityName: "Muaro Jambi", apm: 32.68, apk: 32.68 },
    { province: "Jambi", code: 1506, cityName: "Tanjung Jabung Timur", apm: 39.12, apk: 39.12 },
    { province: "Jambi", code: 1507, cityName: "Tanjung Jabung Barat", apm: 25.96, apk: 25.96 },
    { province: "Jambi", code: 1508, cityName: "Tebo", apm: 31.64, apk: 31.64 },
    { province: "Jambi", code: 1509, cityName: "Bungo", apm: 29.66, apk: 29.66 },
    { province: "Jambi", code: 1571, cityName: "Jambi", apm: 24.56, apk: 24.56 },
    { province: "Jambi", code: 1572, cityName: "Sungai Penuh", apm: 38.38, apk: 38.38 },
    { province: "Sumatera Selatan", code: 1601, cityName: "Ogan Komering Ulu", apm: 30.12, apk: 30.12 },
    { province: "Sumatera Selatan", code: 1602, cityName: "Ogan Komering Ilir", apm: 30.89, apk: 33.36 },
    { province: "Sumatera Selatan", code: 1603, cityName: "Muara Enim", apm: 22.66, apk: 22.66 },
    { province: "Sumatera Selatan", code: 1604, cityName: "Lahat", apm: 34.88, apk: 34.88 },
    { province: "Sumatera Selatan", code: 1605, cityName: "Musi Rawas", apm: 26.92, apk: 28.71 },
    { province: "Sumatera Selatan", code: 1606, cityName: "Musi Banyuasin", apm: 24.54, apk: 24.54 },
    { province: "Sumatera Selatan", code: 1607, cityName: "Banyu Asin", apm: 19.35, apk: 19.35 },
    { province: "Sumatera Selatan", code: 1608, cityName: "Ogan Komering Ulu S", apm: 29.10, apk: 29.10 },
    { province: "Sumatera Selatan", code: 1609, cityName: "Ogan Komering Ulu T", apm: 34.88, apk: 34.88 },
    { province: "Sumatera Selatan", code: 1610, cityName: "Ogan Ilir", apm: 29.58, apk: 30.23 },
    { province: "Sumatera Selatan", code: 1611, cityName: "Empat Lawang", apm: 21.62, apk: 21.62 },
    { province: "Sumatera Selatan", code: 1612, cityName: "Penukal Abab Lemata", apm: 13.34, apk: 13.80 },
    { province: "Sumatera Selatan", code: 1613, cityName: "Musi Rawas Utara", apm: 24.19, apk: 24.19 },
    { province: "Sumatera Selatan", code: 1671, cityName: "Palembang", apm: 23.08, apk: 23.54 },
    { province: "Sumatera Selatan", code: 1672, cityName: "Prabumulih", apm: 24.62, apk: 24.62 },
    { province: "Sumatera Selatan", code: 1673, cityName: "Pagar Alam", apm: 19.54, apk: 19.54 },
    { province: "Sumatera Selatan", code: 1674, cityName: "Lubuklinggau", apm: 22.92, apk: 22.92 },
    { province: "Bengkulu", code: 1701, cityName: "Bengkulu Selatan", apm: 49.87, apk: 49.87 },
    { province: "Bengkulu", code: 1702, cityName: "Rejang Lebong", apm: 14.45, apk: 14.45 },
    { province: "Bengkulu", code: 1703, cityName: "Bengkulu Utara", apm: 33.82, apk: 33.82 },
    { province: "Bengkulu", code: 1704, cityName: "Kaur", apm: 26.23, apk: 26.23 },
    { province: "Bengkulu", code: 1705, cityName: "Seluma", apm: 24.31, apk: 24.31 },
    { province: "Bengkulu", code: 1706, cityName: "Mukomuko", apm: 34.64, apk: 34.64 },
    { province: "Bengkulu", code: 1707, cityName: "Lebong", apm: 22.81, apk: 22.81 },
    { province: "Bengkulu", code: 1708, cityName: "Kepahiang", apm: 18.98, apk: 18.98 },
    { province: "Bengkulu", code: 1709, cityName: "Bengkulu Tengah", apm: 25.43, apk: 25.43 },
    { province: "Bengkulu", code: 1771, cityName: "Bengkulu", apm: 16.73, apk: 16.73 },
    { province: "Lampung", code: 1801, cityName: "Lampung Barat", apm: 23.00, apk: 23.00 },
    { province: "Lampung", code: 1802, cityName: "Tanggamus", apm: 18.97, apk: 20.54 },
    { province: "Lampung", code: 1803, cityName: "Lampung Selatan", apm: 28.67, apk: 29.53 },
    { province: "Lampung", code: 1804, cityName: "Lampung Timur", apm: 37.67, apk: 37.67 },
    { province: "Lampung", code: 1805, cityName: "Lampung Tengah", apm: 39.18, apk: 39.18 },
    { province: "Lampung", code: 1806, cityName: "Lampung Utara", apm: 20.15, apk: 20.15 },
    { province: "Lampung", code: 1807, cityName: "Way Kanan", apm: 32.89, apk: 32.89 },
    { province: "Lampung", code: 1808, cityName: "Tulangbawang", apm: 43.23, apk: 43.23 },
    { province: "Lampung", code: 1809, cityName: "Pesawaran", apm: 34.62, apk: 34.62 },
    { province: "Lampung", code: 1810, cityName: "Pringsewu", apm: 32.54, apk: 32.54 },
    { province: "Lampung", code: 1811, cityName: "Mesuji", apm: 37.35, apk: 37.98 },
    { province: "Lampung", code: 1812, cityName: "Tulang Bawang Barat", apm: 31.35, apk: 31.35 },
    { province: "Lampung", code: 1813, cityName: "Pesisir Barat", apm: 16.19, apk: 17.05 },
    { province: "Lampung", code: 1871, cityName: "Bandar Lampung", apm: 31.73, apk: 33.10 },
    { province: "Lampung", code: 1872, cityName: "Metro", apm: 51.41, apk: 52.31 },
    { province: "Kepulauan Bangka Belitung", code: 1901, cityName: "Bangka", apm: 20.96, apk: 20.96 },
    { province: "Kepulauan Bangka Belitung", code: 1902, cityName: "Belitung", apm: 29.77, apk: 29.77 },
    { province: "Kepulauan Bangka Belitung", code: 1903, cityName: "Bangka Barat", apm: 45.02, apk: 45.02 },
    { province: "Kepulauan Bangka Belitung", code: 1904, cityName: "Bangka Tengah", apm: 26.45, apk: 26.45 },
    { province: "Kepulauan Bangka Belitung", code: 1905, cityName: "Bangka Selatan", apm: 28.72, apk: 28.72 },
    { province: "Kepulauan Bangka Belitung", code: 1906, cityName: "Belitung Timur", apm: 48.36, apk: 48.36 },
    { province: "Kepulauan Bangka Belitung", code: 1971, cityName: "Pangkalpinang", apm: 37.42, apk: 37.42 },
    { province: "Kepulauan Riau", code: 2101, cityName: "Karimun", apm: 22.96, apk: 22.96 },
    { province: "Kepulauan Riau", code: 2102, cityName: "Bintan", apm: 33.02, apk: 33.02 },
    { province: "Kepulauan Riau", code: 2103, cityName: "Natuna", apm: 33.30, apk: 34.46 },
    { province: "Kepulauan Riau", code: 2104, cityName: "Lingga", apm: 46.14, apk: 46.14 },
    { province: "Kepulauan Riau", code: 2105, cityName: "Kepulauan Anambas", apm: 45.69, apk: 47.56 },
    { province: "Kepulauan Riau", code: 2171, cityName: "Batam", apm: 24.82, apk: 24.82 },
    { province: "Kepulauan Riau", code: 2172, cityName: "Tanjung Pinang", apm: 29.32, apk: 29.32 },
    { province: "Dki Jakarta", code: 3101, cityName: "Kepulauan Seribu", apm: 52.26, apk: 56.49 },
    { province: "Dki Jakarta", code: 3171, cityName: "Jakarta Selatan", apm: 34.15, apk: 34.15 },
    { province: "Dki Jakarta", code: 3172, cityName: "Jakarta Timur", apm: 35.23, apk: 35.23 },
    { province: "Dki Jakarta", code: 3173, cityName: "Jakarta Pusat", apm: 29.28, apk: 30.58 },
    { province: "Dki Jakarta", code: 3174, cityName: "Jakarta Barat", apm: 41.38, apk: 41.56 },
    { province: "Dki Jakarta", code: 3175, cityName: "Jakarta Utara", apm: 40.33, apk: 40.33 },
    { province: "Jawa Barat", code: 3201, cityName: "Bogor", apm: 23.59, apk: 23.98 },
    { province: "Jawa Barat", code: 3202, cityName: "Sukabumi", apm: 38.15, apk: 38.15 },
    { province: "Jawa Barat", code: 3203, cityName: "Cianjur", apm: 32.51, apk: 32.51 },
    { province: "Jawa Barat", code: 3204, cityName: "Bandung", apm: 30.03, apk: 30.03 },
    { province: "Jawa Barat", code: 3205, cityName: "Garut", apm: 37.88, apk: 37.88 },
    { province: "Jawa Barat", code: 3206, cityName: "Tasikmalaya", apm: 46.22, apk: 46.22 },
    { province: "Jawa Barat", code: 3207, cityName: "Ciamis", apm: 43.17, apk: 43.17 },
    { province: "Jawa Barat", code: 3208, cityName: "Kuningan", apm: 35.63, apk: 35.63 },
    { province: "Jawa Barat", code: 3209, cityName: "Cirebon", apm: 41.81, apk: 41.81 },
    { province: "Jawa Barat", code: 3210, cityName: "Majalengka", apm: 30.36, apk: 30.73 },
    { province: "Jawa Barat", code: 3211, cityName: "Sumedang", apm: 32.73, apk: 32.73 },
    { province: "Jawa Barat", code: 3212, cityName: "Indramayu", apm: 24.38, apk: 24.38 },
    { province: "Jawa Barat", code: 3213, cityName: "Subang", apm: 29.68, apk: 29.68 },
    { province: "Jawa Barat", code: 3214, cityName: "Purwakarta", apm: 29.65, apk: 29.65 },
    { province: "Jawa Barat", code: 3215, cityName: "Karawang", apm: 29.92, apk: 29.92 },
    { province: "Jawa Barat", code: 3216, cityName: "Bekasi", apm: 29.44, apk: 29.44 },
    { province: "Jawa Barat", code: 3217, cityName: "Bandung Barat", apm: 29.98, apk: 30.39 },
    { province: "Jawa Barat", code: 3218, cityName: "Pangandaran", apm: 33.30, apk: 33.30 },
    { province: "Jawa Barat", code: 3271, cityName: "Kota Bogor", apm: 36.43, apk: 36.43 },
    { province: "Jawa Barat", code: 3272, cityName: "Kota Sukabumi", apm: 38.89, apk: 38.89 },
    { province: "Jawa Barat", code: 3273, cityName: "Kota Bandung", apm: 35.43, apk: 35.43 },
    { province: "Jawa Barat", code: 3274, cityName: "Kota Cirebon", apm: 35.91, apk: 35.91 },
    { province: "Jawa Barat", code: 3275, cityName: "Kota Bekasi", apm: 33.87, apk: 34.89 },
    { province: "Jawa Barat", code: 3276, cityName: "Depok", apm: 35.07, apk: 35.20 },
    { province: "Jawa Barat", code: 3277, cityName: "Cimahi", apm: 40.30, apk: 40.30 },
    { province: "Jawa Barat", code: 3278, cityName: "Kota Tasikmalaya", apm: 46.48, apk: 46.48 },
    { province: "Jawa Barat", code: 3279, cityName: "Banjar", apm: 52.15, apk: 52.39 },
    { province: "Jawa Tengah", code: 3301, cityName: "Cilacap", apm: 32.93, apk: 34.06 },
    { province: "Jawa Tengah", code: 3302, cityName: "Banyumas", apm: 41.00, apk: 41.00 },
    { province: "Jawa Tengah", code: 3303, cityName: "Purbalingga", apm: 43.90, apk: 43.90 },
    { province: "Jawa Tengah", code: 3304, cityName: "Banjarnegara", apm: 57.00, apk: 57.69 },
    { province: "Jawa Tengah", code: 3305, cityName: "Kebumen", apm: 43.80, apk: 44.24 },
    { province: "Jawa Tengah", code: 3306, cityName: "Purworejo", apm: 45.62, apk: 45.62 },
    { province: "Jawa Tengah", code: 3307, cityName: "Wonosobo", apm: 49.37, apk: 49.37 },
    { province: "Jawa Tengah", code: 3308, cityName: "Magelang", apm: 45.91, apk: 45.91 },
    { province: "Jawa Tengah", code: 3309, cityName: "Boyolali", apm: 48.30, apk: 48.30 },
    { province: "Jawa Tengah", code: 3310, cityName: "Klaten", apm: 59.62, apk: 60.77 },
    { province: "Jawa Tengah", code: 3311, cityName: "Sukoharjo", apm: 56.14, apk: 56.28 },
    { province: "Jawa Tengah", code: 3312, cityName: "Wonogiri", apm: 42.35, apk: 42.35 },
    { province: "Jawa Tengah", code: 3313, cityName: "Karanganyar", apm: 38.46, apk: 38.46 },
    { province: "Jawa Tengah", code: 3314, cityName: "Sragen", apm: 39.39, apk: 39.52 },
    { province: "Jawa Tengah", code: 3315, cityName: "Grobogan", apm: 48.25, apk: 49.57 },
    { province: "Jawa Tengah", code: 3316, cityName: "Blora", apm: 58.49, apk: 58.79 },
    { province: "Jawa Tengah", code: 3317, cityName: "Rembang", apm: 68.41, apk: 68.41 },
    { province: "Jawa Tengah", code: 3318, cityName: "Pati", apm: 51.25, apk: 51.98 },
    { province: "Jawa Tengah", code: 3319, cityName: "Kudus", apm: 51.27, apk: 52.64 },
    { province: "Jawa Tengah", code: 3320, cityName: "Jepara", apm: 51.56, apk: 52.63 },
    { province: "Jawa Tengah", code: 3321, cityName: "Demak", apm: 34.11, apk: 34.11 },
    { province: "Jawa Tengah", code: 3322, cityName: "Semarang", apm: 46.35, apk: 46.89 },
    { province: "Jawa Tengah", code: 3323, cityName: "Temanggung", apm: 53.68, apk: 53.68 },
    { province: "Jawa Tengah", code: 3324, cityName: "Kendal", apm: 48.42, apk: 48.42 },
    { province: "Jawa Tengah", code: 3325, cityName: "Batang", apm: 46.59, apk: 46.59 },
    { province: "Jawa Tengah", code: 3326, cityName: "Pekalongan", apm: 48.46, apk: 48.46 },
    { province: "Jawa Tengah", code: 3327, cityName: "Pemalang", apm: 42.44, apk: 42.44 },
    { province: "Jawa Tengah", code: 3328, cityName: "Tegal", apm: 48.39, apk: 48.39 },
    { province: "Jawa Tengah", code: 3329, cityName: "Brebes", apm: 40.53, apk: 40.53 },
    { province: "Jawa Tengah", code: 3371, cityName: "Kota Magelang", apm: 45.54, apk: 45.54 },
    { province: "Jawa Tengah", code: 3372, cityName: "Surakarta", apm: 51.98, apk: 51.98 },
    { province: "Jawa Tengah", code: 3373, cityName: "Salatiga", apm: 57.97, apk: 61.48 },
    { province: "Jawa Tengah", code: 3374, cityName: "Kota Semarang", apm: 54.71, apk: 55.31 },
    { province: "Jawa Tengah", code: 3375, cityName: "Kota Pekalongan", apm: 60.09, apk: 63.29 },
    { province: "Jawa Tengah", code: 3376, cityName: "Kota Tegal", apm: 49.79, apk: 49.79 },
    { province: "Di Yogyakarta", code: 3401, cityName: "Kulon Progo", apm: 72.88, apk: 75.63 },
    { province: "Di Yogyakarta", code: 3402, cityName: "Bantul", apm: 62.48, apk: 64.96 },
    { province: "Di Yogyakarta", code: 3403, cityName: "Gunungkidul", apm: 70.68, apk: 76.06 },
    { province: "Di Yogyakarta", code: 3404, cityName: "Sleman", apm: 56.32, apk: 57.69 },
    { province: "Di Yogyakarta", code: 3471, cityName: "Yogyakarta", apm: 62.67, apk: 67.93 },
    { province: "Jawa Timur", code: 3501, cityName: "Pacitan", apm: 44.74, apk: 44.74 },
    { province: "Jawa Timur", code: 3502, cityName: "Ponorogo", apm: 58.88, apk: 58.88 },
    { province: "Jawa Timur", code: 3503, cityName: "Trenggalek", apm: 57.29, apk: 57.29 },
    { province: "Jawa Timur", code: 3504, cityName: "Tulungagung", apm: 62.91, apk: 63.58 },
    { province: "Jawa Timur", code: 3505, cityName: "Blitar", apm: 47.41, apk: 47.41 },
    { province: "Jawa Timur", code: 3506, cityName: "Kediri", apm: 56.72, apk: 57.11 },
    { province: "Jawa Timur", code: 3507, cityName: "Malang", apm: 54.65, apk: 54.65 },
    { province: "Jawa Timur", code: 3508, cityName: "Lumajang", apm: 58.65, apk: 60.10 },
    { province: "Jawa Timur", code: 3509, cityName: "Jember", apm: 41.20, apk: 41.20 },
    { province: "Jawa Timur", code: 3510, cityName: "Banyuwangi", apm: 50.53, apk: 50.53 },
    { province: "Jawa Timur", code: 3511, cityName: "Bondowoso", apm: 59.17, apk: 61.24 },
    { province: "Jawa Timur", code: 3512, cityName: "Situbondo", apm: 47.47, apk: 47.47 },
    { province: "Jawa Timur", code: 3513, cityName: "Probolinggo", apm: 49.23, apk: 49.66 },
    { province: "Jawa Timur", code: 3514, cityName: "Pasuruan", apm: 47.86, apk: 48.58 },
    { province: "Jawa Timur", code: 3515, cityName: "Sidoarjo", apm: 55.69, apk: 55.69 },
    { province: "Jawa Timur", code: 3516, cityName: "Mojokerto", apm: 64.95, apk: 66.27 },
    { province: "Jawa Timur", code: 3517, cityName: "Jombang", apm: 55.97, apk: 55.97 },
    { province: "Jawa Timur", code: 3518, cityName: "Nganjuk", apm: 50.10, apk: 50.10 },
    { province: "Jawa Timur", code: 3519, cityName: "Madiun", apm: 55.33, apk: 55.33 },
    { province: "Jawa Timur", code: 3520, cityName: "Magetan", apm: 54.13, apk: 54.13 },
    { province: "Jawa Timur", code: 3521, cityName: "Ngawi", apm: 42.48, apk: 42.48 },
    { province: "Jawa Timur", code: 3522, cityName: "Bojonegoro", apm: 60.83, apk: 64.24 },
    { province: "Jawa Timur", code: 3523, cityName: "Tuban", apm: 59.91, apk: 61.19 },
    { province: "Jawa Timur", code: 3524, cityName: "Lamongan", apm: 68.49, apk: 69.11 },
    { province: "Jawa Timur", code: 3525, cityName: "Gresik", apm: 58.37, apk: 58.72 },
    { province: "Jawa Timur", code: 3526, cityName: "Bangkalan", apm: 35.71, apk: 35.71 },
    { province: "Jawa Timur", code: 3527, cityName: "Sampang", apm: 40.51, apk: 40.76 },
    { province: "Jawa Timur", code: 3528, cityName: "Pamekasan", apm: 52.87, apk: 52.87 },
    { province: "Jawa Timur", code: 3529, cityName: "Sumenep", apm: 42.45, apk: 43.05 },
    { province: "Jawa Timur", code: 3571, cityName: "Kota Kediri", apm: 58.75, apk: 58.75 },
    { province: "Jawa Timur", code: 3572, cityName: "Kota Blitar", apm: 61.06, apk: 64.13 },
    { province: "Jawa Timur", code: 3573, cityName: "Kota Malang", apm: 52.30, apk: 53.15 },
    { province: "Jawa Timur", code: 3574, cityName: "Kota Probolinggo", apm: 55.97, apk: 56.57 },
    { province: "Jawa Timur", code: 3575, cityName: "Kota Pasuruan", apm: 55.77, apk: 57.61 },
    { province: "Jawa Timur", code: 3576, cityName: "Kota Mojokerto", apm: 61.53, apk: 63.63 },
    { province: "Jawa Timur", code: 3577, cityName: "Kota Madiun", apm: 44.05, apk: 44.05 },
    { province: "Jawa Timur", code: 3578, cityName: "Surabaya", apm: 61.39, apk: 62.57 },
    { province: "Jawa Timur", code: 3579, cityName: "Batu", apm: 58.76, apk: 58.76 },
    { province: "Banten", code: 3601, cityName: "Pandeglang", apm: 28.36, apk: 29.54 },
    { province: "Banten", code: 3602, cityName: "Lebak", apm: 13.54, apk: 13.54 },
    { province: "Banten", code: 3603, cityName: "Tangerang", apm: 24.76, apk: 24.76 },
    { province: "Banten", code: 3604, cityName: "Serang", apm: 29.23, apk: 30.36 },
    { province: "Banten", code: 3671, cityName: "Kota Tangerang", apm: 35.94, apk: 36.48 },
    { province: "Banten", code: 3672, cityName: "Cilegon", apm: 41.76, apk: 41.76 },
    { province: "Banten", code: 3673, cityName: "Kota Serang", apm: 31.44, apk: 31.44 },
    { province: "Banten", code: 3674, cityName: "Tangerang Selatan", apm: 25.86, apk: 26.90 },
    { province: "Bali", code: 5101, cityName: "Jembrana", apm: 20.72, apk: 20.72 },
    { province: "Bali", code: 5102, cityName: "Tabanan", apm: 34.83, apk: 34.83 },
    { province: "Bali", code: 5103, cityName: "Badung", apm: 39.81, apk: 39.81 },
    { province: "Bali", code: 5104, cityName: "Gianyar", apm: 29.12, apk: 29.12 },
    { province: "Bali", code: 5105, cityName: "Klungkung", apm: 32.79, apk: 32.79 },
    { province: "Bali", code: 5106, cityName: "Bangli", apm: 31.23, apk: 31.23 },
    { province: "Bali", code: 5107, cityName: "Karangasem", apm: 23.21, apk: 23.21 },
    { province: "Bali", code: 5108, cityName: "Buleleng", apm: 22.15, apk: 22.15 },
    { province: "Bali", code: 5171, cityName: "Denpasar", apm: 35.31, apk: 36.72 },
    { province: "Nusa Tenggara Barat", code: 5201, cityName: "Lombok Barat", apm: 38.75, apk: 38.75 },
    { province: "Nusa Tenggara Barat", code: 5202, cityName: "Lombok Tengah", apm: 46.05, apk: 46.05 },
    { province: "Nusa Tenggara Barat", code: 5203, cityName: "Lombok Timur", apm: 34.79, apk: 34.79 },
    { province: "Nusa Tenggara Barat", code: 5204, cityName: "Sumbawa", apm: 52.93, apk: 54.68 },
    { province: "Nusa Tenggara Barat", code: 5205, cityName: "Dompu", apm: 36.62, apk: 36.75 },
    { province: "Nusa Tenggara Barat", code: 5206, cityName: "Bima", apm: 50.96, apk: 51.50 },
    { province: "Nusa Tenggara Barat", code: 5207, cityName: "Sumbawa Barat", apm: 44.57, apk: 44.57 },
    { province: "Nusa Tenggara Barat", code: 5208, cityName: "Lombok Utara", apm: 37.34, apk: 37.34 },
    { province: "Nusa Tenggara Barat", code: 5271, cityName: "Mataram", apm: 42.42, apk: 42.42 },
    { province: "Nusa Tenggara Barat", code: 5272, cityName: "Kota Bima", apm: 40.65, apk: 40.65 },
    { province: "Nusa Tenggara Timur", code: 5301, cityName: "Sumba Barat", apm: 40.73, apk: 44.04 },
    { province: "Nusa Tenggara Timur", code: 5302, cityName: "Sumba Timur", apm: 39.23, apk: 39.23 },
    { province: "Nusa Tenggara Timur", code: 5303, cityName: "Kupang", apm: 33.80, apk: 35.40 },
    { province: "Nusa Tenggara Timur", code: 5304, cityName: "Timor Tengah Selatan", apm: 41.63, apk: 42.83 },
    { province: "Nusa Tenggara Timur", code: 5305, cityName: "Timor Tengah Utara", apm: 33.13, apk: 34.15 },
    { province: "Nusa Tenggara Timur", code: 5306, cityName: "Belu", apm: 31.91, apk: 33.33 },
    { province: "Nusa Tenggara Timur", code: 5307, cityName: "Alor", apm: 40.60, apk: 42.70 },
    { province: "Nusa Tenggara Timur", code: 5308, cityName: "Lembata", apm: 46.98, apk: 46.98 },
    { province: "Nusa Tenggara Timur", code: 5309, cityName: "Flores Timur", apm: 46.91, apk: 46.91 },
    { province: "Nusa Tenggara Timur", code: 5310, cityName: "Sikka", apm: 56.86, apk: 58.21 },
    { province: "Nusa Tenggara Timur", code: 5311, cityName: "Ende", apm: 37.89, apk: 37.89 },
    { province: "Nusa Tenggara Timur", code: 5312, cityName: "Ngada", apm: 27.45, apk: 27.45 },
    { province: "Nusa Tenggara Timur", code: 5313, cityName: "Manggarai", apm: 27.71, apk: 27.71 },
    { province: "Nusa Tenggara Timur", code: 5314, cityName: "Rote Ndao", apm: 27.87, apk: 30.28 },
    { province: "Nusa Tenggara Timur", code: 5315, cityName: "Manggarai Barat", apm: 22.33, apk: 22.83 },
    { province: "Nusa Tenggara Timur", code: 5316, cityName: "Sumba Tengah", apm: 42.56, apk: 44.60 },
    { province: "Nusa Tenggara Timur", code: 5317, cityName: "Sumba Barat Daya", apm: 25.97, apk: 26.83 },
    { province: "Nusa Tenggara Timur", code: 5318, cityName: "Nagekeo", apm: 37.46, apk: 37.46 },
    { province: "Nusa Tenggara Timur", code: 5319, cityName: "Manggarai Timur", apm: 21.28, apk: 21.84 },
    { province: "Nusa Tenggara Timur", code: 5320, cityName: "Sabu Raijua", apm: 42.75, apk: 43.80 },
    { province: "Nusa Tenggara Timur", code: 5321, cityName: "Malaka", apm: 29.82, apk: 31.22 },
    { province: "Nusa Tenggara Timur", code: 5371, cityName: "Kota Kupang", apm: 24.00, apk: 24.00 },
    { province: "Kalimantan Barat", code: 6101, cityName: "Sambas", apm: 24.46, apk: 24.46 },
    { province: "Kalimantan Barat", code: 6102, cityName: "Bengkayang", apm: 24.51, apk: 24.51 },
    { province: "Kalimantan Barat", code: 6103, cityName: "Landak", apm: 23.10, apk: 23.39 },
    { province: "Kalimantan Barat", code: 6104, cityName: "Mempawah", apm: 21.64, apk: 21.64 },
    { province: "Kalimantan Barat", code: 6105, cityName: "Sanggau", apm: 22.39, apk: 22.39 },
    { province: "Kalimantan Barat", code: 6106, cityName: "Ketapang", apm: 14.70, apk: 14.70 },
    { province: "Kalimantan Barat", code: 6107, cityName: "Sintang", apm: 22.05, apk: 22.05 },
    { province: "Kalimantan Barat", code: 6108, cityName: "Kapuas Hulu", apm: 32.64, apk: 33.60 },
    { province: "Kalimantan Barat", code: 6109, cityName: "Sekadau", apm: 21.34, apk: 21.81 },
    { province: "Kalimantan Barat", code: 6110, cityName: "Melawi", apm: 27.22, apk: 27.22 },
    { province: "Kalimantan Barat", code: 6111, cityName: "Kayong Utara", apm: 20.28, apk: 20.28 },
    { province: "Kalimantan Barat", code: 6112, cityName: "Kubu Raya", apm: 13.60, apk: 13.60 },
    { province: "Kalimantan Barat", code: 6171, cityName: "Pontianak", apm: 29.90, apk: 29.90 },
    { province: "Kalimantan Barat", code: 6172, cityName: "Singkawang", apm: 23.22, apk: 23.22 },
    { province: "Kalimantan Tengah", code: 6201, cityName: "Kotawaringin Barat", apm: 36.55, apk: 37.66 },
    { province: "Kalimantan Tengah", code: 6202, cityName: "Kotawaringin Timur", apm: 27.52, apk: 27.52 },
    { province: "Kalimantan Tengah", code: 6203, cityName: "Kapuas", apm: 35.08, apk: 36.98 },
    { province: "Kalimantan Tengah", code: 6204, cityName: "Barito Selatan", apm: 38.76, apk: 38.76 },
    { province: "Kalimantan Tengah", code: 6205, cityName: "Barito Utara", apm: 40.45, apk: 40.45 },
    { province: "Kalimantan Tengah", code: 6206, cityName: "Sukamara", apm: 40.69, apk: 40.91 },
    { province: "Kalimantan Tengah", code: 6207, cityName: "Lamandau", apm: 50.78, apk: 51.92 },
    { province: "Kalimantan Tengah", code: 6208, cityName: "Seruyan", apm: 43.22, apk: 43.22 },
    { province: "Kalimantan Tengah", code: 6209, cityName: "Katingan", apm: 29.04, apk: 29.04 },
    { province: "Kalimantan Tengah", code: 6210, cityName: "Pulang Pisau", apm: 31.27, apk: 31.27 },
    { province: "Kalimantan Tengah", code: 6211, cityName: "Gunung Mas", apm: 39.48, apk: 39.48 },
    { province: "Kalimantan Tengah", code: 6212, cityName: "Barito Timur", apm: 35.58, apk: 37.57 },
    { province: "Kalimantan Tengah", code: 6213, cityName: "Murung Raya", apm: 35.01, apk: 35.01 },
    { province: "Kalimantan Tengah", code: 6271, cityName: "Palangka Raya", apm: 40.49, apk: 40.49 },
    { province: "Kalimantan Selatan", code: 6301, cityName: "Tanah Laut", apm: 39.94, apk: 40.96 },
    { province: "Kalimantan Selatan", code: 6302, cityName: "Kotabaru", apm: 43.74, apk: 43.74 },
    { province: "Kalimantan Selatan", code: 6303, cityName: "Banjar", apm: 39.46, apk: 39.46 },
    { province: "Kalimantan Selatan", code: 6304, cityName: "Barito Kuala", apm: 41.10, apk: 41.10 },
    { province: "Kalimantan Selatan", code: 6305, cityName: "Tapin", apm: 51.60, apk: 51.60 },
    { province: "Kalimantan Selatan", code: 6306, cityName: "Hulu Sungai Selatan", apm: 59.17, apk: 59.17 },
    { province: "Kalimantan Selatan", code: 6307, cityName: "Hulu Sungai Tengah", apm: 55.96, apk: 56.32 },
    { province: "Kalimantan Selatan", code: 6308, cityName: "Hulu Sungai Utara", apm: 51.06, apk: 52.63 },
    { province: "Kalimantan Selatan", code: 6309, cityName: "Tabalong", apm: 37.54, apk: 37.54 },
    { province: "Kalimantan Selatan", code: 6310, cityName: "Tanah Bumbu", apm: 40.62, apk: 40.62 },
    { province: "Kalimantan Selatan", code: 6311, cityName: "Balangan", apm: 52.08, apk: 52.08 },
    { province: "Kalimantan Selatan", code: 6371, cityName: "Banjarmasin", apm: 34.71, apk: 35.74 },
    { province: "Kalimantan Selatan", code: 6372, cityName: "Banjarbaru", apm: 44.06, apk: 45.08 },
    { province: "Kalimantan Timur", code: 6401, cityName: "Paser", apm: 27.06, apk: 28.32 },
    { province: "Kalimantan Timur", code: 6402, cityName: "Kutai Barat", apm: 26.93, apk: 26.93 },
    { province: "Kalimantan Timur", code: 6403, cityName: "Kutai Kartanegara", apm: 26.58, apk: 26.58 },
    { province: "Kalimantan Timur", code: 6404, cityName: "Kutai Timur", apm: 20.23, apk: 20.23 },
    { province: "Kalimantan Timur", code: 6405, cityName: "Berau", apm: 37.64, apk: 37.64 },
    { province: "Kalimantan Timur", code: 6409, cityName: "Penajam Paser Utara", apm: 28.48, apk: 28.48 },
    { province: "Kalimantan Timur", code: 6411, cityName: "Mahakam Ulu", apm: 38.14, apk: 40.45 },
    { province: "Kalimantan Timur", code: 6471, cityName: "Balikpapan", apm: 22.68, apk: 22.68 },
    { province: "Kalimantan Timur", code: 6472, cityName: "Samarinda", apm: 23.75, apk: 23.75 },
    { province: "Kalimantan Timur", code: 6474, cityName: "Bontang", apm: 45.68, apk: 45.68 },
    { province: "Kalimantan Utara", code: 6501, cityName: "Malinau", apm: 46.02, apk: 48.20 },
    { province: "Kalimantan Utara", code: 6502, cityName: "Bulungan", apm: 27.90, apk: 27.90 },
    { province: "Kalimantan Utara", code: 6503, cityName: "Tana Tidung", apm: 55.44, apk: 55.75 },
    { province: "Kalimantan Utara", code: 6504, cityName: "Nunukan", apm: 28.69, apk: 29.99 },
    { province: "Kalimantan Utara", code: 6571, cityName: "Tarakan", apm: 26.76, apk: 26.76 },
    { province: "Sulawesi Utara", code: 7101, cityName: "Bolaang Mongondow", apm: 34.86, apk: 34.86 },
    { province: "Sulawesi Utara", code: 7102, cityName: "Minahasa", apm: 28.15, apk: 28.15 },
    { province: "Sulawesi Utara", code: 7103, cityName: "Kepulauan Sangihe", apm: 39.10, apk: 39.10 },
    { province: "Sulawesi Utara", code: 7104, cityName: "Kepulauan Talaud", apm: 44.70, apk: 47.93 },
    { province: "Sulawesi Utara", code: 7105, cityName: "Minahasa Selatan", apm: 23.11, apk: 23.11 },
    { province: "Sulawesi Utara", code: 7106, cityName: "Minahasa Utara", apm: 26.03, apk: 26.03 },
    { province: "Sulawesi Utara", code: 7107, cityName: "Bolaang Mongondow Utara", apm: 50.96, apk: 51.57 },
    { province: "Sulawesi Utara", code: 7108, cityName: "Siau Tagulandang Biaro", apm: 35.23, apk: 35.23 },
    { province: "Sulawesi Utara", code: 7109, cityName: "Minahasa Tenggara", apm: 36.53, apk: 36.53 },
    { province: "Sulawesi Utara", code: 7110, cityName: "Bolaang Mongondow Selatan", apm: 32.05, apk: 32.05 },
    { province: "Sulawesi Utara", code: 7111, cityName: "Bolaang Mongondow Timur", apm: 38.35, apk: 38.35 },
    { province: "Sulawesi Utara", code: 7171, cityName: "Manado", apm: 19.82, apk: 19.82 },
    { province: "Sulawesi Utara", code: 7172, cityName: "Bitung", apm: 18.23, apk: 18.23 },
    { province: "Sulawesi Utara", code: 7173, cityName: "Tomohon", apm: 26.79, apk: 26.79 },
    { province: "Sulawesi Utara", code: 7174, cityName: "Kotamobagu", apm: 29.38, apk: 29.38 },
    { province: "Sulawesi Tengah", code: 7201, cityName: "Banggai Kepulauan", apm: 54.59, apk: 55.78 },
    { province: "Sulawesi Tengah", code: 7202, cityName: "Banggai", apm: 39.06, apk: 39.55 },
    { province: "Sulawesi Tengah", code: 7203, cityName: "Morowali", apm: 38.72, apk: 40.00 },
    { province: "Sulawesi Tengah", code: 7204, cityName: "Poso", apm: 38.41, apk: 38.41 },
    { province: "Sulawesi Tengah", code: 7205, cityName: "Donggala", apm: 26.56, apk: 26.56 },
    { province: "Sulawesi Tengah", code: 7206, cityName: "Toli Toli", apm: 31.33, apk: 31.33 },
    { province: "Sulawesi Tengah", code: 7207, cityName: "Buol", apm: 42.65, apk: 42.65 },
    { province: "Sulawesi Tengah", code: 7208, cityName: "Parigi Moutong", apm: 40.29, apk: 40.29 },
    { province: "Sulawesi Tengah", code: 7209, cityName: "Tojo Una Una", apm: 51.09, apk: 52.26 },
    { province: "Sulawesi Tengah", code: 7210, cityName: "Sigi", apm: 32.71, apk: 32.71 },
    { province: "Sulawesi Tengah", code: 7211, cityName: "Banggai Laut", apm: 36.02, apk: 36.02 },
    { province: "Sulawesi Tengah", code: 7212, cityName: "Morowali Utara", apm: 37.78, apk: 39.63 },
    { province: "Sulawesi Tengah", code: 7271, cityName: "Palu", apm: 19.70, apk: 19.70 },
    { province: "Sulawesi Selatan", code: 7301, cityName: "Kepulauan Selayar", apm: 49.98, apk: 50.72 },
    { province: "Sulawesi Selatan", code: 7302, cityName: "Bulukumba", apm: 41.66, apk: 41.66 },
    { province: "Sulawesi Selatan", code: 7303, cityName: "Bantaeng", apm: 43.25, apk: 43.25 },
    { province: "Sulawesi Selatan", code: 7304, cityName: "Jeneponto", apm: 27.27, apk: 27.27 },
    { province: "Sulawesi Selatan", code: 7305, cityName: "Takalar", apm: 32.17, apk: 32.17 },
    { province: "Sulawesi Selatan", code: 7306, cityName: "Gowa", apm: 29.80, apk: 31.10 },
    { province: "Sulawesi Selatan", code: 7307, cityName: "Sinjai", apm: 59.64, apk: 59.64 },
    { province: "Sulawesi Selatan", code: 7308, cityName: "Maros", apm: 31.59, apk: 31.59 },
    { province: "Sulawesi Selatan", code: 7309, cityName: "Pangkajene Dan Kepulauan", apm: 42.39, apk: 43.37 },
    { province: "Sulawesi Selatan", code: 7310, cityName: "Barru", apm: 33.72, apk: 33.72 },
    { province: "Sulawesi Selatan", code: 7311, cityName: "Bone", apm: 33.50, apk: 33.50 },
    { province: "Sulawesi Selatan", code: 7312, cityName: "Soppeng", apm: 27.80, apk: 27.80 },
    { province: "Sulawesi Selatan", code: 7313, cityName: "Wajo", apm: 35.78, apk: 35.78 },
    { province: "Sulawesi Selatan", code: 7314, cityName: "Sidenreng Rappang", apm: 36.05, apk: 36.05 },
    { province: "Sulawesi Selatan", code: 7315, cityName: "Pinrang", apm: 29.47, apk: 29.47 },
    { province: "Sulawesi Selatan", code: 7316, cityName: "Enrekang", apm: 31.54, apk: 32.20 },
    { province: "Sulawesi Selatan", code: 7317, cityName: "Luwu", apm: 25.26, apk: 25.26 },
    { province: "Sulawesi Selatan", code: 7318, cityName: "Tana Toraja", apm: 37.07, apk: 37.07 },
    { province: "Sulawesi Selatan", code: 7322, cityName: "Luwu Utara", apm: 35.88, apk: 37.04 },
    { province: "Sulawesi Selatan", code: 7325, cityName: "Luwu Timur", apm: 27.72, apk: 27.72 },
    { province: "Sulawesi Selatan", code: 7326, cityName: "Toraja Utara", apm: 16.18, apk: 16.18 },
    { province: "Sulawesi Selatan", code: 7371, cityName: "Makassar", apm: 21.20, apk: 21.20 },
    { province: "Sulawesi Selatan", code: 7372, cityName: "Parepare", apm: 30.32, apk: 30.32 },
    { province: "Sulawesi Selatan", code: 7373, cityName: "Palopo", apm: 28.42, apk: 29.03 },
    { province: "Sulawesi Tenggara", code: 7401, cityName: "Buton", apm: 47.13, apk: 47.80 },
    { province: "Sulawesi Tenggara", code: 7402, cityName: "Muna", apm: 36.73, apk: 36.73 },
    { province: "Sulawesi Tenggara", code: 7403, cityName: "Konawe", apm: 22.69, apk: 22.69 },
    { province: "Sulawesi Tenggara", code: 7404, cityName: "Kolaka", apm: 24.19, apk: 24.19 },
    { province: "Sulawesi Tenggara", code: 7405, cityName: "Konawe Selatan", apm: 20.12, apk: 20.12 },
    { province: "Sulawesi Tenggara", code: 7406, cityName: "Bombana", apm: 50.44, apk: 50.44 },
    { province: "Sulawesi Tenggara", code: 7407, cityName: "Wakatobi", apm: 48.53, apk: 55.25 },
    { province: "Sulawesi Tenggara", code: 7408, cityName: "Kolaka Utara", apm: 35.05, apk: 35.05 },
    { province: "Sulawesi Tenggara", code: 7409, cityName: "Buton Utara", apm: 42.31, apk: 42.41 },
    { province: "Sulawesi Tenggara", code: 7410, cityName: "Konawe Utara", apm: 44.26, apk: 44.46 },
    { province: "Sulawesi Tenggara", code: 7411, cityName: "Kolaka Timur", apm: 41.16, apk: 41.16 },
    { province: "Sulawesi Tenggara", code: 7412, cityName: "Konawe Kepulauan", apm: 47.44, apk: 48.40 },
    { province: "Sulawesi Tenggara", code: 7413, cityName: "Muna Barat", apm: 32.38, apk: 32.38 },
    { province: "Sulawesi Tenggara", code: 7414, cityName: "Buton Tengah", apm: 32.23, apk: 32.23 },
    { province: "Sulawesi Tenggara", code: 7415, cityName: "Buton Selatan", apm: 32.64, apk: 32.64 },
    { province: "Sulawesi Tenggara", code: 7471, cityName: "Kendari", apm: 25.21, apk: 25.21 },
    { province: "Sulawesi Tenggara", code: 7472, cityName: "Baubau", apm: 31.09, apk: 31.91 },
    { province: "Gorontalo", code: 7501, cityName: "Boalemo", apm: 46.32, apk: 48.85 },
    { province: "Gorontalo", code: 7502, cityName: "Gorontalo", apm: 39.36, apk: 39.36 },
    { province: "Gorontalo", code: 7503, cityName: "Pohuwato", apm: 63.08, apk: 63.46 },
    { province: "Gorontalo", code: 7504, cityName: "Bone Bolango", apm: 65.40, apk: 66.62 },
    { province: "Gorontalo", code: 7505, cityName: "Gorontalo Utara", apm: 53.61, apk: 53.94 },
    { province: "Gorontalo", code: 7571, cityName: "Kota Gorontalo", apm: 44.50, apk: 44.50 },
    { province: "Sulawesi Barat", code: 7601, cityName: "Majene", apm: 54.08, apk: 54.31 },
    { province: "Sulawesi Barat", code: 7602, cityName: "Polewali Mandar", apm: 50.11, apk: 50.11 },
    { province: "Sulawesi Barat", code: 7603, cityName: "Mamasa", apm: 46.33, apk: 47.14 },
    { province: "Sulawesi Barat", code: 7604, cityName: "Mamuju", apm: 39.84, apk: 40.27 },
    { province: "Sulawesi Barat", code: 7605, cityName: "Pasangkayu", apm: 38.18, apk: 38.18 },
    { province: "Sulawesi Barat", code: 7606, cityName: "Mamuju Tengah", apm: 31.99, apk: 31.99 },
    { province: "Maluku", code: 8101, cityName: "Kepulauan Tanimbar", apm: 33.22, apk: 33.22 },
    { province: "Maluku", code: 8102, cityName: "Maluku Tenggara", apm: 37.55, apk: 37.55 },
    { province: "Maluku", code: 8103, cityName: "Maluku Tengah", apm: 27.18, apk: 27.18 },
    { province: "Maluku", code: 8104, cityName: "Buru", apm: 39.00, apk: 39.00 },
    { province: "Maluku", code: 8105, cityName: "Kepulauan Aru", apm: 28.08, apk: 30.53 },
    { province: "Maluku", code: 8106, cityName: "Seram Bagian Barat", apm: 29.05, apk: 29.65 },
    { province: "Maluku", code: 8107, cityName: "Seram Bagian Timur", apm: 30.10, apk: 33.36 },
    { province: "Maluku", code: 8108, cityName: "Maluku Barat Daya", apm: 39.16, apk: 40.77 },
    { province: "Maluku", code: 8109, cityName: "Buru Selatan", apm: 44.48, apk: 45.50 },
    { province: "Maluku", code: 8171, cityName: "Ambon", apm: 22.00, apk: 22.00 },
    { province: "Maluku", code: 8172, cityName: "Tual", apm: 33.60, apk: 33.60 },
    { province: "Maluku Utara", code: 8201, cityName: "Halmahera Barat", apm: 33.06, apk: 33.06 },
    { province: "Maluku Utara", code: 8202, cityName: "Halmahera Tengah", apm: 51.90, apk: 56.18 },
    { province: "Maluku Utara", code: 8203, cityName: "Kepulauan Sula", apm: 26.08, apk: 26.08 },
    { province: "Maluku Utara", code: 8204, cityName: "Halmahera Selatan", apm: 38.12, apk: 38.12 },
    { province: "Maluku Utara", code: 8205, cityName: "Halmahera Utara", apm: 39.31, apk: 40.46 },
    { province: "Maluku Utara", code: 8206, cityName: "Halmahera Timur", apm: 41.24, apk: 41.24 },
    { province: "Maluku Utara", code: 8207, cityName: "Pulau Morotai", apm: 44.80, apk: 52.01 },
    { province: "Maluku Utara", code: 8208, cityName: "Pulau Taliabu", apm: 39.29, apk: 39.29 },
    { province: "Maluku Utara", code: 8271, cityName: "Ternate", apm: 26.26, apk: 26.26 },
    { province: "Maluku Utara", code: 8272, cityName: "Tidore Kepulauan", apm: 38.82, apk: 38.82 },
    { province: "Papua Barat", code: 9101, cityName: "Fakfak", apm: 36.56, apk: 37.32 },
    { province: "Papua Barat", code: 9102, cityName: "Kaimana", apm: 27.66, apk: 27.72 },
    { province: "Papua Barat", code: 9103, cityName: "Teluk Wondama", apm: 23.53, apk: 24.03 },
    { province: "Papua Barat", code: 9104, cityName: "Teluk Bintuni", apm: 48.49, apk: 49.19 },
    { province: "Papua Barat", code: 9105, cityName: "Manokwari", apm: 28.08, apk: 28.08 },
    { province: "Papua Barat", code: 9111, cityName: "Manokwari Selatan", apm: 40.53, apk: 40.53 },
    { province: "Papua Barat", code: 9112, cityName: "Pegunungan Arfak", apm: 16.47, apk: 16.47 },
    { province: "Papua Barat Daya", code: 9201, cityName: "Raja Ampat", apm: 22.94, apk: 23.88 },
    { province: "Papua Barat Daya", code: 9202, cityName: "Sorong", apm: 26.52, apk: 26.52 },
    { province: "Papua Barat Daya", code: 9203, cityName: "Sorong Selatan", apm: 21.25, apk: 22.57 },
    { province: "Papua Barat Daya", code: 9204, cityName: "Maybrat", apm: 34.31, apk: 34.31 },
    { province: "Papua Barat Daya", code: 9205, cityName: "Tambrauw", apm: 20.66, apk: 20.66 },
    { province: "Papua Barat Daya", code: 9271, cityName: "Kota Sorong", apm: 16.41, apk: 16.41 },
    { province: "Papua", code: 9403, cityName: "Jayapura", apm: 30.87, apk: 33.26 },
    { province: "Papua", code: 9408, cityName: "Kepulauan Yapen", apm: 10.21, apk: 10.21 },
    { province: "Papua", code: 9409, cityName: "Biak Numfor", apm: 25.09, apk: 26.88 },
    { province: "Papua", code: 9419, cityName: "Sarmi", apm: 14.61, apk: 14.61 },
    { province: "Papua", code: 9420, cityName: "Keerom", apm: 19.91, apk: 19.91 },
    { province: "Papua", code: 9426, cityName: "Waropen", apm: 25.12, apk: 26.24 },
    { province: "Papua", code: 9427, cityName: "Supiori", apm: 31.83, apk: 33.05 },
    { province: "Papua", code: 9428, cityName: "Mamberamo Raya", apm: 23.93, apk: 23.93 },
    { province: "Papua", code: 9471, cityName: "Kota Jayapura", apm: 13.14, apk: 13.14 },
    { province: "Papua Selatan", code: 9501, cityName: "Merauke", apm: 34.50, apk: 34.50 },
    { province: "Papua Selatan", code: 9502, cityName: "Boven Digoel", apm: 14.88, apk: 14.88 },
    { province: "Papua Selatan", code: 9503, cityName: "Mappi", apm: 9.04, apk: 9.04 },
    { province: "Papua Selatan", code: 9504, cityName: "Asmat", apm: 6.11, apk: 6.14 },
    { province: "Papua Tengah", code: 9601, cityName: "Mimika", apm: 18.00, apk: 18.00 },
    { province: "Papua Tengah", code: 9602, cityName: "Dogiyai", apm: null, apk: null },
    { province: "Papua Tengah", code: 9603, cityName: "Deiyai", apm: 0.98, apk: 0.98 },
    { province: "Papua Tengah", code: 9604, cityName: "Nabire", apm: 18.53, apk: 18.53 },
    { province: "Papua Tengah", code: 9605, cityName: "Paniai", apm: 5.24, apk: 5.24 },
    { province: "Papua Tengah", code: 9606, cityName: "Intan Jaya", apm: 4.45, apk: 4.45 },
    { province: "Papua Tengah", code: 9607, cityName: "Puncak", apm: 0.59, apk: 0.59 },
    { province: "Papua Tengah", code: 9608, cityName: "Puncak Jaya", apm: 2.86, apk: 2.86 },
    { province: "Papua Pegunungan", code: 9701, cityName: "Nduga", apm: 0.46, apk: 0.46 },
    { province: "Papua Pegunungan", code: 9702, cityName: "Jayawijaya", apm: 4.85, apk: 4.85 },
    { province: "Papua Pegunungan", code: 9703, cityName: "Lanny Jaya", apm: 1.72, apk: 1.72 },
    { province: "Papua Pegunungan", code: 9704, cityName: "Tolikara", apm: 1.60, apk: 1.60 },
    { province: "Papua Pegunungan", code: 9705, cityName: "Mamberamo Tengah", apm: 4.63, apk: 4.63 },
    { province: "Papua Pegunungan", code: 9706, cityName: "Yalimo", apm: 2.19, apk: 2.19 },
    { province: "Papua Pegunungan", code: 9707, cityName: "Yahukimo", apm: 3.87, apk: 3.87 },
    { province: "Papua Pegunungan", code: 9708, cityName: "Pegunungan Bintang", apm: 6.99, apk: 6.99 }
];


// Calculate National Averages from real data
const validApms = paudParticipationData2024.map(d => d.apm).filter((v): v is number => v !== null);
const validApks = paudParticipationData2024.map(d => d.apk).filter((v): v is number => v !== null);
const nationalAverageApm = validApms.reduce((sum, v) => sum + v, 0) / validApms.length;
const nationalAverageApk = validApks.reduce((sum, v) => sum + v, 0) / validApks.length;

// Helper to normalize city names for matching
const normalizeName = (name: string): string => {
    return name.toLowerCase().replace(/^(kabupaten|kota|kab\.|adm\.)\s*/, '');
};

const paudDataMap = new Map<string, { apm: number | null, apk: number | null }>();
paudParticipationData2024.forEach(d => {
    // A few city names in the user data are slightly different, we manually correct them for mapping
    let correctedCityName = d.cityName;
    if (d.cityName === 'Pangkajene Dan Kepulauan') correctedCityName = 'Pangkajene Kepulauan';
    if (d.cityName === 'Banyu Asin') correctedCityName = 'Banyuasin';
    if (d.province === 'Di Yogyakarta' && d.cityName === 'Yogyakarta') correctedCityName = 'Kota Yogyakarta';
    if (d.province === 'Jambi' && d.cityName === 'Jambi') correctedCityName = 'Kota Jambi';
    if (d.province === 'Bengkulu' && d.cityName === 'Bengkulu') correctedCityName = 'Kota Bengkulu';
    if (d.province === 'Gorontalo' && d.cityName === 'Gorontalo') correctedCityName = 'Kab. Gorontalo';
    if (d.cityName === 'Kota Gorontalo') correctedCityName = 'Gorontalo'; // Match the city name used in indonesiaData
    if (d.cityName === 'Palangka Raya') correctedCityName = 'Palangkaraya';
    if (d.cityName === 'Toli Toli') correctedCityName = 'Tolitoli';
    if (d.cityName === 'Parepare') correctedCityName = 'Pare Pare';
    if (d.cityName === 'Bau Bau') correctedCityName = 'Bau-Bau';
    if (d.cityName === 'Fakfak') correctedCityName = 'Fak Fak';
    if (d.province === 'Papua Barat Daya' && d.cityName === 'Sorong') correctedCityName = 'Kab. Sorong';
     if (d.cityName === 'Kota Sorong') correctedCityName = 'Sorong';

    const key = `${normalizeName(d.province)}|${normalizeName(correctedCityName)}`;
    paudDataMap.set(key, { apm: d.apm, apk: d.apk });
});

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
        { value: `${nationalAverageApm.toFixed(1)}%`, label: 'Angka Partisipasi Murni (APM) PAUD', change: 2.1, changeType: 'increase', domain: 'Pendidikan' },
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
    'Pendidikan': [
       { value: `${nationalAverageApm.toFixed(1)}%`, label: 'Angka Partisipasi Murni (APM) PAUD', change: 2.1, changeType: 'increase', domain: 'Pendidikan' },
       { value: `${nationalAverageApk.toFixed(1)}%`, label: 'Angka Partisipasi Kasar (APK) PAUD', change: 1.8, changeType: 'increase', domain: 'Pendidikan' },
       { value: '82.0%', label: 'Kualifikasi Guru (Minimal S1)', change: 3.5, changeType: 'increase', domain: 'Pendidikan' },
       { value: '55.7%', label: 'Satuan PAUD Terakreditasi (Minimal B)', change: 4.2, changeType: 'increase', domain: 'Pendidikan'},
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
    { id: 'alert-21', level: AlertLevel.High, title: 'APM PAUD Rendah', region: 'Papua Pegunungan', domain: 'Pendidikan', riskScore: 82, trend: 2 },
    { id: 'alert-22', level: AlertLevel.Medium, title: 'Kekurangan Guru PAUD Berkualitas', region: 'Maluku', domain: 'Pendidikan', riskScore: 68, trend: 1 },
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
        case 'Pendidikan':
            metrics = [
                // This will be replaced by real data
                { label: 'APM PAUD (3-6 Tahun)', value: 0, unit: '%', nationalAverage: nationalAverageApm, higherIsBetter: true },
                { label: 'APK PAUD (3-6 Tahun)', value: 0, unit: '%', nationalAverage: nationalAverageApk, higherIsBetter: true },
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
    "Aceh": ["Kab. Aceh Selatan", "Kab. Aceh Tenggara", "Kab. Aceh Timur", "Kab. Aceh Tengah", "Kab. Aceh Barat", "Kab. Aceh Besar", "Kab. Pidie", "Kab. Aceh Utara", "Simeulue", "Aceh Singkil", "Bireuen", "Aceh Barat Daya", "Gayo Lues", "Aceh Jaya", "Nagan Raya", "Aceh Tamiang", "Bener Meriah", "Pidie Jaya", "Kota Banda Aceh", "Sabang", "Lhokseumawe", "Langsa", "Subulussalam"],
    "Sumatera Utara": ["Kab. Tapanuli Tengah", "Kab. Tapanuli Utara", "Kab. Tapanuli Selatan", "Nias", "Langkat", "Karo", "Deli Serdang", "Simalungun", "Asahan", "Labuhanbatu", "Dairi", "Toba", "Mandailing Natal", "Nias Selatan", "Pakpak Bharat", "Humbang Hasunduta", "Samosir", "Serdang Bedagai", "Batu Bara", "Padang Lawas Utara", "Padang Lawas", "Labuhanbatu Selatan", "Labuhanbatu Utara", "Nias Utara", "Nias Barat", "Kota Medan", "Pematang Siantar", "Sibolga", "Tanjungbalai", "Binjai", "Tebing Tinggi", "Padangsidimpuan", "Gunungsitoli"],
    "Sumatera Barat": ["Pesisir Selatan", "Kab. Solok", "Sijunjung", "Tanah Datar", "Padang Pariaman", "Agam", "Lima Puluh Kota", "Pasaman", "Kepulauan Mentawai", "Dharmasraya", "Solok Selatan", "Pasaman Barat", "Kota Padang", "Kota Solok", "Sawahlunto", "Padang Panjang", "Bukittinggi", "Payakumbuh", "Pariaman"],
    "Riau": ["Kampar", "Indragiri Hulu", "Bengkalis", "Indragiri Hilir", "Pelalawan", "Rokan Hulu", "Rokan Hilir", "Siak", "Kuantan Singingi", "Kepulauan Meranti", "Kota Pekanbaru", "Dumai"],
    "Jambi": ["Kerinci", "Merangin", "Sarolangun", "Batang Hari", "Muaro Jambi", "Tanjung Jabung Barat", "Tanjung Jabung Timur", "Bungo", "Tebo", "Kota Jambi", "Sungai Penuh"],
    "Sumatera Selatan": ["Ogan Komering Ulu", "Ogan Komering Ilir", "Muara Enim", "Lahat", "Musi Rawas", "Musi Banyuasin", "Banyuasin", "Ogan Komering Ulu Timur", "Ogan Komering Ulu Selatan", "Ogan Ilir", "Empat Lawang", "Penukal Abab Lematang Ilir", "Musi Rawas Utara", "Kota Palembang", "Pagar Alam", "Lubuklinggau", "Prabumulih"],
    "Bengkulu": ["Bengkulu Selatan", "Rejang Lebong", "Bengkulu Utara", "Kaur", "Seluma", "Mukomuko", "Lebong", "Kepahiang", "Bengkulu Tengah", "Kota Bengkulu"],
    "Lampung": ["Lampung Selatan", "Lampung Tengah", "Lampung Utara", "Lampung Barat", "Tulang Bawang", "Tanggamus", "Lampung Timur", "Way Kanan", "Pesawaran", "Pringsewu", "Mesuji", "Tulang Bawang Barat", "Pesisir Barat", "Kota Bandar Lampung", "Metro"],
    "Kepulauan Bangka Belitung": ["Bangka", "Belitung", "Bangka Selatan", "Bangka Tengah", "Bangka Barat", "Belitung Timur", "Kota Pangkal Pinang"],
    "Kepulauan Riau": ["Bintan", "Karimun", "Natuna", "Lingga", "Kepulauan Anambas", "Kota Batam", "Tanjung Pinang"],
    "DKI Jakarta": ["Kab. Kepulauan Seribu", "Kota Adm. Jakarta Pusat", "Kota Adm. Jakarta Utara", "Kota Adm. Jakarta Barat", "Kota Adm. Jakarta Selatan", "Kota Adm. Jakarta Timur"],
    "Jawa Barat": ["Kab. Bogor", "Kab. Sukabumi", "Cianjur", "Kab. Bandung", "Garut", "Kab. Tasikmalaya", "Ciamis", "Kuningan", "Kab. Cirebon", "Majalengka", "Sumedang", "Indramayu", "Subang", "Purwakarta", "Karawang", "Kab. Bekasi", "Bandung Barat", "Pangandaran", "Kota Bogor", "Kota Sukabumi", "Kota Bandung", "Kota Cirebon", "Kota Bekasi", "Depok", "Cimahi", "Kota Tasikmalaya", "Banjar"],
    "Jawa Tengah": ["Cilacap", "Banyumas", "Purbalingga", "Banjarnegara", "Kebumen", "Purworejo", "Wonosobo", "Kab. Magelang", "Boyolali", "Klaten", "Sukoharjo", "Wonogiri", "Karanganyar", "Sragen", "Grobogan", "Blora", "Rembang", "Pati", "Kudus", "Jepara", "Demak", "Kab. Semarang", "Temanggung", "Kendal", "Batang", "Kab. Pekalongan", "Pemalang", "Kab. Tegal", "Brebes", "Kota Magelang", "Surakarta", "Salatiga", "Kota Semarang", "Kota Pekalongan", "Kota Tegal"],
    "DI Yogyakarta": ["Kulon Progo", "Bantul", "Gunungkidul", "Sleman", "Kota Yogyakarta"],
    "Jawa Timur": ["Pacitan", "Ponorogo", "Trenggalek", "Tulungagung", "Kab. Blitar", "Kab. Kediri", "Kab. Malang", "Lumajang", "Jember", "Banyuwangi", "Bondowoso", "Situbondo", "Kab. Probolinggo", "Kab. Pasuruan", "Sidoarjo", "Kab. Mojokerto", "Jombang", "Nganjuk", "Kab. Madiun", "Magetan", "Ngawi", "Bojonegoro", "Tuban", "Lamongan", "Gresik", "Bangkalan", "Sampang", "Pamekasan", "Sumenep", "Kota Kediri", "Kota Blitar", "Kota Malang", "Kota Probolinggo", "Kota Pasuruan", "Kota Mojokerto", "Kota Madiun", "Surabaya", "Batu"],
    "Banten": ["Pandeglang", "Lebak", "Kab. Tangerang", "Kab. Serang", "Kota Tangerang", "Cilegon", "Kota Serang", "Tangerang Selatan"],
    "Bali": ["Jembrana", "Tabanan", "Badung", "Gianyar", "Klungkung", "Bangli", "Karangasem", "Buleleng", "Denpasar"],
    "Nusa Tenggara Barat": ["Lombok Barat", "Lombok Tengah", "Lombok Timur", "Sumbawa", "Dompu", "Bima", "Sumbawa Barat", "Lombok Utara", "Mataram", "Kota Bima"],
    "Nusa Tenggara Timur": ["Kab. Kupang", "Timor Tengah Selatan", "Timor Tengah Utara", "Belu", "Alor", "Flores Timur", "Sikka", "Ende", "Ngada", "Manggarai", "Sumba Timur", "Sumba Barat", "Lembata", "Rote Ndao", "Manggarai Barat", "Nagekeo", "Sumba Tengah", "Sumba Barat Daya", "Manggarai Timur", "Sabu Raijua", "Malaka", "Kota Kupang"],
    "Kalimantan Barat": ["Sambas", "Mempawah", "Sanggau", "Ketapang", "Sintang", "Kapuas Hulu", "Bengkayang", "Landak", "Sekadau", "Melawi", "Kayong Utara", "Kubu Raya", "Pontianak", "Singkawang"],
    "Kalimantan Tengah": ["Kotawaringin Barat", "Kotawaringin Timur", "Kapuas", "Barito Selatan", "Barito Utara", "Katingan", "Seruyan", "Sukamara", "Lamandau", "Gunung Mas", "Pulang Pisau", "Murung Raya", "Barito Timur", "Palangkaraya"],
    "Kalimantan Selatan": ["Tanah Laut", "Kotabaru", "Banjar", "Barito Kuala", "Tapin", "Hulu Sungai Selatan", "Hulu Sungai Tengah", "Hulu Sungai Utara", "Tabalong", "Tanah Bumbu", "Balangan", "Banjarmasin", "Banjarbaru"],
    "Kalimantan Timur": ["Paser", "Kutai Kartanegara", "Berau", "Kutai Barat", "Kutai Timur", "Penajam Paser Utara", "Mahakam Ulu", "Balikpapan", "Samarinda", "Bontang"],
    "Kalimantan Utara": ["Bulungan", "Malinau", "Nunukan", "Tana Tidung", "Tarakan"],
    "Sulawesi Utara": ["Bolaang Mongondow", "Minahasa", "Kepulauan Sangihe", "Kepulauan Talaud", "Minahasa Selatan", "Minahasa Utara", "Minahasa Tenggara", "Bolaang Mongondow Utara", "Kepulauan Siau Tagulandang Biaro", "Bolaang Mongondow Timur", "Bolaang Mongondow Selatan", "Manado", "Bitung", "Tomohon", "Kotamobagu"],
    "Sulawesi Tengah": ["Banggai", "Poso", "Donggala", "Tolitoli", "Buol", "Morowali", "Banggai Kepulauan", "Parigi Moutong", "Tojo Una Una", "Sigi", "Banggai Laut", "Morowali Utara", "Palu"],
    "Sulawesi Selatan": ["Kepulauan Selayar", "Bulukumba", "Bantaeng", "Jeneponto", "Takalar", "Gowa", "Sinjai", "Bone", "Maros", "Pangkajene Kepulauan", "Barru", "Soppeng", "Wajo", "Sidenreng Rappang", "Pinrang", "Enrekang", "Luwu", "Tana Toraja", "Luwu Utara", "Luwu Timur", "Toraja Utara", "Makassar", "Pare Pare", "Palopo"],
    "Sulawesi Tenggara": ["Kolaka", "Konawe", "Muna", "Buton", "Konawe Selatan", "Bombana", "Wakatobi", "Kolaka Utara", "Konawe Utara", "Buton Utara", "Kolaka Timur", "Konawe Kepulauan", "Muna Barat", "Buton Tengah", "Buton Selatan", "Kendari", "Bau-Bau"],
    "Gorontalo": ["Kab. Gorontalo", "Boalemo", "Bone Bolango", "Pohuwato", "Gorontalo Utara", "Gorontalo"],
    "Sulawesi Barat": ["Mamuju", "Polewali Mandar", "Majene", "Mamasa", "Pasangkayu", "Mamuju Tengah"],
    "Maluku": ["Maluku Tengah", "Maluku Tenggara", "Kepulauan Tanimbar", "Buru", "Seram Bagian Timur", "Seram Bagian Barat", "Kepulauan Aru", "Maluku Barat Daya", "Buru Selatan", "Ambon", "Tual"],
    "Maluku Utara": ["Halmahera Barat", "Halmahera Tengah", "Halmahera Utara", "Halmahera Selatan", "Kepulauan Sula", "Halmahera Timur", "Pulau Morotai", "Pulau Taliabu", "Ternate", "Tidore Kepulauan"],
    "Papua": ["Kab. Jayapura", "Nabire", "Kepulauan Yapen", "Biak Numfor", "Sarmi", "Keerom", "Waropen", "Supiori", "Mamberamo Raya", "Kota Jayapura"],
    "Papua Barat": ["Manokwari", "Fak Fak", "Kaimana", "Teluk Wondama", "Teluk Bintuni", "Manokwari Selatan", "Pegunungan Arfak"],
    "Papua Barat Daya": ["Kab. Sorong", "Sorong Selatan", "Raja Ampat", "Tambrauw", "Maybrat", "Sorong"],
    "Papua Tengah": ["Puncak Jaya", "Paniai", "Mimika", "Puncak", "Dogiyai", "Intan Jaya", "Deiyai"],
    "Papua Pegunungan": ["Jayawijaya", "Pegunungan Bintang", "Yahukimo", "Tolikara", "Mamberamo Tengah", "Yalimo", "Lanny Jaya", "Nduga"],
    "Papua Selatan": ["Merauke", "Boven Digoel", "Mappi", "Asmat"]
};

const generatedRegionsDetails: Record<string, RegionDetailData> = {};
const generatedKabupatenKotaDetails: Record<string, KabupatenKotaDetailData> = {};

Object.entries(indonesiaData).forEach(([provinceName, cities]) => {
    const provinceId = toKebabCase(provinceName);
    const kabKotaIds = cities.map(city => toKebabCase(city));
    
    // Generate base random data for all domains except Pendidikan
    const domainsWithoutPendidikan = {
        Kesehatan: generateDomainMetrics(rand(40, 85), 'Kesehatan'),
        Gizi: generateDomainMetrics(rand(40, 85), 'Gizi'),
        Pengasuhan: generateDomainMetrics(rand(40, 85), 'Pengasuhan'),
        Perlindungan: generateDomainMetrics(rand(40, 85), 'Perlindungan'),
        Kesejahteraan: generateDomainMetrics(rand(40, 85), 'Kesejahteraan'),
        Lingkungan: generateDomainMetrics(rand(40, 85), 'Lingkungan'),
    };

    // Placeholder for Pendidikan domain data for the province
    let provincePendidikan: DomainMetrics = { riskScore: 0, metrics: [] };
    const cityPendidikanScores: number[] = [];

    cities.forEach(cityName => {
        const kabKotaId = toKebabCase(cityName);
        const baseCityRisk = rand(20, 90);
        
        const cityDomainsWithoutPendidikan = {
            Kesehatan: generateDomainMetrics(baseCityRisk, 'Kesehatan'),
            Gizi: generateDomainMetrics(baseCityRisk, 'Gizi'),
            Pengasuhan: generateDomainMetrics(baseCityRisk, 'Pengasuhan'),
            Perlindungan: generateDomainMetrics(baseCityRisk, 'Perlindungan'),
            Kesejahteraan: generateDomainMetrics(baseCityRisk, 'Kesejahteraan'),
            Lingkungan: generateDomainMetrics(baseCityRisk, 'Lingkungan'),
        };

        // Get real PAUD data
        const paudKey = `${normalizeName(provinceName)}|${normalizeName(cityName)}`;
        const paudData = paudDataMap.get(paudKey);
        
        const apm = paudData?.apm ?? null;
        const apk = paudData?.apk ?? null;
        
        let pendidikanRiskScore = 75; // Default high risk if no data
        if (apm !== null && apk !== null) {
            pendidikanRiskScore = 100 - ((apm + apk) / 2);
        } else if (apm !== null) {
            pendidikanRiskScore = 100 - apm;
        } else if (apk !== null) {
            pendidikanRiskScore = 100 - apk;
        }
        pendidikanRiskScore = parseFloat(pendidikanRiskScore.toFixed(1));
        cityPendidikanScores.push(pendidikanRiskScore);

        const cityPendidikan: DomainMetrics = {
            riskScore: pendidikanRiskScore,
            metrics: [
                { label: 'APM PAUD (3-6 Tahun)', value: apm ?? 'N/A', unit: '%', nationalAverage: parseFloat(nationalAverageApm.toFixed(1)), higherIsBetter: true },
                { label: 'APK PAUD (3-6 Tahun)', value: apk ?? 'N/A', unit: '%', nationalAverage: parseFloat(nationalAverageApk.toFixed(1)), higherIsBetter: true },
            ]
        };

        const allCityDomains = { ...cityDomainsWithoutPendidikan, Pendidikan: cityPendidikan };
        const overallCityRisk = Object.values(allCityDomains).reduce((sum, d) => sum + d.riskScore, 0) / 7;

        generatedKabupatenKotaDetails[kabKotaId] = {
            id: kabKotaId,
            name: cityName,
            parentRegionId: provinceId,
            overallRisk: parseFloat(overallCityRisk.toFixed(1)),
            population: rand(50000, 2000000),
            activeAlertsCount: rand(0, 3),
            domains: allCityDomains,
            historicalRisk: generateHistoricalRisk(overallCityRisk),
        };
    });

    // Calculate province-level Pendidikan data
    const provincePaudData = paudParticipationData2024.filter(d => normalizeName(d.province) === normalizeName(provinceName));
    const provinceValidApms = provincePaudData.map(d => d.apm).filter((v): v is number => v !== null);
    const provinceValidApks = provincePaudData.map(d => d.apk).filter((v): v is number => v !== null);
    const avgApm = provinceValidApms.length > 0 ? provinceValidApms.reduce((s, v) => s + v, 0) / provinceValidApms.length : null;
    const avgApk = provinceValidApks.length > 0 ? provinceValidApks.reduce((s, v) => s + v, 0) / provinceValidApks.length : null;
    const avgPendidikanRisk = cityPendidikanScores.length > 0 ? cityPendidikanScores.reduce((s, v) => s + v, 0) / cityPendidikanScores.length : 75;

    provincePendidikan = {
        riskScore: parseFloat(avgPendidikanRisk.toFixed(1)),
        metrics: [
             { label: 'APM PAUD (3-6 Tahun)', value: avgApm ? parseFloat(avgApm.toFixed(1)) : 'N/A', unit: '%', nationalAverage: parseFloat(nationalAverageApm.toFixed(1)), higherIsBetter: true },
             { label: 'APK PAUD (3-6 Tahun)', value: avgApk ? parseFloat(avgApk.toFixed(1)) : 'N/A', unit: '%', nationalAverage: parseFloat(nationalAverageApk.toFixed(1)), higherIsBetter: true },
        ]
    };

    const allProvinceDomains = { ...domainsWithoutPendidikan, Pendidikan: provincePendidikan };
    const overallProvinceRisk = Object.values(allProvinceDomains).reduce((sum, d) => sum + d.riskScore, 0) / 7;

    generatedRegionsDetails[provinceId] = {
        id: provinceId,
        name: provinceName,
        overallRisk: parseFloat(overallProvinceRisk.toFixed(1)),
        population: rand(500000, 15000000),
        activeAlertsCount: rand(0, 5),
        domains: allProvinceDomains,
        historicalRisk: generateHistoricalRisk(overallProvinceRisk),
        kabupatenKotaIds: kabKotaIds,
    };
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
                'Pendidikan': 5,
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
        let validPerformersCount = 0;

        Object.values(regionsDetails).forEach(region => {
            const metric = region.domains[domain].metrics.find(m => m.label === label);
            if (metric && metric.value !== 'N/A') { // Check if metric exists and has a valid value
                 performers.push({ name: region.name, value: metric.value });
                 if (typeof metric.value === 'number') {
                    validPerformersCount++;
                 }
                nationalAverage = metric.nationalAverage;
                unit = metric.unit;
                higherIsBetter = metric.higherIsBetter;
            }
        });

        if (performers.length > 0 && typeof performers[0].value === 'number') {
            const numericPerformers = performers.filter(p => typeof p.value === 'number') as { name: string; value: number }[];
            if(numericPerformers.length > 0) {
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
    'Pendidikan': generateDomainData('Pendidikan'),
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
            { id: 'ai-1-1', text: 'Pengadaan 2 unit mobil operasional', completed: true, dueDate: '2024-07-10' },
            { id: 'ai-1-2', text: 'Rekrutmen 4 tenaga kesehatan lapangan', completed: true, dueDate: '2024-07-20' },
            { id: 'ai-1-3', text: 'Sosialisasi program dengan kepala suku', completed: false, dueDate: '2024-08-05' },
            { id: 'ai-1-4', text: 'Pelaksanaan imunisasi gelombang pertama', completed: false, dueDate: '2024-08-20' },
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
            { id: 'ai-2-1', text: 'Distribusi 10,000 paket PMT', completed: true, dueDate: '2024-06-25' },
            { id: 'ai-2-2', text: 'Pelatihan 500 kader Posyandu tentang PM-TBA', completed: true, dueDate: '2024-07-05' },
            { id: 'ai-2-3', text: 'Kampanye media tentang 1000 HPK', completed: false, dueDate: '2024-09-01' },
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
            { id: 'ai-5-1', text: 'Koordinasi dengan Dinas Kesehatan Provinsi', completed: false, dueDate: '2024-08-15' },
            { id: 'ai-5-2', text: 'Pengadaan 50,000 strip TTD', completed: false, dueDate: '2024-09-01' },
            { id: 'ai-5-3', text: 'Pelatihan Bidan dan Kader', completed: false, dueDate: '2024-09-20' },
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
        kpi: 'Meningkatkan akses sanitasi layak dari 65% menjadi 75%',
        actionItems: [],
        relatedAlertId: 'alert-6'
    },
     {
        id: 'plan-004',
        title: 'Gerakan Kembali ke PAUD',
        description: 'Kampanye dan bantuan operasional untuk meningkatkan partisipasi PAUD di Kalimantan Timur.',
        region: 'Kalimantan Timur',
        domain: 'Pengasuhan',
        status: InterventionStatus.Completed,
        priority: InterventionPriority.Medium,
        startDate: '2024-01-10',
        endDate: '2024-05-10',
        budget: 200000000,
        kpi: 'Meningkatkan partisipasi PAUD sebesar 5% di 2 kota prioritas',
        actionItems: [
             { id: 'ai-4-1', text: 'Rapat koordinasi awal', completed: true, dueDate: '2024-01-15' },
             { id: 'ai-4-2', text: 'Peluncuran kampanye media', completed: true, dueDate: '2024-02-01' },
             { id: 'ai-4-3', text: 'Distribusi BOP', completed: true, dueDate: '2024-03-15' },
             { id: 'ai-4-4', text: 'Evaluasi akhir', completed: true, dueDate: '2024-05-05' },
        ],
        relatedAlertId: 'alert-8'
    },
];

// --- Mock Data for Resource Allocation ---
export const mockResourceData: ResourceData = {
    sdm: [
        { name: 'Tenaga Kesehatan', unit: 'orang', current: 15200, forecast: 16000, needed: 800, color: 'text-blue-500' },
        { name: 'Kader Posyandu', unit: 'orang', current: 45000, forecast: 48000, needed: 3000, color: 'text-blue-500' },
        { name: 'Guru PAUD', unit: 'orang', current: 25000, forecast: 26500, needed: 1500, color: 'text-blue-500' },
    ],
    anggaran: [
        { name: 'Intervensi Gizi', unit: 'miliar IDR', current: 850, forecast: 900, needed: 50, color: 'text-emerald-500' },
        { name: 'BOP PAUD', unit: 'miliar IDR', current: 1200, forecast: 1250, needed: 50, color: 'text-emerald-500' },
        { name: 'Operasional Posyandu', unit: 'miliar IDR', current: 300, forecast: 350, needed: 50, color: 'text-emerald-500' },
    ],
    material: [
        { name: 'Paket PMT', unit: 'paket', current: 2500000, forecast: 2800000, needed: 300000, color: 'text-amber-500' },
        { name: 'Vaksin Dasar', unit: 'dosis', current: 5000000, forecast: 5500000, needed: 500000, color: 'text-amber-500' },
        { name: 'APE PAUD', unit: 'set', current: 75000, forecast: 80000, needed: 5000, color: 'text-amber-500' },
    ],
};

export const regionalRiskScores: RegionalRiskScore[] = Object.values(regionsDetails).map(r => ({ name: r.name, score: r.overallRisk }));

// --- Mock Data for Parent Dashboard ---
export const mockParentData: ParentData = {
    childProfile: {
        name: 'Budi Hartono',
        age: '2 tahun 3 bulan',
        avatarUrl: 'https://i.pravatar.cc/150?u=budi',
        lastWeight: 12.5,
        lastHeight: 88,
    },
    upcomingEvents: [
        { id: 'ev1', title: 'Imunisasi Campak Lanjutan', dueDate: '2024-07-28', type: 'immunization' },
        { id: 'ev2', title: 'Jadwal Posyandu Bulanan', dueDate: '2024-08-05', type: 'posyandu' },
    ],
    growthHistory: [
        { ageInMonths: 18, weight: 10.9, height: 82 },
        { ageInMonths: 21, weight: 11.8, height: 85 },
        { ageInMonths: 24, weight: 12.2, height: 87 },
        { ageInMonths: 27, weight: 12.5, height: 88 },
    ],
    stimulationChecklist: [
        { id: 'sc1', text: 'Menyebut 2-3 kata', completed: true, ageGroup: '18-24 bulan', category: 'Bahasa' },
        { id: 'sc2', text: 'Berlari tanpa jatuh', completed: true, ageGroup: '18-24 bulan', category: 'Motorik Kasar' },
        { id: 'sc3', text: 'Menyusun 4 balok', completed: false, ageGroup: '18-24 bulan', category: 'Motorik Halus' },
        { id: 'sc4', text: 'Menunjuk bagian tubuh', completed: true, ageGroup: '18-24 bulan', category: 'Bahasa' },
        { id: 'sc5', text: 'Mencoret-coret dengan pensil', completed: true, ageGroup: '18-24 bulan', category: 'Motorik Halus' },
        { id: 'sc6', text: 'Makan sendiri dengan sendok', completed: false, ageGroup: '18-24 bulan', category: 'Sosial & Emosional' },
    ]
};