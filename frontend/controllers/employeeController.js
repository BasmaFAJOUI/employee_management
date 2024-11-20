app.controller("EmployeeController", function ($scope, EmployeeService) {
  $scope.employees = [];

  $scope.getEmployees = function () {
    EmployeeService.getAll().then(function (response) {
      $scope.employees = response.data;
    });
  };

  $scope.deleteEmployee = function (id) {
    EmployeeService.delete(id).then(function () {
      $scope.getEmployees();
    });
  };
});
