// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

export const routes: Routes = [
  { path: 'show-all-employees', component: EmployeeComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Assurez-vous que la route par défaut redirige vers /home
  { path: 'updating-by-id/:id', component: UpdateEmployeeComponent },
  { path: 'details-of-employee/:id', component: ShowDetailsComponent },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
