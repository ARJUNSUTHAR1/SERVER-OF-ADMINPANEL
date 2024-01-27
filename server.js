import app from "./app.js"
import dotenv from "dotenv"
import connectDatabase from './configs/dbConfig.js'

dotenv.config({ path: ".env" })
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`server is working on port no ${process.env.PORT}`)
})
