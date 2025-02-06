import CartModel from "../models/cart.model.js";


class CartManager {
    
    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({ products: [] })
            await nuevoCarrito.save()
            return nuevoCarrito;
        } catch (error) {
            throw new Error(`Error al crear el carrito: ${error.message}`)
        }
    }

    async getCarritoById(cartId) {
        try {
            const carrito = await CartModel.findById(cartId);
    
            if (!carrito) {
                throw new Error(`No existe un carrito con el id ${cartId}`);
            }
    
            
            if (carrito.products && carrito.products.length > 0) {
                await carrito.populate("products.prods");
            }
    
           
            return carrito
        } catch (error) {
            throw new Error("Error al obtener el carrito.")
        }
    }
    
    

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {
            const carrito = await CartModel.findById(cartId);
            if (!carrito) {
                throw new Error(`No existe un carrito con el id ${cartId}`)
            }
    
            
            const productoIndex = carrito.products.findIndex(p => p.prods.equals(productId))
    
            if (productoIndex !== -1) {
                
                carrito.products[productoIndex].quantity += quantity
            } else {
               
                carrito.products.push({ prods: productId, quantity })
            }
    
            await carrito.save()
            return carrito
        } catch (error) {
            throw new Error(`Error al agregar producto al carrito: ${error.message}`)
        }
    }

    async eliminarProductoCarrito(cartId, productId) {
        try {
            const carrito = await CartModel.findById(cartId)
            if (!carrito) {
                throw new Error("Carrito no encontrado")
            }
    
         // Buscar el índice del producto que se quiere eliminar
            const productoIndex = carrito.products.findIndex(p => p.prods.equals(productId))
    
            if (productoIndex === -1) {
                throw new Error("Producto no encontrado en el carrito")
            }
    
            carrito.products.splice(productoIndex, 1)
    
          
            await carrito.save()
    
            return carrito
        } catch (error) {
            console.error("Error al eliminar producto del carrito", error)
            throw error
        }
    }

    async vaciarCarrito(cartId){
        try {
            const cart = await CartModel.findByIdAndUpdate(
                cartId,
                {products: []},
                {new: true}
            )
            if (!cart){
                throw new Error("Carrito no encontrado")
            }
            return cart
        } catch (error) {
            console.error("Error al vaciar el carrito", error)
            throw error
        }
        
    }
    async actualizarCantidadProductoCarrito(cartId, productId, newQuantity) {
        try {
            const carrito = await CartModel.findById(cartId)
            if (!carrito) {
                throw new Error(`No existe un carrito con el id ${cartId}`)
            }
    
          
            const productoIndex = carrito.products.findIndex(p => p.prods.equals(productId));
    
            if (productoIndex === -1) {
                throw new Error(`El producto con id ${productId} no está en el carrito`)
            }
    
            
            carrito.products[productoIndex].quantity = newQuantity
    
           
            await carrito.save()
            return carrito
        } catch (error) {
            throw new Error(`Error al actualizar la cantidad del producto: ${error.message}`)
        }
    }
    
}


export default CartManager
