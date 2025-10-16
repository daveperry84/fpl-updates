import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { ionLogoGithub, ionLogoInstagram } from '@ng-icons/ionicons';

@Component({
  selector: 'app-footer',
  imports: [NgIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  viewProviders: [provideIcons({ ionLogoGithub, ionLogoInstagram })]
})
export class Footer {
  protected navigateToInsta() {
    window.open('https://www.instagram.com/pezthebeergeek/', '_blank', 'noopener,noreferrer');
  }
  protected navigateToGithub() {
    window.open('https://github.com/daveperry84/fpl-updates', '_blank', 'noopener,noreferrer');
  }
}
