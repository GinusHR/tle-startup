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
    db = await openDatabaseAsync('mijndatabase.db')
    await db.execAsync(`PRAGMA foreign_keys = OFF`);

    await db.execAsync(` DROP TABLE IF EXISTS items;`)

    await db.execAsync(`PRAGMA foreign_keys = ON;`);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS users
        (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            name     TEXT    NOT NULL,
            email    TEXT    NOT NULL,
            password TEXT    NOT NULL,
            address  TEXT    NULL,
            wallet   INTEGER NULL,
            total    INTEGER NULL,
            role     BOOLEAN DEFAULT 0
        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS items
        (
            id    INTEGER PRIMARY KEY AUTOINCREMENT,
            name  TEXT    NOT NULL,
            value INTEGER NULL DEFAULT 0
        );
        INSERT INTO items (name, value)
        VALUES ('Grote fles', 0.25);
        INSERT INTO items (name, value)
        VALUES ('Kleine fles', 0.15);
        INSERT INTO items (name, value)
        VALUES ('Blikje', 0.15);
        INSERT INTO items (name, value)
        VALUES ('Bier fles', 0.10);
        INSERT INTO items (name, value)
        VALUES ('Bier fles met beugel', 0.20);
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS lists
        (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            done    BOOLEAN DEFAULT 0,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS list_item
        (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            list_id  INTEGER NOT NULL,
            item_id  INTEGER NOT NULL,
            quantity INTEGER DEFAULT 1,
            FOREIGN KEY (list_id) REFERENCES lists (id),
            FOREIGN KEY (item_id) REFERENCES items (id)
        );
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS appointments
        (
            id                 INTEGER PRIMARY KEY AUTOINCREMENT,
            time               DATETIME NULL,
            customer_id        INTEGER  NOT NULL,
            appointment_status BOOLEAN  NOT NULL DEFAULT 0,
            driver             TEXT     NULL,
            customer_address   INTEGER  NULL,
            FOREIGN KEY (customer_id) REFERENCES users (id)
        );
    `);
};

//to create an admin use this instead of  insertUser
export const insertAdmin = async (name, email, plainPassword, role) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(plainPassword, salt);
        if (!db) return;
        await db.runAsync('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?);', name, email, passwordHash, role);
        console.log("User toegevoegd:", name, email, passwordHash, role);
    } catch (error) {
        console.error("Kon user niet toevoegen:", error);
    }
};

export const insertUser = async (name, email, plainPassword) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(plainPassword, salt);
        if (!db) return;
        await db.runAsync('INSERT INTO users (name, email, password) VALUES (?, ?, ?);', name, email, passwordHash);
        console.log("User toegevoegd:", name, email, passwordHash);
    } catch (error) {
        console.error("Kon user niet toevoegen:", error);
    }
};

export const getUser = async (email, password) => {
    if (!db) return null;

    try {
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
        console.error("Kon user niet verwijderen", error);
    }
};

export const insertItem = async (name, value) => {
    try {
        if (!db) return;
        await db.runAsync('INSERT INTO items (name, value) VALUES (?, ?);', name, value);
        console.log("Item toegevoegd aan database");
    } catch (error) {
        console.error("Item kon niet worden toegevoegd", error);
    }
};

export const getItems = async () => {
    try {
        if (!db) return [];
        const items = await db.getAllAsync('SELECT * FROM items;');
        console.log("Items succesvol opgehaald");
        return items;
    } catch (error) {
        console.error("Kon items niet ophalen", error);
        return [];
    }
};

export const deleteItem = async (id) => {
    try {
        if (!db) return;
        await db.runAsync('DELETE FROM items WHERE id = ?;', id);
        console.log("Item succesvol verwijderd");
    } catch (error) {
        console.error("Kon item niet verwijderen:", error);
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
        if (!db) return []
        await db.getFirstAsync('SELECT * FROM lists WHERE id =?', id);
        console.log("Lijst opgehaald")
    } catch (error) {
        console.error("Kon lijst niet ophalen", error)
    }
}

export const getUserLists = async (id) => {
    try {
        if (!db) return [];
        const lists = await db.getAllAsync('SELECT * FROM lists WHERE user_id = ?', id);
        console.log("Lijst(en) succesvol opgehaald");
        return lists;
    } catch (error) {
        console.error("Kon de lijst(en) niet ophalen:", error);
        return [];
    }
};


export const getAllLists = async () => {
    try {
        if (!db) return [];
        return await db.getAllAsync('SELECT * FROM lists;');
    } catch (error) {
        console.error("Fout bij van de lijsten:", error);
        return [];
    }
};

export const insertIntoList = async (listId, itemId, quantity) => {
    try {
        if (!db) return;
        await db.runAsync('INSERT INTO list_item (list_id, item_id, quantity) VALUES (?, ?, ?);', listId, itemId, quantity);
        console.log("Inserting into list_items: listId =", listId, ", itemId =", itemId, ", quantity =", quantity);
    } catch (error) {
        console.error("Kon item niet toevoegen aan de lijst", error);
    }
};

export const deleteList = async (id) => {
    try {
        if (!db) return;
        await db.runAsync('DELETE FROM lists WHERE id = ?', id);
        console.log("Item succesvol verwijderd uit de lijst");
    } catch (error) {
        console.error("Kon item niet verwijderen uit de lijst:", error);
    }
};

export const getListItem = async () => {
    try {
        if (!db) return;
        const result = await db.getAllAsync('SELECT * FROM list_item')
        console.log("opgehaald uit de database", result)
        return result
    } catch (error) {
        console.error("Kon list_item niet ophalen")
    }
};

export const getFullListItems = async () => {
    try {
        if (!db) return [];
        const result = await db.getAllAsync(`
            SELECT list.id, list.list_id, list.item_id, item.name AS item_name, list.quantity
            FROM list_item list
            JOIN items item ON list.item_id = item.id
            ORDER BY list.list_id;
        `);
        console.log("Volledige lijst items:", result);
        return result;
    } catch (error) {
        console.error("Kon volledige lijst items niet ophalen:", error);
        return [];
    }
};

//updates list bool to true to mark list as done 
export const markListAsDone = async (id) => {
    try {
        if(!db) return [];
        const result = await db.runAsync(`
            UPDATE lists SET list.done = 1 WHERE list.list_id = ${id} 
            `)
            console.log("Lijst afgerond: ", result);
            return result
    } catch (error) {
        console.log(error);
        return [];
    }
}
