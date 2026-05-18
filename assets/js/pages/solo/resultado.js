// ===============================
// RESULTADO FINAL
// ===============================

// Recupera dados do localStorage
const pontos = Number(localStorage.getItem("pontos")) || 0;
const vidas = Number(localStorage.getItem("vidas")) || 0;
const acertos = Number(localStorage.getItem("acertos")) || 0;
const erros = Number(localStorage.getItem("erros")) || 0;

// Total de perguntas
const total = acertos + erros;

// ===============================
// ELEMENTOS
// ===============================

const pontosEl = document.getElementById("pontos");
const vidasIconsEl = document.getElementById("vidas-icons");

const statAcertos = document.getElementById("stat-acertos");
const statErros = document.getElementById("stat-erros");
const statTotal = document.getElementById("stat-total");
const statScore = document.getElementById("stat-score");

const epicTitulo = document.getElementById("epic-titulo");
const epicSub = document.getElementById("epic-sub");
const iconeRes = document.getElementById("icone-res");

// ===============================
// PONTUAÇÃO
// ===============================

if (pontosEl) {
  pontosEl.textContent = pontos;
}

// ===============================
// VIDAS
// ===============================

if (vidasIconsEl) {
  let icones = "";

  for (let i = 0; i < vidas; i++) {
    icones += "⚡";
  }

  // Caso tenha perdido todas as vidas
  if (vidas <= 0) {
    icones = "☠";
  }

  vidasIconsEl.textContent = icones;
}

// ===============================
// ESTATÍSTICAS
// ===============================

if (statAcertos) {
  statAcertos.textContent = acertos;
}

if (statErros) {
  statErros.textContent = erros;
}

if (statTotal) {
  statTotal.textContent = total;
}

if (statScore) {
  statScore.textContent = pontos;
}

// ===============================
// RESULTADO FINAL ÉPICO
// ===============================

if (pontos >= 70) {
  epicTitulo.textContent = "SISTEMA ILUMINADO!";
  epicTitulo.classList.remove("derrota");
  epicTitulo.classList.add("vitoria");

  epicSub.textContent = "Parabéns, Operador — missão cumprida";

  iconeRes.textContent = "🏆";
} else if (pontos >= 40) {
  epicTitulo.textContent = "MISSÃO PARCIAL";
  epicTitulo.classList.remove("derrota");
  epicTitulo.classList.add("vitoria");

  epicSub.textContent = "Bom trabalho — continue evoluindo";

  iconeRes.textContent = "⚡";
} else {
  epicTitulo.textContent = "SISTEMA EM COLAPSO";
  epicTitulo.classList.remove("vitoria");
  epicTitulo.classList.add("derrota");

  epicSub.textContent = "Energia insuficiente — tente novamente";

  iconeRes.textContent = "☠";
}

// ===============================
// DEBUG
// ===============================

console.log("Pontos:", pontos);
console.log("Vidas:", vidas);
console.log("Acertos:", acertos);
console.log("Erros:", erros);
