// base-url
const BASE_URL = "https://api.themoviedb.org/3";

// api key in pt-BR
const API_KEY = "api_key=5a54272fe8480c752ded4311b7a123fd&language=pt-BR";

// toda img url começa com esse link
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

// variável para receber o botão de início
const botao_inicio= document.getElementById("botao-inicio");

// toda pesquisa vai conter com esse link
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

// variável para receber o que for digitado no campo de pesquisa
const pesquisa = document.getElementById("form");

// variável para receber o botão de pesquisa
const botao = document.getElementById("botao");

// quando clicar no botão de início, redireciona para index.html
botao_inicio.addEventListener("click", function(e) {
  e.preventDefault();
  window.location = '../index.html';
});

// função que gera o card com detalhes do filme
function detalheFilme() {
    
    var filmeID = sessionStorage.getItem('filmeID');
    
    axios.get( BASE_URL + '/movie/' + filmeID + '?' + API_KEY)
    .then(function (response) {
      
      console.log(response.data);
      let filme = response.data;

      main.innerHTML = "";

      const div1 = document.createElement("div");
      div1.classList.add("row", "container-fluid");

      const detalheFilme = document.createElement("div");

        detalheFilme.innerHTML = `
            
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${IMG_URL + filme.poster_path}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${filme.title}</h5>
                        <p class="card-text">${filme.overview}</p>
                        <p class="card-text"><small class="text-muted">${filme.vote_average}</small></p>
                        <br>
                        <p class="card-text">Avaliar Filme</p>
                        <div class="stars">
                          <a><i class="fas fa-star"></i></a>
                          <a><i class="fas fa-star"></i></a>
                          <a><i class="fas fa-star"></i></a>
                          <a><i class="fas fa-star"></i></a>
                          <a><i class="fas fa-star"></i></a>
                        </div>
                    </div>
                    </div>
                </div>
            
        `;
        main.appendChild(detalheFilme);
    });
  }

  // vamos ficar escutando o evento até clicar no botão de pesquisar
    botao.addEventListener("click", (e) => {
    e.preventDefault();
  
    const searchTerm = pesquisa.value;

    // se digitar um termo, faz a pesquisa pelo arquivo 'index.js'
    if (searchTerm) {
      pesquisa.value = "";
      sessionStorage.setItem('searchTerm', searchTerm);
      window.location = '../index.html';
    }
    // se não, digitar nada, redireciona para a página inicial 
    else {
      window.location = '../index.html';
    }
  });