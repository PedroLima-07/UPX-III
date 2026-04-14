// pega o botão
const btnProximo = document.getElementById("btn-proximo");

botoes.forEach(botao => {
  botao.addEventListener("click", () => {

    feedback.classList.remove("correto", "errado");

    if (botao.textContent.trim().toUpperCase() === "SOLAR") {
      feedback.classList.add("correto");
      mensagem.textContent = "✅ Resposta correta!";
    } else {
      feedback.classList.add("errado");
      mensagem.textContent = "❌ Resposta incorreta!";
    }

    feedback.style.display = "block";

    // 🔥 mostra botão próximo
    btnProximo.style.display = "block";
  });
});s