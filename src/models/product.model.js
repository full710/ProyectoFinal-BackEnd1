import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"
const productos = "prods"

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true }
});

productSchema.plugin(mongoosePaginate)
const ProductModel = mongoose.model(productos, productSchema)

export default ProductModel