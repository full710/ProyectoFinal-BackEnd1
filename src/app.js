import { engine } from 'express-handlebars'
import { Server } from "socket.io"
import express from "express"
import mongoose from 'mongoose'
import cartRouter from "./routes/cart.router.js"
import productRouter from "./routes/product.router.js"
import viewsRouter from "./routes/views.router.js"
import CartModel from './models/cart.model.js'

const app = express()
const PUERTO = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"))

mongoose.connect("mongodb+srv://juaniggonzalez7:fausto3101@cluster0.0kswd.mongodb.net/Pre-entrega-Backend?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Conectado a MongoDB"))
  .catch(error => console.error("Error al conectar a MongoDB:", error))

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use("/", viewsRouter)

app.engine('handlebars', engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

app.get("/", (req, res) => {
  res.send("Servidor de e-commerce en funcionamiento.")
})

app.get("/carts/:id", async (req, res) => {
  const { id } = req.params
  try {
    const cart = await CartModel.findById(id)
      .populate("products.prods")
      .lean()

    if (!cart) {
      return res.status(404).send("Carrito no encontrado")
    }

    
    const total = cart.products.reduce((acc, product) => {
      return acc + (product.prods.price * product.quantity)
    }, 0);

    
    res.render("cart", { cart, total })
  } catch (error) {
    console.error("Error al obtener el carrito:", error)
    res.status(500).send("Error interno del servidor")
  }
})



const httpServer = app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`)
})

import ProductManager from './managers/product-manager.js'
const manager = new ProductManager()
const io = new Server(httpServer)

const getAllProducts = async () => {
  let allProducts = []
  let currentPage = 1
  let totalPages = 1

  
  while (currentPage <= totalPages) {
    const productos = await manager.getProducts(null, currentPage)
    allProducts = [...allProducts, ...productos.docs]
    totalPages = productos.totalPages
    currentPage++
  }
  return allProducts
}

io.on("connection", async (socket) => {
  console.log("Cliente conectado")

  
  const allProducts = await getAllProducts()
  socket.emit("prods", allProducts)

  
  socket.on("agregarProducto", async (product) => {
    await manager.addProduct(product)
    const productosActualizados = await getAllProducts()
    io.sockets.emit("prods", productosActualizados)
  })

 
  socket.on("eliminarProducto", async (id) => {
    await manager.deleteProduct(id)
    const productosActualizados = await getAllProducts()
    io.sockets.emit("prods", productosActualizados)
  })
})
