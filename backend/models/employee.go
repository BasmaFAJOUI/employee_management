package models

type Employee struct {
	ID         string `json:"id" bson:"_id"`
	FirstName  string `json:"first_name" bson:"first_name" binding:"required"`
	LastName   string `json:"last_name" bson:"last_name" binding:"required"`
	Email      string `json:"email" binding:"required,email"`
	Phone      string `json:"phone" binding:"required"`
	Position   string `json:"position"`
	Department string `json:"department"`
	DateHire   string `json:"date_Hire" bson:"date_Hire"`
}
