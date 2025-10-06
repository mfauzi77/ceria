import { MongoClient, Db, Collection } from 'mongodb';

let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db(process.env.MONGO_DB || 'ceria');
  return db;
}

export async function getManualCollection(source: string): Promise<Collection> {
  const database = await getDb();
  return database.collection(`manual_${source}`);
}



