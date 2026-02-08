import graph_home from '@/assets/images/graph_home.png';
import graph_map from '@/assets/images/graph_map.png';
import graph_sample from '@/assets/images/graph_sample.png';
import homeRecTechImg from '@/assets/images/home_rec_tech.png';
import iot_app from '@/assets/images/iot_app.png';
import iot_app_sample from '@/assets/images/iot_app_sample.png';
import recTechImg from '@/assets/images/rec_tech.png';

import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 2,
    name: 'Edurk - API REST Educacional',
    description: 'API desenvolvida inspirada na plataforma Libreflix, focada em organização de playlists de estudo, acompanhamento de progresso e fórum de interação para alunos.',
    tech_stack: ['Spring Boot', 'Java', 'REST API'],
    links: [
      {
        type: 'github',
        url: 'https://github.com/migueldsbatista/video_rest_api'
      }
    ],
    is_featured: false
  },
  {
    id: 3,
    name: 'Rec e Tec - Gestão Inteligente de Resíduos',
    description: 'Plataforma de logística urbana desenvolvida em parceria com a Brencorp para otimização da coleta de resíduos no Recife. Inclui roteirização inteligente para coletores, agendamento de manutenção para moradores e dashboards analíticos de impacto ambiental e satisfação para administradores.',
    tech_stack: ['Django', 'PostgreSQL', 'Bootstrap', 'Cypress', 'Python'],
    images: [recTechImg, homeRecTechImg],
    year: 2025,
    links: [
      {
        type: 'github',
        url: 'https://github.com/MigueldsBatista/Rec-Tech'
      },
      {
        type: 'other',
        name: 'Google Sites',
        icon: 'heroicons:link',
        url: 'https://sites.google.com/cesar.school/rectech/home'
      }
    ],
    is_featured: true
  },
  {
    id: 4,
    name: 'Automação para Exportação e Habilitações',
    description: 'Sistema de rastreamento de processos administrativos e exportação de produtos, integrando extração de dados governamentais com SharePoint e Power BI.',
    tech_stack: ['Python', 'Selenium', 'BeautifulSoup', 'Pandas', 'SharePoint', 'Power BI'],
    links: [
      {
        type: 'github',
        url: 'https://github.com/migueldsbatista/exportAutomation'
      }
    ],
    is_featured: true
  },
  {
    id: 5,
    name: 'IoT REST API Monitoring',
    description: 'Backend para gerenciamento de servidores IoT, com coleta de telemetria (temperatura, umidade, tensão), autenticação JWT e simulador de dispositivos integrado.',
    tech_stack: ['FastAPI', 'Python', 'PostgreSQL', 'Docker', 'Docker Compose', 'Pytest', 'JWT'],
    images: [iot_app, iot_app_sample],
    links: [
      {
        type: 'github',
        url: 'https://github.com/MigueldsBatista/exame-backend-dtlabs-2025'
      }
    ],
    is_featured: true
  },
  {
    id: 6,
    name: 'Análise e Visualização de Grafos: Malha Urbana e Aérea',
    description: 'Biblioteca Python para análise de grafos aplicada à conectividade entre bairros do Recife e malha aérea dos EUA. Inclui implementações manuais de algoritmos (Dijkstra, Bellman-Ford, BFS/DFS), integração com QGIS para extração de dados reais e dashboards interativos.',
    tech_stack: ['Python', 'Flask', 'Pandas', 'QGIS', 'OpenStreetMap', 'Plotly', 'Pytest'],
    images: [graph_home, graph_map, graph_sample],
    links: [
      {
        type: 'github',
        url: 'https://github.com/MigueldsBatista/Graph-Analysis-and-Visualization'
      }
    ],
    is_featured: true
  }

];
