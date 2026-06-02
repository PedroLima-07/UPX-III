// ===============================
// 1. LÓGICA DO TUTORIAL INICIAL
// ===============================

const passosTutorial = [
  {
    titulo: "MODO SOLO",
    texto:
      "O ponto de partida! Aqui você aprende a teoria sobre energia renovável antes de enfrentar os desafios.",
    imagem: "📚",
  },
  {
    titulo: "COMO JOGAR",
    texto:
      "Acerte para ganhar pontos! Faça combos (acertos seguidos) para ganhar pontos extras (+10, +12, +14).",
    imagem: "⚡",
  },
  {
    titulo: "CUIDADO COM AS VIDAS",
    texto:
      "Você tem 3 baterias ⚡. Se errar, perde uma. Se zerar, é Game Over. Boa sorte, Operador!",
    imagem: "🚀",
  },
];

let passoAtual = 0;

const overlayTutorial = document.getElementById("tutorial-overlay");
const tutTitulo = document.getElementById("tut-titulo");
const tutTexto = document.getElementById("tut-texto");
const tutImagem = document.getElementById("tut-imagem");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnPular = document.getElementById("btn-pular");
const tutorialControls = document.getElementById("tutorial-controls");
const btnComecar = document.getElementById("btn-comecar");
const stepDots = document.getElementById("step-dots");

let timerTypewriter = null;

function atualizarDots() {
  stepDots.innerHTML = "";

  passosTutorial.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (index === passoAtual ? " ativo" : "");

    dot.addEventListener("click", () => {
      passoAtual = index;
      atualizarTutorial();
    });

    stepDots.appendChild(dot);
  });
}

function typewriter(elemento, texto) {
  if (timerTypewriter) clearInterval(timerTypewriter);

  let i = 0;
  elemento.innerHTML = '<span class="cursor-blink"></span>';

  timerTypewriter = setInterval(() => {
    if (i < texto.length) {
      elemento.innerHTML =
        texto.slice(0, ++i) + '<span class="cursor-blink"></span>';
    } else {
      clearInterval(timerTypewriter);
      elemento.innerHTML = texto;
    }
  }, 22);
}

function atualizarTutorial(animarSlide = true) {
  const passo = passosTutorial[passoAtual];

  tutTitulo.textContent = passo.titulo;

  tutImagem.className = "";
  void tutImagem.offsetWidth;
  tutImagem.className = "tutorial-image icone-animado";
  tutImagem.textContent = passo.imagem;

  if (animarSlide) {
    tutTexto.className = "";
    void tutTexto.offsetWidth;
    tutTexto.className = "slide-entrada";
  }

  typewriter(tutTexto, passo.texto);

  btnPrev.disabled = passoAtual === 0;

  const ehUltimoPasso = passoAtual === passosTutorial.length - 1;
  tutorialControls.style.display = ehUltimoPasso ? "none" : "flex";
  btnComecar.style.display = ehUltimoPasso ? "block" : "none";

  atualizarDots();
}

btnNext.addEventListener("click", () => {
  if (passoAtual < passosTutorial.length - 1) {
    passoAtual++;
    atualizarTutorial();
  }
});

btnPrev.addEventListener("click", () => {
  if (passoAtual > 0) {
    passoAtual--;
    atualizarTutorial();
  }
});

btnPular.addEventListener("click", (e) => {
  e.preventDefault();
  passoAtual = passosTutorial.length - 1;
  atualizarTutorial();
});

btnComecar.addEventListener("click", () => {
  overlayTutorial.style.display = "none";
  carregarPergunta();
});

atualizarTutorial(false);

// ===============================
// 2. LÓGICA PRINCIPAL DO QUIZ E HUD
// ===============================

let indicePerguntaAtual = 0;
let pontos = 0;
let vidas = 3;
let acertosSeguidos = 0;
let acertos = 0; // ← NOVO: contador de acertos
let erros = 0;   // ← NOVO: contador de erros

const elementoPergunta = document.getElementById("texto-pergunta");
const botoesResposta = document.querySelectorAll(".btn-resposta-novo");
const barraProgresso = document.getElementById("barra-progresso");
const contadorPergunta = document.getElementById("contador-pergunta");
const btnSair = document.getElementById("btn-sair");

const scoreValor = document.getElementById("score-valor");
const iconesVidas = document.querySelectorAll(".vidas-box .vida");

const feedbackOverlay = document.getElementById("feedback-overlay");
const feedbackModal = document.getElementById("feedback-modal");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackTitulo = document.getElementById("feedback-titulo");
const feedbackTexto = document.getElementById("feedback-texto");
const btnFeedbackProximo = document.getElementById("btn-feedback-proximo");

if (btnSair) {
  btnSair.addEventListener("click", () => {
    if (
      confirm("Tem certeza que deseja sair? Seu progresso atual será perdido.")
    ) {
      window.location.href = "../modo.html";
    }
  });
}

function atualizarProgresso() {
  const totalPerguntas = bancoDePerguntas.length;
  const perguntaNumero = indicePerguntaAtual + 1;
  const porcentagem = (perguntaNumero / totalPerguntas) * 100;
  barraProgresso.style.width = porcentagem + "%";
  contadorPergunta.textContent = `${perguntaNumero}/${totalPerguntas}`;
}

function atualizarVidasUI() {
  const iconesVidas = document.querySelectorAll(".vidas-box .vida");
  iconesVidas.forEach((icone, index) => {
    if (index < vidas) {
      icone.classList.remove("perdida");
    } else {
      icone.classList.add("perdida");
    }
  });
}

function carregarPergunta() {
  const perguntaAtual = bancoDePerguntas[indicePerguntaAtual];
  atualizarProgresso();

  elementoPergunta.textContent = perguntaAtual.pergunta;

  botoesResposta.forEach((botao, index) => {
    const spanTexto = botao.querySelector(".texto-opcao");
    spanTexto.textContent = perguntaAtual.opcoes[index];

    botao.disabled = false;
    botao.style.opacity = "1";
    botao.style.borderColor = "#2a4b8d";
    botao.style.backgroundColor = "rgba(12, 31, 74, 0.3)";
  });

  feedbackOverlay.style.display = "none";
}

botoesResposta.forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    const botaoClicado = evento.currentTarget;
    const respostaEscolhida =
      botaoClicado.querySelector(".texto-opcao").textContent;
    const respostaCerta = bancoDePerguntas[indicePerguntaAtual].respostaCorreta;

    feedbackModal.classList.remove("correto", "errado");

    if (respostaEscolhida === respostaCerta) {
      // --- ACERTOU ---
      acertos++; // ← NOVO: incrementa acertos
      acertosSeguidos++;

      let pontosGanhos = 10;
      if (acertosSeguidos === 2) pontosGanhos = 12;
      if (acertosSeguidos >= 3) pontosGanhos = 14;

      pontos += pontosGanhos;
      scoreValor.textContent = pontos;

      feedbackModal.classList.add("correto");
      feedbackIcon.textContent = "✅";
      feedbackTitulo.textContent = "CORRETO!";

      if (acertosSeguidos >= 2) {
        feedbackTexto.textContent = `Combo x${acertosSeguidos}! Você ganhou +${pontosGanhos} pontos!`;
      } else {
        feedbackTexto.textContent = `Muito bem! Você ganhou +${pontosGanhos} pontos.`;
      }

      botaoClicado.style.borderColor = "#00ff88";
      botaoClicado.style.backgroundColor = "rgba(0, 255, 136, 0.1)";
    } else {
      // --- ERROU ---
      erros++;          // ← NOVO: incrementa erros
      acertosSeguidos = 0;
      vidas--;
      atualizarVidasUI();

      feedbackModal.classList.add("errado");
      feedbackIcon.textContent = "❌";

      if (vidas > 0) {
        feedbackTitulo.textContent = "INCORRETO!";
        feedbackTexto.textContent = `A resposta era: ${respostaCerta}. Você perdeu 1 vida.`;
      } else {
        feedbackTitulo.textContent = "FIM DE JOGO";
        feedbackTexto.textContent = `Sua energia esgotou. A resposta era: ${respostaCerta}.`;
      }

      botaoClicado.style.borderColor = "#ff4d4d";
      botaoClicado.style.backgroundColor = "rgba(255, 77, 77, 0.1)";
    }

    feedbackOverlay.style.display = "flex";
    botoesResposta.forEach((b) => (b.disabled = true));
  });
});

btnFeedbackProximo.addEventListener("click", () => {
  if (vidas <= 0) {
    localStorage.setItem("pontos", pontos);
    localStorage.setItem("vidas", vidas);
    localStorage.setItem("acertos", acertos); // ← NOVO
    localStorage.setItem("erros", erros);     // ← NOVO
    window.location.href = "resultado.html";
    return;
  }

  indicePerguntaAtual++;
  if (indicePerguntaAtual < bancoDePerguntas.length) {
    carregarPergunta();
  } else {
    // Fim do quiz com sucesso!
    localStorage.setItem("pontos", pontos);
    localStorage.setItem("vidas", vidas);
    localStorage.setItem("acertos", acertos); // ← NOVO
    localStorage.setItem("erros", erros);     // ← NOVO
    window.location.href = "resultado.html";
  }
});