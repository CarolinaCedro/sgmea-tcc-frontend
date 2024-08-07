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
          route: '/home/dashboard',
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Técnico',
          route: '/home/tecnicos',
        },
        {
          icon: 'assets/icons/heroicons/outline/moon.svg',
          label: 'Gerente',
          route: '/home/auth',
        },
        {
          icon: 'assets/icons/heroicons/outline/refresh.svg',
          label: 'Chamados',
          route: '/home/auth',
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Relatório',
          route: '/home/auth',
        },

      ],
    }
  ];
}
