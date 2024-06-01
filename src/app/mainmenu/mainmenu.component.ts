import {Component} from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mainmenu',
  standalone: true,
  imports: [CommonModule,MatButtonModule, MatMenuModule,RouterLink, RouterLinkActive],
  templateUrl: './mainmenu.component.html',
  styleUrl: './mainmenu.component.scss'
})
export class MainmenuComponent {

}
