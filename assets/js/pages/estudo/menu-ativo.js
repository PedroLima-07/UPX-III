const paginas = {
  "modo-estudo": `
    <h2>INTRODUÇÃO</h2>
        <p>Bem-vindo ao modo estudo ⚡</p>

        <p>
          O mundo está mudando, e a forma como produzimos energia é o coração
          dessa transformação. Atualmente, a maior parte da energia global ainda
          vem de fontes que poluem o ar e aceleram o aquecimento global.
        </p>

        <p>
          O EnerQuest nasceu para mostrar que existe um caminho diferente: as
          energias renováveis. Elas são limpas, infinitas e respeitam o
          equilíbrio da natureza.
        </p>

        <p>
          Além de serem mais sustentáveis, essas energias ajudam a reduzir a
          dependência de combustíveis fósseis, contribuindo para um futuro mais
          equilibrado e saudável para o planeta.
        </p>

        <p>
          Com o avanço da tecnologia, essas fontes estão se tornando cada vez
          mais acessíveis, permitindo que mais pessoas adotem soluções
          sustentáveis no dia a dia.
        </p>
        <div class="dica">
        💡 A energia solar vem do sol e é limpa.
        </div>

  `,

  "energia-solar": `
    <h2>ENERGIA SOLAR ☀️</h2>

      <p>
        A energia solar é obtida a partir da luz do sol, sendo uma das fontes de energia renovável mais utilizadas no mundo. Ela é captada por meio de painéis solares, que transformam a luz solar em energia elétrica.
      </p>

      <p>
        Essa fonte de energia é limpa, sustentável e não emite poluentes durante sua utilização. Além disso, o sol é uma fonte inesgotável, o que torna a energia solar uma excelente alternativa para o futuro.
      </p>

      <p>
        Entre suas principais vantagens estão a redução da conta de energia elétrica e a baixa necessidade de manutenção dos equipamentos.
      </p>

      <p>
        Por outro lado, sua eficiência pode ser afetada em dias nublados ou chuvosos, e o custo inicial de instalação pode ser elevado. Mesmo assim, é uma das energias que mais cresce atualmente.
      </p>

      <div class="dica">
        💡 A energia solar vem do sol e é limpa.
      </div>
  `,

  "energia-eolica": `
    <h2>ENERGIA EÓLICA 🌬️</h2>

      <p>
        A energia eólica é gerada a partir da força dos ventos. Para isso, são utilizadas grandes turbinas chamadas aerogeradores, que transformam o movimento do vento em energia elétrica.
      </p>

      <p>
        Essa é uma fonte de energia limpa e renovável, que não emite gases poluentes e contribui diretamente para a preservação do meio ambiente.
      </p>

      <p>
        A energia eólica é muito utilizada em regiões com ventos constantes, como áreas litorâneas. Ela tem se tornado cada vez mais importante na produção de energia sustentável ao redor do mundo.
      </p>

      <p>
        Apesar de suas vantagens, sua produção depende da intensidade dos ventos, podendo variar ao longo do tempo. Mesmo assim, continua sendo uma excelente alternativa para reduzir impactos ambientais.
      </p>

      <div class="dica">
        💡 Usa a força do vento.
      </div>
  `,

  hidreletrica: `
    <h2>HIDRELÉTRICA 💧</h2>
      <p>
        A energia hidrelétrica é gerada a partir da força da água em movimento, geralmente em rios. Para isso, são construídas usinas com barragens que controlam o fluxo da água.
      </p>

      <p>
        Quando a água passa pelas turbinas da usina, ela movimenta equipamentos que transformam essa energia em eletricidade.
      </p>

      <p>
        Essa é uma das principais fontes de energia utilizadas no Brasil, sendo considerada renovável e com baixa emissão de poluentes durante sua operação.
      </p>

      <p>
        Por outro lado, a construção de usinas hidrelétricas pode causar impactos ambientais, como alagamento de áreas naturais e alteração de ecossistemas.
      </p>

      <div class="dica">
        💡 Usa a força da água.
      </div>
  `,

  biomassa: `
    <h2>BIOMASSA 🌱</h2>

      <p>
        A biomassa é uma fonte de energia renovável obtida a partir de matéria orgânica, como restos de plantas, madeira, resíduos agrícolas e até lixo orgânico.
      </p>

      <p>
        Esses materiais podem ser utilizados para gerar energia por meio de processos como a queima ou a decomposição, produzindo eletricidade, calor ou biocombustíveis.
      </p>

      <p>
        Uma das principais vantagens da biomassa é o reaproveitamento de resíduos, contribuindo para a redução do lixo e para a geração de energia de forma mais sustentável.
      </p>

      <p>
        No entanto, se não for utilizada corretamente, pode gerar poluição e desmatamento. Por isso, é importante que seu uso seja feito de forma consciente e controlada.
      </p>

      <div class="dica">
      💡 Usa matéria orgânica.
      </div>
  `,

  impactos: `
    <h2>IMPACTOS 🌍</h2>

      <p>
        A forma como produzimos energia tem um grande impacto no meio ambiente. Fontes não renováveis, como petróleo e carvão, liberam gases poluentes que contribuem para o aquecimento global e as mudanças climáticas.
      </p>

      <p>
        Esses impactos podem causar problemas como aumento da temperatura do planeta, derretimento de geleiras, elevação do nível do mar e prejuízos à biodiversidade.
      </p>

      <p>
        As energias renováveis surgem como uma alternativa mais sustentável, pois reduzem a emissão de poluentes e utilizam recursos naturais que se renovam constantemente.
      </p>

      <p>
        No entanto, mesmo as energias renováveis podem gerar alguns impactos, como alterações no ambiente natural. Por isso, é importante utilizar essas fontes de forma consciente e planejada.
      </p>
      <div class="dica">
      💡 Usa matéria orgânica.
      </div>
  `,
};

//captura dos cliques nos botões do menu
const botoes = document.querySelectorAll(".menu button");
const conteudo = document.querySelector(".conteudo");

botoes.forEach((botao) => {
  botao.addEventListener("click", (e) => {
    e.preventDefault();

    const pagina = botao.dataset.page;

    // troca conteúdo
    conteudo.innerHTML = paginas[pagina];

    // botão ativo
    document
      .querySelectorAll(".menu button")
      .forEach((b) => b.classList.remove("ativo"));
    botao.classList.add("ativo");
  });
});

// ativa a primeira página por padrão
const primeiroBotao = document.querySelector(".menu button");

conteudo.innerHTML = paginas[primeiroBotao.dataset.page];
primeiroBotao.classList.add("ativo");
