angular.module("common.services").factory("employeeService", ["$http", "$q", "appSettings", employeeService]);
function employeeService($http, $q, appSettings) {

    this.addEmployee = function (employee) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/employees",
            method: "POST",
            data: employee,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllEmployee = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/employees",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdEmployee = function (employeeId) {
        var response = $http({
            url: appSettings.serverPath + "/api/employees/" + employeeId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editEmployee = function (employee, employeeId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/employees/" + employeeId,
            method: "PUT",
            data: employee,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    return {
        addEmployee: this.addEmployee,
        getAllEmployee: this.getAllEmployee,
        getByIdEmployee: this.getByIdEmployee,
        editEmployee: this.editEmployee
    }


}