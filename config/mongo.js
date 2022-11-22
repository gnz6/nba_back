const mongoose = require("mongoose")
const { DB_URI } = process.env

const dbConnect = () => {
    mongoose.connect("mongodb+srv://gnz6:FMPgLfAJ62mRDJKR@cluster0.3rrkch8.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err, res) => {
        if (!err) {
            console.log("DB Connected")
        } else {
            console.log("Connection Error")
        }
    })
}
module.exports = dbConnect

