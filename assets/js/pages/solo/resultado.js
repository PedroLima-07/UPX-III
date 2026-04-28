// ===============================
// DADOS DO JOGO (PEGANDO DO LOCALSTORAGE)
// ===============================

// Pega os pontos salvos pelo quiz.js (se não achar, assume 0)
let pontos = localStorage.getItem("pontos") || 0;

// Pega as vidas (se você ainda não tem um sistema de perder vidas no quiz.js, deixei 3 como padrão)
let vidas = localStorage.getItem("vidas") || 3;

// ===============================
// ATUALIZA A TELA (INJETANDO NO HTML)
// ===============================

// 1. Atualiza a pontuação na tela
document.getElementById("pontos").textContent = pontos;

// 2. Atualiza o número de vidas na tela
document.getElementById("vidas").textContent = vidas;

// 3. Desenha os ícones de raio ⚡ dependendo de quantas vidas sobraram
let icones = "";
for (let i = 0; i < vidas; i++) {
  icones += "⚡ ";
}
document.getElementById("vidas-icon").textContent = icones;

// ===============================
// LIMPEZA (OPCIONAL)
// ===============================
// Se quiser que a pontuação zere toda vez que ele atualizar a página de resultados:
// localStorage.removeItem("pontos");
