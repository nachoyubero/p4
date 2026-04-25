const formulario = document.querySelector("form");
const params = new URLSearchParams(window.location.search);
const precioPorPersona = parseFloat(params.get("precio")) || 0.0;
const area = params.get("area") || "Sin especificar";

const mensaje = document.getElementById("mensaje");



formulario.addEventListener("submit", async(event) => {
    event.preventDefault();
    const comensales = parseInt(document.getElementById("comensales").value);
    const precioTotal = precioPorPersona * comensales;
    try {
    const respuesta = await fetch("http://localhost:8080/api/carritos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ precio: precioTotal, area: area })
    });

    if (respuesta.ok) {
        console.log("Carrito creado correctamente");
        window.location.href = "carrito.html";
    } else {
        mensaje.textContent = "Se ha producido un error al crear el carrito. Inténtalo de nuevo.";
    }
} catch (error) {
   mensaje.textContent = "Error de conexión. Comprueba que el servidor está activo.";
}
})

