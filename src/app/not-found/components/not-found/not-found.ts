import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Panel } from '../../../panel/components/panel/panel';

@Component({
  selector: 'app-not-found',
  imports: [RouterModule, Panel],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFound {}
