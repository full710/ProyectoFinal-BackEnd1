import express from "express"
import ProductManager from "../managers/product-manager.js"

const router = express.Router()
const productManager = new ProductManager()

router.get("/", async (req, res) => {
    const { sort, page = 1 } = req.query
    const limit = 3
    console.log("Valor recibido en sort:", sort)
    console.log("Solicitando productos con sort:", sort)
    try {
        const productos = await productManager.getProducts(sort, page, limit)

        res.json({
            status: "success",
            payload: productos.docs, 
            totalPages: productos.totalPages, 
            currentPage: productos.currentPage,
            hasPrevPage: productos.hasPrevPage, 
            hasNextPage: productos.hasNextPage, 
            prevLink: productos.hasPrevPage ? `/api/products?page=${productos.currentPage - 1}&limit=${limit}` : null,
            nextLink: productos.hasNextPage ? `/api/products?page=${productos.currentPage + 1}&limit=${limit}` : null,
        })
    } catch (error) {
        console.error("Error al obtener productos:", error)
        res.status(500).json({ error: error.message })
    }
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const producto = await productManager.getProductById(id)
        res.json(producto)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.post("/", async (req, res) => {
    const { title, description, price, img, code, stock } = req.body;
    try {
        await productManager.addProduct({ title, description, price, img, code, stock })
        res.status(201).send("Producto creado exitosamente")
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { title, description, price, img, code, stock } = req.body
    try {
        await productManager.updateProduct(id, { title, description, price, img, code, stock });
        res.status(200).send("Producto actualizado exitosamente")
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    try {
        await productManager.deleteProduct(id);
        res.status(200).send("Producto eliminado exitosamente")
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

export default router
