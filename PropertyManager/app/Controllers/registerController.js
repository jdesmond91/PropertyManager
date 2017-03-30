angular.module("propertyManagerApp").controller("registerController", ["$scope", '$location', "$filter", "loginService", "userProfile", registerController]);

function registerController($scope, $location, $filter, loginService, userProfile) {
    $scope.message = "";
    $scope.userName = "";
    $scope.userEmail = "";
    $scope.userPassword = "";
    $scope.userFirstName = "";
    $scope.userLastName = "";
    $scope.birthDate = "";
    $scope.apartmentNumber = "";
    $scope.confirmPassword = "";
    $scope.accessToken = "";
    $scope.refreshToken = "";
    $scope.isLoggedIn = false;

    var userProf = userProfile.getProfile();
    $scope.userRole = userProf.userRole;

    $scope.registerUser = function () {
        $scope.message = "";
        var birthDateFiltered = $filter('date')($scope.birthDate, "yyyy-MM-dd");

        var userInfo = {
            Email: $scope.userEmail,
            Password: $scope.userPassword,
            ConfirmPassword: $scope.userPassword,
            GivenName: $scope.userFirstName,
            Surname: $scope.userLastName,
            Role: "Tenant",
            BirthDate: birthDateFiltered,
            ApartmentNumber: $scope.apartmentNumber
        };

        if ($scope.userRole == "Administrator") {
            userInfo.Role = "Manager";
        }
              
        var registerResult = loginService.register(userInfo);
        registerResult.then(function (data) {
            console.log(data);
            $scope.message = "User Registration Successfull";
            $scope.userPassword = "";
            $location.path('/home');
        }, function (response) {
            $scope.message = response.data + "\r\n";
            if (response.data.exceptionMessage) {
                $scope.message += response.data.exceptionMessage;
            }
            if (response.data.modelState) {
                for (var key in response.data.modelState) {
                    $scope.message += response.data.modelState[key] + "\r\n";
                }
            }
        });
    };
   
}