import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Serviços',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Técnico',
          route: '/tecnicos',
        },
        {
          icon: 'assets/icons/heroicons/outline/moon.svg',
          label: 'Gerente',
          route: '/auth',
        },
        {
          icon: 'assets/icons/heroicons/outline/refresh.svg',
          label: 'Chamados',
          route: '/auth',
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Relatório',
          route: '/auth',
        },

      ],
    }
  ];
}
