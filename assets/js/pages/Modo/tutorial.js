const steps = [
  {
    title: "BEM-VINDO!",
    text: "Prepare-se para dominar o mundo das energias renováveis! Vamos te mostrar como evoluir no EnerQuest.",
    img: "./assets/img/logo2UPX.png",
  },
  {
    title: "MODO ESTUDO",
    text: "O ponto de partida! Aqui você aprende a teoria sobre energia solar, eólica e mais antes de enfrentar os desafios.",
    img: "./assets/img/Livro mágico e brilhante .png",
  },
  {
    title: "MODO SOLO",
    text: "Teste seus conhecimentos! Enfrente o quiz e acumule pontos para subir de nível e ganhar conquistas.",
    img: "./assets/img/Ícone de usuário iluminado .png",
  },
  {
    title: "MULTIPLAYER",
    text: "Desafio final! Jogue com um amigo localmente para ver quem é o maior especialista em sustentabilidade.",
    img: "./assets/img/Ícones humanos estilizados e brilhantes .png",
  },
];

let currentStep = 0;

function updateTutorial() {
  const content = document.getElementById("tutorial-content");
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");

  content.innerHTML = `
        <div class="tutorial-info">
            <h2>${steps[currentStep].title}</h2>
            <p>${steps[currentStep].text}</p>
        </div>
        <div class="tutorial-media">
            <img src="${steps[currentStep].img}" alt="Preview">
        </div>
    `;

  // Visibilidade do botão voltar
  btnPrev.style.visibility = currentStep === 0 ? "hidden" : "visible";

  // Altera ícone na última etapa
  if (currentStep === steps.length - 1) {
    btnNext.innerHTML = "&#10003;";
  } else {
    btnNext.innerHTML = "&#10095;";
  }
}

function nextStep() {
  if (currentStep < steps.length - 1) {
    currentStep++;
    updateTutorial();
  } else {
    closeTutorial();
  }
}

function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    updateTutorial();
  }
}

function closeTutorial() {
  document.getElementById("tutorial-overlay").style.display = "none";
}

// Inicia tutorial ao carregar a página
window.onload = updateTutorial;
