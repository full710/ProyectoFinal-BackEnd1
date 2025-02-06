const socket = io()

socket.on("prods", (data) => {
    console.log(data)
    renderProductos(data)
});

const renderProductos = (prods) => {
    const contenerdorProductos = document.getElementById("contenedorProductos")
    console.log(contenerdorProductos)
    contenerdorProductos.innerHTML = ""
    prods.forEach(item => {
        console.log("Creando producto:", item)
        const card = document.createElement("div")
        card.classList.add("card")
        
        card.innerHTML = `
            <img src="${item.img}" class="card-img-top" alt="${item.title}">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-text"><strong>Precio: ${item.price}</strong></p>
                <p class="card-text"><strong>Codigo: ${item.code}</strong></p>
                <p class="card-text"><strong>Cantidad disponible: ${item.stock}</strong></p>
                <button class="btn btn-danger">Eliminar</button>
            </div>
        `;
        contenerdorProductos.appendChild(card);
        card.querySelector("button").addEventListener("click", () => {
            eliminarProducto(item._id.toString())
        });
    });
};

const eliminarProducto = (_id) => {
    socket.emit("eliminarProducto", _id)
};

document.getElementById("btnAgregarProducto").addEventListener("click", () => {
    agregarProducto()
})

const agregarProducto = () => {
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
    }

    socket.emit("agregarProducto", product)
}
