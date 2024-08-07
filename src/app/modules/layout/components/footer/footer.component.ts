import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'footer-sgmea',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: true,
})
export class FooterComponent implements OnInit {

  public year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void { }
}
