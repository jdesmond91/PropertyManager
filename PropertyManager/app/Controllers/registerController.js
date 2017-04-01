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
    $scope.errorMessage = "";

    var userProf = userProfile.getProfile();
    $scope.userRole = userProf.userRole;

    $scope.registerUser = function () {
        $scope.message = "";
        var birthDateFiltered = $filter('date')($scope.birthDate, "yyyy-MM-dd");

        var userInfo = {
            Email: $scope.userEmail,
            //Password: $scope.userPassword,
            //ConfirmPassword: $scope.userPassword,
            GivenName: $scope.userFirstName,
            Surname: $scope.userLastName,
            Role: "Tenant",
            BirthDate: birthDateFiltered,
            ApartmentNumber: $scope.apartmentNumber
        };
              
        var registerResult = loginService.register(userInfo);
        registerResult.then(function (data) {
            console.log(data);
            $scope.message = "User Registration Successfull";
            $scope.userPassword = "";
            $location.path('/login');
        }, function (response) {
            $scope.message = "Registration failed. Please try again." 
            
            
        });
    };

    $scope.registerManager = function () {
        $scope.message = "";
        var birthDateFiltered = $filter('date')($scope.birthDate, "yyyy-MM-dd");

        var userInfo = {
            Email: $scope.userEmail,
            //Password: $scope.userPassword,
            //ConfirmPassword: $scope.userPassword,
            GivenName: $scope.userFirstName,
            Surname: $scope.userLastName,
            Role: "Manager",
            BirthDate: birthDateFiltered,
            ApartmentNumber: $scope.apartmentNumber
        };
        var registerResult = loginService.register(userInfo);
        registerResult.then(function (data) {
            console.log(data);
            $scope.message = "User Registration Successfull";
            $scope.userEmail = "";
            $scope.userFirstName = "";
            $scope.userLastName = "";
            $scope.birthDate = "";
            $scope.form.$setPristine();
        }, function (response) {
            $scope.errorMessage = "Registration failed. Please try again."


        });
    };
   
}