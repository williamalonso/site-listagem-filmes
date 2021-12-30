// api key in pt-BR
const API_KEY = "api_key=5a54272fe8480c752ded4311b7a123fd&language=pt-BR";

// base-url
const BASE_URL = "https://api.themoviedb.org/3";

// filmes em cartaz mundial
const API_URL = BASE_URL + "/movie/now_playing?sort_by=vote_average.desc&" + API_KEY + "&page=1";

// toda img url começa com esse link
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

// toda pesquisa vai conter com esse link
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

// variável que recebe o container dos cards
const main = document.getElementById("main");

// variável para receber o que for digitado no campo de pesquisa
const pesquisa = document.getElementById("form");

// variável para receber o botão de pesquisa
const botao = document.getElementById("botao");

// variável para receber o botão de início
const botao_inicio = document.getElementById("botao-inicio");

// variável para receber uma sessionStorage
var pesquisaDetalhe = sessionStorage.getItem('searchTerm');

// variável para receber o botão do menu Meus Votos
const botao_meus_votos = document.getElementById("botao-meus-votos");

// cria a url do guest_session
const guest = BASE_URL + "/authentication/guest_session/new?" + API_KEY;

// quando clicar no botão de Meus Votos, redireciona para meus_votos.html
botao_meus_votos.addEventListener("click", function(e) {
  e.preventDefault();
  window.location = '../meus_votos/meus_votos.html';
});

// verifica se tem guest_session. Se tiver, busca o guest, se não, cria um novo
function guest_session(url) {
  if( localStorage.getItem('idUsuario') ) {
    getMovies(API_URL);
  } else {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //console.log(data);
      const idUsuario = JSON.stringify(data.guest_session_id);
      //console.log(idUsuario);
      localStorage.setItem('idUsuario', idUsuario);
    })
    getMovies(API_URL);
  }
  
}

// verifica se tem variável "searchTerm" na sessionStorage (que vem do filme.js). Se tiver, faz a pesquisa desse termo
if(pesquisaDetalhe) {
  const searchTerm = pesquisaDetalhe;
  //console.log(searchTerm);
  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
    sessionStorage.setItem('searchTerm', '');
  }
}

// quando a página carregar, vamos chamar a função "get_movies()"
function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {

      // vamos transformar o objeto em array, ordenar pelo "vote_average"
      let filmes = [];
      filmes.push(data.results);
      filmes[0].sort(ordenarPorVoto);
      function ordenarPorVoto(a, b) {
        // se o valor for menor que 0, então o primeiro elemento é menor que o próximo
        return b.vote_average - a.vote_average;
      }

      // não precisamos passar o objeto inteiro, apenas os filmes em si do objeto, por isso passamos "data.results"
      showMovies(data.results);
    });
}

//função que cria os cards da página index, dinamicamente
function showMovies(data) {
  main.innerHTML = "";

  // criando as divs dinamicamente
  const div1 = document.createElement("div");
  div1.classList.add("row", "container-fluid");

  // nessa função estamos recebendo um array com 20 objetos, então vamos fazer um foreach;
  data.forEach((movie) => {
    // usando object destructuring (desestruturação) para os dados do array. Ou seja, separando os parâmetros do objeto
    const { title, id, poster_path, vote_average, overview } = movie;

    const div2 = document.createElement("div");
    div2.classList.add("col-md-3", "container-card");

    const movieElement = document.createElement("div");
    movieElement.classList.add(
      "card",
      "text-center",
      "card-largura",
      "mt-0",
      "mb-5",
      "cor-fundo-card"
    );

    movieElement.innerHTML = `
    
        <img
          src="${IMG_URL + poster_path}"
          alt="Imagem do card"
        />
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">
            ${overview}
          </p>
          <p class="">
            <small class="text-muted">${vote_average}</small>
          </p>
          <a onclick="filmeSelecionado(${id})" href="#" class="btn cor-botao">Avaliar</a>
        </div>
        
    `;

    // adiciona as divs no container logo acima
    div2.appendChild(movieElement);
    div1.appendChild(div2);
    main.appendChild(div1);
  });
}

// vamos ficar escutando o evento até clicar no botão de pesquisar
botao.addEventListener("click", (e) => {
  e.preventDefault();

  const searchTerm = pesquisa.value;

  if (searchTerm) {
    pesquisa.value = "";
    getMovies(searchURL + "&query=" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

// vamos ficar escutando o evento até clicar no botão de início
botao_inicio.addEventListener("click", function (e) {
  e.preventDefault();
  getMovies(API_URL);
});

// função para exibir o filme quando clicar em "avaliar"
function filmeSelecionado(id) {
  
  //vamos usar sessionStorage para armazenar o id do filme
  sessionStorage.setItem('filmeID', id);

  //redireciona a página
  window.location = 'detalhes_filme/filme.html';
  
  return false;
}
