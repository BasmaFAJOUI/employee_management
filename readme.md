# Employee Management Backend

## Description

Ce projet backend permet de gérer les employés via une API REST, offrant des fonctionnalités CRUD : Création, Lecture, Mise à jour et Suppression. Construit avec **Gin** (framework Go), **MongoDB** pour la gestion de la base de données, et **GoMock** pour les tests unitaires, il assure une gestion efficace et robuste.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Go](https://golang.org/doc/install) (version 1.18 ou supérieure)
- [MongoDB](https://www.mongodb.com/try/download/community) (ou MongoDB Atlas pour une base de données cloud)
- [Git](https://git-scm.com/)

---

## Installation

1. **Clonez le dépôt :**
   ```bash
   git clone https://github.com/BasmaFAJOUI/employee-management.git
   cd backend
   ```
2. **Installez les dépendances Go :**

```bash
go mod tidy
```

3. **Configurez MongoDB :**

-Assurez-vous que MongoDB est en cours d'exécution (local ou sur MongoDB Atlas).
-Mettez à jour les variables de connexion dans le fichier config/database.go pour correspondre à votre configuration MongoDB. 4. **Lancez le serveur :**

```bash
go run main.go
```

Le serveur sera accessible à l'adresse : http://localhost:5000.

## Endpoints API

### GET /employees

- Description : Récupère la liste de tous les employés.
- Exemple de réponse :

```json
[
  {
    "name": "John Doe",
    "position": "Developer"
  },
  {
    "name": "Jane Smith",
    "position": "Manager"
  }
]
```

### POST /employees

- Description : Ajoute un nouvel employé.
- Corps de la requête :

```json
{
  "name": "Alice Johnson",
  "position": "Designer"
}
```

- Exemple de réponse :

```json
{
  "message": "Employee added successfully"
}
```

### GET /employees/:id

- Description : Récupère les détails d'un employé spécifique par son ID.

### PUT /employees/:id

- Description : Met à jour les informations d'un employé par son ID.

### DELETE /employees/:id

- Description : Supprime un employé par son ID.

## Tests Unitaires

Les tests sont réalisés avec GoMock. Pour exécuter les tests :

- Installez GoMock :

```bash
go install github.com/golang/mock/mockgen@latest
```

- Exécutez les tests :

```bash
go test ./...
```

# Employee Management Frontend

## Description

Ce projet frontend est développé avec Angular pour offrir une interface utilisateur permettant de gérer les employés. Il consomme les APIs exposées par le backend pour afficher, ajouter, mettre à jour et supprimer des employés.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les outils suivants :

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [Angular CLI](https://angular.io/cli) (version 14 ou supérieure)

---

## Installation

1. **Clonez le dépôt :**
   ```bash
   git clone https://github.com/BasmaFAJOUI/employee-management.git
   cd employee-management-frontend
   ```

````
2. **Installez les dépendances :**

```bash
npm install
````

3. **Configurez les variables d'environnement :**

Modifiez le fichier environment.ts pour inclure l'URL du backend.

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api/employees", // URL de votre backend
};
```

4. **Lancez le serveur de développement :**

```bash
ng serve
```

L'application sera accessible à l'adresse : http://localhost:4200.

Fonctionnalités planifiées :
Affichage des employés : Liste des employés récupérée depuis le backend.
Ajout d'un employé : Formulaire pour ajouter de nouveaux employés.
Mise à jour d'un employé : Modifier les informations existantes.
Suppression d'un employé : Supprimer un employé avec confirmation.
