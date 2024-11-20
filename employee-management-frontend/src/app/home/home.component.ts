import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page', // Le sélecteur doit correspondre à l'élément utilisé dans app.component.html
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  currentSlide = 0;

  moveSlide(direction: number): void {
    const slides = document.querySelector('.slides') as HTMLElement;
    const totalSlides = document.querySelectorAll('.slide').length;

    this.currentSlide += direction;

    if (this.currentSlide < 0) {
      this.currentSlide = totalSlides - 1;
    } else if (this.currentSlide >= totalSlides) {
      this.currentSlide = 0;
    }

    slides.style.transform = `translateX(-${this.currentSlide * 100}%)`;
  }
}
