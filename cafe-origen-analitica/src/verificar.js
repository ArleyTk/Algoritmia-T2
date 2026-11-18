const ventas = require("./datos.js");

const valorVenta = (venta) => venta.cantidad * venta.precio;

function totalPorCiudad(ventas) {
    return ventas
        .filter(v => v.ciudad && valorVenta(v) > 0) // 👈 Filtramos ventas con ciudad válida y valor > 0
        .reduce((grupos, v) => {
            const clave = v.ciudad.trim().toLowerCase();
            grupos[clave] = (grupos[clave] || 0) + valorVenta(v);
            return grupos;
        }, {});
}

function topProductosPorValor(ventas, k) {
    const porProducto = ventas
        .filter(v => v.producto && valorVenta(v) > 0) // 👈 Filtramos productos válidos antes de agrupar
        .reduce((g, v) => {
            g[v.producto] = (g[v.producto] || 0) + valorVenta(v);
            return g;
        }, {});

    return Object.entries(porProducto)
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([producto]) => producto);
}

console.log(totalPorCiudad(ventas));
console.log(topProductosPorValor(ventas, 3));
