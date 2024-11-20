package controllers

import (
	"context"
	"testing"

	"employee-management-backend/mocks"

	"github.com/golang/mock/gomock"
)

func TestCreateEmployee(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	// Créez une instance de mock pour l'interface MongoService
	mockService := mocks.NewMockMongoService(ctrl)

	// Définissez le comportement attendu pour le mock
	mockService.EXPECT().Insert(gomock.Any(), "employees", gomock.Any()).Return(nil)

	// Simulez un appel à la méthode Insert
	err := mockService.Insert(context.Background(), "employees", map[string]string{"name": "Jane Doe"})
	if err != nil {
		t.Errorf("Expected no error, but got: %s", err)
	}
}
