import {DatabaseSync} from 'node:sqlite'
const db = new DatabaseSync(':memory')

db.exec(`
        DROP TABLE IF EXISTS users;
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            username TEXT UNIQUE,
            password TEXT
        )
    `)

db.exec(`
        DROP TABLE IF EXISTS todos;
        CREATE TABLE todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            task TEXT,
            completed BOOLEAN DEFAULT 0,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    `)

export default db