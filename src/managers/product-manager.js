import ProductModel from "../models/product.model.js"

class ProductManager {
    
    async getProducts(sort, page = 1, limit = 3) { 
        try {
            const options = {
                sort: sort ? { price: sort === "asc" ? 1 : -1 } : {}, 
                lean: true, 
                page,  
                limit, 
            };
    
            const productos = await ProductModel.paginate({}, options)
            console.log("Productos recuperados:", productos.docs)
            
            const { totalPages, page: currentPage } = productos
            
            return {
                docs: productos.docs,
                totalPages: totalPages,
                currentPage: currentPage,
                hasPrevPage: currentPage > 1,
                hasNextPage: currentPage < totalPages,
                prevLink: currentPage > 1 ? `/products?page=${currentPage - 1}&limit=${limit}` : null,
                nextLink: currentPage < totalPages ? `/products?page=${currentPage + 1}&limit=${limit}` : null
            }
        } catch (error) {
            console.error("Error al obtener los productos:", error)
            throw new Error("Error al obtener los productos.")
        }
    }

    async getProductById(id) {
        try {
            const producto = await ProductModel.findById(id)
            if (!producto) {
                throw new Error("Producto no encontrado.");
            }
            return producto;
        } catch (error) {
            throw new Error("Error al obtener el producto por ID.")
        }
    }

    async addProduct({ title, description, price, img, code, stock }) {
        if (!title || !description || !price || !img || !code || !stock) {
            throw new Error("Todos los campos son obligatorios.")
        }

        const existingProduct = await ProductModel.findOne({ code })
        if (existingProduct) {
            throw new Error("El código del producto debe ser único.")
        }

        const nuevoProducto = new ProductModel({
            title,
            description,
            price,
            img,
            code,
            stock,
        })

        try {
            await nuevoProducto.save()
            console.log("Producto creado con éxito")
        } catch (error) {
            throw new Error("Error al guardar el producto.")
        }
    }

    async deleteProduct(id) {
        try {
            const producto = await ProductModel.findByIdAndDelete(id)
            if (!producto) {
                throw new Error(`Producto con ID ${id} no encontrado.`)
            }
            console.log(`Producto "${producto.title}" eliminado con éxito.`)
        } catch (error) {
            throw new Error("Error al eliminar el producto.")
        }
    }

    async updateProduct(id, updatedData) {
        try {
            const producto = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true })
            if (!producto) {
                throw new Error(`Producto con ID ${id} no encontrado.`)
            }
            return producto
        } catch (error) {
            throw new Error("Error al actualizar el producto.")
        }
    }
}

export default ProductManager
