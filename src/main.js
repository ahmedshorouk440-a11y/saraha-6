
import 'dotenv/config'
import express from "express";
import cors from "cors";
import AuthRouter from './module/Authanction/Authanction.contrlloer.js'
import { main } from './database/connection.js';
import { handler } from './middleWare/GlobalError/index.js';
import MessageRouter from './module/message/message.contrlloer.js'
import {fileURLToPath} from 'url'
import path from "path"
const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const UploadsPath = path.resolve(__dirname , '../Uploads')
app.use(cors({ origin: "http://localhost:5173"}))   
app.use(express.json())
app.use(AuthRouter)
app.use(MessageRouter)
app.use("/uploads" , express.static(UploadsPath))

await main()

app.use(handler)
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})