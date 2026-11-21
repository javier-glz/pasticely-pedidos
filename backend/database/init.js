const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'pasticely.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error('Error al conectar con SQLite:', err.message);
  else console.log('Base de datos SQLite de Pasticely conectada.');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_nombre TEXT NOT NULL,
      cliente_telefono TEXT NOT NULL,
      producto TEXT NOT NULL,
      cantidad INTEGER NOT NULL DEFAULT 1,
      fecha_entrega TEXT NOT NULL,
      estado TEXT NOT NULL DEFAULT 'Pendiente',
      total REAL NOT NULL DEFAULT 0,
      notas TEXT,
      creado_en DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;