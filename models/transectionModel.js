

const mongoose = require('mongoose');

const transectionSchema = new mongoose.Schema({
    userid: {
        type: String,
        require: true,
    },
    amount: {
        type: String,
        require: [true, 'Amount is required']
    },
    type: {
        type: String,
        require: [true, "Type is required"]
    },
    category: {
        type: String,
        require: [true, 'Category is required']
    },
    refrence: {
        type: String,

    },
    description: {
        type: String,
        require: [true, 'Description is Is required']
    },
    date: {
        type: Date,
        require: [true, 'data is required']
    }
}, { timestamps: true })

const transectionModel = mongoose.model('transections', transectionSchema)
module.exports = transectionModel;