import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';
import {ClickOutsideDirective} from '../../../../../shared/directives/click-outside.directive';
import {ThemeService} from '../../../../../core/services/theme.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AuthService} from "../../../../../core/auth/service/auth/auth.service";

@Component({
  selector: 'profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [ClickOutsideDirective, NgClass, RouterLink],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class ProfileMenuComponent implements OnInit {
  public isOpen = false;
  public profileMenu = [
    {
      title: 'Perfil',
      icon: './assets/icons/heroicons/outline/user-circle.svg',
      link: '/home/profile',
    },
    {
      title: 'Configurações',
      icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
      link: '/settings',
    },
    {
      title: 'Sair',
      icon: './assets/icons/heroicons/outline/logout.svg',
      link: '/auth/sign-in',
    },
  ];

  public themeColors = [
    {
      name: 'base',
      code: '#3b82f6',
    },
    {
      name: 'yellow',
      code: '#f59e0b',
    },
    {
      name: 'green',
      code: '#22c55e',
    },
    {
      name: 'blue',
      code: '#3b82f6',
    },
    {
      name: 'orange',
      code: '#ea580c',
    },
    {
      name: 'red',
      code: '#cc0022',
    },
    {
      name: 'violet',
      code: '#6d28d9',
    },
  ];

  public themeMode = ['light', 'dark'];

  constructor(public themeService: ThemeService, private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  // toggleThemeMode() {
  //   this.themeService.theme.update((theme) => {
  //     const mode = !this.themeService.isDark ? 'dark' : 'light';
  //     return { ...theme, mode: mode };
  //   });
  // }

  toggleThemeColor(color: string) {
    this.themeService.theme.update((theme) => {
      return {...theme, color: color};
    });
  }

  logout() {
    this.auth.logout()
  }
}
