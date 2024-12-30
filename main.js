window.onbeforeunload = function () {
  window.scrollTo(0, 0);
} //Cada vez que carga la página te lleva al top position

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
    return;
  }
  document.addEventListener('DOMContentLoaded', fn);
}
ready(function () {
  let x = 5;
  let y = "5";
  console.log("hola")
})

function validarForm() {
  let nombre = document.forms["formContacto"]["formName"].value;
  let apellido = document.forms["formContacto"]["formApellido"].value;
  if (nombre == null || nombre == "" || apellido == null || apellido == "") {
    alert("Por favor ingrese TODOS sus datos")
    return false;
  }
}
