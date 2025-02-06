import express from "express"
import mongoose from "mongoose"
import CartManager from "../managers/cart.manager.js"

const router = express.Router()
const cartManager = new CartManager()


router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito()
        res.status(201).json(nuevoCarrito)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})


router.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            return res.status(400).json({ error: "ID de carrito inválido." })
        }

        const carrito = await cartManager.getCarritoById(cid)
        
    
        res.json({
            carritoId: carrito._id,
            productos: carrito.products.length > 0 ? carrito.products : [] 
        })
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});


router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params

        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ error: "ID de carrito o producto inválido." })
        }

        const carrito = await cartManager.agregarProductoAlCarrito(cid, pid, 1)
        res.status(200).json(carrito)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const carrito = await cartManager.eliminarProductoCarrito(cid, pid)
        res.status(200).json(carrito);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})

router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const carritoVaciado = await cartManager.vaciarCarrito(cid);
        res.status(200).json(carritoVaciado);
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})
router.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params
        const { quantity } = req.body

        if (!mongoose.Types.ObjectId.isValid(cid) || !mongoose.Types.ObjectId.isValid(pid)) {
            return res.status(400).json({ error: "ID de carrito o producto inválido." })
        }

        
        if (quantity <= 0) {
            return res.status(400).json({ error: "La cantidad debe ser mayor a cero." })
        }

        const carrito = await cartManager.actualizarCantidadProductoCarrito(cid, pid, quantity)
        res.status(200).json(carrito)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
})


export default router
