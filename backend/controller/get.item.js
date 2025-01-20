import { query } from '../database/connection.js';

export const getItemsId = async (req, res) =>{
    const {id}=req.params;
    try {
        const data= await query (`SELECT * FROM CartInformation where UserId = $1`, [id])
        console.log(data)
        res.status(200).json({message:"TABLE DISPLAY", data:data.rows})
        
    } catch (error) {
        console.log(error)
    }
}

