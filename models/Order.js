import mongoose from "mongoose";

const OrderSchema=new mongoose.Schema({
    user: {
        name: String,
        email: String,
        country: String,
        city: String,
        address: String,
        postalCode: Number
    },
    cart: [
        {
            _id: String,
            title: String,
            price: Number,
            quantity: Number,
            category: String,
            image_url: String,
            brand:String,
            stock: Number,
            ratings: Number,
            description:String
        }
    ],
    totalPrice: Number,
    status: String,
    createAt: Date

});

export default mongoose.models.Order || mongoose.model("Order",OrderSchema);