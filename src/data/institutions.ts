import { asset } from '~/lib/asset'
import { externalLinks } from './site'
import type { Institution } from './types'

/**
 * As duas instituicoes de ensino do grupo.
 *
 * No site atual a pagina do Colegio e muito mais rasa que a da Faculdade: a
 * Faculdade tem "por que somos para voce", formas de ingresso e financiamentos,
 * enquanto o Colegio tem so o banner e o formulario. Aqui as duas recebem a
 * mesma estrutura — o conteudo do Colegio foi reunido a partir das paginas dos
 * cursos "Ensino Médio + Técnico" e "Escola de Referência Google", que e onde
 * ele estava escondido. Nada foi inventado: o material e o mesmo, so mudou de
 * lugar. Erros de digitacao do original foram corrigidos na transcricao
 * ("um computadore" -> "um computador", "Java Scrip" -> "JavaScript",
 * "preparao(a)" -> "preparado(a)").
 */
export const institutions: Institution[] = [
  {
    slug: 'colegio-cotemig',
    name: 'Colégio COTEMIG',
    shortName: 'Colégio',
    tagline: 'Aqui, o comum é ser inovador!',
    intro: [
      'O Ensino Médio Técnico do COTEMIG reúne, em três anos de curso, os conhecimentos do Ensino Médio regular e as competências da educação profissional. Aqui o(a) estudante é preparado(a) para ser destaque na tecnologia, adquirindo habilidades para ter sucesso, transformar o mundo e ser feliz.',
      'O COTEMIG abre portas para o mercado tech, que é o que mais cresce no mundo. Somos um colégio apaixonado por tecnologia, com mais de meio século de história e a missão de formar profissionais competentes e cidadãos conscientes.',
      'Certificado desde 2020 como Escola de Referência Google, o COTEMIG foi a primeira escola técnica do Sudeste a conquistar o selo e integra o diretório mundial de instituições que promovem novas experiências dentro e fora da sala de aula.',
    ],
    heroImage: asset('/img/units/cotemig-barroca-laboratorio-robotica-860.webp'),
    cardImage: asset('/img/units/cotemig-floresta-laboratorio-robotica-860.webp'),
    accent: 'brand',
    highlights: [
      {
        icon: 'graduation',
        title: 'Dois diplomas em três anos',
        description:
          'O itinerário formativo é uma formação profissional técnica: você termina o Ensino Médio e sai com mais um diploma, o de Técnico em Informática.',
      },
      {
        icon: 'beaker',
        title: '75% de aulas práticas em laboratório de ponta',
        description:
          'As disciplinas técnicas são ministradas 75% dentro dos laboratórios, com somente um estudante por máquina.',
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
        title: 'Linguagens e tecnologias que o mercado usa',
        description:
          'Você vai aprender a programar em C#, ASP.NET, PHP, HTML, CSS, JavaScript, MySQL, Android nativo (Java) e iOS nativo (Swift).',
      },
      {
        icon: 'calendar',
        title: 'Atividades extracurriculares',
        description:
          'São diversos projetos especiais, como Clube do Filósofo, Educação Financeira, Clube de Leitura e Projeto de Vida, para você ter uma formação completa.',
      },
      {
        icon: 'award',
        title: 'Escola de Referência Google',
        description:
          'O COTEMIG incorporou a cultura Google aos seus processos de ensino, e parte da equipe já recebeu os selos de Educador Google Certificado e de Treinador Google Certificado.',
      },
    ],
    /*
     * O Colegio nao tem vestibular. As "formas de ingresso" aqui sao os
     * criterios e as escolhas reais da matricula, tirados dos cards de detalhe
     * do curso (onde cursar, duracao, turnos, quem pode cursar) e do formulario
     * de contato da pagina.
     */
    admissionRoutes: [
      {
        icon: 'graduation',
        title: 'Concluintes do Ensino Fundamental',
        description:
          'O Ensino Médio + Técnico é para quem concluiu o Ensino Fundamental. São três anos de curso, do 1º ao 3º ano.',
      },
      {
        icon: 'pin',
        title: 'Duas unidades para escolher',
        description:
          'O curso acontece nos Colégios COTEMIG da Barroca e da Floresta, os dois em Belo Horizonte.',
      },
      {
        icon: 'clock',
        title: 'Manhã ou tarde',
        description:
          'As turmas funcionam nos turnos da manhã ou da tarde. Você escolhe o que se encaixa na sua rotina.',
      },
      {
        icon: 'phone',
        title: 'Central de Atendimento',
        description:
          'Fale com a nossa equipe pelo telefone (31) 3213-8666 para tirar dúvidas sobre vagas, turmas e documentação.',
      },
      {
        icon: 'mail',
        title: 'Formulário de contato',
        description:
          'Preencha o formulário com os dados do aluno e do responsável, quando o estudante for menor de 18 anos, e a nossa equipe entra em contato.',
      },
    ],
    /*
     * O site atual nao publica valores nem bolsas do Colegio. O que existe de
     * real sao os convenios que o estudante usa sem custo e o encaminhamento
     * para a Central de Atendimento — e e isso que fica aqui.
     */
    funding: [
      {
        icon: 'check',
        title: 'Ferramentas Google sem custo',
        description:
          'O G Suite for Education, conjunto de aplicativos Google para educação, está disponível para todos os estudantes e colaboradores do COTEMIG: e-mail, documentos, planilhas, slides, agenda e chamadas de vídeo.',
      },
      {
        icon: 'link',
        title: 'Parceria com grandes empresas',
        description:
          'O Colégio mantém parceria com empresas que procuram, entre os nossos estudantes, os profissionais inovadores e criativos de que precisam — é daí que vêm as vagas de estágio remunerado.',
      },
      {
        icon: 'phone',
        title: 'Condições de matrícula',
        description:
          'Valores, formas de pagamento e documentação não são publicados no site: a Central de Atendimento, no (31) 3213-8666, informa as condições da turma que você quer.',
      },
    ],
    callToAction: {
      title: 'Conheça mais!',
      description:
        'Quer garantir um futuro brilhante na área da tecnologia? Venha para o Colégio COTEMIG e entenda como inovamos a educação.',
      label: 'Quero estudar no COTEMIG',
      href: externalLinks.admission,
    },
  },
  {
    slug: 'faculdade-cotemig',
    name: 'Faculdade COTEMIG',
    shortName: 'Faculdade',
    tagline: 'Para você que quer aprender de verdade',
    intro: [
      'Na Faculdade COTEMIG, você encontra ensino de verdade, moderno e transformador, para garantir a evolução que você tanto deseja. Afinal, mais do que apenas tecnologia, a sociedade precisa de soluções criativas, revolucionárias e, acima de tudo, inovadoras.',
      'Isso tudo você aprende e desenvolve aqui, com a gente: são três cursos de graduação da área de Tecnologia e Computação, com aprendizado presencial.',
      'O primeiro ano é o Módulo Básico, comum aos três cursos. Assim, se você ainda não sabe qual deles escolher, pode se matricular no que achar mais a sua cara e, depois de cursar o módulo básico, fazer uma escolha mais certa.',
    ],
    heroImage: asset('/img/units/faculdade_laboratorio_1.webp'),
    cardImage: asset('/img/units/cotemig-barroca-coworking-a-860.webp'),
    accent: 'faculty',
    highlights: [
      {
        icon: 'lightbulb',
        title: 'Estímulo total à criatividade e à inovação do estudante',
        description:
          'Você vai explorar ao máximo sua criatividade e suas habilidades, num ambiente propício para desenvolver as suas ideias mais incríveis.',
      },
      {
        icon: 'beaker',
        title: 'Aulas práticas, contextualizadas e atuais',
        description:
          'Nada de ficar só na teoria dentro da sala de aula. A gente curte aprender fazendo, e o aprendizado é presencial aqui na Faculdade COTEMIG.',
      },
      {
        icon: 'building',
        title: 'Experiência de aprendizagem com a melhor infraestrutura',
        description:
          'Tenha acesso às tecnologias mais avançadas, aplicando o conhecimento em laboratórios de última geração, com um computador para cada aluno.',
      },
      {
        icon: 'users',
        title: 'Mentores que conhecem os segredos do mundo da TI',
        description:
          'Nossos professores têm experiência sólida no mercado de trabalho e estão prontos para te orientar na sua jornada acadêmica e profissional.',
      },
      {
        icon: 'link',
        title: 'Parcerias com as principais big techs globais',
        description:
          'Parcerias educacionais para utilização gratuita de importantes plataformas do mercado de TI, como Google, Microsoft, Oracle, Cisco e AWS.',
      },
    ],
    admissionRoutes: [
      {
        icon: 'check',
        title: 'Nota do ENEM',
        description:
          'Para você que quer praticidade. Usando a nota do ENEM, você ingressa direto, sem estresse e sem prova.',
      },
      {
        icon: 'monitor',
        title: 'Prova on-line',
        description:
          'Para você que quer comodidade. Enviamos um link para a realização da sua prova. Tudo no seu ritmo.',
      },
      {
        icon: 'arrow-right',
        title: 'Transferência',
        description:
          'Para você que cansou de estudar com quem não te ensina: transfira a sua matrícula para a Faculdade COTEMIG.',
      },
      {
        icon: 'graduation',
        title: 'Segunda graduação',
        description:
          'Deseja evoluir ou mudar de carreira? O seu diploma da Faculdade COTEMIG é a chave para essa nova realidade.',
      },
      {
        icon: 'book',
        title: 'Histórico escolar',
        description:
          'Teve um bom aproveitamento no Ensino Médio? Consideramos o seu histórico escolar para o ingresso sem prova.',
      },
      {
        icon: 'award',
        title: 'ProUni',
        description:
          'Semestralmente são disponibilizadas vagas diretamente no site do ProUni — mais uma porta de entrada na COTEMIG.',
      },
    ],
    funding: [
      {
        icon: 'award',
        title: 'ProUni',
        description:
          'Bolsas do Programa Universidade para Todos, com vagas disponibilizadas a cada semestre diretamente no site do ProUni.',
      },
      {
        icon: 'check',
        title: 'Novo Fies',
        description:
          'A Faculdade COTEMIG aceita o Novo Fies, o financiamento estudantil do Governo Federal.',
      },
      {
        icon: 'briefcase',
        title: 'Convênios corporativos',
        description:
          'Empresas conveniadas com o COTEMIG garantem desconto na graduação.',
      },
      {
        icon: 'users',
        title: 'Desconto para ex-alunos',
        description:
          'Quem já estudou no COTEMIG tem desconto para voltar e cursar a graduação com a gente.',
      },
      {
        icon: 'clock',
        title: 'Fundacred',
        description:
          'A parceria Fundacred + COTEMIG é mais uma alternativa de financiamento do seu curso.',
      },
    ],
    callToAction: {
      title: 'Matrículas abertas!',
      description:
        'Garanta já a sua chance de estudar na Faculdade COTEMIG e venha ser fera em tecnologia.',
      label: 'Quero me matricular!',
      href: externalLinks.admission,
    },
  },
]

export function findInstitution(slug: string): Institution | undefined {
  return institutions.find((institution) => institution.slug === slug)
}
