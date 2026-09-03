import type { AboutContent } from './types'

/* ---------------------------------------------------------------------------
   Conteudo institucional da pagina /quem-somos
   ------------------------------------------------------------------------
   Historia, diferenciais e principios sao transcritos do material oficial do
   Grupo COTEMIG. Os marcos da linha do tempo foram extraidos dos anos citados
   nos proprios paragrafos da historia — nenhum dado foi inventado.            */

export const about: AboutContent = {
  tagline: 'Referência no ensino de tecnologia em Minas Gerais desde 1971',

  intro: [
    'O Grupo COTEMIG é referência no ensino de tecnologia da informação e informática, com método de ensino focado nas demandas do mercado e a melhor estrutura tecnológica de Minas Gerais.',
    'São mais de 55 anos de caminhada preparando estudantes para o mercado de trabalho e para a vida, em espaços modernos e adequados ao ensino-aprendizagem.',
  ],

  /* ---------------------------------------------------------------------
     Historia — paragrafos na ordem em que aparecem no conteudo oficial.
     ------------------------------------------------------------------ */
  history: [
    'Fundado em 1971, no bairro Barroca, o Colégio COTEMIG já nasceu apaixonado por tecnologia: o primeiro curso ofertado foi o de Técnico em Eletrônica, em uma época em que esse assunto era o suprassumo da inovação.',
    'Já nos seus primeiros anos, a qualidade no ensino do COTEMIG foi reconhecida pelo mercado. A FIAT Automóveis S/A firmou uma parceria com o colégio para qualificar a primeira equipe de técnicos em eletrônica de sua fábrica, em Betim, em 1975. Com a expansão do grupo, em 1986, foi inaugurada a Unidade Floresta, também com a oferta do curso de Processamento de Dados.',
    'Os anos passaram e continuamos alimentando a paixão pela inovação tecnológica e pelas ideias que movem o mundo. Em 1999, foi criada a Faculdade COTEMIG, oferecendo o primeiro curso de graduação em Sistemas de Informação autorizado pelo MEC em Minas Gerais. O sucesso do pioneirismo nos inspirou a ampliar nossa oferta de cursos com atuação no ensino da tecnologia.',
    'A história de sucesso e de conquistas ao longo dos anos resulta no que é, hoje, o Grupo COTEMIG. Com mais de 55 anos de caminhada, somos uma empresa empenhada em preparar os estudantes para o mercado de trabalho, por meio da oferta de ensino de qualidade e em espaços modernos e adequados ao ensino-aprendizagem, e para a vida.',
  ],

  /* ---------------------------------------------------------------------
     Marcos da linha do tempo — um por ano citado na historia.
     ------------------------------------------------------------------ */
  milestones: [
    {
      year: '1971',
      title: 'Fundação no bairro Barroca',
      description:
        'O Colégio COTEMIG nasce em Belo Horizonte com o curso de Técnico em Eletrônica, então o suprassumo da inovação.',
    },
    {
      year: '1975',
      title: 'Parceria com a FIAT',
      description:
        'A FIAT Automóveis S/A firma parceria com o colégio para qualificar a primeira equipe de técnicos em eletrônica da sua fábrica em Betim. O reconhecimento do mercado chega ainda nos primeiros anos.',
    },
    {
      year: '1986',
      title: 'Inauguração da Unidade Floresta',
      description:
        'A expansão do grupo leva à abertura da segunda unidade de ensino, que passa a ofertar também o curso de Processamento de Dados.',
    },
    {
      year: '1999',
      title: 'Criação da Faculdade COTEMIG',
      description:
        'Nasce a Faculdade COTEMIG com o primeiro curso de graduação em Sistemas de Informação autorizado pelo MEC em Minas Gerais. O pioneirismo inspira a ampliação da oferta de cursos de tecnologia.',
    },
  ],

  /* ---------------------------------------------------------------------
     Nossa diferenca — paragrafos na ordem do conteudo oficial.
     ------------------------------------------------------------------ */
  difference: [
    'Somos uma escola de tecnologia, que não tenta “prever” o futuro das inovações, mas que o inventa. Quando comparado a outras escolas técnicas e faculdades, o COTEMIG se destaca pela sua qualidade do ensino, o seu corpo docente e, também, pelo reconhecimento do mercado de trabalho quanto à capacidade de nossos estudantes.',
    'Diversas empresas buscam nossos estudantes para estágios e empregos, desde o início do curso. A realização do estágio supervisionado obrigatório facilita a inserção do aluno no mercado.',
    'A paixão do COTEMIG por tecnologia nos diferencia também na infraestrutura. Temos laboratórios equipados com computadores de alta performance, cursos atualizados e grande quantidade de aulas práticas.',
    'Tudo isso que você vê, hoje, no COTEMIG, é resultado de um trabalho dedicado, responsável e de alta qualidade. Há mais de meio século, temos o objetivo de formar profissionais competentes e cidadãos conscientes — que sejam tão apaixonados por tecnologia quanto nós somos.',
  ],

  /* ---------------------------------------------------------------------
     Principios — missao, visao e valores.
     ------------------------------------------------------------------ */
  principles: [
    {
      title: 'Missão',
      body: [
        'Formar profissionais competentes e cidadãos conscientes, que sejam tão apaixonados por tecnologia quanto nós somos.',
        'Educação tecnológica: práticas pedagógicas aplicadas às necessidades do mercado, proporcionando aos alunos experiências dos saberes humanos e tecnológicos, integrando teoria e prática.',
      ],
    },
    {
      title: 'Visão',
      body: [
        'Ser reconhecido como referência em educação tecnológica, com constância na superação de desafios e obstáculos.',
        'Dedicar esforços à construção contínua dessa imagem de referência no ensino da tecnologia, com cursos atualizados, laboratórios de alta performance e conexão permanente com o mercado de trabalho.',
      ],
    },
    {
      title: 'Valores',
      body: [
        'Atitude inovadora: estímulo ao pensamento criativo, assumindo riscos para fazer melhor e diferente.',
        'Persistência: constância na superação de desafios e obstáculos, para ser reconhecido como referência em educação tecnológica.',
        'Melhoria contínua: busca constante na evolução dos processos, com atenção às tendências educacionais e tecnológicas.',
        'Foco no resultado: desenvolvimento de pessoas e otimização de recursos e processos para uma entrega de qualidade.',
        'Excelência no atendimento aos alunos e suas famílias: cuidado e eficiência nas relações, promovendo ambiente de acolhimento, cordialidade e agilidade.',
        'Valorização das relações profissionais: prática da lealdade, respeito, confiança e transparência no relacionamento com professores, funcionários administrativos, acionistas e empresas parceiras.',
        'Responsabilidade social: comprometimento com a comunidade, atuando como membro consciente da sociedade.',
        'Valorização da imagem e reputação institucional: dedicação de esforços para a construção contínua da imagem de referência no ensino da tecnologia.',
      ],
    },
  ],

  /* ---------------------------------------------------------------------
     Numeros que o proprio conteudo sustenta.

     "4 cursos" conta o que tem matricula: Ensino Medio + Tecnico no Colegio
     e os tres cursos de graduacao da Faculdade (ver `courses.ts`). A Escola de
     Referencia Google e uma certificacao, nao um curso, e por isso fica fora
     da conta. "3 unidades" inclui o Escritorio Central (ver `units.ts`).
     ------------------------------------------------------------------ */
  stats: [
    { value: '55+', label: 'anos de história' },
    { value: '1971', label: 'ano de fundação' },
    { value: '3', label: 'unidades em Belo Horizonte' },
    { value: '4', label: 'cursos, do técnico à graduação' },
  ],
}
