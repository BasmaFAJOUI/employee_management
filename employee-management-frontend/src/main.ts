import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { provideHttpClient } from '@angular/common/http'; // Pour standalone API

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Ajoutez ceci pour standalone application
  ],
});
