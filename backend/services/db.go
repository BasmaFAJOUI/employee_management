package services

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// DB est la variable globale qui contiendra la connexion à la base de données
var DB *mongo.Database

// ConnectDB initialise une connexion au client MongoDB et à la base de données
func ConnectDB() {
	// Crée un client MongoDB avec l'URI de connexion
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		panic(err)
	}

	// Crée un contexte avec un timeout de 10 secondes
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Connecte le client MongoDB au serveur
	err = client.Connect(ctx)
	if err != nil {
		panic(err)
	}

	// Initialise la connexion à la base de données
	DB = client.Database("employee-management")
}
