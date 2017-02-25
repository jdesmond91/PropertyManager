angular.module("propertyManagerApp").controller("homeController", ["$scope", "userProfile", homeController]);

function homeController($scope, userProfile) {


    var user = userProfile.getProfile();
    console.log(user);

}