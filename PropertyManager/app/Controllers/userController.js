angular.module("propertyManagerApp").controller("userController", ["$scope", "$filter", '$location', "$routeParams", "userService", "userProfile", userController]);

function userController($scope, $filter, $location, $routeParams, userService, userProfile) {
    
    $scope.message = "";
    $scope.errorMessage = "";
    $scope.users = [];
    $scope.sortType = "lastName";
    $scope.sortReverse = false;
    $scope.searchUser = "";
    $scope.showConfirmation = false;

    //******************************************************************************************//
    getUserAll();

    //GET ALL
    function getUserAll() {
        var allUsers = userService.getAllUser();
        allUsers.then(function (response) {
            $scope.users = response.data;
            console.log($scope.users);
        }, function (error) {
            $scope.errorMessage = error.data;
        })

    } // close function

   
    //************** DELETE ************************
    $scope.delete = function (email) {
        var deleteOne = userService.deleteUser(email);
        deleteOne.then(function (response) {
            $scope.errorMessage = "Delete successfull";
            console.log(response);
            getUserAll();
        }, function (error) {
            $scope.errorMessage = error.statusText;
        });
    }

}