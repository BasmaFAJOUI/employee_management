package controllers

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"employee-management-backend/mocks" // chemin vers le package généré par gomock

	"github.com/gin-gonic/gin"
	"github.com/golang/mock/gomock"
)

func TestGetEmployees(t *testing.T) {
    // Créer un nouveau contrôleur gomock
    ctrl := gomock.NewController(t)
    defer ctrl.Finish()  // Appeler Finish() pour valider les attentes

    // Créer le mock du service MongoDB
    mockMongoService := mocks.NewMockMongoService(ctrl)

    // Définir l'attente pour la méthode Find
    mockMongoService.EXPECT().
        Find(gomock.Any(), "employees", gomock.Any()).
        Return([]interface{}{
            map[string]interface{}{"name": "John Doe", "position": "Developer"},
            map[string]interface{}{"name": "Jane Smith", "position": "Manager"},
        }, nil).
        Times(1)

    // Configurer Gin avec le service mocké
    router := gin.Default()
    router.GET("/employees", func(c *gin.Context) {
        GetEmployees(c, mockMongoService) // Passer le service mocké dans la fonction
    })

    // Créer une requête GET pour /employees
    req, err := http.NewRequest("GET", "/employees", nil)
    if err != nil {
        t.Fatal(err)
    }

    // Enregistrer la réponse
    w := httptest.NewRecorder()
    router.ServeHTTP(w, req)

    // Vérifier le code de statut de la réponse
    if w.Code != http.StatusOK {
        t.Errorf("Expected status code 200, got %d", w.Code)
    }

    // Vérifier que la réponse contient les noms des employés
    expectedResponse := `[{"name":"John Doe","position":"Developer"},{"name":"Jane Smith","position":"Manager"}]`
    if w.Body.String() != expectedResponse {
        t.Errorf("Expected response body to contain employees, got %s", w.Body.String())
    }

    // La méthode Find a bien été appelée grâce à ctrl.Finish()
}
