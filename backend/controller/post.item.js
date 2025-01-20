import { query } from "../database/connection.js";

export const cartinput = async (req, res) => {
    try {
        const { cartId, userId, Items, Quantities, Price } = req.body;

      
        // Check if the cart already contains the item
        const data = await query(`SELECT * FROM CartInformation WHERE cartId = $1`, [cartId]);
        const cartNumber = data.rows;

        if (cartNumber.length > 0) {
            // If the item exists, increment the quantity
            const updatedQuantity = cartNumber[0].quantities + 1;
            console.log("Updated Quantity:", updatedQuantity);

            await query(
                'UPDATE CartInformation SET Quantities = $1, UpdateTimestamp = CURRENT_TIMESTAMP WHERE cartId = $2',
                [updatedQuantity, cartId] // Set updated quantity and timestamp
            );
            return res.status(200).json({ message: "Item quantity updated", data: data.rows });
        } else {
            // If the item doesn't exist, insert a new record
            await query(
                "INSERT INTO CartInformation (cartId, userId, Items, Quantities, Price) VALUES ($1, $2, $3, $4, $5)",
                [cartId, userId, Items, Quantities, Price]
            );
            return res.status(201).json({ message: "Item added to cart", data: req.body });
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
        return res.status(500).json({ message: "Item cannot be added to cart", data: error });
    }
};
