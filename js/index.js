/* ------------------------------- provisorio ------------------------------- */
import {obtenerCarrito} from "./storage.js"
import {actualizarContador} from "./ui.js"
import {agregarAlCarrito} from "./funcionesCarrito.js"

const renderizarProductos = (productos) => {
    const contenedor = document.getElementById("contenedor-tarjetas");

    productos.forEach((producto) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("card", "text-dark");

        const img = document.createElement("img");
        img.src = `./${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.textContent = producto.nombre;

        const descripcion = document.createElement("p");
        descripcion.classList.add("descripcion");
        descripcion.textContent = producto.descripcion;

        const precio = document.createElement("p");
        precio.textContent = `$${producto.precio}`;
    
        const boton = document.createElement("button");
        boton.classList.add("btn", "bg-secondary", "text-dark");
        boton.textContent = "Agregar al carrito";

        boton.addEventListener("click", ()=>{
            agregarAlCarrito(producto);
        });

        tarjeta.append(img);
        tarjeta.append(titulo);
        tarjeta.append(descripcion);
        tarjeta.append(precio);
        tarjeta.append(boton);

        contenedor.appendChild(tarjeta);
    });
};

document.addEventListener("DOMContentLoaded", () => { 
    const carrito = obtenerCarrito();
    actualizarContador(carrito);
    fetch("./data/productos.json")
        .then((response) => response.json())
        .then((productos) => renderizarProductos(productos))
        .catch((error) => console.error("Error al cargar los productos:", error));
});