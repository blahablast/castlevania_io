const Database = require('better-sqlite3')
import path from 'path'

// Init the SQLite DB. The file will be created in the data folder
const db = new Database(path.resolve('./data/castlevania.db'), {
  verbose: console.log,
})

// Create the characters table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    game TEXT,
    img_url TEXT
    )
`)

export default db
