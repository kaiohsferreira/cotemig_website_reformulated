import { asset } from '~/lib/asset'
import type { Course, Feature, InstitutionSlug } from './types'

/* ---------------------------------------------------------------------------
   Constantes compartilhadas
   ------------------------------------------------------------------------ */

/**
 * "Por que a Faculdade COTEMIG e para voce" — os mesmos cinco motivos aparecem
 * nas tres paginas de graduacao do site atual. Declarados uma vez so.
 */
const FACULTY_HIGHLIGHTS: Feature[] = [
  {
    icon: 'lightbulb',
    title: 'Estímulo total à criatividade e à inovação',
    description:
      'Você vai explorar ao máximo sua criatividade e suas habilidades, em um ambiente propício para desenvolver suas ideias mais incríveis.',
  },
  {
    icon: 'beaker',
    title: 'Aulas práticas, contextualizadas e atuais',
    description:
      'Nada de ficar só na teoria. A gente curte aprender fazendo, e o aprendizado é presencial aqui na Faculdade COTEMIG.',
  },
  {
    icon: 'building',
    title: 'Aprendizagem com a melhor infraestrutura',
    description:
      'Tenha acesso às tecnologias mais avançadas, aplicando o conhecimento em laboratórios de última geração, com um computador para cada aluno.',
  },
  {
    icon: 'users',
    title: 'Mentores que conhecem os segredos do mundo da TI',
    description:
      'Nossos professores têm experiência sólida no mercado de trabalho e estão prontos para te orientar na jornada acadêmica e profissional.',
  },
  {
    icon: 'link',
    title: 'Parcerias com as principais big techs globais',
    description:
      'Parcerias educacionais para uso gratuito de plataformas importantes do mercado de TI, como Google, Microsoft, Oracle, Cisco e AWS.',
  },
]

/**
 * O primeiro ano e comum aos tres cursos de graduacao. O texto aparece igual
 * nas tres paginas, entao entra no fim de cada `description`.
 */
const SHARED_FIRST_YEAR =
  'Como os cursos de graduação da Faculdade COTEMIG são da área de Tecnologia e Computação, o primeiro ano é o Módulo Básico, comum aos três cursos. Se você ainda não sabe qual escolher, pode se matricular na opção que achar a sua cara e decidir depois de cursar o módulo básico.'

/* ---------------------------------------------------------------------------
   Cursos
   ------------------------------------------------------------------------ */

export const courses: Course[] = [
  {
    slug: 'ensino-medio-+-tecnico',
    institution: 'colegio-cotemig',
    name: 'Ensino Médio + Técnico',
    degree: 'Ensino Médio integrado ao Técnico em Informática',
    summary:
      'Três anos que reúnem o Ensino Médio regular e o Técnico em Informática: você sai com dois diplomas e experiência de laboratório.',
    heroImage: asset('/img/course/desktopimagefull-1665520490797.webp'),
    cardImage: asset('/img/course/mobileimagefull-1665520490808.webp'),
    curriculumPdf: null,
    facts: [
      { icon: 'pin', label: 'Onde cursar', value: 'Colégios COTEMIG — Barroca e Floresta' },
      { icon: 'clock', label: 'Duração', value: '3 anos' },
      { icon: 'calendar', label: 'Turnos', value: 'Manhã ou tarde' },
      { icon: 'graduation', label: 'Quem pode cursar', value: 'Concluintes do Ensino Fundamental' },
    ],
    description: [
      'Um Ensino Médio diferente. O Ensino Médio Técnico do COTEMIG reúne, em três anos de curso, os conhecimentos do Ensino Médio regular e as competências da educação profissional.',
      'Aqui o(a) estudante é preparado(a) para ser destaque na tecnologia, adquirindo habilidades para ter sucesso, transformar o mundo e ser feliz. O COTEMIG abre portas para o mercado tech, que é o que mais cresce no mundo.',
      'Você terá muitas oportunidades de estágio remunerado desde o início do curso, aprendendo na prática e ganhando o próprio dinheiro. Além disso, desenvolvemos nos estudantes uma cultura empreendedora: você é incentivado a transformar suas ideias inovadoras em um negócio de sucesso.',
    ],
    careers: [],
    highlights: [
      {
        icon: 'graduation',
        title: 'O itinerário formativo é uma formação técnica',
        description:
          'No COTEMIG você termina o Ensino Médio e tem mais um diploma: o de Técnico em Informática.',
      },
      {
        icon: 'beaker',
        title: '75% de aulas práticas em laboratório de ponta',
        description:
          'As disciplinas técnicas são ministradas 75% dentro dos laboratórios, com apenas um estudante por máquina.',
      },
      {
        icon: 'briefcase',
        title: 'Oportunidades para ingressar no mundo do trabalho',
        description:
          'Você já começa a sua experiência no mercado tech podendo fazer estágio remunerado em várias empresas.',
      },
      {
        icon: 'users',
        title: 'Professores conectados com o mercado de trabalho',
        description:
          'Você tem acesso a conteúdos atualizados e práticos, alinhados com as demandas reais do mundo tech.',
      },
      {
        icon: 'monitor',
        title: 'Linguagens e tecnologias conectadas ao mercado',
        description:
          'Você vai aprender a programar em C#, ASP.NET, PHP, HTML, CSS, JavaScript, MySQL, Android nativo (Java) e iOS nativo (Swift).',
      },
      {
        icon: 'calendar',
        title: 'Atividades extracurriculares',
        description:
          'São diversos projetos especiais, como Clube do Filósofo, Educação Financeira, Clube de Leitura e Projeto de Vida, para você ter uma formação completa.',
      },
    ],
    curriculumGroups: [
      {
        title: 'Conteúdos da Formação Geral Básica',
        items: [
          'Matemática',
          'Português',
          'Redação',
          'Artes',
          'Inglês',
          'Química',
          'Física',
          'Biologia',
          'História',
          'Geografia',
          'Atualidades',
          'Educação Física',
          'Filosofia',
          'Sociologia',
          'Projeto de Vida',
        ],
      },
      {
        title: 'Conteúdos da Formação Profissional — Técnico em Informática',
        items: [
          'Informática',
          'Robótica',
          'Montagem e Configuração de Computadores',
          'Lógica e Programação',
          'Banco de Dados',
          'Desenvolvimento Front-end',
          'Desenvolvimento Back-end',
          'Desenvolvimento Mobile Android e iOS',
          'Ambientes Computacionais',
          'Redes e Arquitetura de Computadores',
          'Programação Orientada a Objetos',
          'Framework',
          'Projeto de Software',
          'Empreendedorismo e Inovação',
        ],
      },
    ],
    callToAction: {
      title: 'Conheça mais!',
      description:
        'Quer garantir um futuro brilhante na área da tecnologia? Venha para o Colégio COTEMIG e entenda como inovamos a educação.',
      label: 'Quero estudar no COTEMIG',
      href: '#matricula',
    },
  },

  {
    slug: 'escola-de-referencia-google',
    institution: 'colegio-cotemig',
    name: 'Escola de Referência Google',
    degree: 'Certificação Google for Education',
    summary:
      'O COTEMIG é a 1ª escola técnica do Sudeste certificada como Escola de Referência Google for Education.',
    heroImage: asset('/img/units/cotemig-floresta-sala-tech.webp'),
    cardImage: asset('/img/course/mobileimagefull-1589915820527.webp'),
    curriculumPdf: null,
    // A pagina atual nao traz os quatro cartoes de topo (nao e um curso com
    // matricula propria). Os fatos aqui resumem o que a certificacao significa.
    facts: [
      { icon: 'pin', label: 'Onde vivenciar', value: 'Colégios COTEMIG — Barroca e Floresta' },
      { icon: 'calendar', label: 'Certificados desde', value: '2020' },
      { icon: 'check', label: 'Selo', value: 'Google Reference School' },
      { icon: 'graduation', label: 'Quem participa', value: 'Estudantes e professores do Colégio' },
    ],
    description: [
      'Imagine um colégio apaixonado por tecnologia, com a missão de formar profissionais competentes e cidadãos conscientes. Um colégio com parceria de grandes empresas que procuram entre seus alunos profissionais inovadores e criativos.',
      'Pense em um colégio que sabe que a tecnologia é fundamental, mas que o ser humano é insubstituível, e que tem seu trabalho reconhecido pelo Google, constando na lista mundial de Escolas de Referência. Essa escola existe, tem nome e mais de meio século de inovação: muito prazer, somos o COTEMIG.',
      'Certificados desde 2020 como Escola de Referência Google, fazemos parte do diretório mundial de escolas certificadas — um grupo seleto de instituições que promovem novas experiências dentro e fora da sala de aula, através das ferramentas e da cultura de inovação Google.',
      'As ferramentas Google for Education chegaram ao COTEMIG há alguns anos. A suíte reúne edição de texto, planilhas, slides e desenhos, ferramentas de gerenciamento como bloco de notas, agenda e lista de tarefas, e comunicação por e-mail, chat e chamadas de vídeo e áudio. Tudo disponível para estudantes e colaboradores.',
      'Só alcança o certificado de Escola de Referência Google quem extrapola o simples uso das ferramentas disponíveis e incorpora a cultura Google aos seus processos de ensino e aprendizagem.',
    ],
    careers: [],
    highlights: [
      {
        icon: 'award',
        title: 'A 1ª escola técnica do Sudeste com o selo',
        description:
          'O COTEMIG integra o diretório mundial de instituições certificadas pelo Google como referência em inovação e aprendizagem.',
      },
      {
        icon: 'users',
        title: 'Professores certificados pelo Google',
        description:
          'Parte da equipe já recebeu os selos de Educador Google Certificado e de Treinador Google Certificado, e segue em atualização constante.',
      },
      {
        icon: 'monitor',
        title: 'Google Workspace for Education no dia a dia',
        description:
          'A suíte completa de aplicativos do Google está à disposição de estudantes e colaboradores, dentro e fora da sala de aula.',
      },
      {
        icon: 'rocket',
        title: 'Cultura de inovação',
        description:
          'Metodologias ativas e sala de aula invertida fazem parte da rotina — o mesmo espírito de inovação que o COTEMIG pratica desde 1971.',
      },
    ],
    curriculumGroups: [],
    callToAction: {
      title: 'Faça parte você também',
      description:
        'O COTEMIG entrou para a lista mundial de Escolas de Referência Google for Education. Venha viver essa cultura de inovação com a gente.',
      label: 'Quero estudar no COTEMIG',
      href: '#matricula',
    },
  },

  {
    slug: 'sistemas-de-informacao',
    institution: 'faculdade-cotemig',
    name: 'Sistemas de Informação',
    degree: 'Bacharelado',
    summary:
      'Bacharelado para quem quer combinar pessoas, processos e tecnologia e transformar ideias em sistemas que funcionam de verdade.',
    heroImage: asset('/img/course/desktopimagefull-1666644183915.webp'),
    cardImage: asset('/img/course/mobileimagefull-1621252847969.webp'),
    curriculumPdf: asset(
      '/static/course/matrizcurricular-sistemas-de-informacao-1783538500220.pdf',
    ),
    facts: [
      { icon: 'pin', label: 'Onde cursar', value: 'Faculdade COTEMIG — Barroca' },
      { icon: 'clock', label: 'Duração', value: '4 anos' },
      { icon: 'calendar', label: 'Horário das aulas', value: '19h às 22h40' },
      { icon: 'graduation', label: 'Quem pode cursar', value: 'Concluintes do Ensino Médio' },
    ],
    description: [
      'O curso superior de Sistemas de Informação da Faculdade COTEMIG é focado em quem busca transformar o mundo com tecnologia e criatividade. Durante o curso, você aprenderá a combinar recursos humanos e computacionais, fazendo dos mais variados sistemas ferramentas na realização de ideias transformadoras.',
      'Sua criatividade será forte aliada na aplicação das tecnologias já existentes e dará um gás naquelas que ainda serão desenvolvidas por você.',
      SHARED_FIRST_YEAR,
    ],
    careers: [
      'Desenvolvedor de Software',
      'Analista de Sistemas',
      'Gestor de Projetos de TI',
      'Administrador de Banco de Dados',
      'Especialista em Segurança da Informação',
      'Consultor de TI',
      'Empreendedor e fundador de startup',
      'Especialista em Inteligência Artificial e Machine Learning',
    ],
    highlights: FACULTY_HIGHLIGHTS,
    curriculumGroups: [],
    callToAction: {
      title: 'Futuro em suas mãos!',
      description:
        'Quer um diploma que, além de documento acadêmico, é seu passaporte para viver de habilidades tecnológicas? Seu futuro em Sistemas de Informação começa na Faculdade COTEMIG.',
      label: 'Partiu Faculdade COTEMIG!',
      href: '#matricula',
    },
  },

  {
    slug: 'analise-e-desenvolvimento-de-sistemas',
    institution: 'faculdade-cotemig',
    name: 'Análise e Desenvolvimento de Sistemas',
    degree: 'Tecnólogo',
    summary:
      'Tecnólogo de dois anos e meio para quem quer entrar rápido no mercado desenvolvendo, testando e gerenciando sistemas.',
    heroImage: asset('/img/course/desktopimagefull-1666281205435.webp'),
    cardImage: asset('/img/course/mobileimagefull-1621253008037.webp'),
    curriculumPdf: asset(
      '/static/course/matrizcurricular-analise-e-desenvolvimento-de-sistemas-1783538970712.pdf',
    ),
    facts: [
      { icon: 'pin', label: 'Onde cursar', value: 'Faculdade COTEMIG — Barroca' },
      { icon: 'clock', label: 'Duração', value: '2 anos e meio' },
      { icon: 'calendar', label: 'Horário das aulas', value: '19h às 22h40' },
      { icon: 'graduation', label: 'Quem pode cursar', value: 'Concluintes do Ensino Médio' },
    ],
    description: [
      'O curso superior de Tecnologia em Análise e Desenvolvimento de Sistemas da Faculdade COTEMIG é direcionado à área da Tecnologia da Informação e destinado a quem quer ingressar rapidamente no mercado de trabalho.',
      'Durante o curso, você aprenderá a identificar, elaborar e executar testes, itens essenciais para garantir a qualidade de um sistema, além de implementar soluções aplicando processos e metodologias de desenvolvimento de software. Você também estará apto a instalar, monitorar e administrar bancos de dados, projetar e gerenciar sistemas.',
      SHARED_FIRST_YEAR,
    ],
    careers: [
      'Desenvolvedor de Software',
      'Analista de Sistemas',
      'Gerente de Projetos de TI',
      'Administrador de Banco de Dados (DBA)',
      'Especialista em Segurança da Informação',
      'Consultor de TI',
    ],
    highlights: FACULTY_HIGHLIGHTS,
    curriculumGroups: [],
    callToAction: {
      title: 'Futuro em suas mãos!',
      description:
        'Quer um diploma que, além de documento acadêmico, é seu passaporte para viver de habilidades tecnológicas? Seu futuro em Análise e Desenvolvimento de Sistemas começa na Faculdade COTEMIG.',
      label: 'Partiu Faculdade COTEMIG!',
      href: '#matricula',
    },
  },

  {
    slug: 'ciencia-da-computacao',
    institution: 'faculdade-cotemig',
    name: 'Ciência da Computação',
    degree: 'Bacharelado',
    summary:
      'Bacharelado com base científica sólida para quem quer criar tecnologia, da engenharia de software à inteligência artificial.',
    heroImage: asset('/img/course/desktopimagefull-1666644155410.webp'),
    cardImage: asset('/img/course/mobileimagefull-1621252940368.webp'),
    curriculumPdf: asset('/static/course/matrizcurricular-ciencia-da-computacao-1783538489434.pdf'),
    facts: [
      { icon: 'pin', label: 'Onde cursar', value: 'Faculdade COTEMIG — Barroca' },
      { icon: 'clock', label: 'Duração', value: '4 anos' },
      { icon: 'calendar', label: 'Horário das aulas', value: '19h às 22h40' },
      { icon: 'graduation', label: 'Quem pode cursar', value: 'Concluintes do Ensino Médio' },
    ],
    description: [
      'O curso de Ciência da Computação da Faculdade COTEMIG forma o profissional com conhecimentos científicos que permitem o domínio do estado atual do desenvolvimento da área da computação, apto a acompanhar e participar da evolução tecnológica.',
      'Para exercer essas atividades, o(a) estudante recebe uma formação humanística consistente, concretizada por meio de projetos curriculares e de estágios, de forma a possibilitar a compreensão crítica e construtiva do mundo e da sociedade da qual faz parte.',
      SHARED_FIRST_YEAR,
    ],
    careers: [
      'Pesquisador da Ciência da Computação',
      'Engenheiro de Software',
      'Cientista de Dados',
      'Engenheiro de Segurança Cibernética',
      'Arquiteto de Software',
      'Analista de Dados',
      'Especialista em Inteligência Artificial',
      'Consultor de TI',
    ],
    highlights: FACULTY_HIGHLIGHTS,
    curriculumGroups: [],
    callToAction: {
      title: 'Futuro em suas mãos!',
      description:
        'Quer um diploma que, além de documento acadêmico, é seu passaporte para viver de habilidades tecnológicas? Seu futuro em Ciência da Computação começa na Faculdade COTEMIG.',
      label: 'Partiu Faculdade COTEMIG!',
      href: '#matricula',
    },
  },
]

/* ---------------------------------------------------------------------------
   Acessos
   ------------------------------------------------------------------------ */

/** Cursos de uma instituicao, na ordem em que aparecem no menu. */
export function coursesByInstitution(slug: InstitutionSlug): Course[] {
  return courses.filter((course) => course.institution === slug)
}

/**
 * Curso pelo par instituicao + slug.
 *
 * Recebe `string` porque os valores vem dos parametros da rota, que nao sao
 * validados pelo react-router. Retorna `undefined` quando o par nao existe —
 * a pagina cuida do 404.
 */
export function findCourse(institutionSlug: string, courseSlug: string): Course | undefined {
  return courses.find(
    (course) => course.institution === institutionSlug && course.slug === courseSlug,
  )
}
