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

// Selecionamos todos os elementos que vamos precisar manipular
const overlayTutorial = document.getElementById("tutorial-overlay");
const tutTitulo = document.getElementById("tut-titulo");
const tutTexto = document.getElementById("tut-texto");
const tutImagem = document.getElementById("tut-imagem");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const btnPular = document.getElementById("btn-pular");
const tutorialControls = document.getElementById("tutorial-controls");
const btnComecar = document.getElementById("btn-comecar");
const stepDots = document.getElementById("step-dots"); // <-- NOVO: container das bolinhas

// Guarda a referência do intervalo do typewriter para podermos cancelá-lo
// se o usuário trocar de slide antes do texto terminar de "digitar"
let timerTypewriter = null;

// ---- FUNÇÃO: BOLINHAS DE PROGRESSO ----
// Recria as bolinhas sempre que o passo muda.
// A bolinha do passo atual recebe a classe "ativo", que a estica via CSS.
function atualizarDots() {
  stepDots.innerHTML = ""; // Limpa as bolinhas antigas

  passosTutorial.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (index === passoAtual ? " ativo" : "");

    // Clicar numa bolinha pula diretamente para aquele passo
    dot.addEventListener("click", () => {
      passoAtual = index;
      atualizarTutorial();
    });

    stepDots.appendChild(dot);
  });
}

// ---- FUNÇÃO: EFEITO TYPEWRITER ----
// Recebe um elemento e um texto, e "digita" letra por letra.
// O cursor piscante (span.cursor-blink) fica no final enquanto digita.
function typewriter(elemento, texto) {
  // Cancela qualquer digitação anterior que ainda esteja rodando
  if (timerTypewriter) clearInterval(timerTypewriter);

  let i = 0;
  // Começa com só o cursor visível
  elemento.innerHTML = '<span class="cursor-blink"></span>';

  timerTypewriter = setInterval(() => {
    if (i < texto.length) {
      // Adiciona uma letra e recoloca o cursor no final
      elemento.innerHTML =
        texto.slice(0, ++i) + '<span class="cursor-blink"></span>';
    } else {
      // Texto completo: para o intervalo e remove o cursor
      clearInterval(timerTypewriter);
      elemento.innerHTML = texto;
    }
  }, 22); // 22ms por letra — rápido o suficiente para não cansar
}

// ---- FUNÇÃO: ATUALIZAR O TUTORIAL ----
// Chamada sempre que o passo muda. Orquestra todas as atualizações visuais.
function atualizarTutorial(animarSlide = true) {
  const passo = passosTutorial[passoAtual];

  // 1. Atualiza o título
  tutTitulo.textContent = passo.titulo;

  // 2. Anima o ícone: remove a classe, força o reflow, e recoloca.
  //    Esse truque (void el.offsetWidth) faz o browser "resetar" a animação CSS,
  //    permitindo que ela rode novamente mesmo que já tenha rodado antes.
  tutImagem.className = "";
  void tutImagem.offsetWidth; // força reflow
  tutImagem.className = "tutorial-image icone-animado";
  tutImagem.textContent = passo.imagem;

  // 3. Anima a área de texto com slide (só quando navega, não na carga inicial)
  if (animarSlide) {
    tutTexto.className = "";
    void tutTexto.offsetWidth; // força reflow
    tutTexto.className = "slide-entrada";
  }

  // 4. Inicia o efeito typewriter no parágrafo de texto
  typewriter(tutTexto, passo.texto);

  // 5. Atualiza os botões de navegação
  btnPrev.disabled = passoAtual === 0;

  // 6. No último passo: esconde as setas e mostra o botão "Começar"
  const ehUltimoPasso = passoAtual === passosTutorial.length - 1;
  tutorialControls.style.display = ehUltimoPasso ? "none" : "flex";
  btnComecar.style.display = ehUltimoPasso ? "block" : "none";

  // 7. Atualiza as bolinhas de progresso
  atualizarDots();
}

// ---- EVENTOS DOS BOTÕES ----

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

// "Pular": vai direto para o último passo
btnPular.addEventListener("click", (e) => {
  e.preventDefault();
  passoAtual = passosTutorial.length - 1;
  atualizarTutorial();
});

// "Começar": esconde o overlay e inicia o quiz
btnComecar.addEventListener("click", () => {
  overlayTutorial.style.display = "none";
  carregarPergunta(); // Função que já existe no seu quiz.js
});

// Inicia o tutorial no primeiro passo (sem animação de slide)
atualizarTutorial(false);

// ===============================
// 2. LÓGICA PRINCIPAL DO QUIZ E HUD
// ===============================

let indicePerguntaAtual = 0;
let pontos = 0;
let vidas = 3;
let acertosSeguidos = 0; // Para controlar o Combo

const elementoPergunta = document.getElementById("texto-pergunta");
const botoesResposta = document.querySelectorAll(".btn-resposta-novo");
const barraProgresso = document.getElementById("barra-progresso");
const contadorPergunta = document.getElementById("contador-pergunta");
const btnSair = document.getElementById("btn-sair");

// Elementos do HUD
const scoreValor = document.getElementById("score-valor");
const iconesVidas = document.querySelectorAll(".vidas-box .vida");

// Elementos do Modal de Feedback Neon
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
      // Vida Ativa
      icone.classList.remove("perdida");
      // Opcional: Se quiseres trocar o ficheiro da imagem em vez de usar filtro CSS:
      // icone.src = "/assets/img/raio-ativo.svg";
    } else {
      // Vida Perdida
      icone.classList.add("perdida");
      // Opcional: Se quiseres trocar o ficheiro da imagem:
      // icone.src = "/assets/img/raio-inativo.svg";
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

// Verifica a resposta
botoesResposta.forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    const botaoClicado = evento.currentTarget;
    const respostaEscolhida =
      botaoClicado.querySelector(".texto-opcao").textContent;
    const respostaCerta = bancoDePerguntas[indicePerguntaAtual].respostaCorreta;

    feedbackModal.classList.remove("correto", "errado");

    if (respostaEscolhida === respostaCerta) {
      // --- SISTEMA DE COMBO ---
      acertosSeguidos++;
      let pontosGanhos = 10;
      if (acertosSeguidos === 2) pontosGanhos = 12;
      if (acertosSeguidos >= 3) pontosGanhos = 14;

      pontos += pontosGanhos;
      scoreValor.textContent = pontos; // Atualiza a tela

      feedbackModal.classList.add("correto");
      feedbackIcon.textContent = "✅";
      feedbackTitulo.textContent = "CORRETO!";

      // Mostra o combo no pop-up!
      if (acertosSeguidos >= 2) {
        feedbackTexto.textContent = `Combo x${acertosSeguidos}! Você ganhou +${pontosGanhos} pontos!`;
      } else {
        feedbackTexto.textContent = `Muito bem! Você ganhou +${pontosGanhos} pontos.`;
      }

      botaoClicado.style.borderColor = "#00ff88";
      botaoClicado.style.backgroundColor = "rgba(0, 255, 136, 0.1)";
    } else {
      // --- ERROU ---
      acertosSeguidos = 0; // Zera o combo
      vidas--; // Perde uma vida
      atualizarVidasUI(); // Apaga o raio na tela

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

// Botão PRÓXIMO dentro do Pop-up Neon
btnFeedbackProximo.addEventListener("click", () => {
  // Se as vidas acabaram, vai pro resultado imediatamente
  if (vidas <= 0) {
    localStorage.setItem("pontos", pontos);
    localStorage.setItem("vidas", vidas);
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
    window.location.href = "resultado.html";
  }
});
