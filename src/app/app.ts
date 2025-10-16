import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Footer } from "./footer/components/footer/footer";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('fpl-updates');
}
