import {openDatabaseAsync} from "expo-sqlite";
import bcrypt from 'bcryptjs';

bcrypt.setRandomFallback((len) => {
    // alleen voor test, NIET productie, niet veilig
    const random = [];
    for (let i = 0; i < len; i++) {
        random.push(Math.floor(Math.random() * 256));
    }
    return random;
});

let db;

export const initDatabase = async () => {
    db = await openDatabaseAsync('mijndatabase.db');

    await db.execAsync(`PRAGMA foreign_keys = ON;`);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users
        (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            name     TEXT    NOT NULL,
            email    TEXT    NOT NULL,
            password TEXT    NOT NULL,
            address  TEXT NULL,
            wallet   INTEGER NULL,
            total    INTEGER NULL
        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS items
        (
            id    INTEGER PRIMARY KEY AUTOINCREMENT,
            name  TEXT    NOT NULL,
            value INTEGER NULL DEFAULT 0
        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS lists
        (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            done    BOOLEAN NOT NULL DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS list_items
        (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            list_id  INTEGER NOT NULL,
            item_id  INTEGER NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            FOREIGN KEY (list_id) REFERENCES lists (id),
            FOREIGN KEY (item_id) REFERENCES items (id)
            );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS appointments (
                                                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                    time DATETIME NULL,
                                                    customer_id INTEGER NOT NULL,
                                                    appointment_status BOOLEAN NOT NULL DEFAULT 0,
                                                    driver TEXT NULL,
                                                    customer_address INTEGER NULL,
                                                    FOREIGN KEY (customer_id) REFERENCES users (id)
            );
    `);
};

export const insertUser = async (name, email, plainPassword) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(plainPassword, salt);
        if (!db) return;
        await db.runAsync('INSERT INTO users (name, email, password) VALUES (?, ?, ?);', name, email, passwordHash);
        console.log("User toegevoegd:", name, email, passwordHash);
    } catch (error) {
        console.log("Kon user niet toevoegen:", error);
    }
};

export const getUser = async (email, password) => {
    if (!db) return null;

    try {
        // Use getFirstAsync instead of getAsync
        const user = await db.getFirstAsync('SELECT * FROM users WHERE email = ?;', email);
        if (!user) return null;

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    } catch (error) {
        console.error("Fout bij ophalen gebruiker:", error);
        return null;
    }
};

export const getAllUsers = async () => {
    if (!db) return [];
    try {
        return await db.getAllAsync('SELECT id, name, email FROM users;');
    } catch (error) {
        console.error("Fout bij ophalen gebruikers:", error);
        return [];
    }
};

export const deleteUser = async (id) => {
    try {
        if (!db) return;
        await db.runAsync('DELETE FROM users WHERE id = ?;', id);
        console.log("User verwijderd");
    } catch (error) {
        console.log("Kon user niet verwijderen", error);
    }
};

export const insertItem = async (name, value) => {
    try {
        if (!db) return;
        await db.runAsync('INSERT INTO items (name, value) VALUES (?, ?);', name, value);
        console.log("Item toegevoegd aan database");
    } catch (error) {
        console.log("Item kon niet worden toegevoegd", error);
    }
};

export const getItems = async () => {
    try {
        if (!db) return [];
        const items = await db.getAllAsync('SELECT * FROM items;');
        console.log("Items succesvol opgehaald");
        return items;
    } catch (error) {
        console.log("Kon items niet ophalen", error);
        return [];
    }
};

export const deleteItem = async (id) => {
    try {
        if (!db) return;
        await db.runAsync('DELETE FROM items WHERE id = ?;', id);
        console.log("Item succesvol verwijderd");
    } catch (error) {
        console.log("Kon item niet verwijderen:", error);
    }
};

export const createListForUser = async (userId) => {
    try {
        if (!db) return null;
        const result = await db.runAsync('INSERT INTO lists (user_id) VALUES (?);', userId);
        const listId = result.lastInsertRowId;
        console.log("Lijst aangemaakt voor user:", userId, "met lijst ID:", listId);
        return listId;
    } catch (error) {
        console.error("Kon lijst niet aanmaken:", error);
        return null;
    }
};

export const getList = async (id) => {
    try {
        if (!db) return [];
        const lists = await db.getAllAsync('SELECT * FROM lists WHERE user_id = ?', id);
        console.log("Lijst(en) succesvol opgehaald");
        return lists;
    } catch (error) {
        console.log("Kon de lijst(en) niet ophalen:", error);
        return [];
    }
};

export const insertList = async (listId, itemId, quantity) => {
    try {
        if (!db) return;
        // Fixed table name: should be list_items, not list_item
        await db.runAsync('INSERT INTO list_items (list_id, item_id, quantity) VALUES (?, ?, ?);', listId, itemId, quantity);
        console.log("Item succesvol toegevoegd aan de lijst");
    } catch (error) {
        console.log("Kon item niet toevoegen aan de lijst", error);
    }
};

export const deleteList = async (id) => {
    try {
        if (!db) return;
        // Fixed table name: should be list_items, not list_item
        await db.runAsync('DELETE FROM list_items WHERE id = ?', id);
        console.log("Item succesvol verwijderd uit de lijst");
    } catch (error) {
        console.log("Kon item niet verwijderen uit de lijst:", error);
    }
};