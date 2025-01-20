import { query } from '../database/connection.js';

export const deleteItemById = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the item with the given id exists
        const checkId = await query('SELECT * FROM CartInformation WHERE cartid = $1', [id]);

        if (checkId.length === 0) {
            res.status(404).json({ message: "Item not found" });
            return;
        }

        // Delete the item by id
        await query('DELETE FROM CartInformation WHERE cartid = $1', [id]);

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
