angular.module("propertyManagerApp").controller("inventoryController", ["$scope", "$filter", "inventoryService", "userProfile", inventoryController]);

function inventoryController($scope, $filter, inventoryService, userProfile) {

    $scope.supplier = "";
    $scope.quantity = "";
    $scope.productName = "";

    $scope.inventoryId
    $scope.inventorys = [];
    $scope.message = "";
    $scope.sortType = "productName";
    $scope.sortReverse = false;
    $scope.searchInventory = "";
    
    $scope.addInventory = function () {

        var inventory = {
            ProductName: $scope.productName,
            Supplier: $scope.supplier,
            Quantity: $scope.quantity,
        };

        var addResults = inventoryService.addInventory(inventory);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.inventoryId = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });

    } // close function

    $scope.getInventory = function () {
        var allResults = inventoryService.getAllInventory();
        allResults.then(function (response) {
            $scope.inventorys = response.data;
            console.log($scope.inventorys);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getInventoryById = function () {
        var resultById = inventoryService.getByIdInventory($scope.inventoryId);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.productName = response.data.ProductName;
            $scope.supplier = response.data.Supplier;
            $scope.quantity = response.data.Quantity;
         }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editInventory = function () {

        var inventory = {
            Id: $scope.inventoryId,
            ProductName: $scope.productName,
            Supplier: $scope.supplier,
            Quantity: $scope.quantity
        };

        var editResults = inventoryService.editInventory(inventory, $scope.inventoryId);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

    $scope.getInventory();


}