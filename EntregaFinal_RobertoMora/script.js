let balance = 0;
let productos = [
  {
    id: 2,
    categorias: ["classic", "safe"],
    nombre: "BITCOIN",
    precio: 16806.4,
    exchange_rate: "USD",
    imgUrl:
      "https://static.vecteezy.com/system/resources/previews/008/505/801/original/bitcoin-logo-color-illustration-png.png",
  },
  {
    id: 5,
    categorias: ["new", "safe"],
    nombre: "ETHEREUM",
    precio: 1211.27,
    exchange_rate: "USD",
    imgUrl:
      "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png",
  },
  {
    id: 8,
    categorias: ["new", "troll"],
    nombre: "DOGECOIN",
    precio: 0.073,
    exchange_rate: "USD",
    imgUrl: "https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png",
  },
  {
    id: 9,
    categorias: ["new", "opportunity"],
    nombre: "XRP",
    precio: 0.34,
    exchange_rate: "USD",
    imgUrl:
      "https://i.pinimg.com/originals/e6/9d/92/e69d92c8f36c37c84ecf8104e1fc386d.png",
  },
];
let carrito = [];
let contenedorCarrito = document.getElementById("contenedorCarrito");
let cuenta = document.getElementById("balance");
cuenta.innerHTML = `Cuentas con el siguiente dinero disponible: $${balance} USD`;
let contenedor = document.getElementById("contenedorProductos");
renderizarProductos(productos);

let buscador = document.getElementById("buscador");
buscador.addEventListener("input", renderizarProductosFiltrados);

function renderizarProductosFiltrados(e) {
  let productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) ||
      producto.categorias.find((categoria) =>
        categoria.includes(buscador.value.toLowerCase())
      )
  );
  renderizarProductos(productosFiltrados);
}

function renderizarProductos(arrayDeProductos) {
  contenedor.innerHTML = "";
  for (const producto of arrayDeProductos) {
    let tarjetaProducto = document.createElement("div");
    tarjetaProducto.className = "producto";
    tarjetaProducto.id = producto.id;

    tarjetaProducto.innerHTML = `
      <div style="text-align:center;border:2px solid white;padding: 1vh;">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <p>Divisa: ${producto.exchange_rate}</p>
      <img style="padding: 1vh;width: 200px; height: 200px;" src=${producto.imgUrl}>
      <input class="quantity" id="quantity${producto.id}" min="-100" name="quantity" type="number" value=1>
      <button class="boton" id=${producto.id} onclick="agregarAlCarrito(${producto.id})">Agregar a la cartera</button>
      </div>
    `;
    contenedor.appendChild(tarjetaProducto);
  }
}

function agregarAlCarrito(id) {
  let cantidad = document.getElementById(`quantity${id}`).valueAsNumber;
  let productoBuscado = productos.find((producto) => producto.id == id);
  let posicionDelProductoBuscado = carrito.findIndex(
    (producto) => producto.id == productoBuscado.id
  );
  if (posicionDelProductoBuscado != -1) {
    carrito[posicionDelProductoBuscado].unidades =
      carrito[posicionDelProductoBuscado].unidades + cantidad;
    carrito[posicionDelProductoBuscado].subtotal =
      carrito[posicionDelProductoBuscado].unidades *
      carrito[posicionDelProductoBuscado].precioUnitario;
  } else {
    carrito.push({
      id: productoBuscado.id,
      nombre: productoBuscado.nombre,
      precioUnitario: productoBuscado.precio,
      unidades: cantidad,
      subtotal: productoBuscado.precio * cantidad,
    });
  }
  Toastify({
    text: "Producto agregado al carrito",
    duration: 3000,
    gravity: "bottom", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
  }).showToast();
  renderizarCarrito(carrito);
}

function agregarCredito() {
  let userInput = document.getElementById("credito").valueAsNumber;
  balance = balance + userInput;
  let cuenta = document.getElementById("balance");
  Toastify({
    text: "Se agregaron fondos a la cuenta",
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
  }).showToast();
  cuenta.innerHTML = `Cuentas con el siguiente dinero disponible: $${balance} USD`;
}
function renderizarCarrito(arrayDeProductos) {
  contenedorCarrito.innerHTML = "";
  for (const producto of arrayDeProductos) {
    contenedorCarrito.innerHTML += `
      <div style="text-left:center;border:2px solid white;padding: 1vh;">
        <p>Criptomoneda: ${producto.nombre} </p>
        <p>Precio Unitario: ${producto.precioUnitario} USD</p>
        <p>Cantidad: ${producto.unidades}</p>
        <p>SubTotal: $ ${producto.subtotal} USD </p>
      </div>
    `;
  }

  let total = carrito.reduce(
    (acc, valorActual) => acc + valorActual.subtotal,
    0
  );

  total = Math.round((total + Number.EPSILON) * 100) / 100;
  let contenedorTotal = document.getElementById("contenedorTotal");
  contenedorTotal.innerHTML = `
    <h3 id='totalh3' style="text-align:center">Total a Pagar: $${total}</h3>
    <button class="boton" id="total" onclick="pagar(${total})">Pagar</button>
  `;
}

function pagar(total) {
  if (total > balance) {
    // alert("No tienes dinero suficiente")
    Toastify({
      text: "No hay fondos suficientes",
      duration: 3000,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
    }).showToast();
  } else {
    balance = balance - total;
    contenedorCarrito.innerHTML = ``;
    carrito = [];
    let contenedorTotal = document.getElementById("totalh3");
    contenedorTotal.innerText = `Total a Pagar: 0`;
    let cuenta = document.getElementById("balance");
    cuenta.innerHTML = `Cuentas con el siguiente dinero disponible: $${balance} USD`;
    alertPersonalizado("Gracias por su compra", "success", 5500).then((result)=>{
      console.log(result);
      result?(Toastify({
        text: "El carrito se encuentra vacío",
        duration: 3000,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
      }).showToast())
      :alertPersonalizado("Hubo un error", "error", 5500)
    })
  }
}

async function alertPersonalizado(texto, icono, tiempo) {
  Swal.fire({
    text: texto,
    icon: icono,
    showConfirmButton: true,
    background: '#00008B',
    color: 'white',
    timer: tiempo
  })
  return true
}