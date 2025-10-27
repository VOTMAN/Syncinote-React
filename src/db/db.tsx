import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'notes.db');
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

export const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now', 'localtime')),
    updated_at TEXT DEFAULT (datetime('now', 'localtime'))
  );

`).run();

const existing = db.prepare("SELECT COUNT(*) as count from notes").get()

if (existing.count == 0) {
  db.prepare(`
    INSERT INTO notes (title, content)
    VALUES (?, ?)
  `).run("First Note!", `# Welcome to Syncinote \n> Type your **hearts** out here.`);

}