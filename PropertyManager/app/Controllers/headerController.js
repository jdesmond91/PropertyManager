angular.module("propertyManagerApp").controller("headerController", ["$scope", "$location", "userProfile", 'ModalService', headerController]);
function headerController($scope, $location, userProfile, ModalService) {
  
    $scope.Message = "";
    $scope.status;

    var user = userProfile.getProfile();

    $scope.isLoggedIn = user.isLoggedIn;
    $scope.firstName = user.firstName;

    console.log($scope.isLoggedIn);
    console.log($scope.firstName);   

    $scope.logout = function () {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('firstName');
        $scope.isLoggedIn = false;
        $scope.firstName = "";
        $location.path('/home');
    };
}