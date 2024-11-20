app.service("EmployeeService", function ($http) {
  var apiUrl = "http://localhost:8080/api/employees";

  this.getAll = function () {
    return $http.get(apiUrl);
  };

  this.delete = function (id) {
    return $http.delete(apiUrl + "/" + id);
  };
});
