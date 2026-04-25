// ===============================
// DADOS DO JOGO
// ===============================

// Pega do localStorage ou usa padrão
let pontos = localStorage.getItem("pontos") || 1820;
let vidas = localStorage.getItem("vidas") || 2;

// ===============================
// ATUALIZA TELA
// ===============================

// Pontuação
document.getElementById("pontos").textContent = pontos;

// Número de vidas
document.getElementById("vidas").textContent = vidas;

// Ícones ⚡
let icones = "";

for (let i = 0; i < vidas; i++) {
  icones += "⚡ ";
}

document.getElementById("vidas-icon").textContent = icones;

// ===============================
// (OPCIONAL) RESET
// ===============================
// localStorage.removeItem("pontos");
// localStorage.removeItem("vidas");