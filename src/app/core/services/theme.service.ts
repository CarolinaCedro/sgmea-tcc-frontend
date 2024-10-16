import {Injectable, signal} from '@angular/core';
import {Theme} from '../models/theme.model';
import {effect} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme = signal<Theme>({mode: 'light', color: 'blue'});

  constructor() {
    this.setThemeClass();
    effect(() => {
      this.setThemeClass();
    });
  }

  public get isDark(): boolean {
    return this.theme().mode == 'dark';
  }

  private setThemeClass() {
    document.querySelector('html')!.className = "light";
    document.querySelector('html')!.setAttribute('data-theme', "blue");
  }
}
