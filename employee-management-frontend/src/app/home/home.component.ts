import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [NgbCarouselModule, RouterModule], // Ajoutez RouterModule ici
})
export class HomeComponent {
  constructor(private router: Router) {}
  goToEmployeeList() {
    this.router.navigate(['/show-all-employees']);
  }
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/2000/600`);
}
