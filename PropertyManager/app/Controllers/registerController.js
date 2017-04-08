//Made by Amanda Marques

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
    $scope.activationCode = "";

    var userProf = userProfile.getProfile();
    $scope.userRole = userProf.userRole;

    $scope.registerUser = function () {
        $scope.message = "";
        $scope.errorMessage = "";
        var birthDateFiltered = $filter('date')($scope.birthDate, "yyyy-MM-dd");

        var userInfo = {
            Email: $scope.userEmail,
            Password: $scope.userPassword,
            ConfirmPassword: $scope.userPassword,
            GivenName: $scope.userFirstName,
            Surname: $scope.userLastName,
            Role: "Tenant",
            BirthDate: birthDateFiltered,
            ApartmentNumber: $scope.apartmentNumber,
            ActivationCode: $scope.activationCode
        };
              
        var registerResult = loginService.register(userInfo);
        registerResult.then(function (data) {
            console.log(data);
            $scope.message = "User Registration Successfull";
            $scope.userPassword = "";
            $location.path('/login');
        }, function (response) {
            $scope.errorMessage = response.data;
            if (response.status == 400) {
                $scope.errorMessage = "This email is already registered."
            }
            
        });
    };

    $scope.registerManager = function () {
        $scope.message = "";
        $scope.errorMessage = "";
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

    $scope.sendCode = function () {
        $scope.message = "";
        $scope.errorMessage = "";
        var sendCodeActive = loginService.sendCode($scope.userEmail);
        sendCodeActive.then(function (data) {
            console.log(data);
            $scope.message = "Activation code sent to email.";
            $scope.userEmail = "";
            $scope.userFirstName = "";
            $scope.userLastName = "";
            $scope.birthDate = "";
            $scope.form.$setPristine();
        }, function (response) {
            console.log(response);
            $scope.errorMessage = response.data;
        });
    }

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate', 'MM/dd/yyyy'];
    $scope.format = $scope.formats[4];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };


    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
   
}