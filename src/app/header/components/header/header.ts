import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { allGWData } from '../../../../data/gameweeks';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  public showArchive = computed<boolean>(() => {
    return allGWData.length > 1;
  });
}
