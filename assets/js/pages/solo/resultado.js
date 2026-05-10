
// ===============================
// RESULTADO FINAL
// ===============================

// Recupera pontos salvos
const pontos =
  localStorage.getItem("pontos") || 0;

// Recupera vidas
const vidas =
  localStorage.getItem("vidas") || 0;

// ===============================
// PONTOS
// ===============================

const elementoPontos =
  document.getElementById("pontos");

if (elementoPontos) {

  elementoPontos.textContent = pontos;
}

// ===============================
// VIDAS
// ===============================

const elementoVidas =
  document.getElementById("vidas");

if (elementoVidas) {

  elementoVidas.textContent = vidas;
}

// ===============================
// ÍCONES DAS VIDAS
// ===============================

const vidasIcon =
  document.getElementById("vidas-icon");

if (vidasIcon) {

  let icones = "";

  for (let i = 0; i < vidas; i++) {

    icones += "⚡ ";
  }

  vidasIcon.textContent = icones;
}

// ===============================
// DEBUG
// ===============================

console.log("Pontos:", pontos);

console.log("Vidas:", vidas);