import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MainmenuComponent } from './mainmenu/mainmenu.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MainmenuComponent,MatPaginatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'projekt208g';
}
