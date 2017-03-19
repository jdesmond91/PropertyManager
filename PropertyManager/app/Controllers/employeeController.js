angular.module("propertyManagerApp").controller("employeeController", ["$scope", "$filter", "employeeService", "userProfile", employeeController]);

function employeeController($scope, $filter, employeeService, userProfile) {

    $scope.LastName = "";
    $scope.FirstName = "";
    $scope.Title = "";
    $scope.BirthDate = "";
    $scope.HireDate = "";
    $scope.Address = "";
    $scope.City = "";
    $scope.State = "";
    $scope.PostalCode = "";
    $scope.Phone = "";
    $scope.Fax = "";
    $scope.Email = "";

    $scope.Id = "";
    $scope.employees = [];
    $scope.message = "";
    $scope.sortType = 'FirstName';
    $scope.sortReverse = false;
    $scope.searchEmployee = "";

    $scope.addEmployee = function () {
        var BirthDateFiltered = null;
        var HireDateFiltered = null;

        if ($scope.BirthDate != "") {
            BirthDateFiltered = $filter('date')($scope.BirthDate, "yyyy-MM-dd");
        }
        if ($scope.HireDate != "") {
            HireDateFiltered = $filter('date')($scope.HireDate, "yyyy-MM-dd");
        }

        var employee = {
            LastName: $scope.LastName,
            FirstName: $scope.FirstName,
            Title: $scope.Title,
            Address: $scope.Address,
            City: $scope.City,
            State: $scope.State,
            PostalCode: $scope.PostalCode,
            Phone: $scope.Phone,
            Fax: $scope.Fax,
            Email: $scope.Email,
            BirthDate: BirthDateFiltered,
            HireDate: HireDateFiltered
        };

        var addResults = employeeService.addEmployee(employee);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.Id = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });
    } // close function

    $scope.getEmployee = function () {
        var allEmployees = employeeService.getAllEmployee();
        allEmployees.then(function (response) {
            $scope.employees = response.data;
            console.log($scope.employees);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getEmployeeById = function (id) {
        var employeeById = employeeService.getByIdEmployee(id);
        employeeById.then(function (response) {

            $scope.LastName = response.data.LastName;
            $scope.FirstName = response.data.FirstName;
            $scope.Title = response.data.Title;
            $scope.Address = response.data.Address;
            $scope.City = response.data.City;
            $scope.State = response.data.State;
            $scope.PostalCode = response.data.PostalCode;
            $scope.Phone = response.data.Phone;
            $scope.Fax = response.data.Fax;
            $scope.Email = response.data.Email;

            if (response.data.BirthDate != "") {
                $scope.BirthDate = response.data.BirthDate//new Date(response.data.BirthDate.replace('T', ' ').replace('-', '/'));
            }
            if (response.data.HireDate != "") {
                $scope.HireDate = response.data.HireDate//new Date(response.data.HireDate.replace('T', ' ').replace('-', '/'));
            }

        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function
  
    $scope.editEmployee = function () {

        var BirthDateFiltered = null;
        var HireDateFiltered = null;

        if ($scope.BirthDate != "") {
            BirthDateFiltered = $filter('date')($scope.BirthDate, "yyyy-MM-dd");
        }
        if ($scope.HireDate != "") {
            HireDateFiltered = $filter('date')($scope.HireDate, "yyyy-MM-dd");
        }

            var employee = {
                Id: $scope.Id,
                LastName: $scope.LastName,
                FirstName: $scope.FirstName,
                Title: $scope.Title,
                Address: $scope.Address,
                City: $scope.City,
                State: $scope.State,
                PostalCode: $scope.PostalCode,
                Phone: $scope.Phone,
                Fax: $scope.Fax,
                Email: $scope.Email,
                BirthDate: BirthDateFiltered,
                HireDate: HireDateFiltered
            };

        var editResults = employeeService.editEmployee(employee, $scope.Id);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

    $scope.getEmployee();
}