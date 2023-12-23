import mongoose from "mongoose"


const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI).then((data => {
        console.log(`mongodb connected with server : ${data.connection.host}`)
    }
    )).catch(err => {
        console.log(`mongodb not connected due to  ${err}`)
    })
}


export default connectDatabase;