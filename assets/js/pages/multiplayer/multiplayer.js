// =====================================
// VARIÁVEIS
// =====================================

let indicePerguntaAtual = 0;

let jogadorAtual = 1;

let pontosJogador1 = 0;
let pontosJogador2 = 0;

let nomeJogador1 = "";
let nomeJogador2 = "";

// =====================================
// ELEMENTOS
// =====================================

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

const jogadorDaVez =
  document.getElementById(
    "jogador-da-vez"
  );

const feedback =
  document.getElementById(
    "feedback"
  );

const feedbackTexto =
  document.getElementById(
    "feedback-texto"
  );

// =====================================
// FEEDBACK
// =====================================

function mostrarFeedback(
  mensagem,
  tipo
) {
  feedbackTexto.textContent =
    mensagem;

  feedback.className =
    `feedback feedback-${tipo}`;

  feedback.classList.remove(
    "hidden"
  );

  setTimeout(() => {
    feedback.classList.add(
      "hidden"
    );
  }, 1500);
}

// =====================================
// LOGIN
// =====================================

function entrarJogo() {
  nomeJogador1 =
    document.getElementById(
      "nomeJogador1"
    ).value;

  nomeJogador2 =
    document.getElementById(
      "nomeJogador2"
    ).value;

  if (
    nomeJogador1.trim() ===
      "" ||
    nomeJogador2.trim() ===
      ""
  ) {
    mostrarFeedback(
      "Digite os nomes",
      "errado"
    );

    return;
  }

  document
    .getElementById(
      "login-area"
    )
    .classList.add("hidden");

  document
    .getElementById(
      "conteudo-jogo"
    )
    .classList.remove(
      "hidden"
    );

  carregarPergunta();
}

// =====================================
// PROGRESSO
// =====================================

function atualizarProgresso() {
  const totalPerguntas =
    bancoDePerguntas.length;

  const perguntaNumero =
    indicePerguntaAtual + 1;

  const porcentagem =
    (perguntaNumero /
      totalPerguntas) *
    100;

  barraProgresso.style.width =
    porcentagem + "%";

  contadorPergunta.textContent =
    `${perguntaNumero}/${totalPerguntas}`;
}

// =====================================
// CARREGAR PERGUNTA
// =====================================

function carregarPergunta() {
  atualizarProgresso();

  const perguntaAtual =
    bancoDePerguntas[
      indicePerguntaAtual
    ];

  const nomeAtual =
    jogadorAtual === 1
      ? nomeJogador1
      : nomeJogador2;

  jogadorDaVez.textContent =
    `🎮 VEZ DE: ${nomeAtual}`;

  elementoPergunta.textContent =
    perguntaAtual.pergunta;

  botoesResposta.forEach(
    (botao, index) => {
      const spanTexto =
        botao.querySelector(
          ".texto-opcao"
        );

      spanTexto.textContent =
        perguntaAtual.opcoes[
          index
        ];
    }
  );
}

// =====================================
// VERIFICAR RESPOSTA
// =====================================

botoesResposta.forEach(
  (botao) => {
    botao.addEventListener(
      "click",

      (evento) => {
        const respostaEscolhida =
          evento.currentTarget
            .querySelector(
              ".texto-opcao"
            ).textContent;

        const respostaCerta =
          bancoDePerguntas[
            indicePerguntaAtual
          ].respostaCorreta;

        if (
          respostaEscolhida ===
          respostaCerta
        ) {
          if (
            jogadorAtual === 1
          ) {
            pontosJogador1 += 10;
          } else {
            pontosJogador2 += 10;
          }

          mostrarFeedback(
            "⚡ RESPOSTA CORRETA ⚡",
            "certo"
          );
        } else {
          mostrarFeedback(
            "❌ RESPOSTA ERRADA ❌",
            "errado"
          );
        }

        atualizarScore();

        setTimeout(() => {
          proximaPergunta();
        }, 1000);
      }
    );
  }
);

// =====================================
// SCORE
// =====================================

function atualizarScore() {
  if (jogadorAtual === 1) {
    scoreValor.textContent =
      pontosJogador1;
  } else {
    scoreValor.textContent =
      pontosJogador2;
  }
}

// =====================================
// PRÓXIMA PERGUNTA
// =====================================

function proximaPergunta() {
  indicePerguntaAtual++;

  if (
    indicePerguntaAtual >=
    bancoDePerguntas.length
  ) {
    trocarJogador();

    return;
  }

  carregarPergunta();
}

// =====================================
// TROCAR JOGADOR
// =====================================

function trocarJogador() {
  if (jogadorAtual === 1) {
    jogadorAtual = 2;

    indicePerguntaAtual = 0;

    scoreValor.textContent =
      pontosJogador2;

    mostrarFeedback(
      `🎮 AGORA É A VEZ DE ${nomeJogador2}`,
      "troca"
    );

    setTimeout(() => {
      carregarPergunta();
    }, 2000);

    return;
  } else {
    mostrarResultadoFinal();
  }
}

// =====================================
// RESULTADO FINAL
// =====================================

function mostrarResultadoFinal() {
  let vencedor = "EMPATE";

  if (
    pontosJogador1 >
    pontosJogador2
  ) {
    vencedor = nomeJogador1;
  }

  if (
    pontosJogador2 >
    pontosJogador1
  ) {
    vencedor = nomeJogador2;
  }

  document.body.innerHTML = `
    <div class="resultado-final">

      <div class="resultado-card">

        <h1>
          🏆 RESULTADO FINAL 🏆
        </h1>

        <div class="placar-final">
          <p>
            ${nomeJogador1}
          </p>

          <span>
            ${pontosJogador1} pontos
          </span>
        </div>

        <div class="placar-final">
          <p>
            ${nomeJogador2}
          </p>

          <span>
            ${pontosJogador2} pontos
          </span>
        </div>

        <h2 class="vencedor">
          VENCEDOR:
          ${vencedor}
        </h2>

        <button
          class="btn-jogar-novamente"
          onclick="location.reload()"
        >
          JOGAR NOVAMENTE
        </button>

      </div>

    </div>
  `;
}