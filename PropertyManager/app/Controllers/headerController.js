angular.module("propertyManagerApp").controller("headerController", ["$scope", "$location", "userProfile", headerController]);
function headerController($scope, $location, userProfile) {
  
    $scope.Message = "";
    $scope.status;
    $scope.isLoggedIn = "";

    var user = userProfile.getProfile();

    $scope.isLoggedIn = user.isLoggedIn;
    $scope.firstName = user.firstName;
    $scope.userRole = user.userRole;

    console.log($scope.isLoggedIn);
    console.log($scope.userRole);

    $scope.logout = function () {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('firstName');
        $scope.isLoggedIn = "";
        $scope.firstName = "";
        $location.path('/index');
    };
}