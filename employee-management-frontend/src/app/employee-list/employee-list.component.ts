import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../employee.service'; // Assurez-vous que ces imports sont corrects

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  //styleUrls: ['./employee-list.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = []; // Liste des employés
  EnteredID: string = ''; // Champ de recherche lié à l'input
  errorMessage: string = ''; // Message d'erreur

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data; // Assurez-vous que 'data' est bien un tableau
        console.log(this.employees); // Vérifiez que 'employees' contient bien des données
      },
      error: (err) => {
        console.error('Erreur :', err);
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
