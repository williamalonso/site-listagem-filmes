// TMDB
const API_KEY = 'api_key=5a54272fe8480c752ded4311b7a123fd&language=pt-BR';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc' + API_KEY;

function getMovies(url) {
  fetch(url).then(res => res.json).then(data => {
    console.log(data);
  })
}

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
}*/
