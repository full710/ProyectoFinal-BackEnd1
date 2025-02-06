import { Router } from "express"
const router = Router()
import ProductManager from "../managers/product-manager.js"
const manager = new ProductManager()

router.get("/products", async (req, res) => {
    const { page = 1, sort } = req.query
    const limit = 3
    const productos = await manager.getProducts(sort, page, limit)
    
    
    res.render("home", {
        docs: productos.docs, 
        prevLink: productos.prevLink, 
        nextLink: productos.nextLink,
        hasPrevPage: productos.hasPrevPage, 
        hasNextPage: productos.hasNextPage, 
    })
})

router.get("/realtimeproducts", (req, res) => {
    res.render("realtimeproducts")
});

export default router
