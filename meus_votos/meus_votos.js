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

// variável para receber o botão de início
const botao_inicio= document.getElementById("botao-inicio");

// variável que recebe o guest session
const idUsuario = localStorage.getItem('idUsuario');

// remove aspas duplas do início e fim do guest_session_id
const converte_guest_id = idUsuario.slice(1, -1);

// variável para receber o botão de pesquisa
const botao = document.getElementById("botao");

// variável para receber o que for digitado no campo de pesquisa
const pesquisa = document.getElementById("form");

// url para receber os filmes votados
const filmes_votados = BASE_URL + "/guest_session/" + converte_guest_id + "/rated/movies?" + API_KEY + "&sort_by=created_at.desc";



// quando clicar no botão de início, redireciona para index.html
botao_inicio.addEventListener("click", function(e) {
    e.preventDefault();
    window.location = '../index.html';
  });


    // função que recebe os filmes avaliados
    function getMovies(url) {
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            //console.log(data.results);
            // vamos transformar o objeto em array, ordenar pelo "rating"
            let filmes = [];
            filmes.push(data.results);
            //console.log(filmes);
            filmes[0].sort(ordenarPorVoto);
            function ordenarPorVoto(a, b) {
            // se o valor for menor que 0, então o primeiro elemento é menor que o próximo
            return b.rating - a.rating;
            }
            //console.log(filmes);
            // não precisamos passar o objeto inteiro, apenas os filmes em si do objeto, por isso passamos "data.results"
            showMovies(data.results);
        });
    }

    //função que exibe os filmes avaliador dinamicamente
    function showMovies(data) {
        //console.log(data);
        main.innerHTML = "";
    
        // criando as divs dinamicamente
        const div1 = document.createElement("div");
        div1.classList.add("row", "container-fluid");
    
        // nessa função estamos recebendo um array com 20 objetos, então vamos fazer um foreach;
        data.forEach((movie) => {
        // usando object destructuring (desestruturação) para os dados do array. Ou seja, separando os parâmetros do objeto
        const { title, id, poster_path, rating, overview } = movie;
    
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
                <small class="text-muted">${rating}</small>
                </p>
                <a onclick="removerVoto(${id})" href="#" class="btn cor-botao">Remover Voto</a>
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

    function removerVoto(id) {
        
        let url = BASE_URL + "/movie/" + id + "/rating?" + API_KEY + "&guest_session_id=" + converte_guest_id;
  
        fetch(url, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => response.json())
        .then((data) => {
            location.reload();
        })
        .catch((error) => {
            console.error("Error: ", error);
        })
    }