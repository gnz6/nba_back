const mongoose = require("mongoose")

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    conference: {
        type: String,
        enum: ["East", "West"]
    },
    logo:{
        type: String
    }
},
    {
        timestamps: false
    })


module.exports = mongoose.model("teams", teamSchema)