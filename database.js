import {openDatabaseAsync} from "expo-sqlite";
import bcrypt from 'bcryptjs';

let db;

export const initDatabase = async () => {
    db = await openDatabaseAsync('mijndatabase');

    await db.execAsync(`PRAGMA foreign_keys = ON;`);

    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS users 
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL, 
                    password TEXT NOT NULL, 
                    lng INTEGER NULL, 
                    lat INTEGER NULL,
                    wallet INTEGER NULL,
                    total  INTEGER NULL, 
                );`
    );

    await db.execAsync(
        `CREATE TABLE iF NOT EXISTS lists 
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER NOT NULL FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE,
                    done BOOLEAN NOT NULL DEFAULT 0,
         );`
    );

    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS list_items 
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    list_id INTEGER NOT NULL FOREIGN KEY REFERENCES lists(id) ON DELETE CASCADE,
                    item_id INTEGER NOT NULL FOREIGN KEY REFERENCES items(id) ON DELETE CASCADE,
                    quantity INTEGER NOT NULL DEFAULT 1,
                );`
    )


    await db.execAsync(
        `CREATE TABLE IF NOT EXISTS items 
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT, 
                    name TEXT NOT NULL,
                    value INTEGER NOT NULL DEFAULT 0,
                );`
    );
};

export const insertUser = async (name, email, plainPassword) => {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(plainPassword, salt);
    if (!db) return;
    await db.runAsync('INSERT INTO users (name, email, password) VALUES (?, ?, ?);', name, email, passwordHash);
};
export const getUser = async (email, password) => {
    if (!db) return null;
    const user = await db.getAsync('SELECT * FROM users WHERE email = ?;', email);
    if (!user) return null;

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;

}

export const deleteUser = async (id) => {
    if (!db) return;
    await db.runAsync('DELETE FROM users WHERE id = ?;', id);
};

export const insertItem = async (title) => {
    if (!db) return;
    await db.runAsync('INSERT INTO items (name) VALUES (?);', title);
};

export const getItems = async () => {
    if (!db) return [];
    return await db.getAllAsync('SELECT * FROM items;');
};

export const deleteItem = async (id) => {
    if (!db) return;
    await db.runAsync('DELETE FROM items WHERE id = ?;', id);
};