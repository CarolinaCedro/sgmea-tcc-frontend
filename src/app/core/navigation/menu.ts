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
        },
        {
          icon: 'fa-solid fa-user-large',
          label: 'Funcionário',
          route: '/home/funcionario',
        },
        {
          icon: 'fa-solid fa-screwdriver-wrench',
          label: 'Técnico',
          route: '/home/tecnico',
        },
        {
          icon: 'fa-solid fa-user-tie',
          label: 'Gestores',
          route: '/home/gestor',
        },
        {
          icon: 'fa-solid fa-clipboard',
          label: 'Chamados',
          route: '/home/chamados',
        },
        {
          icon: 'fa-solid fa-tachograph-digital',
          label: 'Equipamentos',
          route: '/home/equipamentos',
        },
        {
          icon: 'fa-solid fa-building-user',
          label: 'Departamentos',
          route: '/home/departamentos',
        },
        {
          icon: 'fa-solid fa-clipboard-check',
          label: 'Priorização chamado',
          route: '/home/priorizao-chamado',
        },
        {
          icon: 'fa-solid fa-circle-check',
          label: 'Consolidação chamado',
          route: '/home/consolidacao-chamado',
        },
        {
          icon: 'fa-solid fa-clone',
          label: 'Histórico',
          route: '/home/historico',
        },
        {
          icon: 'fa-solid fa-note-sticky',
          label: 'Relatório',
          route: '/home/relatorio',
        },

      ],
    }
  ];
}
