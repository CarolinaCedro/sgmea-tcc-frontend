import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {MenuService} from '../../services/menu.service';
import {RouterLink} from '@angular/router';
import {SidebarMenuComponent} from './sidebar-menu/sidebar-menu.component';
import {NgClass, NgIf} from '@angular/common';
import {AuthService} from "../../../../core/auth/service/auth/auth.service";
import {User} from "../../../../model/user";
import {LocalStorageService} from "../../../utis/localstorage/local-storage.service";


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, SidebarMenuComponent, RouterLink],
})
export class SidebarComponent implements OnInit {

  currentUser: User


  constructor(public menuService: MenuService, public authService: AuthService) {

  }

  ngOnInit(): void {

    this.authService.userCurrent.subscribe(res => {
      console.log("response", res)
      this.currentUser = res
    })


  }


  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }
}
