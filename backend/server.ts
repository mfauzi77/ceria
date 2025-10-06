import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import { getManualCollection, getDb } from './mongo';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const dbPath = path.join(process.cwd(), 'backend', 'data.db');
const db = new Database(dbPath);

// Schema
db.exec(`
CREATE TABLE IF NOT EXISTS imports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source TEXT NOT NULL,
  payload TEXT NOT NULL,
  created_at TEXT NOT NULL
);
`);

function saveImport(source: string, payload: any) {
  const stmt = db.prepare('INSERT INTO imports (source, payload, created_at) VALUES (?, ?, ?)');
  stmt.run(source, JSON.stringify(payload), new Date().toISOString());
}

// Helper endpoint creator
function createImportEndpoint(route: string, source: string) {
  app.post(route, (req, res) => {
    try {
      let data = req.body;
      if (data && typeof data.csv === 'string') {
        // Minimal validation: ensure headers are present
        const firstLine = data.csv.split('\n')[0].trim().toLowerCase();
        if (!firstLine.includes('nama') || !firstLine.includes('kabupaten') || !firstLine.includes('angka')) {
          return res.status(400).send('CSV harus memiliki header: nama,kabupaten,angka');
        }
        data = { csv: data.csv };
      }
      saveImport(source, data);
      res.json({ ok: true });
    } catch (e: any) {
      res.status(400).send(e.message || 'Invalid payload');
    }
  });
}

// Routes
createImportEndpoint('/api/import/kemenkes/imunisasi', 'kemenkes_imunisasi');
createImportEndpoint('/api/import/kemenkes/gizi', 'kemenkes_gizi');
createImportEndpoint('/api/import/kemenkes/kia', 'kemenkes_kia');
createImportEndpoint('/api/import/kemenkes/penyakit', 'kemenkes_penyakit');
createImportEndpoint('/api/import/dapodik/apm-apk', 'dapodik_apm_apk');
createImportEndpoint('/api/import/dapodik/satuan', 'dapodik_satuan');
createImportEndpoint('/api/import/dapodik/kualitas-guru', 'dapodik_kualitas_guru');
createImportEndpoint('/api/import/dukcapil/identitas-anak', 'dukcapil_identitas_anak');
createImportEndpoint('/api/import/kpppa/kekerasan', 'kpppa_kekerasan');
createImportEndpoint('/api/import/kpppa/perkawinan-anak', 'kpppa_perkawinan_anak');
createImportEndpoint('/api/import/bps/sosial-ekonomi', 'bps_sosial_ekonomi');
createImportEndpoint('/api/import/bps/perkawinan-anak', 'bps_perkawinan_anak');
createImportEndpoint('/api/import/kemensos/bansos', 'kemensos_bansos');
createImportEndpoint('/api/import/pupr/infrastruktur', 'pupr_infrastruktur');
createImportEndpoint('/api/import/bnpb/risiko-bencana', 'bnpb_risiko_bencana');
createImportEndpoint('/api/import/bmkg/kualitas-lingkungan', 'bmkg_kualitas_lingkungan');

app.get('/api/imports', (req, res) => {
  const rows = db.prepare('SELECT * FROM imports ORDER BY id DESC LIMIT 100').all();
  res.json(rows.map(r => ({ ...r, payload: JSON.parse(r.payload) })));
});

// Manual entry endpoint
app.post('/api/manual/:provider/:dataset', async (req, res) => {
  try {
    const { provider, dataset } = req.params;
    const { nama, kabupaten, angka } = req.body || {};
    if (!nama || !kabupaten || typeof angka !== 'number') {
      return res.status(400).send('Field nama, kabupaten, angka wajib.');
    }
    const collection = await getManualCollection(`${provider}_${dataset}`);
    const result = await collection.insertOne({ nama, kabupaten, angka, createdAt: new Date() });
    res.json({ ok: true, id: result.insertedId });
  } catch (e: any) {
    res.status(500).send(e.message || 'Gagal simpan manual');
  }
});

// Domain mapping for datasets
const DATASET_TO_DOMAIN: Record<string, 'Kesehatan' | 'Gizi' | 'Pendidikan' | 'Pengasuhan' | 'Perlindungan' | 'Kesejahteraan' | 'Lingkungan'> = {
  'kemenkes_imunisasi': 'Kesehatan',
  'kemenkes_gizi': 'Gizi',
  'kemenkes_kia': 'Kesehatan',
  'kemenkes_penyakit': 'Kesehatan',
  'dapodik_apm_apk': 'Pendidikan',
  'dapodik_satuan': 'Pendidikan',
  'dapodik_kualitas_guru': 'Pendidikan',
  'dukcapil_identitas_anak': 'Perlindungan',
  'kpppa_kekerasan': 'Perlindungan',
  'kpppa_perkawinan_anak': 'Perlindungan',
  'bps_sosial_ekonomi': 'Kesejahteraan',
  'bps_perkawinan_anak': 'Perlindungan',
  'kemensos_bansos': 'Kesejahteraan',
  'pupr_infrastruktur': 'Kesejahteraan',
  'bnpb_risiko_bencana': 'Lingkungan',
  'bmkg_kualitas_lingkungan': 'Lingkungan'
};

function datasetKey(provider: string, dataset: string) {
  return `${provider}_${dataset}`;
}

// Dashboard aggregates from Mongo manual data
app.get('/api/dashboard/indicators', async (req, res) => {
  try {
    const domain = String(req.query.domain || 'Semua');
    // build averages per dataset
    const results: { label: string; value: number }[] = [];
    for (const [key, dom] of Object.entries(DATASET_TO_DOMAIN)) {
      if (domain !== 'Semua' && dom !== domain) continue;
      const col = await getManualCollection(key);
      const items = await col.find({}).project({ angka: 1 }).toArray();
      if (items.length === 0) continue;
      const avg = items.reduce((s, it: any) => s + (Number(it.angka) || 0), 0) / items.length;
      results.push({ label: key.replace(/_/g, ' '), value: Number(avg.toFixed(1)) });
    }
    // map to KeyIndicatorData
    const indicators = results.slice(0, 6).map(r => ({
      value: `${r.value}%`,
      label: r.label,
      change: 0,
      changeType: 'stable',
      domain: domain === 'Semua' ? 'Semua' : domain
    }));
    res.json(indicators);
  } catch (e: any) {
    res.status(500).send(e.message || 'Gagal memuat indikator');
  }
});

app.get('/api/dashboard/alerts', async (req, res) => {
  try {
    const domain = String(req.query.domain || 'Semua');
    const alerts: any[] = [];
    for (const [key, dom] of Object.entries(DATASET_TO_DOMAIN)) {
      if (domain !== 'Semua' && dom !== domain) continue;
      const col = await getManualCollection(key);
      const items = await col.find({}).limit(50).toArray();
      for (const it of items) {
        const score = Number(it.angka) || 0;
        const level = score >= 90 ? 'CRITICAL' : score >= 75 ? 'HIGH' : score >= 60 ? 'MEDIUM' : 'LOW';
        alerts.push({
          id: String(it._id),
          level,
          title: key.replace(/_/g, ' '),
          region: it.kabupaten || it.nama || 'N/A',
          domain: dom,
          riskScore: Number(score.toFixed(1))
        });
      }
    }
    res.json(alerts.slice(0, 100));
  } catch (e: any) {
    res.status(500).send(e.message || 'Gagal memuat alerts');
  }
});

app.get('/api/dashboard/risks', async (req, res) => {
  try {
    const domain = String(req.query.domain || 'Semua');
    const map = new Map<string, number>();
    for (const [key, dom] of Object.entries(DATASET_TO_DOMAIN)) {
      if (domain !== 'Semua' && dom !== domain) continue;
      const col = await getManualCollection(key);
      const items = await col.find({}).project({ kabupaten: 1, angka: 1 }).toArray();
      for (const it of items) {
        const name = it.kabupaten || it.nama || 'N/A';
        const score = Number(it.angka) || 0;
        map.set(name, Math.max(map.get(name) || 0, score));
      }
    }
    const list = Array.from(map.entries()).map(([name, score]) => ({ name, score: Number(score.toFixed(1)) }));
    res.json(list.slice(0, 200));
  } catch (e: any) {
    res.status(500).send(e.message || 'Gagal memuat risks');
  }
});

// Meta: last updated timestamp across imports (SQLite) and manual_* (Mongo)
app.get('/api/meta/last-updated', async (req, res) => {
  try {
    let sqliteLatest: string | null = null;
    const row = db.prepare('SELECT created_at FROM imports ORDER BY created_at DESC LIMIT 1').get() as { created_at?: string } | undefined;
    if (row && row.created_at) sqliteLatest = row.created_at;

    // Mongo scan manual_* collections
    const mdb = await getDb();
    const collections = await mdb.listCollections().toArray();
    const manualCollections = collections.filter(c => c.name.startsWith('manual_'));
    let mongoLatest: string | null = null;
    for (const c of manualCollections) {
      const doc = await mdb.collection(c.name).find({}).project({ createdAt: 1 }).sort({ createdAt: -1 }).limit(1).next();
      const ts = doc?.createdAt ? new Date(doc.createdAt).toISOString() : null;
      if (ts && (!mongoLatest || ts > mongoLatest)) mongoLatest = ts;
    }
    const latest = [sqliteLatest, mongoLatest].filter(Boolean).sort().pop() || null;
    res.json({ lastUpdated: latest });
  } catch (e: any) {
    res.status(500).send(e.message || 'Gagal memuat metadata');
  }
});
// List manual entries with filters and pagination
app.get('/api/manual/:provider/:dataset', async (req, res) => {
  try {
    const { provider, dataset } = req.params;
    const q = String(req.query.q || '').trim();
    const page = Math.max(1, parseInt(String(req.query.page || '1')) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(String(req.query.pageSize || '20')) || 20));
    const skip = (page - 1) * pageSize;

    const collection = await getManualCollection(`${provider}_${dataset}`);
    const filter: any = {};
    if (q) {
      filter.$or = [
        { nama: { $regex: q, $options: 'i' } },
        { kabupaten: { $regex: q, $options: 'i' } }
      ];
    }
    const [total, items] = await Promise.all([
      collection.countDocuments(filter),
      collection.find(filter).sort({ createdAt: -1 }).skip(skip).limit(pageSize).toArray()
    ]);
    res.json({ page, pageSize, total, items });
  } catch (e: any) {
    res.status(500).send(e.message || 'Gagal memuat data');
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});


