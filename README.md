
# Proyecto de E-commerce


## Instalación

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/full710/pre-entrega-Back-end-1.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd pre-entrega1
   ```

3. Instala las dependencias utilizando **npm**:

   ```bash
   npm install
   ```

## Ejecutar el servidor

Para ejecutar el servidor en modo desarrollo, utiliza el siguiente comando:

```bash
npm run dev
```

Esto iniciará el servidor y estará disponible en `http://localhost:8080`.

## Probar las rutas con Postman

A continuación se detallan las rutas disponibles y cómo probarlas con **Postman**:

### 1. **Ruta raíz**

- **GET** `/`  
  Verifica que el servidor esté en funcionamiento.

  **Esperado**: Mensaje `"Servidor de e-commerce en funcionamiento."`.

### 2. **Productos**

- **GET** `/api/products`  
  Obtiene todos los productos.

  **Esperado**: Lista de productos en formato JSON.

- **GET** `/api/products/:pid`  
  Obtiene un producto por su ID.  
  **Ejemplo**: `/api/products/1`

  **Esperado**: Datos del producto con el ID especificado.

- **POST** `/api/products`  
  Agrega un nuevo producto.  
  **Body** (raw, JSON):

  ```json
  {
    "title": "Nuevo Producto",
    "description": "Descripción del producto",
    "price": 100,
    "img": "ruta-imagen.jpg",
    "code": "ABC123",
    "stock": 50
  }
  ```

  **Esperado**: El producto agregado con su ID generado automáticamente.

- **PUT** `/api/products/:pid`  
  Actualiza un producto existente.  
  **Body** (raw, JSON):

  ```json
  {
    "title": "Producto Actualizado",
    "description": "Descripción actualizada",
    "price": 120,
    "img": "nueva-imagen.jpg",
    "code": "DEF456",
    "stock": 60
  }
  ```

  **Esperado**: El producto actualizado.

- **DELETE** `/api/products/:pid`  
  Elimina un producto por su ID.  

  **Esperado**: Confirmación de eliminación.

### 3. **Carritos**

- **POST** `/api/carts`  
  Crea un nuevo carrito.

  **Body** (raw, JSON):

  ```json
  {
    "products": []
  }
  ```

  **Esperado**: El carrito creado con un ID generado.

- **GET** `/api/carts/:cid`  
  Obtiene los productos de un carrito por su ID.  
  **Ejemplo**: `/api/carts/1`

  **Esperado**: Lista de productos en el carrito.

- **POST** `/api/carts/:cid/product/:pid`  
  Agrega un producto al carrito.  
  **Ejemplo**: `/api/carts/1/product/1`

  **Body** (raw, JSON):

  ```json
  [
    {
        "product": 1,
        "quantity": 1
    }
  ]
  ```

  **Esperado**: El carrito con el producto agregado o con la cantidad incrementada.

