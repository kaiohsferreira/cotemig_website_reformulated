import { asset } from '~/lib/asset'
import { externalLinks } from './site'
import type { Unit } from './types'

/**
 * Unidades do grupo COTEMIG.
 *
 * Conteudo transposto das paginas /unidades/* do site atual. Enderecos,
 * telefone, horarios, linhas de onibus, rotas de van e galeria de estrutura
 * sao os dados publicados la — nada foi inventado.
 */

/** Telefone unico da central de atendimento, valido para as tres unidades. */
const PHONE = '(31) 3213-8666'

/** Monta o link de busca do Google Maps a partir das partes do endereco. */
function toMapUrl(address: string, district: string, city: string, cep: string): string {
  const query = `${address} - ${district}, ${city} - MG, ${cep}`
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export const units: Unit[] = [
  {
    slug: 'colegio-barroca-faculdade-cotemig',
    name: 'Colégio Barroca / Faculdade COTEMIG',
    kind: 'ensino',
    summary:
      'Unidade que reúne o Colégio e a Faculdade COTEMIG na Barroca, com laboratórios de redes, robótica, Android e Mac, auditório e espaços de coworking.',
    address: 'Rua Santa Cruz, 546',
    district: 'Barroca',
    city: 'Belo Horizonte',
    cep: '30431-228',
    phone: PHONE,
    hours: [
      {
        label: 'Atendimento Faculdade',
        value: 'Segunda a quinta-feira, das 9h às 22h. Sexta-feira, das 9h às 17h.',
      },
      {
        label: 'Atendimento Colégio',
        value: 'Segunda a sexta-feira, das 7h30 às 19h. Sábados, das 9h às 13h.',
      },
    ],
    busLines: [
      '2101',
      '2150',
      '8205',
      'S21',
      '32',
      '33',
      '1145',
      '5250',
      '1404',
      '1502',
      '1505',
      '1509',
      '1510',
      '8203',
      '9201',
      '9204',
      '9205',
    ],
    vanRoutes: [
      {
        label: 'Rota das vans — Colégio',
        value: 'Ver percurso e pontos de embarque (PDF)',
        href: asset('/assets/pdf/vans_barroca_colegio.pdf'),
      },
      {
        label: 'Rota das vans — Faculdade',
        value: 'Ver percurso e pontos de embarque (PDF)',
        href: asset('/assets/pdf/vans_barroca_faculdade.pdf'),
      },
    ],
    tourUrl: externalLinks.virtualTourBarroca,
    coverImage: asset('/img/units/barroca-unidades.webp'),
    gallery: [
      {
        src: asset('/img/units/cotemig-barroca-coworking-c-860.webp'),
        alt: 'Unidade Barroca — espaço de coworking, terceira vista',
      },
      {
        src: asset('/img/units/cotemig-barroca-coworking-b-860.webp'),
        alt: 'Unidade Barroca — espaço de coworking, segunda vista',
      },
      {
        src: asset('/img/units/cotemig-barroca-coworking-a-860.webp'),
        alt: 'Unidade Barroca — espaço de coworking',
      },
      {
        src: asset('/img/units/cotemig-barroca-laboratorio-redes-860.webp'),
        alt: 'Unidade Barroca — laboratório de redes',
      },
      {
        src: asset('/img/units/cotemig-barroca-pilotis-860.webp'),
        alt: 'Unidade Barroca — pilotis de convivência',
      },
      {
        src: asset('/img/units/cotemig-barroca-laboratorio-android-b-860.webp'),
        alt: 'Unidade Barroca — laboratório de Android, segunda vista',
      },
      {
        src: asset('/img/units/cotemig-barroca-laboratorio-robotica-860.webp'),
        alt: 'Unidade Barroca — laboratório de robótica',
      },
      {
        src: asset('/img/units/cotemig-barroca-auditorio-860.webp'),
        alt: 'Unidade Barroca — auditório',
      },
      {
        src: asset('/img/units/cotemig-barroca-laboratorio-mac-860.webp'),
        alt: 'Unidade Barroca — laboratório Mac',
      },
      {
        src: asset('/img/units/cotemig-barroca-laboratorio-informatica-3-860.webp'),
        alt: 'Unidade Barroca — laboratório de informática 3',
      },
      {
        src: asset('/img/units/cotemig-barroca-laboratorio-android-a-860.webp'),
        alt: 'Unidade Barroca — laboratório de Android',
      },
      {
        src: asset('/img/units/faculdade_laboratorio_1.webp'),
        alt: 'Unidade Barroca — laboratório de informática 1',
      },
    ],
    mapUrl: toMapUrl('Rua Santa Cruz, 546', 'Barroca', 'Belo Horizonte', '30431-228'),
  },
  {
    slug: 'colegio-floresta',
    name: 'Colégio Floresta',
    kind: 'ensino',
    summary:
      'Unidade do Colégio COTEMIG na Floresta, com laboratórios de informática, sala Tech, containers de convivência e espaço de robótica e MCC.',
    address: 'Rua Itajubá, 223',
    district: 'Floresta',
    city: 'Belo Horizonte',
    cep: '30150-380',
    phone: PHONE,
    hours: [
      {
        label: 'Atendimento Colégio',
        value: 'Segunda a sexta-feira, das 7h30 às 19h. Sábados, das 9h às 13h.',
      },
    ],
    busLines: [
      'SC01A',
      'SC01B',
      'SC03A',
      'SC03B',
      '62',
      '66',
      '901',
      '1502',
      '1509',
      '1510',
      '4501',
      '4600',
      '4615',
      '4620',
      '4625',
      '4802A',
      '5506',
      '5506A',
      '7980',
      '8001A',
      '8102',
      '8103',
      '8106',
      '8107',
      '8108',
      '8150',
      '8205',
      '8405',
      '9103',
      '9104',
      '9105',
      '9106',
      '9205',
      '9209',
      '9210',
      '9211',
      '9214',
      '9402',
      '9405',
      '9410',
      '9414',
      '9502',
      '9803',
    ],
    vanRoutes: [
      {
        label: 'Rota das vans — Colégio',
        value: 'Ver percurso e pontos de embarque (PDF)',
        href: asset('/assets/pdf/vans_floresta_colegio.pdf'),
      },
    ],
    tourUrl: externalLinks.virtualTourFloresta,
    coverImage: asset('/img/units/floresta-unidades.webp'),
    gallery: [
      {
        src: asset('/img/units/cotemig-floresta-laboratorio-informatica-3-860.webp'),
        alt: 'Unidade Floresta — laboratório de informática 3',
      },
      {
        src: asset('/img/units/cotemig-floresta-laboratorio-robotica-860.webp'),
        alt: 'Unidade Floresta — laboratório de robótica e MCC',
      },
      {
        src: asset('/img/units/cotemig-floresta-sala-tech.webp'),
        alt: 'Unidade Floresta — sala Tech',
      },
      {
        src: asset('/img/units/cotemig-floresta-container-2-860.webp'),
        alt: 'Unidade Floresta — container de convivência 2',
      },
      {
        src: asset('/img/units/cotemig-floresta-container-1-860.webp'),
        alt: 'Unidade Floresta — container de convivência 1',
      },
      {
        src: asset('/img/units/cotemig-floresta-laboratorio-informatica-1-860.webp'),
        alt: 'Unidade Floresta — laboratório de informática 1',
      },
      {
        src: asset('/img/units/cotemig-floresta-laboratorio-informatica-2-860.webp'),
        alt: 'Unidade Floresta — laboratório de informática 2',
      },
    ],
    mapUrl: toMapUrl('Rua Itajubá, 223', 'Floresta', 'Belo Horizonte', '30150-380'),
  },
  {
    slug: 'escritorio-central',
    name: 'Escritório Central',
    kind: 'administrativo',
    summary:
      'Central administrativa do grupo, no Grajaú, onde ficam as áreas de apoio ao Colégio e à Faculdade COTEMIG.',
    address: 'Rua Litargírio, 25',
    district: 'Grajaú',
    city: 'Belo Horizonte',
    cep: '30431-232',
    phone: PHONE,
    hours: [
      {
        label: 'Atendimento Faculdade',
        value: 'Segunda a sexta-feira, das 8h às 17h.',
      },
      {
        label: 'Atendimento Colégio',
        value: 'Segunda a sexta-feira, das 8h às 17h.',
      },
    ],
    busLines: [
      '2101',
      '2150',
      '8205',
      'S21',
      '32',
      '33',
      '1145',
      '5250',
      '1404',
      '1502',
      '1505',
      '1509',
      '1510',
      '8203',
      '9201',
      '9204',
      '9205',
    ],
    vanRoutes: [],
    tourUrl: null,
    coverImage: asset('/img/units/escritorio-central.webp'),
    gallery: [
      {
        src: asset('/img/units/unidade-central-escritorio.webp'),
        alt: 'Escritório Central — área administrativa do grupo',
      },
    ],
    mapUrl: toMapUrl('Rua Litargírio, 25', 'Grajaú', 'Belo Horizonte', '30431-232'),
  },
]

export function findUnit(slug: string): Unit | undefined {
  return units.find((unit) => unit.slug === slug)
}

/** So as unidades onde ha aula — o escritorio central fica de fora. */
export const teachingUnits: Unit[] = units.filter((unit) => unit.kind === 'ensino')
