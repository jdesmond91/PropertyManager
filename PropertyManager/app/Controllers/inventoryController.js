angular.module("propertyManagerApp").controller("inventoryController", ["$scope", "$filter", "inventoryService", "userProfile", inventoryController]);

function inventoryController($scope, $filter, inventoryService, userProfile) {

    $scope.Supplier = "";
    $scope.Quantity = "";

    $scope.Id
    $scope.Inventory = [];
    $scope.message = "";
    
    $scope.addInventory = function () {

        var inventory = {
            Supplier: $scope.Supplier,
            Quantity: $scope.Quantity,
        };

        var addResults = inventoryService.addInventory(inventory);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.Id = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });

    } // close function

    $scope.getInventory = function () {
        var allResults = inventoryService.getAllInventory();
        allResults.then(function (response) {
            $scope.Inventory = response.data;
            console.log($scope.Inventory);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getInventoryById = function () {
        var resultById = inventoryService.getByIdInventory($scope.Id);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.Supplier = response.data.Supplier;
            $scope.Quantity = response.data.Quantity;
         }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editInventory = function () {

        var inventory = {
            Id: $scope.Id,
            Supplier: $scope.Supplier,
            Quantity: $scope.Quantity
        };

        var editResults = inventoryService.editInventory(inventory, $scope.Id);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function


}