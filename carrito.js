const tbody = document.getElementById("tabla-carrito");

async function cargarCarritos() {
    try {
        const respuesta = await fetch("http://localhost:8080/api/carritos");
        const carritos = await respuesta.json();
        carritos.forEach(carrito => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${carrito.idCarrito}</td>
                <td>${carrito.precio}€</td>
                <td><button class="eliminar-btn" data-id="${carrito.idCarrito}">Eliminar</button></td>
            `;
            tbody.appendChild(fila);

            const boton = fila.querySelector(".eliminar-btn");
            boton.addEventListener("click", async () => {
                const id = boton.dataset.id;
                const respuesta = await fetch(`http://localhost:8080/api/carritos/${id}`, {
                    method: "DELETE"
                });
                if (respuesta.ok) {
                    fila.remove();
                }
            });
        });
    } catch (error) {
        console.error("Error al cargar los carritos:", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarCarritos);