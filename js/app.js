// API   https://openweathermap.org/
//Es necesario crear una api key

//Variables
const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

//Events

window.addEventListener("load", () => {
    // load Es el equivalente a DOMContentLoaded pero en window
    formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if (ciudad === "" || pais === "") {
        mensajeError("Both fields are required");

        return;
    }

    //Consultar API
    consultarApi(ciudad, pais);
}

function mensajeError(mensaje) {
    const alerta = document.querySelector(".error");

    if (!alerta) {
        //Crear una alerta
        const alerta = document.createElement("div");

        alerta.classList.add(
            "bg-red-100",
            "border-red-400",
            "text-red-700",
            "px-4",
            "py-3",
            "rounded",
            "max-w-md",
            "mx-auto",
            "mt-6",
            "text-center",
            "error"
        );

        alerta.innerHTML = `
    <strong class="font-bold">Error!</string>
    <span class="block">${mensaje}</span>
    `;
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

function consultarApi(ciudad, pais) {
    const idAPI = "10d7d79c293ed7c9f81ab25a08df7a5d";

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${idAPI}`;

    Spinner(); //Muestra un spinner de carga

    fetch(url)
        .then((respuesta) => {
            return respuesta.json();
        })
        .then((datos) => {
            limpiarHTML();

            if (datos.cod === "404") {
                mensajeError("City not found");
            }
            mostrarClima(datos);
        })
        .catch((error) => {
            console.log(error);
        });
}

function mostrarClima(datos) {
    console.log(datos);

    const {
        name,
        main: { temp, temp_max, temp_min },
    } = datos;

    const grados = KelvinACentigrados(temp);
    const max = KelvinACentigrados(temp_max);
    const min = KelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement("p");
    nombreCiudad.innerHTML = `Weather in: ${name}`;
    nombreCiudad.classList.add("font-bold", "text-2xl");

    const actual = document.createElement("p");
    actual.innerHTML = `${grados} &#8451;`;
    actual.classList.add("font-bold", "text-6xl");

    const tempMaxima = document.createElement("p");
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add("text-xl");

    const tempMinima = document.createElement("p");
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add("text-xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);
}

function KelvinACentigrados(grados) {
    return parseInt(grados - 273.15); //darle formato de int al resultado float (-273.15 porque esa es la formula)
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();

    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-fading-circle");

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild(divSpinner);
}
