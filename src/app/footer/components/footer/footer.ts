import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { ionLogoGithub, ionLogoInstagram, ionLogoDiscord } from '@ng-icons/ionicons';

@Component({
  selector: 'app-footer',
  imports: [NgIcon],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  viewProviders: [provideIcons({ ionLogoGithub, ionLogoInstagram, ionLogoDiscord })]
})
export class Footer {
  protected navigateToInsta() {
    window.open('https://www.instagram.com/pezthebeergeek/', '_blank', 'noopener,noreferrer');
  }
  protected navigateToGithub() {
    window.open('https://github.com/daveperry84/fpl-updates', '_blank', 'noopener,noreferrer');
  }
  protected navigateToDiscord() {
    window.open('https://discord.gg/kHRrBH5US', '_blank', 'noopener,noreferrer');
  }
}
