import { CommonModule, NgFor } from '@angular/common';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http'; // Importez aussi provideHttpClient ici
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Correct
import { BrowserModule } from '@angular/platform-browser'; // Correct
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Correct
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Correct
import { AddEmployeeComponent } from './add-employee/add-employee.component'; // Correct
import { AppRoutingModule } from './app-routing.module'; // Correct
import { AppComponent } from './app.component'; // Correct
import { EmployeeComponent } from './employee-list/employee-list.component'; // Correct
import { HomeComponent } from './home/home.component'; // Correct
import { ShowDetailsComponent } from './show-details/show-details.component'; // Correct
import { UpdateEmployeeComponent } from './update-employee/update-employee.component'; // Correct

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    ShowDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule, // Assurez-vous que HttpClientModule est bien ici
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgFor,
    CommonModule,
  ],
  providers: [
    provideHttpClient(withFetch()), // Ajoutez ceci pour activer fetch API
  ],
  schemas: [NO_ERRORS_SCHEMA],

  bootstrap: [AppComponent],
  exports: [
    EmployeeComponent, // Si vous souhaitez exporter ce composant
  ],
})
export class AppModule {}
