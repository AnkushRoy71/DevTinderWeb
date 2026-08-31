import { Component, signal } from '@angular/core';
import { ButtonDirective } from 'primeng/button';
import { Header } from "./core/shared/components/header/header";

@Component({
  imports: [ButtonDirective, Header],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('DevTinderWeb');
}
