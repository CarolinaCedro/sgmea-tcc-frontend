import {MenuItem} from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Serviços',
      separator: false,
      items: [
        {
          icon: 'fa-solid fa-chart-pie',
          label: 'Dashboard',
          route: '/home/dashboard',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_FUNCIONARIO','ROLE_TECNICO'],
        },
        {
          icon: 'fa-solid fa-user-large',
          label: 'Funcionário',
          route: '/home/funcionario',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_FUNCIONARIO'],
        },
        {
          icon: 'fa-solid fa-screwdriver-wrench',
          label: 'Técnico',
          route: '/home/tecnico',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_TECNICO'],
        },
        {
          icon: 'fa-solid fa-user-tie',
          label: 'Gestores',
          route: '/home/gestor',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR'],

        },
        {
          icon: 'fa-solid fa-clipboard',
          label: 'Chamados',
          route: '/home/chamados',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_FUNCIONARIO', 'ROLE_TECNICO'],
        },
        {
          icon: 'fa-solid fa-tachograph-digital',
          label: 'Equipamentos',
          route: '/home/equipamentos',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR'],
        },
        {
          icon: 'fa-solid fa-building-user',
          label: 'Departamentos',
          route: '/home/departamentos',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR'],
        },
        {
          icon: 'fa-solid fa-clipboard-check',
          label: 'Priorização chamado',
          route: '/home/priorizao-chamado',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR'],
        },
        {
          icon: 'fa-solid fa-circle-check',
          label: 'Consolidação chamado',
          route: '/home/consolidacao-chamado',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_TECNICO'],
        },
        {
          icon: 'fa-solid fa-clone',
          label: 'Histórico',
          route: '/home/historico',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_FUNCIONARIO','ROLE_TECNICO'],
        },
        {
          icon: 'fa-solid fa-note-sticky',
          label: 'Relatório',
          route: '/home/relatorio',
          roles: ['ROLE_ADMIN', 'ROLE_GESTOR', 'ROLE_FUNCIONARIO','ROLE_TECNICO'],
        },

      ],
    }
  ];
}
