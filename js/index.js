// TMDB
const API_KEY = 'api_key=5a54272fe8480c752ded4311b7a123fd&language=pt-BR';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url) {
  fetch(url).then(res => res.json()).then(data => {
    //function to call and list the movies
    console.log(data);
    showMovies(data.results);
  })
}

function showMovies(data) {
  
  main.innerHTML = '';

  data.forEach(movie => {
    // using object destructuring for the image src
    const {title, poster_path, vote_average, overview} = movie;
    // here we create a dinamic div
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          ${overview}
        </div>
    `

    main.appendChild(movieElement);
  })
}

function getColor(vote) {
  if(vote >= 8){
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

 // when enter is pressed or the form is submitted, we want to listen that event
 form.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if(searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm);
  } else {
    getMovies(API_URL);
  }

 });

// quando der o submit vamos chamar a função "pesquisarFilme"
/*document
  .getElementById("formulario")
  .addEventListener("submit", pesquisarFilme);
function pesquisarFilme(e) {
  var filmePesquisa = document.getElementById("pesquisar").value;
  buscarFilmes(filmePesquisa);
  //impede que o formulário seja enviado
  e.preventDefault();
}
function buscarFilmes(filmePesquisa) {
  axios
    .get("http://www.omdbapi.com/?s=" + filmePesquisa)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
<<<<<<< HEAD
}*/
=======
}*/
>>>>>>> 840b43484991f6f432aaf413f7e54dc768981daa
