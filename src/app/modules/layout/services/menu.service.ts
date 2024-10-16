import {Injectable, OnDestroy, signal} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {MenuItem, SubMenuItem} from "../../../core/models/menu.model";
import {Menu} from "../../../core/navigation/menu";
import {AuthService} from "../../../core/auth/service/auth/auth.service";


@Injectable({
  providedIn: 'root',
})
export class MenuService implements OnDestroy {
  private _showSidebar = signal(true);
  private _showMobileMenu = signal(false);
  private _pagesMenu = signal<MenuItem[]>([]);
  private _subscription = new Subscription();
  private userRoles: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // Assinando as mudanças nas roles do usuário
    const rolesSubscription = this.authService.userRoles$.subscribe((roles) => {
      console.log("Atualizando roles:", roles);
      // Atualiza o menu baseado nas roles do usuário
      this._pagesMenu.set(this.filterMenuByRoles(Menu.pages, roles));
    });
    this._subscription.add(rolesSubscription);

    // Acompanhando as mudanças na rota para expandir/contrair menus
    const routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._pagesMenu().forEach((menu) => {
          let activeGroup = false;
          menu.items.forEach((subMenu) => {
            const active = this.isActive(subMenu.route);
            subMenu.expanded = active;
            subMenu.active = active;
            if (active) activeGroup = true;
            if (subMenu.children) {
              this.expand(subMenu.children);
            }
          });
          menu.active = activeGroup;
        });
      }
    });
    this._subscription.add(routeSubscription);
  }

  get showSideBar() {
    return this._showSidebar();
  }

  get showMobileMenu() {
    return this._showMobileMenu();
  }

  get pagesMenu() {
    return this._pagesMenu();
  }

  set showSideBar(value: boolean) {
    this._showSidebar.set(value);
  }

  set showMobileMenu(value: boolean) {
    this._showMobileMenu.set(value);
  }

  public toggleSidebar() {
    this._showSidebar.set(!this._showSidebar());
  }

  public toggleMenu(menu: any) {
    this.showSideBar = true;
    menu.expanded = !menu.expanded;
  }

  public toggleSubMenu(submenu: SubMenuItem) {
    submenu.expanded = !submenu.expanded;
  }

  private expand(items: Array<any>) {
    items.forEach((item) => {
      item.expanded = this.isActive(item.route);
      if (item.children) this.expand(item.children);
    });
  }

  private isActive(instruction: any): boolean {
    return this.router.isActive(this.router.createUrlTree([instruction]), {
      paths: 'subset',
      queryParams: 'subset',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }


  // Função para verificar acesso com base nas roles do usuário
  private hasAccess(roles: string[], userRoles: string[]): boolean {
    if (!roles) return true;  // Se não há roles, o acesso é permitido a todos
    return roles.some(role => userRoles.includes(role));
  }

  // Filtra os itens de menu com base nas roles
  private filterMenuByRoles(menuItems: MenuItem[], userRoles: string[]): MenuItem[] {
    return menuItems.map(menuItem => ({
      ...menuItem,
      items: menuItem.items.filter(subMenu => this.hasAccess(subMenu.roles, userRoles)) // Filtra os submenus
    }));
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
