angular.module("propertyManagerApp").controller("registerController", ["$scope", '$location', "loginService", "userProfile", registerController]);

function registerController($scope, $location, loginService, userProfile) {
    $scope.responseData = "";
    $scope.userName = "";
    $scope.userEmail = "";
    $scope.userPassword = "";
    $scope.userFirstName = "";
    $scope.userLastName = "";
    $scope.accessToken = "";
    $scope.refreshToken = "";
    $scope.isLoggedIn = false;

    $scope.registerUser = function () {
        $scope.responseData = "";
        var userInfo = {
            Email: $scope.userEmail,
            Password: $scope.userPassword,
            ConfirmPassword: $scope.userPassword,
            GivenName: $scope.userFirstName,
            Surname: $scope.userLastName,
            Role: "Tenant"
        };
        console.log(userInfo.Email + " " + userInfo.Password + " " + userInfo.GivenName + " " + userInfo.Surname);
        var registerResult = loginService.register(userInfo);
        registerResult.then(function (data) {
            $scope.responseData = "User Registration Successfull";
            $scope.userPassword = "";
            $location.path('/home');
        }, function (response) {
            $scope.responseData = response.statusText + "\r\n";
            if (response.data.exceptionMessage) {
                $scope.responseData += response.data.exceptionMessage;
            }
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    $scope.responseData += response.data.modelState[key] + "\r\n";
                }
            }
        });
    };
}