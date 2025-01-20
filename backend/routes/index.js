import { Router } from "express"
import { cartinput } from "../controller/post.item.js";
import { adjustPrice } from "../controller/update.item.js";
import { getItemsId } from "../controller/get.item.js";
import { deleteItemById } from "../controller/delete.item.js";
// import authPost from "../Controllers/post.js"
// import authGet from "../Controllers/get.js"

const apiRoutes= Router()

apiRoutes.post("/cartitems", cartinput)
apiRoutes.put("/cartitems/:id", adjustPrice)
apiRoutes.get("/getcartitembyid/:id", getItemsId)
apiRoutes.delete("/deleteitembyid/:id", deleteItemById)




export default apiRoutes;