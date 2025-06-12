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
            lng      INTEGER NULL,
            lat      INTEGER NULL,
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

};

export const insertUser = async (name, email, plainPassword) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(plainPassword, salt);
        if (!db) return;
        await db.runAsync('INSERT INTO users (name, email, password) VALUES (?, ?, ?);', name, email, passwordHash);
        console.log("User toegevoegd:", name, email, passwordHash)
    } catch(error) {
        console.log("Kon user niet toevoegen:", error);
    }

};
export const getUser = async (email, password) => {
    if (!db) return null;
    const user = await db.getAsync('SELECT * FROM users WHERE email = ?;', email);
    if (!user) return null;

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return null;

    return user;

}

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
    try{
        if (!db) return;
        await db.runAsync('DELETE FROM users WHERE id = ?;', id);
        console.log("User verwijderd")
    } catch (error) {
        console.log("Kon user niet verwijderen", error);
    }


};

export const insertItem = async (name, value) => {
    try {
        if (!db) return;
        await db.runAsync('INSERT INTO items (name, value) VALUES (?, ?);', name, value);
        console.log("Item toegevoegd aan database")
    } catch (error) {
        console.log("Item kon niet worden toegevoegd", error)
    }

};

export const getItems = async () => {
    try {
        if (!db) return [];
        await db.getAllAsync('SELECT * FROM items;');
        console.log("Items succesvol opgehaald")
    } catch (error) {
        console.log("Kon items niet ophalen", error);
    }

};

export const deleteItem = async (id) => {
    try {
        if (!db) return;
        await db.runAsync('DELETE FROM items WHERE id = ?;', id);
        console.log("Item succesvol verwijderd")
    } catch (error) {
        console.log("Kon item niet verwijderen:", error)
    }

};

export const getList = async (id) => {
    try {
        if(!db) return;
        await db.getAllAsync('SELECT * FROM lists WHERE user_id =?', id)
        console.log("Lijst(en) succesvol opgehaald")
    } catch (error) {
        console.log("Kon de lijst(en) niet ophalen:", error)
    }

}

export const insertList = async (listId, itemId, quantity) => {
    try {
        if(!db) return;
        await db.runAsync('INSERT INTO list_item (list_id, item_id, quantity) VALUES (?, ?, ?);', listId, itemId, quantity)
        console.log("Item succesvol toegevoegd aan de lijst")
    } catch (error) {
        console.log("Kon item niet toevoegen aan de lijst", error);
    }
}

export const deleteList = async (id) => {
    try {
        if(!db) return;
        await db.runAsync('DELETE FROM list_item WHERE id =?', id);
        console.log("Item succesvol verwijderd uit de lijst")
    } catch (e) {
        console.log("Kon item niet verwijderen uit de lijst:", error)
    }
}