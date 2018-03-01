
/////Traer los elementos que se usaran
const form = document.getElementById('search-form'); //el form
const searchField = document.getElementById ('search-keyword'); // imput de busqueda
const responseContainer = document.getElementById('response-container'); // ul para desplegar contenido
let searchedForText;

// Asignando evento al botón (imput) para que envíe la petición
form.addEventListener('submit', function (e) {
     e.preventDefault(); //para que no refresque la pag.
     responseContainer.innerHTML ='';
     searchedForText = searchField.value;
     getNews(); //llamada a la función que hará la petición
});

//Definiendo la función que hará la petición
function getNews() {
    const articleRequest = new XMLHttpRequest(); //Creación del objeto vacío
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=89ca7dd776d540d693645acd7e10efff`);//método .open() que inicializa la petición
      articleRequest.onload = addNews; //llama al manejador onload para caso correcto
      articleRequest.onerror = handleError; //llama al manejador onload para caso de fallo
      articleRequest.send();  //método para envíar la solicitud
}

// definiendo funciones para los manejadores:
//handleError()

function handleError() {
     console.log('Se ha presentado un error');
     console.log(this.responseText);
}

// Guardar en const la estructura de datos que nos devuelve

function addNews() {
  for (let i=0; i<5; i++){
    const data = JSON.parse(this.responseText);
    console.log(data);
const article = data.response.docs[i];
const title = article.headline.main;
const snippet = article.snippet;
const multimedia = article.multimedia[0];

let li = document.createElement('li');
li.className = 'articleClass';
li.innerText = snippet;

//let photo = document.createElement('img');
//photo.setAttribute(src,imagen);

responseContainer.appendChild(li);
  }
}
//data[0].multimedia);
