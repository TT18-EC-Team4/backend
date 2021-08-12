const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    name:{
        type: String,
        trim: true,
        required: true
    },
    cost:{
        type: Number,
        trim: true,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publishedYear:{
        type: Number,
        required: true
    },
    picture:{
        type: Object,
        required: true
    },
    category: {
        type: Array,
        required: true
    },
    onDiscount: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number,
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    ratePoint: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true //important
})


module.exports = mongoose.model("Products", productSchema)