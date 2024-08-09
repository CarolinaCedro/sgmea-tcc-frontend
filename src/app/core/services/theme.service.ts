import {Inject, Injectable, signal} from '@angular/core';
import {Theme} from '../models/theme.model';
import {effect} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme = signal<Theme>({mode: 'light', color: 'blue'});

  constructor() {
    this.loadTheme();
    effect(() => {
      this.setTheme();
    });
  }

  private loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme) {
      try {
        this.theme.set(JSON.parse(theme));
      } catch (err) {
      }
    }
  }

  private setTheme() {
    localStorage.setItem('theme', JSON.stringify(this.theme()));
    this.setThemeClass();
  }

  public get isDark(): boolean {
    return this.theme().mode == 'dark';
  }

  private setThemeClass() {
    document.querySelector('html')!.className = this.theme().mode;
    document.querySelector('html')!.setAttribute('data-theme', this.theme().color);
  }
}
