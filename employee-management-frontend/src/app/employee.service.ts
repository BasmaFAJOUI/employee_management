import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  position: string;
  department: string;
}

@Injectable({
  providedIn: 'root', // Fournisseur de service global
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/api/employees'; // Remplacez par votre URL

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Récupérer un employé par ID
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  // Créer un nouvel employé
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee);
  }

  // Mettre à jour un employé
  updateEmployee(id: string, employee: Partial<Employee>): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, employee);
  }

  // Supprimer un employé
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
