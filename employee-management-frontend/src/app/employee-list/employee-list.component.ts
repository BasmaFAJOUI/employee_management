import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service'; // Assurez-vous d'importer Employee ici

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = []; // Liste des employés
  EnteredID: string = ''; // ID de recherche
  errorMessage: string = ''; // Message d'erreur

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees(); // Charger les employés au démarrage
  }

  // Récupérer tous les employés
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data; // Met à jour la liste des employés
        this.errorMessage = ''; // Réinitialiser les messages d'erreur
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des employés', error);
        this.errorMessage = 'Erreur lors de la récupération des employés.';
      }
    );
  }

  // Rechercher un employé par ID
  goToEmployee(): void {
    if (!this.EnteredID) {
      this.errorMessage = 'Veuillez entrer un ID.';
      return;
    }

    this.employeeService.getEmployeeById(this.EnteredID).subscribe(
      (data: Employee) => {
        this.employees = [data]; // Afficher uniquement l'employé trouvé
        this.errorMessage = ''; // Réinitialiser les messages d'erreur
      },
      (error: any) => {
        console.error("Erreur lors de la recherche de l'employé par ID", error);
        this.errorMessage = 'Employé non trouvé.';
        this.employees = []; // Effacer la liste actuelle si l'ID est introuvable
      }
    );
  }

  // Mettre à jour un employé
  updateEmployee(id: string): void {
    console.log("Mettre à jour l'employé avec ID:", id);
  }

  // Supprimer un employé
  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        console.log('Employé supprimé avec succès');
        this.getEmployees(); // Recharger la liste après suppression
      },
      (error: any) => {
        console.error("Erreur lors de la suppression de l'employé", error);
        this.errorMessage = "Erreur lors de la suppression de l'employé.";
      }
    );
  }

  // Voir les détails d'un employé
  detailsOfEmployee(id: string): void {
    console.log("Voir les détails de l'employé ID:", id);
  }
}
