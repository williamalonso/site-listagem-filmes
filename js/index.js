// quando der o submit vamos chamar a função "pesquisarFilme"
document
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
}
