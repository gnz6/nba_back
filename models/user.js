const mongoose = require("mongoose")
const { genSalt, hash, compare } = require("bcrypt")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    favs: [{
        type: String
    }]
}, {
    timestamps: true
})

UserSchema.statics.encryptPassword = async (password) => {
    const salt = await genSalt(10)
    return await hash(password, salt)
}

UserSchema.statics.comparePassword = async (password, recievedPassword) => {
    return await compare(password, recievedPassword)
}

module.exports = mongoose.model("users", UserSchema)