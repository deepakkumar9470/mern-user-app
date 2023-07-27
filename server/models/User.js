import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        require: true,
        trim: true
    },

    lastName: {
        type: String,
        require: true,
        trim: true
    },

    email: {
        type: String,
        require: true,
        trim: true
    },
    mobile: {
        type: Number,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
},{timestamps:  true})

const User = mongoose.model('User', UserSchema)

export default User