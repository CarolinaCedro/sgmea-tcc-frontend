import {Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'sgmea-container-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './sgmea-container-list.component.html',
  styleUrl: './sgmea-container-list.component.scss'
})
export class SgmeaContainerListComponent {

  @Input() dontShowMatMenu: boolean = true
  @Input() icon?: string = ""
  @Input() img?: string = ""
  @Input() address: any[] | string | null | undefined;


}
