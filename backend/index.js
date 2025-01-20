import express, { Router } from "express";
import { dbInit } from "./database/connection.js";
import cors from "cors"
import apiRoutes from "./routes/index.js";

const app = express()
const port = 3200

dbInit();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.use(apiRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})