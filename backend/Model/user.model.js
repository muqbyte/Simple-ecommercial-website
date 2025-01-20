import { query } from "../database/connection.js";

export const cart = async () => {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS CartInformation (
                ItemId SERIAL PRIMARY KEY,
                cartId INT NOT NULL,
                userId VARCHAR (255) NOT NULL,
                Items VARCHAR(255) NOT NULL,
                Quantities INT NOT NULL CHECK (Quantities >= 0),
                Price DECIMAL(10, 2) NOT NULL,
                UpdateTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('User cart information table created');
    } catch (error) {
        console.error('Failed to create the User cart information table:', error);
    }
};
