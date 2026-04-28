// 1. Nosso banco de perguntas (Agora com as 10 perguntas completas)
const bancoDePerguntas = [
  // --- ENERGIA SOLAR ---
  {
    pergunta: "A energia solar é obtida a partir de qual fonte?",
    opcoes: ["Vento", "Água", "Sol", "Petróleo"],
    respostaCorreta: "Sol",
  },
  {
    pergunta: "Qual equipamento é usado para captar a energia solar?",
    opcoes: ["Turbina eólica", "Painel solar", "Gerador a diesel", "Barragem"],
    respostaCorreta: "Painel solar",
  },
  {
    pergunta: "A energia solar é considerada:",
    opcoes: ["Não renovável", "Renovável", "Poluente", "Nuclear"],
    respostaCorreta: "Renovável",
  },

  // --- ENERGIA HIDRELÉTRICA ---
  {
    pergunta:
      "Qual estrutura é responsável por armazenar a água em uma usina hidrelétrica?",
    opcoes: ["Turbina", "Painel solar", "Barragem", "Gerador"],
    respostaCorreta: "Barragem",
  },
  {
    pergunta: "Uma desvantagem da energia hidrelétrica é:",
    opcoes: [
      "Alto nível de poluição do ar",
      "Dependência da luz solar",
      "Impacto ambiental com alagamento de áreas",
      "Baixa eficiência energética",
    ],
    respostaCorreta: "Impacto ambiental com alagamento de áreas",
  },
  {
    pergunta: "O que acontece com a energia da água ao passar pelas turbinas?",
    opcoes: [
      "É destruída",
      "É transformada em energia elétrica pelo gerador",
      "É armazenada diretamente",
      "É convertida em energia nuclear",
    ],
    respostaCorreta: "É transformada em energia elétrica pelo gerador",
  },

  // --- BIOMASSA ---
  {
    pergunta:
      "A biomassa é uma fonte de energia obtida principalmente a partir de:",
    opcoes: [
      "Recursos minerais do subsolo",
      "Matéria orgânica de origem vegetal e animal",
      "Radiação solar captada por painéis",
      "Movimento das águas dos oceanos",
    ],
    respostaCorreta: "Matéria orgânica de origem vegetal e animal",
  },
  {
    pergunta:
      "Qual das alternativas representa um uso comum da biomassa no Brasil?",
    opcoes: [
      "Produção de energia com vento",
      "Uso da cana para gerar energia e combustível",
      "Geração elétrica por usinas nucleares",
      "Captação de energia das marés",
    ],
    respostaCorreta: "Uso da cana para gerar energia e combustível",
  },
  {
    pergunta:
      "Por que a biomassa é considerada uma alternativa mais sustentável?",
    opcoes: [
      "Porque não gera nenhum tipo de impacto",
      "Porque só existe em países ricos",
      "Porque aproveita resíduos e reduz o lixo orgânico",
      "Porque depende de recursos minerais",
    ],
    respostaCorreta: "Porque aproveita resíduos e reduz o lixo orgânico",
  },

  // --- PERGUNTA EXTRA (FÁCIL) ---
  {
    pergunta:
      "O que é uma atitude simples que podemos tomar em casa para economizar energia elétrica?",
    opcoes: [
      "Deixar a TV ligada sem ninguém assistindo",
      "Apagar a luz ao sair de um cômodo",
      "Tomar banhos muito demorados",
      "Dormir com a luz acesa",
    ],
    respostaCorreta: "Apagar a luz ao sair de um cômodo",
  },
];
