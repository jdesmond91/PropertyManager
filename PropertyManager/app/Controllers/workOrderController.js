angular.module("propertyManagerApp").controller("workOrderController", ["$scope", "$filter", "workOrderService", "userProfile", "tenantService", workOrderController]);

function workOrderController($scope, $filter, workOrderService, userProfile, tenantService) {

    $scope.description = "";
    $scope.notes = "";
    $scope.requestDate = "";
    $scope.completionDate = "";
    $scope.tenantId = "";

    $scope.workOrderId = "";
    $scope.workOrders = [];
    $scope.message = "";

    var user = userProfile.getProfile();
    $scope.userName = user.username;

    getUserId();

    function getUserId() {
        var user = tenantService.getByEmailTenant($scope.userName);
        user.then(function (response) {
            console.log("user Id:");
            console.log(response.data);
            $scope.tenantId = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });
    }

    $scope.addWorkOrder = function () {
        var requestDateFiltered = null;
        var completionDateFiltered = null;

        if ($scope.requestDate != "") {
            requestDateFiltered = $filter('date')($scope.requestDate, "yyyy-MM-dd");
        }
        if ($scope.completionDate != "") {
            completionDateFiltered = $filter('date')($scope.completionDate, "yyyy-MM-dd");
        }

        var workOrder = {
            Description: $scope.description,
            Notes: $scope.notes,
            RequestDate: requestDateFiltered,
            CompletionDate: completionDateFiltered,
            TenantId: $scope.tenantId
        };

        var addResults = workOrderService.addWorkOrder(workOrder);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.Id = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });
    } // close function

    $scope.getWorkOder = function () {
        var allRequests = workOrderService.getAllWorkOrder();
        allRequests.then(function (response) {
            $scope.workOrders = response.data;
            console.log($scope.workOrders);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getWorkOrderById = function () {
        var RequestById = workOrderService.getByIdWorkOrder($scope.workOrderId);
        RequestById.then(function (response) {

            $scope.description = response.data.Description;
            $scope.notes = response.data.Notes;

            if (response.data.RequestDate != null) {
                $scope.requestDate = new Date(response.data.RequestDate.replace('T', ' ').replace('-', '/'));
            }
            if (response.data.CompletionDate != null) {
                $scope.completionDate = new Date(response.data.CompletionDate.replace('T', ' ').replace('-', '/'));
            }

        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editServiceRequest = function () {

        var requestDateFiltered = null;
        var completionDateFiltered = null;

        if ($scope.requestDate != "") {
            requestDateFiltered = $filter('date')($scope.requestDate, "yyyy-MM-dd");
        }
        if ($scope.completionDate != "") {
            completionDateFiltered = $filter('date')($scope.completionDate, "yyyy-MM-dd");
        }

        var workOrder = {
            Id: $scope.workOrderId,
            Description: $scope.description,
            Notes: $scope.notes,
            RequestDate: requestDateFiltered,
            CompletionDate: completionDateFiltered,          
        };

        var editResults = workOrderService.editWorkOrder(workOrder, $scope.workOrderId);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

}