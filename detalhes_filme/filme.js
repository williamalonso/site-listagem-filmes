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

// variável para receber id do filme
var filmeID = sessionStorage.getItem('filmeID');

// variável para receber o botão de pesquisa
const botao = document.getElementById("botao");

// variável para receber o botão do menu Meus Votos
const botao_meus_votos = document.getElementById("botao-meus-votos");

// variável para receber o id do visitante
const guest_session_id = localStorage.getItem('idUsuario');
//console.log(guest_session_id);


  // quando clicar no botão de início, redireciona para index.html
  botao_inicio.addEventListener("click", function(e) {
    e.preventDefault();
    window.location = '../index.html';
  });

  // quando clicar no botão de Meus Votos, redireciona para meus_votos.html
  botao_meus_votos.addEventListener("click", function(e) {
    e.preventDefault();
    window.location = '../meus_votos/meus_votos.html';
  });

  // função que gera o card com detalhes do filme
  function detalheFilme() {
    
    axios.get( BASE_URL + '/movie/' + filmeID + '?' + API_KEY)
    .then(function (response) {
      
      console.log(response.data);
      let filme = response.data;

      main.innerHTML = "";

      const div1 = document.createElement("div");
      div1.classList.add("container-fluid");

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
                        <form>
                          <div class="row g-3 align-items-center">
                            <div class="col-auto">
                              <label for="inputPassword6" class="col-form-label">Nota</label>
                            </div>
                            <div class="col-auto">
                              <input type="number" id="idNumero" class="form-control" aria-describedby="passwordHelpInline">
                            </div>
                            <div class="col-auto">
                              <span id="passwordHelpInline" class="form-text">
                                Valores de 0 a 10.
                              </span>
                            </div>
                          </div>
                          <a type="submit" class="btn btn-primary mt-4 botao-avaliar" onclick="enviaPost()">Avaliar</a>
                        </form>
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

  /* faz a requsição Post para a api */
  function enviaPost() {
    
    let numero = document.querySelector("#idNumero");
    let idNumero = numero.value;

    // remove aspas duplas do início e fim do guest_session_id
    converte_guest_id = guest_session_id.slice(1, -1);

    let url = BASE_URL + "/movie/" + filmeID + "/rating?" + API_KEY + "&guest_session_id=" + converte_guest_id;
  
    let data = { "value": idNumero}
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      //console.log("succes:", data)
      window.location = '../meus_votos/meus_votos.html';
    })
    .catch((error) => {
      console.error("Error: ", error);
    })
    
  }