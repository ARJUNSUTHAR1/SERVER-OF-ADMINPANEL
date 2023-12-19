const app = require("./app")

const dotenv = require("dotenv")
const connectDatabase = require('./configs/dbConfig');
dotenv.config({path:".env"})
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on port ${process.env.PORT}`)
})
