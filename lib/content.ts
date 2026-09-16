// Conteúdo partilhado das 3 landing pages — Pausa para Dentro
// Copy em português europeu.

export const EVENT = {
  name: "Pausa para Dentro",
  edition: "3.ª Edição · Educar com Amor e Consciência",
  coCreation: "em co-criação com Colo di Mama e Associação Men Talks",
  date: "24 de outubro de 2026",
  dateShort: "24 OUT 2026",
  time: "10h às 17h",
  place: "Fundação Maria Droste",
  city: "Lisboa",
  sub: "Um encontro para quem educa, cuida e acompanha a vida de outros — e precisa de regressar a si.",
  impact: "Porque cuidar dos outros começa por conseguir parar.",
  cta: "Quero participar",
  ctaFinal: "Quero fazer parte",
  // Preço atual da inscrição. Escalonado por data (37€ até 30/set, 47€ de
  // 1 a 22/out), mas a troca é feita à mão pela Georgina no dia — não há
  // lógica de datas no código. Mudar só este valor + STRIPE_PAYMENT_LINK_URL
  // na Vercel quando o preço subir.
  preco: 37,
};

export const CONTEXT = {
  eyebrow: "O contexto",
  title: "Vivemos em excesso de tudo.",
  intro:
    "Vivemos numa época em que cuidar se tornou urgente e parar se tornou raro. Corremos entre responsabilidades, expectativas e exigências constantes.",
  lines: [
    "Educamos enquanto respondemos a mensagens.",
    "Trabalhamos enquanto pensamos no que ficou por fazer.",
    "Cuidamos dos outros sem perceber que, muitas vezes, nos estamos a afastar de nós próprios.",
  ],
  outro:
    "Há professores a entrar em salas de aula sem terem tido tempo para respirar. Pais a viver em piloto automático. Profissionais da área social a carregar mais do que conseguem nomear.",
};

export const NASCIMENTO = {
  eyebrow: "O nascimento",
  title: "Foi daqui que nasceu este encontro.",
  p1: "O Educar com Amor e Consciência nasceu para criar espaços de reflexão e transformação na educação e na parentalidade.",
  p2: "Na sua 3.ª edição, este encontro ganha uma nova dimensão. Surge Pausa para Dentro — uma criação conjunta com o Colo di Mama e a Associação Men Talks.",
};

export const UNIAO = {
  eyebrow: "A união",
  title: "Três projetos. Um mesmo compromisso.",
  cards: [
    {
      name: "Educar com Amor e Consciência",
      logo: "/logos/ga.png",
      text: "Olha para a educação a partir de quem educa, promovendo consciência, bem-estar, relações mais humanas e práticas educativas mais inclusivas, através de formação, reflexão e ferramentas que geram mudança.",
    },
    {
      name: "Colo di Mama",
      logo: "/logos/colodimama.png",
      text: "Promove a reflexão sobre a forma como educamos, o impacto que temos na formação das crianças e o legado que transmitimos às próximas gerações. Traz o cuidado, o vínculo e o acolhimento como base do desenvolvimento humano.",
    },
    {
      name: "Men Talks",
      logo: "/logos/mentalks.png",
      text: "Cria espaço para conversas e reflexões que muitas vezes não acontecem sobre masculinidades, emoções e relações com o objetivo de construir uma sociedade mais igualitária.",
    },
  ],
  close:
    "Juntos, criam um encontro sobre aquilo que nos une a todos: a forma como cuidamos, comunicamos e educamos — dentro e fora de casa.",
};

export const OQUEE = {
  eyebrow: "O encontro",
  title: "O que é Pausa para Dentro?",
  intro: "Pausa para Dentro é um encontro presencial, intimista e experiencial.",
  not: ["Não é uma conferência.", "Não é um conjunto de palestras."],
  is: "É um espaço construído para parar, refletir, sentir e integrar. Ao longo de um dia, vamos atravessar temas como:",
  temas: [
    "educação consciente",
    "relações e comunicação",
    "parentalidade",
    "gestão da energia e do burnout",
    "liderança humana",
    "presença e regulação emocional",
  ],
};

export const DIFER = {
  eyebrow: "A diferença",
  quoteA: "Aqui não há palco.",
  quoteB: "Há presença.",
  intro:
    "Os participantes não vêm apenas ouvir. Vêm viver, experimentar e integrar. A experiência é construída através de:",
  modos: [
    "círculos de partilha",
    "momentos guiados",
    "práticas de regulação emocional",
    "conversas vivas",
    "silêncio e integração",
  ],
};

export const PROGRAMA = {
  eyebrow: "O dia",
  title: "Um dia para parar, respirar, escutar, reorganizar e transformar.",
  intro: [
    "Um percurso de experiências, reflexão e prática, construído a partir de quatro pilares: Consciência, Comunicação, Organização e Liderança.",
  ],
  blocos: [
    {
      time: "10H",
      label: "Chegada & aterragem",
      desc: [
        "Começamos devagar. Antes de fazer, precisamos de chegar.",
        "Um momento para desacelerar, cultivar o silêncio e trazer a atenção para o corpo, para a respiração e para o presente.",
      ],
      facilitador: "Facilitadora: Georgina Angélica",
    },
    {
      time: "10H20",
      label: "Abertura",
      desc: [
        "Porque fazemos esta pausa?",
        "Um momento de abertura e acolhimento com Georgina Angélica, Cristina Figueira, Ângela Almeida e representante da Fundação Maria Droste.",
        "Apresentação do propósito do Pausa para Dentro, da ligação entre os três projetos e da intenção que nos reúne neste dia.",
      ],
    },
    {
      time: "10H30–11H30",
      label: "Consciência",
      title: "Workshop: Introdução à respiração consciente",
      desc: [
        "Uma experiência prática para compreender a respiração como ferramenta de presença, autorregulação e conexão connosco próprios.",
      ],
      facilitador: "Facilitador: Paulo Vieira",
    },
    {
      time: "11H30–11H40",
      label: "Pausa",
      desc: ["10 minutos para integrar a experiência, respirar, conversar ou simplesmente estar."],
    },
    {
      time: "11H40–12H30",
      label: "Comunicação",
      title: "Workshop: O que comunicamos quando não estamos a falar?",
      desc: [
        "A comunicação começa antes das palavras. Como estamos nas relações quando estamos cansados, sobrecarregados ou emocionalmente desafiados? Como escutamos quando somos confrontados? E o que acontece quando o outro sente, processa ou comunica de uma forma diferente da nossa?",
        "Uma experiência sobre comunicação emocional, neurodiversidade, escuta, relações conscientes, limites e o impacto que temos no outro.",
      ],
      facilitador: "Facilitadora: Nathalie Marques",
    },
    {
      time: "12H30–13H30",
      label: "Almoço consciente",
      desc: [
        "Tempo para nutrir o corpo e continuar a conversa.",
        "Um almoço sem pressa, acompanhado de perguntas que convidam à reflexão:",
      ],
      perguntas: [
        "O que tens aprendido sobre cuidar?",
        "O que precisas de desaprender?",
        "Que relação gostarias de transformar?",
        "Quando foi a última vez que fizeste uma pausa verdadeira?",
      ],
    },
    {
      time: "13H30–14H20",
      label: "Organização",
      title: "Workshop: Cuidar da energia, estabelecer limites e prevenir a exaustão",
      desc: [
        "Uma experiência prática sobre limites, micro-pausas, organização emocional, gestão de energia e prevenção da exaustão.",
      ],
      facilitador: "Facilitadora: Inês Sottomayor",
    },
    {
      time: "14H20–14H25",
      label: "Regresso ao presente",
      title: "5 minutos de prática de regulação",
      desc: ["Uma breve prática para voltar ao corpo, recentrar a atenção e preparar o regresso à experiência."],
    },
    {
      time: "14H30–15H30",
      label: "Liderança",
      title: "Workshop: A Jaula, A Pausa, A Escolha",
      desc: [
        "Uma imersão experiencial de 60 minutos sobre liderança consciente e masculinidades, para refletir sobre os guiões que herdamos, a capacidade de parar e o poder de escolher como queremos estar e liderar.",
        "Através de exercícios individuais, em pares e em pequenos grupos, vamos percorrer três movimentos:",
      ],
      movimentos: [
        "A Jaula — reconhecer os guiões que aprendemos sobre o que significa ser homem e como estes influenciam a forma como nos relacionamos, lideramos e ocupamos espaço.",
        "A Pausa — experimentar o parar como uma competência de liderança: criar espaço para escutar, reconhecer limites e dizer «basta» ao que já não queremos continuar a alimentar.",
        "A Escolha — identificar o que este momento nos pede e transformar essa consciência numa decisão concreta, através de um compromisso pequeno, datado e partilhado.",
      ],
      descFinal:
        "Uma experiência sobre responsabilidade, presença, masculinidades conscientes e liderança, que termina com três práticas concretas para levar para a vida: uma pausa diária, um «basta» semanal e uma promessa com testemunha.",
      facilitador: "Facilitador: Virgílio Varela",
    },
    {
      time: "15H25–16H",
      label: "Integração & encerramento",
      desc: [
        "O que faço com aquilo que descobri?",
        "Um momento final para transformar reflexão em intenção e identificar uma pequena mudança concreta que cada pessoa quer levar consigo:",
      ],
      perguntas: [
        "O que levas contigo?",
        "Que pequena mudança vais aplicar?",
        "O que queres cuidar melhor?",
        "Onde precisas de mais consciência na tua vida?",
      ],
      descFinal:
        "Encerramos com um ritual simples e humano: palavra final · silêncio · música · agradecimento · respiração.",
      facilitador: "Facilitadoras: Georgina Angélica · Ângela Almeida · Cristina Figueira",
    },
    {
      time: "16H–17H",
      label: "Slow leaving",
      desc: [
        "Não temos pressa para ir embora.",
        "O programa termina às 16H, mas a experiência pode continuar.",
        "Um espaço informal e aberto para conectar, conversar, fazer networking, colocar perguntas aos facilitadores, escrever no diário ou simplesmente permanecer.",
        "Porque uma pausa também precisa de tempo para terminar.",
      ],
    },
  ],
};

export type Facilitador = {
  slug: string;
  nome: string;
  papel: string;
  foto: string;
  bioCurta: string;
  bioLonga: string[];
  organizacao: { nome: string; logo: string };
};

export const FACILITADORES = {
  eyebrow: "Quem facilita",
  title: "As pessoas que conduzem o dia.",
  intro:
    "Toca num nome para leres a versão alargada — percurso, formação e o projeto que traz até ao Pausa para Dentro.",
  pessoas: [
    {
      slug: "georgina-angelica",
      nome: "Georgina Angélica",
      papel: "Chegada, abertura e encerramento",
      foto: "/facilitadores/georgina.png",
      bioCurta:
        "Consultora, formadora e palestrante, com mais de 20 anos de experiência em Portugal, Inglaterra e Angola. Fundadora do Educar com Amor e Consciência.",
      bioLonga: [
        "Georgina Angélica trabalha na interseção entre educação, intervenção social, desenvolvimento humano e transformação social.",
        "É consultora, formadora e palestrante, com mais de 20 anos de experiência em Portugal, Inglaterra e Angola. É fundadora do Educar com Amor e Consciência e cocriadora d'O Tal Podcast, espaços através dos quais promove reflexão, diálogo e transformação em torno da educação, das relações humanas, da diversidade e da inclusão.",
      ],
      organizacao: { nome: "Educar com Amor e Consciência", logo: "/logos/ga.png" },
    },
    {
      slug: "paulo-vieira",
      nome: "Paulo Vieira",
      papel: "Workshop · Consciência",
      foto: "/facilitadores/paulo.png",
      bioCurta:
        "Professor de Hatha Yoga e facilitador de práticas de respiração consciente, com mais de 20 anos de trabalho em saúde, inclusão social e desenvolvimento comunitário.",
      bioLonga: [
        "Paulo Vieira trabalha há mais de 20 anos nas áreas da saúde, inclusão social, educação, participação e desenvolvimento comunitário, colaborando com organizações da sociedade civil, fundações e programas públicos. O seu percurso inclui também o ativismo e o trabalho em torno da diversidade, pertença e justiça social.",
        "É licenciado em Desenvolvimento Comunitário e Saúde Mental, mestre em Estudos de Migração e pós-graduado em Gestão e Avaliação de Projetos. É professor de Hatha Yoga e facilitador de práticas de respiração consciente.",
        "É deste cruzamento entre bem-estar, desenvolvimento humano e intervenção social que nasce também o seu trabalho através da UNO Yoga & Breathwork, procurando criar espaços acessíveis de presença, autorregulação e bem-estar, em diferentes pessoas e contextos.",
      ],
      organizacao: { nome: "UNO Yoga & Breathwork", logo: "/logos/uno-yoga-breathwork.png" },
    },
    {
      slug: "nathalie-marques",
      nome: "Nathalie Marques",
      papel: "Workshop · Comunicação",
      foto: "/facilitadores/nathalie.png",
      bioCurta:
        "Psicóloga clínica, especialista em Psicologia Clínica e da Saúde, e fundadora do Centro Impacto – Psicologia e Desenvolvimento Infantojuvenil.",
      bioLonga: [
        "Nathalie Marques é psicóloga clínica desde 2011, formada pelo ISPA e especialista em Psicologia Clínica e da Saúde pela Ordem dos Psicólogos Portugueses desde 2019.",
        "É fundadora do Centro Impacto – Psicologia e Desenvolvimento Infantojuvenil, onde acompanha crianças e jovens em articulação próxima com famílias e escolas, promovendo o seu desenvolvimento e bem-estar psicológico.",
        "Para além da prática clínica, dinamiza workshops, ateliês das emoções, formações e palestras. É também mentora de psicólogos, supervisora de estágios e coordenadora de uma equipa multidisciplinar.",
        "Apaixonada por saúde psicológica, literacia emocional, formação e criação de parcerias, procura desenvolver projetos que aproximem a psicologia das crianças, jovens, famílias e profissionais.",
      ],
      organizacao: { nome: "Centro Impacto", logo: "/logos/centro-impacto.png" },
    },
    {
      slug: "ines-sottomayor",
      nome: "Inês Sottomayor",
      papel: "Workshop · Organização",
      foto: "/facilitadores/ines.png",
      bioCurta:
        "Arquitecta de Sonhos. Especialista no desenvolvimento de competências emocionais e comportamentais de crianças, jovens, famílias e educadores, criadora do Método DREAM®.",
      bioLonga: [
        "Especialista no desenvolvimento de competências emocionais e comportamentais de crianças, jovens, famílias e educadores, particularmente no impacto das competências humanas e das emoções no bem-estar subjetivo e social. Com base no seu método próprio — o Método DREAM®, que integra ciência, prática e transformação real — trabalha diariamente para construir ambientes mais saudáveis, conscientes e equilibrados no contexto familiar e educativo.",
        "Com uma formação multidisciplinar que inclui pós-graduação em Psicologia Positiva, Coaching Infantojuvenil, Neurociência Aplicada, a realizar um doutoramento em Psicologia das Emoções e do Bem-estar, certificada na metodologia LEGO® SERIOUS PLAY® e PointsofYou®. É também autora do livro Aprender a Ser e tem contribuições em co-autoria noutros livros, criadora de ferramentas práticas de Psicologia Positiva como o baralho Dreams Come True, utilizadas por centenas de famílias e profissionais em Portugal.",
        "Atualmente CEO da empresa Inês Sottomayor Arquiteta de Sonhos e fundadora do espaço Dreamers em Carcavelos.",
        "Após anos a projetar espaços físicos enquanto arquiteta, encontrou no desenvolvimento humano a verdadeira paixão: ajudar pessoas a desenhar sonhos com propósito, estrutura e emoção. É esse olhar estruturado e sensível que orienta o seu trabalho — onde cada projeto se transforma num passo concreto para uma vida mais equilibrada e realizada.",
      ],
      organizacao: { nome: "Inês Sottomayor · Arquiteta de Sonhos", logo: "/logos/ines-sottomayor.png" },
    },
    {
      slug: "virgilio-varela",
      nome: "Virgílio Varela",
      papel: "Workshop · Liderança",
      foto: "/facilitadores/virgilio.png",
      bioCurta:
        "Fundador e consultor principal da HumanFleet. Diretor Executivo de Desenvolvimento do CEM Portugal e Fellow da Earth One Global Alliance.",
      bioLonga: [
        "Virgílio Varela é fundador e consultor principal da HumanFleet, consultora de estratégia e facilitação que desde 2014 acompanha organizações, comunidades e territórios em processos de transformação. É Diretor Executivo de Desenvolvimento do CEM Portugal – Centro Europeu de Música, no Palácio Nacional de Mafra, e Fellow da Earth One Global Alliance.",
        "Formado em Educação, Língua e Etnicidades pelo King's College London, trabalha entre Portugal, EUA, Reino Unido, Brasil, Cabo Verde, São Tomé e Príncipe e Moçambique. Desenhou e facilitou a primeira Assembleia de Cidadãos pelo Clima de Lisboa, programas de liderança na BA Glass, NOS e Bosch, a Academia do Futuro do Trabalho (ONU/Governo de Cabo Verde) e processos para a Comissão Europeia.",
        "Com a Taproot Earth, conduz trabalho de escuta e governação coletiva junto de comunidades quilombolas e indígenas no Brasil. Atualmente facilita o Laboratório da Imaginação no CAM–Gulbenkian.",
      ],
      organizacao: { nome: "HumanFleet", logo: "/logos/humanfleet.png" },
    },
    {
      slug: "cristina-figueira",
      nome: "Cristina Figueira",
      papel: "Integração & encerramento",
      foto: "/facilitadores/cristina.png",
      bioCurta:
        "Colabora na Associação MenTalks na criação e facilitação de projetos que promovem relações humanas mais igualitárias.",
      bioLonga: [
        "Cristina Figueira colabora na Associação MenTalks na criação e facilitação de projetos que promovem relações humanas mais igualitárias, através do desenvolvimento de competências socioemocionais, da promoção da igualdade de género, da prevenção da violência e do respeito pela diversidade.",
        "Em paralelo, desenvolve iniciativas na área da parentalidade, em escolas e junto de famílias.",
        "Acredita que transformar relações humanas é uma das formas mais poderosas de transformar o mundo.",
      ],
      organizacao: { nome: "Associação Men Talks", logo: "/logos/mentalks.png" },
    },
    {
      slug: "angela-almeida",
      nome: "Ângela Almeida",
      papel: "Integração & encerramento",
      foto: "/facilitadores/angela.png",
      bioCurta:
        "Fundadora do Colo di Mamá e técnica social, com formação em Animação Sociocultural e Gestão de Recursos Humanos.",
      bioLonga: [
        "Ângela Almeida é fundadora do Colo di Mamá e técnica social, com formação em Animação Sociocultural e Gestão de Recursos Humanos.",
        "A sua experiência profissional e o trabalho direto com famílias, jovens e comunidades cruzam-se com a missão do Colo: criar espaços de reflexão, diálogo e consciência sobre a educação e as relações que construímos.",
      ],
      organizacao: { nome: "Colo di Mamá", logo: "/logos/colodimama.png" },
    },
  ] satisfies Facilitador[],
};

// Congelado: shape antigo do PROGRAMA, usado só pelas propostas arquivadas em
// app/_archive (abraco, cuidado v1, sorriso). Não atualizar — são histórico.
export const LEGACY_PROGRAMA = {
  eyebrow: "O dia",
  title: "Um dia para parar e regressar ao essencial.",
  blocos: [
    { time: "10h00", title: "Chegada e aterragem", desc: "Consciência e presença." },
    { time: "Manhã", title: "Comunicação e relações", desc: "Escuta, ligação e parentalidade." },
    { time: "Tarde", title: "Organização e energia", desc: "Limites, exaustão e equilíbrio." },
    { time: "Fim do dia", title: "Liderança e integração", desc: "Impacto pessoal e coletivo." },
  ],
  close: "Encerramento em círculo. Silêncio. Integração.",
  note: "* Alinhamento ainda em construção — programa indicativo.",
};

export const PARCEIROS = {
  eyebrow: "Parceiros",
  title: "Quem torna este dia possível.",
  logos: [
    // logos dos facilitadores (exceto as 3 organizações anfitriãs, que
    // fecham a secção em destaque próprio — ver hosts), por ordem de
    // apresentação no programa do dia, seguidas das restantes parcerias/apoios
    { nome: "UNO Yoga & Breathwork", logo: "/logos/uno-yoga-breathwork.png" },
    { nome: "Centro Impacto", logo: "/logos/centro-impacto.png" },
    { nome: "Inês Sottomayor · Arquiteta de Sonhos", logo: "/logos/ines-sottomayor.png" },
    { nome: "HumanFleet", logo: "/logos/humanfleet.png" },
    { nome: "Villoo", logo: "/logos/villoo.png" },
    { nome: "Academia Bernardo da Costa", logo: "/logos/academia-bc.png" },
    { nome: "Fundação Maria Droste", logo: "/logos/fundacao-maria-droste.svg" },
    { nome: "Cristóvão Cunha", logo: "/logos/cristovao-cunha.png" },
  ],
  hosts: [
    { nome: "Educar com Amor e Consciência", logo: "/logos/ga.png" },
    { nome: "Colo di Mamá", logo: "/logos/colodimama.png" },
    { nome: "Associação Men Talks", logo: "/logos/mentalks.png" },
  ],
};

export const QUEM = {
  eyebrow: "Para quem",
  title: "Para quem sente que precisa de parar.",
  intro: "Este encontro é para ti se és:",
  items: [
    "pai ou mãe",
    "educador(a) ou professor(a)",
    "psicólogo(a) ou profissional da área social",
    "cuidador(a)",
    "estudante",
    "ou alguém que sente que vive em excesso",
  ],
};

export const FINAL = {
  titleA: "Não precisas de fazer mais.",
  titleB: "Precisas de parar.",
  lead: "Este pode ser um dia para voltar a ti. Para respirar com mais presença. Para pensar com mais clareza. Para viver com mais intenção.",
  micro: "Lugares limitados · inscrição com pagamento",
};
