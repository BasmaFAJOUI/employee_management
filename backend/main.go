package main

import (
	"employee-management-backend/config"
	"employee-management-backend/routes"
	"employee-management-backend/services"
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	// Charge la configuration
	config.LoadConfig()

	// Connecte à la base de données MongoDB
	services.ConnectDB()  // Nous n'avons plus besoin de récupérer un client ici.

	// Crée un nouveau routeur Gin
	router := gin.Default()

	// Enregistre les routes
	routes.RegisterRoutes(router)

	// Démarre le serveur sur le port 8080
	if err := router.Run(":8080"); err != nil {
		fmt.Printf("Error starting server: %v\n", err)
	}
}
