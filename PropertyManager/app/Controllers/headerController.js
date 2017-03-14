angular.module("propertyManagerApp").controller("headerController", ["$scope", "$location", "userProfile", 'ModalService', headerController]);
function headerController($scope, $location, userProfile, ModalService) {
  
    $scope.Message = "";
    $scope.status;

    var user = userProfile.getProfile();

    $scope.isLoggedIn = user.isLoggedIn;
    $scope.firstName = user.firstName;

    console.log($scope.isLoggedIn);
    console.log($scope.firstName);

    var modal = "";
    $scope.showComplex = function () {
        modal = ModalService.showModal({
            templateUrl: "/app/Partials/modalLogin.html",
            controller: "loginController",
            inputs: {
                title: "A More Complex Example"
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.complexResult = "Name: " + result.name + ", age: " + result.age;
            });
        });
    };

    $scope.close = function (result) {
        modal.close(result, 500); // close, but give 500ms for bootstrap to animate
    };

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