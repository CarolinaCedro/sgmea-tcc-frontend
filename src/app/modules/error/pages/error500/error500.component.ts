import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-error500',
  standalone: true,
  imports: [],
  templateUrl: './error500.component.html',
})
export class Error500Component {
  constructor(private router: Router) {}

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
