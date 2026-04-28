// 2. Variáveis de controle do jogo
let indicePerguntaAtual = 0;
let pontos = 0;

// 3. Pegando os elementos da tela
const elementoPergunta = document.getElementById("texto-pergunta");
const botoesResposta = document.querySelectorAll(".btn-resposta");
const feedback = document.getElementById("feedback");
const mensagem = document.getElementById("mensagem");
const btnProximo = document.getElementById("btn-proximo");
const btnSair = document.getElementById("btn-sair"); // 🔥 NOVO: Pegando o botão de sair

// 🔥 NOVO: Lógica de clique do botão sair
if (btnSair) {
  btnSair.addEventListener("click", () => {
    // Mostra um alerta perguntando se o jogador tem certeza
    const confirmarSaida = confirm(
      "Tem certeza que deseja sair? Seu progresso atual será perdido.",
    );

    if (confirmarSaida) {
      // Redireciona para a tela de modos (ajuste o caminho se necessário)
      window.location.href = "../modo.html";
    }
  });
}

// 4. Função para carregar a pergunta na tela
function carregarPergunta() {
  const perguntaAtual = bancoDePerguntas[indicePerguntaAtual];

  // Muda o texto da pergunta
  elementoPergunta.textContent = perguntaAtual.pergunta;

  // Muda o texto de cada botão e reativa eles
  botoesResposta.forEach((botao, index) => {
    botao.textContent = perguntaAtual.opcoes[index];
    botao.disabled = false; // Garante que o botão pode ser clicado novamente
    botao.style.opacity = "1";
  });

  // Esconde o feedback e o botão "Próximo"
  feedback.style.display = "none";
  btnProximo.style.display = "none";
  feedback.classList.remove("correto", "errado");
}

// 5. Função para verificar o clique na resposta
botoesResposta.forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    const respostaEscolhida = evento.target.textContent;
    const respostaCerta = bancoDePerguntas[indicePerguntaAtual].respostaCorreta;

    // Remove classes antigas
    feedback.classList.remove("correto", "errado");

    if (respostaEscolhida === respostaCerta) {
      feedback.classList.add("correto");
      mensagem.textContent = "✅ Resposta correta!";
      pontos += 100; // Exemplo: ganha 100 pontos por acerto
    } else {
      feedback.classList.add("errado");
      mensagem.textContent =
        "❌ Resposta incorreta! A certa era: " + respostaCerta;
    }

    feedback.style.display = "block";
    btnProximo.style.display = "block";

    // Bloqueia os botões para o usuário não clicar duas vezes
    botoesResposta.forEach((b) => {
      b.disabled = true;
      if (b.textContent !== respostaCerta) b.style.opacity = "0.5";
    });
  });
});

// 6. Função para passar para a próxima pergunta
btnProximo.addEventListener("click", () => {
  indicePerguntaAtual++; // Vai para a próxima

  // Verifica se ainda tem perguntas
  if (indicePerguntaAtual < bancoDePerguntas.length) {
    carregarPergunta();
  } else {
    // 🔥 MODIFICADO: Fim do quiz! Salva os pontos e redireciona para a tela final
    localStorage.setItem("pontos", pontos);
    localStorage.setItem("vidas", 3); // Salvando 3 vidas como padrão para a tela de resultado

    // Redireciona para o arquivo de resultado
    window.location.href = "resultado.html";
  }
});

// Inicia o jogo carregando a primeira pergunta
carregarPergunta();
