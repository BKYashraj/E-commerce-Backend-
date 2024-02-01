const mongoose = require("mongoose")

const mongoDbUrl='mongodb+srv://yashrajdesale1:i95pDAAcBG4N4CEZ@cluster0.0bymt28.mongodb.net/?retryWrites=true&w=majority'
const connectDb=()=>{
    return mongoose.connect(mongoDbUrl)
}

module.exports={connectDb}