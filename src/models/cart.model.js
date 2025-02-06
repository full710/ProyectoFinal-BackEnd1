import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    products: [
        {
            prods: { type: mongoose.Schema.Types.ObjectId, ref: "prods", required: true },
            quantity: { type: Number, default: 1 }
        }
    ]
});

const CartModel = mongoose.model("carts", cartSchema)

export default CartModel
