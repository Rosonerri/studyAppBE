console.clear()
import express, { Application } from "express"
import cors from "cors"
import { dbConfig } from "./utils/dbConfig"
import { mainApp } from "./mainApp"
import dotenv from "dotenv"
dotenv.config()

const app: Application = express()
const port: number = parseInt(process.env.PORT!)

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json())

mainApp(app)

const server  = app.listen(port, () => {
console.log("Server is Listening to Port on ", port)
console.log()
dbConfig()
})

process.on("uncaughtException", (error: Error) =>{
    console.log("uncaughtException", error);
    process.exit(1)
})

process.on("unhandledRejection", (reason: any) =>{
    console.log("unhandledRejection", reason);
    server.close(() =>{
        process.exit(1)
    })
})