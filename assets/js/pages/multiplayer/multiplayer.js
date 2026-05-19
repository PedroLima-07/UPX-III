let indicePerguntaAtual = 0;

let pontosJogador1 = 0;
let pontosJogador2 = 0;

let nomeJogador1 = "";
let nomeJogador2 = "";

let jogadorDaVez = null;
let buzzerAtivado = false;
let perguntaRespondida = false;

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

const jogadorDaVezTexto =
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

const placarJogador1 =
  document.getElementById(
    "placar-jogador1"
  );

const placarJogador2 =
  document.getElementById(
    "placar-jogador2"
  );

const statusBuzzer =
  document.getElementById(
    "status-buzzer"
  );

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

  }, 1800);
}

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
    nomeJogador1.trim() === "" ||
    nomeJogador2.trim() === ""
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

  atualizarPlacar();

  carregarPergunta();
}

function atualizarProgresso() {

  const totalPerguntas =
    bancoDePerguntas.length;

  const perguntaNumero =
    indicePerguntaAtual + 1;

  const porcentagem =
    (perguntaNumero /
      totalPerguntas) * 100;

  barraProgresso.style.width =
    porcentagem + "%";

  contadorPergunta.textContent =
    `${perguntaNumero}/${totalPerguntas}`;
}

function atualizarPlacar() {

  placarJogador1.textContent =
    pontosJogador1;

  placarJogador2.textContent =
    pontosJogador2;
}

function bloquearRespostas() {

  botoesResposta.forEach(
    (botao) => {

      botao.disabled = true;

      botao.style.opacity =
        "0.5";
    }
  );
}

function liberarRespostas() {

  botoesResposta.forEach(
    (botao) => {

      botao.disabled = false;

      botao.style.opacity =
        "1";
    }
  );
}

function carregarPergunta() {

  atualizarProgresso();

  jogadorDaVez = null;

  buzzerAtivado = false;

  perguntaRespondida = false;

  bloquearRespostas();

  statusBuzzer.textContent =
    "⏳ Esperando alguém apertar...";

  jogadorDaVezTexto.textContent =
    "🕹️ Apertem A ou L para responder";

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
        perguntaAtual.opcoes[
          index
        ];
    }
  );
}

document.addEventListener(
  "keydown",
  (e) => {

    if (
      buzzerAtivado ||
      perguntaRespondida
    ) {
      return;
    }

    if (
      e.key.toLowerCase() === "a"
    ) {

      jogadorDaVez = 1;

      buzzerAtivado = true;

      liberarRespostas();

      statusBuzzer.textContent =
        `${nomeJogador1} apertou primeiro!`;

      jogadorDaVezTexto.textContent =
        `🎮 Vez de ${nomeJogador1}`;

      mostrarFeedback(
        `${nomeJogador1} foi mais rápido!`,
        "troca"
      );
    }

    if (
      e.key.toLowerCase() === "l"
    ) {

      jogadorDaVez = 2;

      buzzerAtivado = true;

      liberarRespostas();

      statusBuzzer.textContent =
        `${nomeJogador2} apertou primeiro!`;

      jogadorDaVezTexto.textContent =
        `🎮 Vez de ${nomeJogador2}`;

      mostrarFeedback(
        `${nomeJogador2} foi mais rápido!`,
        "troca"
      );
    }
  }
);

botoesResposta.forEach(
  (botao) => {

    botao.addEventListener(
      "click",
      (evento) => {

        if (!buzzerAtivado) {
          return;
        }

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

          perguntaRespondida = true;

          if (
            jogadorDaVez === 1
          ) {

            pontosJogador1 += 10;

          } else {

            pontosJogador2 += 10;
          }

          atualizarPlacar();

          mostrarFeedback(
            "⚡ RESPOSTA CORRETA ⚡",
            "certo"
          );

          bloquearRespostas();

          setTimeout(() => {

            proximaPergunta();

          }, 1500);

        } else {

          mostrarFeedback(
            "❌ RESPOSTA ERRADA ❌",
            "errado"
          );

          bloquearRespostas();

          buzzerAtivado = false;

          if (
            jogadorDaVez === 1
          ) {

            statusBuzzer.textContent =
              `${nomeJogador2}, aperte L para tentar!`;

          } else {

            statusBuzzer.textContent =
              `${nomeJogador1}, aperte A para tentar!`;
          }

          jogadorDaVezTexto.textContent =
            "⏳ Nova chance para o adversário";
        }
      }
    );
  }
);

function proximaPergunta() {

  indicePerguntaAtual++;

  if (
    indicePerguntaAtual >=
    bancoDePerguntas.length
  ) {

    finalizarJogo();

    return;
  }

  carregarPergunta();
}

function finalizarJogo() {

  let vencedor =
    "EMPATE!";

  if (
    pontosJogador1 >
    pontosJogador2
  ) {

    vencedor =
      `🏆 ${nomeJogador1} venceu!`;
  }

  if (
    pontosJogador2 >
    pontosJogador1
  ) {

    vencedor =
      `🏆 ${nomeJogador2} venceu!`;
  }

  document.querySelector(
    ".quiz-area"
  ).innerHTML = `

    <div class="resultado-final">

      <div class="resultado-card">

        <h1>FIM DE JOGO</h1>

        <div class="placar-final">
          <p>${nomeJogador1}</p>
          <p>${pontosJogador1}</p>
        </div>

        <div class="placar-final">
          <p>${nomeJogador2}</p>
          <p>${pontosJogador2}</p>
        </div>

        <h2 class="vencedor">
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