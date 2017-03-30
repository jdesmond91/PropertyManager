angular.module("propertyManagerApp").controller("homeController", ["$scope", "userProfile", homeController]);

function homeController($scope, userProfile) {


    var user = userProfile.getProfile();
    
    $scope.isLoggedIn = user.isLoggedIn;
    $scope.firstName = user.firstName;
    $scope.userRole = user.userRole;
    $scope.date = new Date();

}