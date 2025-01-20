import { query } from '../database/connection.js';

export const adjustPrice = async (req, res) => {
    const { id } = req.params; // Get the ID from the route params
    const { Quantities } = req.body; // Get the updated quantities from the request body

    try {
        // Check if the item exists
        const checkId = await query(
            'SELECT * FROM CartInformation WHERE cartid = $1', 
            [id]
        );

        // If no item was found, send a 404 error
        if (checkId.rows.length === 0) {
            return res.status(404).json({ message: 'No item found with the given ID' });
        }

        // If Quantities is 0, delete the item
        if (Quantities === 0) {
            await query(
                'DELETE FROM CartInformation WHERE cartid = $1', [id] // Fixed placeholder for parameter
            );
            return res.status(200).json({ message: 'Item deleted successfully' });
        }

        // Proceed with the update if the item exists
        await query(
            'UPDATE CartInformation SET Quantities = $1, UpdateTimestamp = CURRENT_TIMESTAMP WHERE cartid = $2',
            [Quantities, id] // Set Quantities and UpdateTimestamp
        );

        // Send a success response
        res.status(200).json({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
