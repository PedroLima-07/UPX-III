// ===============================
// VARIÁVEIS
// ===============================

let indicePerguntaAtual = 0;

let pontos = 0;

let vidas = 3;

let acertosSeguidos = 0;

let jogadorAtual = "";

// ===============================
// ELEMENTOS
// ===============================

const elementoPergunta =
  document.getElementById(
    "texto-pergunta"
  );

const botoesResposta =
  document.querySelectorAll(
    ".btn-resposta-novo"
  );

const barraProgresso =
  document.getElementById(
    "barra-progresso"
  );

const contadorPergunta =
  document.getElementById(
    "contador-pergunta"
  );

const scoreValor =
  document.getElementById(
    "score-valor"
  );

const feedback =
  document.getElementById(
    "feedback"
  );

const feedbackTexto =
  document.getElementById(
    "feedback-texto"
  );

// ===============================
// FEEDBACK
// ===============================

function mostrarFeedback(
  mensagem,
  tipo
) {

  feedbackTexto.textContent =
    mensagem;

  feedback.className =
    `feedback feedback-${tipo}`;

  setTimeout(() => {

    feedback.classList.add(
      "hidden"
    );

  }, 1200);
}

// ===============================
// LOGIN
// ===============================

function entrarJogo() {

  const nome =
    document.getElementById(
      "nomeJogador"
    ).value;

  if (nome.trim() === "") {

    mostrarFeedback(
      "Digite seu nome",
      "errado"
    );

    return;
  }

  jogadorAtual = nome;

  document
    .getElementById("login-area")
    .classList.add("hidden");

  document
    .getElementById("conteudo-jogo")
    .classList.remove("hidden");

  atualizarVidasUI();

  carregarPergunta();

  atualizarRanking();
}

// ===============================
// VIDAS
// ===============================

function atualizarVidasUI() {

  const vidasBox =
    document.getElementById(
      "vidas-box"
    );

  let icones = "";

  for (
    let i = 0;
    i < vidas;
    i++
  ) {

    icones += "⚡ ";
  }

  vidasBox.textContent =
    icones;
}

// ===============================
// PROGRESSO
// ===============================

function atualizarProgresso() {

  const totalPerguntas =
    bancoDePerguntas.length;

  const perguntaNumero =
    indicePerguntaAtual + 1;

  const porcentagem =
    (perguntaNumero / totalPerguntas) * 100;

  barraProgresso.style.width =
    porcentagem + "%";

  contadorPergunta.textContent =
    `${perguntaNumero}/${totalPerguntas}`;
}

// ===============================
// CARREGAR PERGUNTA
// ===============================

function carregarPergunta() {

  atualizarProgresso();

  const perguntaAtual =
    bancoDePerguntas[
      indicePerguntaAtual
    ];

  elementoPergunta.textContent =
    perguntaAtual.pergunta;

  botoesResposta.forEach(
    (botao, index) => {

      const spanTexto =
        botao.querySelector(
          ".texto-opcao"
        );

      spanTexto.textContent =
        perguntaAtual.opcoes[index];

      botao.disabled = false;

      botao.style.borderColor =
        "#2a4b8d";

      botao.style.backgroundColor =
        "rgba(12, 31, 74, 0.3)";
    }
  );
}

// ===============================
// RESPOSTAS
// ===============================

botoesResposta.forEach(
  (botao) => {

    botao.addEventListener(
      "click",

      (evento) => {

        const botaoClicado =
          evento.currentTarget;

        const respostaEscolhida =
          botaoClicado
            .querySelector(
              ".texto-opcao"
            ).textContent;

        const respostaCerta =
          bancoDePerguntas[
            indicePerguntaAtual
          ].respostaCorreta;

        // ACERTO

        if (
          respostaEscolhida ===
          respostaCerta
        ) {

          acertosSeguidos++;

          let pontosGanhos = 10;

          if (
            acertosSeguidos === 2
          ) {

            pontosGanhos = 12;
          }

          if (
            acertosSeguidos >= 3
          ) {

            pontosGanhos = 14;
          }

          pontos += pontosGanhos;

          scoreValor.textContent =
            pontos;

          mostrarFeedback(
            `+${pontosGanhos} pontos!`,
            "correto"
          );

          botaoClicado.style.borderColor =
            "#00ff88";

          botaoClicado.style.backgroundColor =
            "rgba(0, 255, 136, 0.1)";

        } else {

          // ERRO

          acertosSeguidos = 0;

          vidas--;

          atualizarVidasUI();

          mostrarFeedback(
            "Resposta errada!",
            "errado"
          );

          botaoClicado.style.borderColor =
            "#ff4d4d";

          botaoClicado.style.backgroundColor =
            "rgba(255, 77, 77, 0.1)";
        }

        botoesResposta.forEach(
          (b) => {

            b.disabled = true;
          }
        );

        // GAME OVER

        if (vidas <= 0) {

          setTimeout(() => {

            finalizarQuiz();

          }, 1200);

          return;
        }

        // PRÓXIMA

        setTimeout(() => {

          indicePerguntaAtual++;

          if (
            indicePerguntaAtual <
            bancoDePerguntas.length
          ) {

            carregarPergunta();

          } else {

            finalizarQuiz();
          }

        }, 1200);
      }
    );
  }
);

// ===============================
// FINALIZAR QUIZ
// ===============================

function finalizarQuiz() {

  let ranking =
    JSON.parse(
      localStorage.getItem(
        "ranking-multiplayer"
      )
    ) || [];

  ranking.push({

    nome: jogadorAtual,

    pontos: pontos

  });

  ranking.sort(
    (a, b) => b.pontos - a.pontos
  );

  localStorage.setItem(
    "ranking-multiplayer",

    JSON.stringify(ranking)
  );

  mostrarFeedback(
    `Fim do jogo! ${pontos} pontos`,
    "correto"
  );

  setTimeout(() => {

    window.location.href =
      "/modo.html";

  }, 2000);
}

// ===============================
// RANKING
// ===============================

function atualizarRanking() {

  const rankingLista =
    document.getElementById(
      "ranking"
    );

  rankingLista.innerHTML = "";

  let ranking =
    JSON.parse(
      localStorage.getItem(
        "ranking-multiplayer"
      )
    ) || [];

  ranking.forEach((jogador) => {

    const item =
      document.createElement("li");

    item.textContent =
      `${jogador.nome} - ${jogador.pontos}`;

    rankingLista.appendChild(item);
  });
}