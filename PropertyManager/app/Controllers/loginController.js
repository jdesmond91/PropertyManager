angular.module("propertyManagerApp").controller("loginController", ["$scope", '$location', "loginService", "userProfile", loginController]);

function loginController($scope, $location, loginService, userProfile) {
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
        $location.path('/register');
    };

    $scope.login = function () {
        $scope.dataLoading = true;
        var userLogin = {
            grant_type: 'password',
            userName: $scope.userEmail,
            password: $scope.userPassword
        };
        $scope.responseData = "";
        var loginResult = loginService.login(userLogin);
        loginResult.then(function (response) {
            $scope.userName = response.data.userName;
            return response.data;
        }).
        then(function (data){
            var getUserResult = loginService.getUserInfo(data.userName);
            getUserResult.then(function (response) {
                console.log(response);               
                userProfile.setProfile(response.data.UserName, data.access_token, response.data.Role, response.data.GivenName);
                $scope.isLoggedIn = true;
                $location.path('/home');
            }, function (error) {
                $scope.responseData = response.statusText + " : \r\n";
                if (error.data.error) {
                    $scope.responseData += error.data.error_description;
                }
            })            
        }, function (response) {
            $scope.responseData = response.statusText + " : \r\n";
            if (response.data.error) {
                $scope.responseData += response.data.error_description;
            }
        });
    };
                           
    
}