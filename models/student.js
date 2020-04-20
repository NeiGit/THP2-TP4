import mongoose from 'mongoose'

const Schema = mongoose.Schema

const studentSchema = new Schema({
    dni: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    },
        {
            timestamps: true
    })

    const Student = mongoose.model('Student', studentSchema, 'students')

export default Student