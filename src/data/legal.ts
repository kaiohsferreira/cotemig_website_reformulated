import type { LegalDocument } from './types'

/**
 * Aviso de Protecao de Dados do Grupo COTEMIG.
 *
 * Transcricao integral do documento juridico publicado em
 * https://cotemig.com.br/aviso-protecao-dados — texto juridico resumido perde
 * validade, entao nenhuma clausula pode ser encurtada ou reescrita aqui.
 *
 * A tabela original da secao "Como tratamos dados?" foi convertida em lista
 * (o contrato LegalBlock nao tem bloco de tabela). Cada item preserva as
 * quatro colunas: atividade, dados comuns, dados sensiveis e finalidade.
 */
export const privacyNotice: LegalDocument = {
  title: 'Aviso de Proteção de Dados',
  // O documento publicado nao informa data de revisao.
  updatedAt: null,
  intro: [
    'Nós agradecemos a você por escolher o Grupo COTEMIG (“COTEMIG”) e por nos confiar o tratamento dos seus dados pessoais.',
    'Queremos que você saiba, de forma clara e direta, a quais informações e dados seus nós temos acesso, o que fazemos com eles e como os mantemos protegidos. Por isso, elaboramos este Aviso de Proteção de Dados. Recomendamos que você o leia com atenção e, caso tenha qualquer dúvida, fique à vontade para entrar em contato conosco — para nós, é sempre um prazer lhe atender! Basta enviar uma mensagem para dpo@cotemig.com.br.',
  ],
  sections: [
    {
      id: 'quem-somos',
      title: 'Quem somos?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Somos o COTEMIG EMPRESARIAL S.A., pessoa jurídica de direito privado, com sede na Rua Itajubá, 223, Floresta, Belo Horizonte, Minas Gerais, inscrita no CNPJ sob o nº 17.229.881/0001-10.',
        },
        {
          type: 'paragraph',
          text: 'Somos referência no ensino de tecnologia da informação e informática, com método de ensino focado nas demandas do mercado e a melhor estrutura tecnológica de Minas Gerais. Não prevemos o futuro da inovação, o inventamos. Entendemos que o avanço tecnológico e a proteção de dados pessoais andam em conjunto e, por isso, seremos claros quando o assunto é tratamento dos dados pessoais.',
        },
      ],
    },
    {
      id: 'definicoes',
      title: 'Definições',
      blocks: [
        {
          type: 'paragraph',
          text: 'Para os fins previstos neste Aviso, serão observados os seguintes conceitos:',
        },
        {
          type: 'list',
          items: [
            'a. ANPD: Autoridade Nacional de Proteção de Dados, órgão da administração pública responsável por zelar, implementar e fiscalizar o cumprimento desta Lei em todo o território nacional;',
            'b. Dado Anonimizado: dado relativo ao titular que não possa ser identificado, considerando a utilização de meios técnicos razoáveis e disponíveis na ocasião de seu tratamento;',
            'c. Dado Pessoal Sensível (“Dado Sensível”): qualquer dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculado a uma pessoa natural;',
            'd. Dado Pessoal (“Dado”): qualquer informação relacionada a pessoa natural identificada ou identificável, ou seja, que tenha o potencial de ser usada, de forma direta ou indireta, isoladamente ou em conjunto, para identificar uma pessoa natural. Exemplo: nome, CPF, RG, e-mail, telefone, endereço, perfil de consumo etc.;',
            'e. Encarregado pela Proteção de Dados Pessoais (Data Protection Officer ou DPO): pessoa indicada pelo Controlador e Operador para atuar como canal de comunicação entre o Controlador, os Titulares dos dados e a Autoridade Nacional de Proteção de Dados. Nosso Encarregado pela Proteção de Dados Pessoais (DPO) pode ser contatado pelo e-mail: dpo@cotemig.com.br;',
            'f. Aviso de Proteção de Dados (“Aviso”): Documento elaborado por nós com a finalidade de dar transparência sobre o tratamento de dados pessoais, bem como destacar os direitos dos titulares e o meio de contato. Também conhecido como “Política de Privacidade”;',
            'g. Titular: pessoa natural (pessoa física) a quem se referem os dados pessoais que são objeto de tratamento. Para os fins deste Aviso, todos aqueles que acessam nossos serviços, sejam eles Usuários e/ou potenciais Usuários dos serviços oferecidos, são Titulares para os devidos fins legais;',
            'h. Tratamento: toda operação realizada com dados pessoais, como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração;',
            'i. Usuário: pessoa física que utiliza nosso site.',
          ],
        },
      ],
    },
    {
      id: 'como-tratamos-dados',
      title: 'Como tratamos dados?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Para que possamos realizar os atendimentos e prestar os serviços, tratamos, dentre outros, as seguintes categorias de dados pessoais, para as finalidades indicadas e com fundamento nas seguintes hipóteses:',
        },
        {
          type: 'list',
          items: [
            'Atividade: Responder ao formulário “Fale Conosco”. Dados pessoais comuns: Nome, número do WhatsApp, e-mail, telefone, assunto da mensagem, mensagem enviada. Dados pessoais sensíveis: Não há. Finalidade: Responder as mensagens que nos foram enviadas.',
            'Atividade: Responder ao formulário de “Faça Parte do COTEMIG”. Dados pessoais comuns: Nome do aluno, nome do responsável, e-mail, telefone, curso, mensagem. Dados pessoais sensíveis: Não há. Finalidade: Entrar em contato com o aluno interessado para apresentar o COTEMIG.',
            'Atividade: Responder ao formulário “Trabalhe Conosco”. Dados pessoais comuns: Nome, e-mail, LinkedIn, área de interesse, currículo Lattes, currículo. Dados pessoais sensíveis: Não há. Finalidade: Formar banco de talentos de profissionais.',
            'Atividade: Responder ao formulário “Cadastro de Vagas de Estágio”. Dados pessoais comuns: Nome, cargo, e-mail, telefone. Dados pessoais sensíveis: Não há. Finalidade: Divulgar vagas de empresas interessadas aos alunos do COTEMIG.',
            'Atividade: Envio de mensagens de promoções e novidades. Dados pessoais comuns: Nome, telefone, e-mail. Dados pessoais sensíveis: Não há. Finalidade: Enviar novidades e promoções do COTEMIG.',
            'Atividade: Monitorar o funcionamento do site. Dados pessoais comuns: Endereço IP, tipo de navegador, páginas acessadas, tempo gasto em cada página e outras informações. Dados pessoais sensíveis: Não há. Finalidade: Entender o uso e funcionamento do site do COTEMIG e aprimorá-lo.',
          ],
        },
        {
          type: 'paragraph',
          text: 'De uma coisa você pode ter certeza: coletamos somente os dados essenciais para podermos entregar o melhor serviço possível. Para maiores informações sobre os dados tratados, inclusive especificidades e finalidades secundárias, não hesite em entrar em contato por meio do endereço dpo@cotemig.com.br.',
        },
      ],
    },
    {
      id: 'uso-de-cookies',
      title: 'Uso de cookies',
      blocks: [
        {
          type: 'paragraph',
          text: 'Usamos cookies em nossos sites. Os cookies nos permitem reconhecer o seu navegador e fornecer-lhe a melhor experiência ao navegar no nosso site. Além disso, os cookies nos ajudam a compreender quais seções do site são mais interessantes para você e quais conteúdos podem ser recomendados para você.',
        },
        {
          type: 'paragraph',
          text: 'Você pode a qualquer momento bloquear os cookies no seu navegador, ou limpar o cache para retirá-los. Fazer isso, no entanto, poderá impactar o funcionamento adequado do nosso site. Os navegadores listados abaixo permitem a configuração de preferências de cookies. Para saber mais, basta clicar nos respectivos links a seguir:',
        },
        {
          type: 'list',
          items: [
            'Apple Safari (computador): https://support.apple.com/pt-br/guide/safari/sfri11471/mac',
            'Apple Safari (mobile): https://support.apple.com/en-us/HT201265',
            'Google Chrome: https://support.google.com/chrome/answer/95647?co=GENIE.Platform%3DDesktop&oco=1&hl=pt-BR',
            'Microsoft Edge: https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd',
            'Microsoft Internet Explorer: https://support.microsoft.com/pt-br/topic/excluir-e-gerenciar-cookies-168dab11-0753-043d-7c16-ede5947fc64d',
            'Mozilla Firefox: https://support.mozilla.org/pt-BR/kb/desative-cookies-terceiros-impedir-rastreamento',
            'Opera: https://help.opera.com/en/latest/web-preferences/',
          ],
        },
        {
          type: 'paragraph',
          text: 'Em alguns dispositivos como iPhone, iPad ou Android, é possível alterar as configurações para controlar se anúncios baseados em interesses online serão exibidos, como mostrado abaixo, mas, fique atento: se você usar mais de um dispositivo, será necessário fazer o procedimento em cada dispositivo separadamente.',
        },
        {
          type: 'list',
          items: [
            'Dispositivos iOS: vá para Configurações > Privacidade > Publicidade da Apple > e desative Anúncios Personalizados.',
            'Dispositivos Android: siga as instruções indicadas aqui.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Aviso — Fique atento: Se você usar mais de um dispositivo, será necessário fazer o procedimento em cada dispositivo separadamente.',
        },
      ],
    },
    {
      id: 'como-compartilhamos-dados',
      title: 'Como compartilhamos dados?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Contamos com a ajuda de fornecedores e terceirizados que podem tratar dados pessoais que coletamos, tais como prestadores de serviços em marketing, análise de dados, pagamentos, envio de e-mails e outros serviços. Sempre buscamos avaliar cuidadosamente nossos parceiros e firmar com eles obrigações contratuais de segurança da informação e proteção de dados pessoais, com o objetivo de minimizar riscos para o titular de dados.',
        },
        {
          type: 'paragraph',
          text: 'Além disso, pode ser necessário o compartilhamento de seus dados pessoais com órgãos reguladores, juízes ou autoridades com competência legal exigir que o COTEMIG compartilhe certos dados pessoais para, por exemplo, uma investigação ou elaboração de perícias. Nesses casos, vamos compartilhar seus dados, exceto se entendermos haver abuso de poder. Vamos sempre defender a sua privacidade e a proteção dos seus dados pessoais.',
        },
      ],
    },
    {
      id: 'quais-sao-seus-direitos-como-titular-de-dados',
      title: 'Quais são seus direitos como titular de dados?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Como titular de dados pessoais, você possui os seguintes direitos:',
        },
        {
          type: 'list',
          items: [
            'Confirmação e Acesso: permite que você possa verificar se o COTEMIG trata dados pessoais seus e, em caso positivo, requisitar uma cópia dos dados pessoais que nós temos sobre você.',
            'Correção: permite que você solicite a correção dos seus dados pessoais incompletos, inexatos ou desatualizados.',
            'Anonimização, bloqueio ou eliminação: permite que você nos peça para: (a) anonimizar seus dados, de forma a que eles não possam mais ser relacionados a você e, portanto, deixem de ser dados pessoais; (b) bloquear seus dados, suspendendo temporariamente a sua possibilidade de tratarmos; e (c) eliminar seus dados, caso em que apagaremos todos os seus dados sem possibilidade de reversão, salvo os casos previstos em lei.',
            'Informação sobre a possibilidade de não consentir: permite que você tenha informações claras e completas sobre a possibilidade e as consequências de não fornecer consentimento.',
            'Revogação do consentimento: você tem o direito de retirar o seu consentimento em relação às atividades de tratamento que se baseiam nessa base legal. No entanto, isso não afetará a legalidade de qualquer tratamento realizado anteriormente.',
            'Oposição: a lei autoriza o tratamento de dados pessoais mesmo sem o seu consentimento ou um contrato conosco. Nesse caso, é preciso demonstrar que há motivos legítimos para tratar seus dados, como, por exemplo, prevenir fraudes ou melhorar nossa comunicação com você. Caso você não concorde com esse tratamento, poderá se opor a ele, solicitando a interrupção.',
          ],
        },
      ],
    },
    {
      id: 'como-protegemos-os-dados',
      title: 'Como protegemos os dados?',
      blocks: [
        {
          type: 'paragraph',
          text: 'Todos os dados pessoais que você fornecer serão tratados com total confidencialidade e segurança, de acordo com as normas legais aplicáveis. Garantimos que as informações obtidas serão consideradas sigilosas e somente serão acessadas por pessoas autorizadas pelo COTEMIG e capacitadas para lhes conferir o tratamento adequado.',
        },
        {
          type: 'paragraph',
          text: 'Não manteremos seus dados pessoais por mais tempo do que o necessário para as finalidades declaradas acima, nem utilizaremos seus dados para outros fins, exceto nas hipóteses previstas neste Aviso e/ou nas hipóteses autorizadas por lei.',
        },
      ],
    },
    {
      id: 'encarregado-pelo-tratamento-de-dados-pessoais',
      title: 'Encarregado pelo tratamento de dados pessoais',
      blocks: [
        {
          type: 'paragraph',
          text: 'Se você acredita que seus dados pessoais foram usados de maneira incompatível com este Aviso ou se você tiver dúvidas, comentários ou sugestões relacionadas ao tratamento de seus dados pessoais, entre em contato com nosso encarregado pela proteção dos Dados Pessoais (Data Protection Officer — DPO) por meio do endereço dpo@cotemig.com.br.',
        },
      ],
    },
    {
      id: 'outras-informacoes',
      title: 'Outras informações',
      blocks: [
        {
          type: 'paragraph',
          text: 'Este site tem por objetivo oferecer informações sobre o COTEMIG, apresentando informações sobre suas unidades de ensino, seus colaboradores, divulgação de eventos internos e divulgação de notícias relevantes relacionadas à instituição. Por fim este site oferece ainda uma área de acesso restrito voltada especificamente para a troca de informações entre os diversos membros da comunidade acadêmica. Todo o conteúdo publicamente disponível neste site é puramente informativo.',
        },
        {
          type: 'paragraph',
          text: 'Serão empenhados os melhores esforços para que todas as informações disponíveis neste site sejam tão precisas, atualizadas e completas quanto possível. Contudo, essas características não podem ser garantidas, sendo que os Usuários sempre serão os únicos responsáveis por quaisquer ações ou decisões tomadas com base nas informações divulgadas neste site. As informações contidas neste site poderão ser atualizadas ou modificadas a qualquer momento. Consequentemente, elas não devem ser interpretadas como definitivas e estão sempre associadas ao momento no tempo no qual foram divulgadas.',
        },
        {
          type: 'paragraph',
          text: 'Caso o Usuário pretenda citar qualquer conteúdo deste site, deverá mencionar, além do endereço eletrônico, a data específica em que a informação foi acessada, bem como observar os direitos dos autores previstos na Lei 9.610/98 (Lei de Direitos Autorais). As opiniões expressas em artigos, entrevistas ou outros conteúdos assinados refletem a visão do respectivo autor que não é necessariamente coincidente com a do COTEMIG.',
        },
      ],
    },
    {
      id: 'legislacao-aplicavel-alteracoes-e-foro-de-eleicao',
      title: 'Legislação aplicável, alterações e foro de eleição',
      blocks: [
        {
          type: 'paragraph',
          text: 'Este documento foi elaborado com base na Lei Federal nº 12.965/2014 — Marco Civil da Internet e na Lei Federal nº 13.709/2018 — Lei Geral de Proteção de Dados “LGPD”. Nós podemos modificar, alterar, acrescentar ou remover partes deste documento a qualquer momento para refletir nosso esforço contínuo de melhorar processos e aprimorar a nossa operação. Desta forma, recomendamos a visita periódica a esta página para que você tenha conhecimento sobre as últimas modificações realizadas.',
        },
        {
          type: 'paragraph',
          text: 'Fica eleito o foro de Belo Horizonte/MG para dirimir quaisquer litígios decorrentes deste Aviso, com renúncia a qualquer outro foro, por mais privilegiado que seja.',
        },
        {
          type: 'paragraph',
          text: 'Equipe COTEMIG',
        },
      ],
    },
  ],
}
