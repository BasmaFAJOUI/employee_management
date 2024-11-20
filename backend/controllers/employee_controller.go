package controllers

import (
	"context"
	"employee-management-backend/models"
	"employee-management-backend/services"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetEmployees(c *gin.Context) {
	var employees []models.Employee
	cursor, err := services.DB.Collection("employees").Find(context.TODO(), bson.M{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cursor.Close(context.TODO())
	for cursor.Next(context.TODO()) {
		var employee models.Employee
		cursor.Decode(&employee)
		employees = append(employees, employee)
	}
	c.JSON(http.StatusOK, employees)
}

// CreateEmployee crée un nouvel employé
func CreateEmployee(c *gin.Context) {
	var newEmployee models.Employee

	if err := c.ShouldBindJSON(&newEmployee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Génération de l'ObjectId
	newEmployee.ID = primitive.NewObjectID().Hex()

	collection := services.DB.Collection("employees")
	_, err := collection.InsertOne(c, newEmployee)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create employee"})
		return
	}

	c.JSON(http.StatusOK, newEmployee)
}

// UpdateEmployee met à jour un employé dans la base de données
func UpdateEmployee(c *gin.Context) {
	id := c.Param("id") // Récupère l'ID de l'employé depuis l'URL

	var updatedEmployee struct {
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Email     string `json:"email"`
		Phone     string `json:"phone"`
		Position  string `json:"position"`
		Department string `json:"department"`
	}
	
	// Bind les données JSON envoyées avec la requête
	if err := c.ShouldBindJSON(&updatedEmployee); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Accède à la collection "employees" de la base de données MongoDB
	collection := services.DB.Collection("employees")

	// Prépare la mise à jour
	update := bson.M{
		"$set": bson.M{
			"first_name": updatedEmployee.FirstName,
			"last_name":  updatedEmployee.LastName,
			"email":      updatedEmployee.Email,
			"phone":      updatedEmployee.Phone,
			"position":   updatedEmployee.Position,
			"department": updatedEmployee.Department,
		},
	}

	// Effectue la mise à jour
	_, err := collection.UpdateOne(c, bson.M{"_id": id}, update)
	if err != nil {
		//log.Println("Error updating employee:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update employee"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Employee updated successfully"})
}
// DeleteEmployee supprime un employé de la base de données
func DeleteEmployee(c *gin.Context) {
	id := c.Param("id") // Récupère l'ID de l'employé depuis l'URL

	// Accède à la collection "employees" de la base de données MongoDB
	collection := services.DB.Collection("employees")

	// Effectue la suppression
	_, err := collection.DeleteOne(c, bson.M{"_id": id})
	if err != nil {
		//log.Println("Error deleting employee:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete employee"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Employee deleted successfully"})
}
// GetEmployeeByID récupère un employé par son ID
// GetEmployeeByID récupère un employé par son ID
func GetEmployeeByID(c *gin.Context) {
	// Récupère l'ID de l'employé dans l'URL
	employeeID := c.Param("id")

	log.Println("Received Employee ID:", employeeID) // Log de l'ID reçu

	// Recherche l'employé dans la base de données
	collection := services.DB.Collection("employees")
	var employee models.Employee

	// Tente de convertir l'ID en ObjectId
	objID, err := primitive.ObjectIDFromHex(employeeID)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid employee ID format"})
		return
	}

	// Recherche l'employé en utilisant l'ObjectId
	err = collection.FindOne(c, bson.M{"_id": objID}).Decode(&employee)

	// Gestion des erreurs
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Employee not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve employee"})
		}
		return
	}

	// Retourne les détails de l'employé en réponse JSON
	c.JSON(http.StatusOK, employee)
}