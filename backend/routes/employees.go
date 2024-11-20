/*
package routes

import (

	"employee-management-backend/controllers"
	"employee-management-backend/middleware"






	"github.com/gin-gonic/gin"

)

	func RegisterRoutes(router *gin.Engine) {
		api := router.Group("/api")
		{
			api.GET("/employees", middleware.AuthMiddleware(), controllers.GetEmployees)
			api.POST("/employees", middleware.AuthMiddleware(), controllers.CreateEmployee)
		}
	}
*/
package routes

import (
	"employee-management-backend/controllers"
	"github.com/gin-gonic/gin"
	//"employee-management-backend/middleware" // Désactivez temporairement
)

func RegisterRoutes(router *gin.Engine) {
	api := router.Group("/api")
	//api.Use(middleware.AuthMiddleware()) // Désactivez temporairement
	{
		api.GET("/employees", controllers.GetEmployees)
		api.POST("/employees", controllers.CreateEmployee)
		api.PUT("/employees/:id", controllers.UpdateEmployee)
		api.DELETE("/employees/:id", controllers.DeleteEmployee)
		api.GET("/employees/:id", controllers.GetEmployeeByID)

	}
}
