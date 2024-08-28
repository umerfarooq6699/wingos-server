const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    orderId: {
        type: String
    },
    userId: {
        type: String
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
    time: {
        type: String
    }
})

module.exports = mongoose.model("orders", orderSchema)