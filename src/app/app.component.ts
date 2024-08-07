import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {SignInComponent} from "./modules/auth/pages/sign-in/sign-in.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SignInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {


  ngOnInit(): void {
  }

}
