const paginaAtual = window.location.pathname.split("/").pop().replace(".html","");

document.querySelectorAll(".menu button").forEach(btn=>{
  if(btn.dataset.page === paginaAtual){
    btn.classList.add("ativo");
  }
});