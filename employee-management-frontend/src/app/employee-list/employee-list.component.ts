import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service'; // Assurez-vous que ces imports sont corrects

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = []; // Liste des employés
  EnteredID: string = ''; // Champ de recherche lié à l'input
  errorMessage: string = ''; // Message d'erreur

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees(); // Charger tous les employés au démarrage
  }

  /**
   * Récupérer la liste complète des employés
   */
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data; // Mettre à jour la liste des employés
        this.errorMessage = ''; // Réinitialiser les erreurs
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des employés:', error);
        this.errorMessage = 'Erreur lors de la récupération des employés.';
      },
    });
  }

  /**
   * Rechercher un employé par ID
   * @param id ID de l'employé
   */
  goToEmployee(id: string): void {
    if (!id || id.trim() === '') {
      this.errorMessage = 'Veuillez entrer un ID valide.';
      this.employees = []; // Réinitialiser les résultats
      return;
    }

    this.employeeService.getEmployeeById(id.trim()).subscribe({
      next: (data: Employee) => {
        if (data) {
          this.employees = [data]; // Afficher uniquement l'employé trouvé
          this.errorMessage = ''; // Réinitialiser les erreurs
        } else {
          this.errorMessage = 'Aucun employé trouvé avec cet ID.';
          this.employees = []; // Effacer les résultats
        }
      },
      error: (error: any) => {
        console.error('Erreur lors de la recherche par ID:', error);
        this.errorMessage = 'Erreur lors de la recherche. Veuillez réessayer.';
        this.employees = []; // Effacer les résultats
      },
    });
  }

  /**
   * Mettre à jour un employé
   * @param id ID de l'employé à mettre à jour
   */
  updateEmployee(id: string): void {
    console.log("Mettre à jour l'employé avec ID:", id);
    // Ajouter la logique pour ouvrir un formulaire de mise à jour ou naviguer vers une page spécifique
  }

  /**
   * Supprimer un employé
   * @param id ID de l'employé à supprimer
   */
  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        console.log('Employé supprimé avec succès');
        this.getEmployees(); // Rafraîchir la liste après suppression
      },
      error: (error: any) => {
        console.error("Erreur lors de la suppression de l'employé:", error);
        this.errorMessage = "Erreur lors de la suppression de l'employé.";
      },
    });
  }

  /**
   * Afficher les détails d'un employé
   * @param id ID de l'employé
   */
  detailsOfEmployee(id: string): void {
    console.log("Voir les détails de l'employé ID:", id);
    // Ajouter la logique pour afficher un modal ou rediriger vers une page de détails
  }
}
