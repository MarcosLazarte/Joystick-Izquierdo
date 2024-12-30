class Juego {
  constructor(id, nombre, precio, cantidad, imagen, descripcion) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.imagen = imagen;
    this.descripcion = descripcion;
  }
}

window.onbeforeunload = function () { //Cada vez que carga la página te lleva al top position
  window.scrollTo(0, 0);
}

function ready(funcion) { //Función que se dispara al cargar la pantalla
  if (document.readyState !== 'loading') {
    funcion();
    return;
  }
  document.addEventListener('DOMContentLoaded', funcion);
}
ready(function () { // Función de prueba que se ejecuta al cargar la pantalla
  let urlParametros = new URLSearchParams(window.location.search); // Toma el parametro que se envio por url y lo utiliza para buscarlo en la base de datos
  let id = urlParametros.get("id");
  if (id === null) {
    console.log("No existe el parametro Id en la URL")
    return;
  } else {
    let idSpan = document.getElementById("idSpan");
    let titulo = document.getElementById("titulo");
    let imagen = document.getElementById("imagen");
    let descripcion = document.getElementById("descripcion");
    let precio = document.getElementById("precio");
    let tituloPestana = document.getElementById("tituloPestana");

    titulo.innerHTML = bd[id].nombre;
    descripcion.innerHTML = bd[id].descripcion;
    imagen.src = bd[id].imagen;
    precio.innerHTML = bd[id].precio;
    tituloPestana.innerHTML = bd[id].nombre;
    idSpan.innerHTML = bd[id].id;
  }
})

document.addEventListener('DOMContentLoaded', function () {
  mostrarCarrito();
});


function validarForm() { // Valida el nombre y el apellido de form. Si estan vacios o NULL lanza alerta.
  let nombre = document.forms["formContacto"]["formName"].value;
  let apellido = document.forms["formContacto"]["formApellido"].value;
  if (nombre == null || nombre == "" || apellido == null || apellido == "") {
    alert("Por favor ingrese TODOS sus datos");
    console.log("Por favor ingrese TODOS sus datos");
    return false;
  }
}

const hollowK = new Juego(0, "Hollow Knight", 8396.45, 10,
  "https://images.squarespace-cdn.com/content/v1/606d159a953867291018f801/1619987722169-VV6ZASHHZNRBJW9X0PLK/Key_Art_02_layeredjpg.jpg?format=1500w",
  "Hollow Knight es un videojuego perteneciente al género metroidvania desarrollado y publicado por Team Cherry. El videojuego fue inicialmente lanzado para Microsoft Windows en febrero de 2017, y más tarde para macOS y Linux en abril de 2017.​ La adaptación para Nintendo Switch fue lanzada el 12 de junio de 2018"
);
const outerW = new Juego(1, "Outer Wilds", 20751.91, 5,
  "https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_OuterWildsEchoesoftheEye_MobiusDigital_Expansion_S1_2560x1440-1e8dd4dc3c0db902ff689686928633d2",
  "Outer Wilds es un videojuego de acción y aventura desarrollado por Mobius Digital y publicado por Annapurna Interactive."
);
const deathS = new Juego(2, "Death Stranding", 9249.70, 10,
  "https://cdn1.epicgames.com/offer/0a9e3c5ab6684506bd624a849ca0cf39/EGS_DeathStrandingDirectorsCut_KOJIMAPRODUCTIONS_S3_2560x1440-fe4e51f1801fba36e452aa3466625789",
  "Death Stranding es un videojuego de acción y exploración en mundo abierto desarrollado por Kojima Productions y publicado por Sony Interactive Entertainment para PlayStation 4 y por 505 Games para Microsoft Windows."
);
const doomE = new Juego(3, "Doom Eternal", 38324.74, 15,
  "https://cdn1.epicgames.com/offer/b5ac16dc12f3478e99dcfea07c13865c/EGS_DOOMEternal_idSoftware_S1_2560x1440-06b46993a4b6c19a9e614f2dd1202215",
  "Doom Eternal es un videojuego de acción de disparos en primera persona desarrollado por id Software y publicado por Bethesda Softworks. Es el quinto título principal de la serie Doom y la secuela directa de Doom."
);
const inscryption = new Juego(4, "Inscryption", 16758.20, 3,
  "https://cdn1.epicgames.com/spt-assets/709ac59000cd4eb99c3397e7c35b68f1/inscryption-offer-tjhc6.jpg",
  "Inscryption es un videojuego estilo videojuego de mazmorras, misterio y horror, desarrollado por Daniel Mullins Games y distribuido por Devolver Digital. El juego transcurre en una oscura cabaña desde donde el jugador intentará escapar jugando a un juego de cartas con un personaje misterioso y sombrío."
);

const bd = [hollowK, outerW, deathS, doomE, inscryption];
let carrito = [];

function borrarCarrito() {
  localStorage.setItem("carrito", JSON.stringify([]));
  mostrarCarrito();
}

function comprar() {
  let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
  let idValor = document.getElementById("idSpan").innerHTML;
  let productoExiste = false;
  console.log(carritoGuardado)
  if (carritoGuardado.length == 0) {
    carritoGuardado = [];
    carritoGuardado.push({
      id: idValor,
      cantidad: 1
    })
    localStorage.setItem("carrito", JSON.stringify(carritoGuardado))
    mostrarCarrito();
  } else {
    for (let i = 0; i < carritoGuardado.length; i++) {
      let par = carritoGuardado[i];
      if (idValor == par.id) {
        carritoGuardado[i].cantidad = carritoGuardado[i].cantidad + 1;
        productoExiste = true;
        break;
      }
    }
    if (!productoExiste) {
      console.log(productoExiste)
      carritoGuardado.push({
        id: idValor,
        cantidad: 1
      });
    }
    localStorage.setItem("carrito", JSON.stringify(carritoGuardado))
    mostrarCarrito();
  }
}
function mostrarCarrito() {
  let urlParametros = new URLSearchParams(window.location.search); // Toma el parametro que se envio por url y lo utiliza para buscarlo en la base de datos
  let id = urlParametros.get("id");
  let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
  let comprasNumero = document.getElementById("compras");
  let numeroComprasTotales = 0;


  if(!carritoGuardado){
    carritoGuardado= [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("El carrito ha sido inicializado");
  }

  for (let i = 0; i < carritoGuardado.length; i++) {
    numeroComprasTotales = carritoGuardado[i].cantidad + numeroComprasTotales;
  }
  comprasNumero.innerHTML = numeroComprasTotales;

  if (id == null) {
    let compras = document.getElementById("comprasCarrito");
    let valorTotal = document.getElementById("valorTotal");
    let precioTotal = 0

    compras.innerHTML = "";

    carritoGuardado.forEach(compra => {
      precioTotal = compra.cantidad * bd[compra.id].precio + precioTotal;
      const div = document.createElement('div');
      div.classList.add('card');
      div.style.width = '18rem';
      div.innerHTML = `
    <img src="${bd[compra.id].imagen}" class="card-img-top" alt="imagen de juego para comprar">
      <div class="card-body">
      <p class="card-text">Cantidad: "${compra.cantidad}"</p>
    </div>
    `
      compras.appendChild(div);
    });
    valorTotal.innerHTML = "Precio total: " + precioTotal;
  }
}