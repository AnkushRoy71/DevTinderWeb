import { Component, signal } from '@angular/core';
import { Header } from "./core/shared/components/header/header";
import { RouterOutlet } from '@angular/router';

@Component({
  imports: [ Header, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('DevTinderWeb');
}
