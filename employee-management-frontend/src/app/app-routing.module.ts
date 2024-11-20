import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeComponent } from './employee-list/employee-list.component';
import { HomeComponent } from './home/home.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'show-all-employees', component: EmployeeComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'updating-by-id/:id', component: UpdateEmployeeComponent },
  { path: 'details-of-employee/:id', component: ShowDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirection par défaut vers /home
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
