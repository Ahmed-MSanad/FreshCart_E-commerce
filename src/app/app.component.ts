import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBlankComponent } from "./components/nav-blank/nav-blank.component";
import { FooterComponent } from "./components/footer/footer.component";
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBlankComponent, FooterComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerce';
}
