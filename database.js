import {openDatabaseAsync} from "expo-sqlite";
import bcrypt from 'bcryptjs';

bcrypt.setRandomFallback((len) => {
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
    await db.execAsync(` DROP TABLE IF EXISTS appointments;`)

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
            customer_address   TEXT  NULL,
            list_id            INTEGER,
            done               BOOLEAN NULL,
            FOREIGN KEY (customer_id) REFERENCES users (id),
            FOREIGN KEY (list_id) REFERENCES lists (id)
            );
    `);
};

export const insertUser = async (name, email, plainPassword) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(plainPassword, salt);
        if (!db) return;
        await db.runAsync('INSERT INTO users (name, email, password) VALUES (?, ?, ?);', name, email, passwordHash);
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
        return await db.getAllAsync('SELECT id, name, email, wallet FROM users;');
    } catch (error) {
        console.error("Fout bij ophalen gebruikers:", error);
        return [];
    }
};

export const deleteUser = async (id) => {
    try {
        if (!db) return;
        await db.runAsync('DELETE FROM users WHERE id = ?;', id);
    } catch (error) {
        console.error("Kon user niet verwijderen", error);
    }
};

export const insertItem = async (name, value) => {
    try {
        if (!db) return;
        await db.runAsync('INSERT INTO items (name, value) VALUES (?, ?);', name, value);
    } catch (error) {
        console.error("Item kon niet worden toegevoegd", error);
    }
};

export const getItems = async () => {
    try {
        if (!db) return [];
        const items = await db.getAllAsync('SELECT * FROM items;');
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
    } catch (error) {
        console.error("Kon item niet verwijderen:", error);
    }
};

export const createListForUser = async (userId) => {
    try {
        if (!db) return null;
        const result = await db.runAsync('INSERT INTO lists (user_id) VALUES (?);', userId);
        const listId = result.lastInsertRowId;
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
    } catch (error) {
        console.error("Kon lijst niet ophalen", error)
    }
}

export const getUserLists = async (id) => {
    try {
        if (!db) return [];
        const lists = await db.getAllAsync('SELECT * FROM lists WHERE user_id=? AND done=?', id, 0);
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

export const getListId = async (userId) => {
    if (!db) return;
    try {
        const result = await db.getFirstAsync('SELECT id FROM lists WHERE user_id=? ORDER BY id DESC LIMIT 1', userId)
        return result
    } catch (error) {
        console.error("Er ging iets fout:", error)
    }
}

export const insertIntoList = async (listId, itemId, quantity) => {
    try {
        if (!db) return;
        await db.runAsync('INSERT INTO list_item (list_id, item_id, quantity) VALUES (?, ?, ?);', listId, itemId, quantity);
    } catch (error) {
        console.error("Kon item niet toevoegen aan de lijst", error);
    }
};

export const deleteList = async (id) => {
    try {
        if (!db) return;
        await db.runAsync('DELETE FROM lists WHERE id = ?', id);
    } catch (error) {
        console.error("Kon item niet verwijderen uit de lijst:", error);
    }
};

export const getListItem = async () => {
    try {
        if (!db) return;
        const result = await db.getAllAsync('SELECT * FROM list_item')
        return result
    } catch (error) {
        console.error("Kon list_item niet ophalen")
    }
};

export const getListItemsByListId = async (listId) => {
    try {
        if (!db) return [];
        const result = await db.getAllAsync(
            `
                SELECT list.id,
                       list.list_id,
                       list.item_id,
                       item.name  AS item_name,
                       item.value AS item_value,
                       list.quantity
                FROM list_item list
                         JOIN items item ON list.item_id = item.id
                WHERE list.list_id = ?
                ORDER BY list.item_id;
            `,
            [listId]
        );
        return result;
    } catch (error) {
        console.error("Kon lijst items niet ophalen:", error);
        return [];
    }
};

export const updateUserAddress = async (userId, newAddress) => {
    if (!db) return;
    try {
        await db.runAsync(
            'UPDATE users SET address = ? WHERE id = ?;',
            newAddress,
            userId
        );
    } catch (error) {
        console.error("Fout bij opslaan adres:", error);
    }
};

export const insertAppointment = async ({customer_id, customer_address, time, list_id}) => {
    if (!db) return;
    try {
        await db.runAsync(
            'INSERT INTO appointments (customer_id, customer_address, time, list_id) VALUES (?, ?, ?, ?);',
            customer_id,
            customer_address,
            time,
            list_id
        );

    } catch (error) {
        console.error("Fout bij opslaan afspraak:", error);
    }
};

export const getNextAppointmentForUser = async (customerId) => {
    if (!db) return null;
    try {
        const result = await db.getFirstAsync(
            'SELECT * FROM appointments WHERE customer_id = ? AND appointment_status = 0 ORDER BY time ASC LIMIT 1;',
            customerId
        );
        return result;
    } catch (error) {
        console.error("Fout bij ophalen volgende afspraak:", error);
        return null;
    }
};

export const getAllAppointments = async () => {
    if (!db) return [];
    try {
        const appointments = await db.getAllAsync('SELECT * FROM appointments;');
        return appointments;
    } catch (error) {
        console.error("Kon afspraken niet ophalen:", error);
        return [];
    }
};

export const checkIfUserCanPlanPickup = async (userId) => {
    if (!db) return false;

    try {
        const result = await db.getFirstAsync(`
            SELECT l.id             AS list_id,
                   SUM(li.quantity) AS total_items
            FROM lists l
                     LEFT JOIN list_item li ON l.id = li.list_id
            WHERE l.user_id = ?
              AND l.done = 0
            GROUP BY l.id
            ORDER BY l.id DESC LIMIT 1;
        `, [userId]);

        if (!result) {
            return false;
        }

        const canSchedule = result.total_items >= 10;
        return canSchedule;
    } catch (error) {
        console.error("Fout bij controleren van lijststatus:", error);
        return false;
    }
};

export const changeWalletValue = async (value, id) => {
    try {
        if (!db) return
        const change = await db.runAsync(`UPDATE users
                                          SET wallet =?
                                          WHERE id = ?`, value, id)
    } catch (error) {
        console.error("Kon wallet niet aanpassen", error)
    }
};

export const getUserWallet = async (id) => {
    try {
        if (!db) return
        const results = await db.getFirstAsync(`SELECT wallet
                                                FROM users
                                                WHERE id = ?`, id);
        return results.wallet ?? 0;
    } catch (error) {
        console.error("Kon de wallet niet ophalen of het bestaat niet.", error);
        return 0;
    }
};
