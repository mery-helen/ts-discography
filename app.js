// Adiciona um evento de escuta para o campo de pesquisa para detectar a tecla "Enter"
document
  .getElementById("campo-pesquisa")
  .addEventListener("keydown", function (event) {

    //Verifica se a tecla pressionada é "Enter"
    if (event.key === "Enter") {
      event.preventDefault(); // Evita o comportamento padrão de submissão de formulário (se aplicável)
      pesquisar(); // Chama a função de pesquisa
    }
  });

function normalizeString(str) {
  // Normaliza a string removendo acentos e convertendo para minúsculas
  return str
    .normalize("NFD") // Decompoe os caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .toLowerCase(); // Converte a string para minúsculas
}

function pesquisar() {
  // Obtém a seção onde os resultados da pesquisa serão exibidos
  let section = document.getElementById("resultados-pesquisa");

  let campoPesquisa = document.getElementById("campo-pesquisa").value;

  //se campoPesquisa for uma string vazia
  if (!campoPesquisa) {
    section.innerHTML =
      "<p>Nada foi encontrado. Por favor, digite algo no campo de pesquisa.</p>";

    return;
  }

  //// Normaliza o texto da pesquisa removendo acentos e convertendo para minúsculas
  campoPesquisa = normalizeString(campoPesquisa);

  // Cria uma string vazia para armazenar os resultados formatados
  let resultados = "";
  let titulo = "";
  let descricao = "";
  let tags = "";

  // Verifica se o campo de pesquisa contém "todos" ou "industria da musica" ou "music industry" ou "listar"
  // Se conter, retorna todos os álbuns
  if (
    campoPesquisa === "todos" ||
    campoPesquisa === "industria da musica" ||
    campoPesquisa === "music industry" ||
    campoPesquisa === "listar"
  ) {
    // Itera sobre cada dado na lista de dados
    for (let dado of dados) {
      let titulo = normalizeString(dado.titulo);
      let descricao = normalizeString(dado.descricao);
      let tags = normalizeString(dado.tags);

      //  Adiciona o álbum aos resultados se alguma das condições for verdadeira
      resultados += `
      <div class="item-resultado">
        <img src="${dado.image}" alt="Album Cover ${dado.titulo}" class="album-cover">
        <div class="item-conteudo">
          <h2>${dado.titulo}</h2>
          <p class="descricao-meta">${dado.descricao}</p>
          <div class="links">
            <span class="more-infos">
              <a href="${dado.info}" target="_blank">Mais informações</a>
            </span>
            <div class="streaming-links">
              <a href="${dado.spotify}" target="_blank">
                <img src="/images/spotify-icon.png" alt="Spotify" class="icone icone-spotify">
                <span class="tooltip">Abrir no Spotify</span>
              </a>
              <a href="${dado.apple}" target="_blank">
                <img src="/images/apple-icon.svg" alt="Apple Music" class="icone icone-apple">
                <span class="tooltip">Abrir no Apple Music</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      `;
    }
  } else {
    // Itera sobre cada dado na lista de dados
    for (let dado of dados) {
      titulo = normalizeString(dado.titulo);
      descricao = normalizeString(dado.descricao);
      tags = normalizeString(dado.tags);

      // Verifica se o título, a descrição ou as tags do álbum foram digitadas na barra de pesquisa
      if (
        titulo.includes(campoPesquisa) ||
        descricao.includes(campoPesquisa) ||
        tags.includes(campoPesquisa)
      ) {
        // Adiciona o álbum aos resultados se alguma das condições for verdadeira
        resultados += `
        <div class="item-resultado">
          <img src="${dado.image}" alt="Album Cover ${dado.titulo}" class="album-cover">
          <div class="item-conteudo">
            <h2>${dado.titulo}</h2>
            <p class="descricao-meta">${dado.descricao}</p>
            <div class="links">
              <span class="more-infos">
                <a href="${dado.info}" target="_blank">Mais informações</a>
              </span>
              <div class="streaming-links">
                <a href="${dado.spotify}" target="_blank">
                  <img src="/images/spotify-icon.png" alt="Spotify" class="icone icone-spotify">
                  <span class="tooltip">Abrir no Spotify</span>
                </a>
                <a href="${dado.apple}" target="_blank">
                  <img src="/images/apple-icon.svg" alt="Apple Music" class="icone icone-apple">
                  <span class="tooltip">Abrir no Apple Music</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        `;
      }
    }
  }

  // Se resultados não existir
  if (!resultados) {
    resultados = "<p>Nada foi encontrado.</p>";
  }

  // Atribui os resultados formatados ao conteúdo HTML da seção
  section.innerHTML = resultados;
}
