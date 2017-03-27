﻿angular.module("propertyManagerApp").controller("workOrderController", ["$scope", "$filter", '$location', "$routeParams", "workOrderService", "userProfile", "tenantService", workOrderController]);

function workOrderController($scope, $filter, $location, $routeParams, workOrderService, userProfile, tenantService) {

    $scope.editId = "";
    $scope.isEdit = false;
    $scope.showEditConfirmation = false;

    var user = userProfile.getProfile();
    $scope.userName = user.username;
    $scope.userRole = user.userRole;

    if ($scope.userRole == 'Tenant') {
        getUserId();
    }


    $scope.modelAdd = {
        workOrderId: "",
        description: "",
        notes: "",
        requestDate: "",
        completionDate: "",
        tenantId: ""
    };

    $scope.modelEdit = {
        workOrderId: "",
        description: "",
        notes: "",
        requestDate: "",
        completionDate: "",
        tenantId: ""
    };

    $scope.workOrders = [];
    $scope.tenantId = "";
    $scope.message = "";
    $scope.errorMessage = "";
    $scope.sortType = "description";
    $scope.sortReverse = false;
    $scope.searchWorkOrder = "";
    
   
    function getUserId() {
        var user = tenantService.getByEmailTenant($scope.userName);
        user.then(function (response) {
            console.log("user Id:");
            console.log(response.data);
            $scope.modelAdd.tenantId = response.data.Id;
            $scope.tenantId = response.data.Id;
            return response.data.Id;
        })
           .then(function (tenantId) {
               if ($routeParams.workrequest_id) {
                   $scope.editId = $routeParams.workrequest_id;
                   $scope.isEdit = true;
                   getWorkOrderById($scope.editId);
               }
               else {
                   getAllTenantOrders(tenantId);       
               }                                
           }, function (error) {
               $scope.errorMessage = error.statusText + " " + error.status;
           })
    }     

    function getAllTenantOrders(id) {
        $scope.workOrders = [];
        var tenantOrder = workOrderService.getByTenantIdWorkOrder(id);
        tenantOrder.then(function (response) {
            $scope.workOrders = response.data;
            console.log($scope.workOrders);
        }, function (error) {
            $scope.errorMessage = response.statusText;
        })
    }

    // ADD SECTION 

    $scope.addOneClick = function () {
        $location.path('/addworkorderrequest');
    }

    $scope.addWorkOrder = function () {


        var requestDateFiltered = null;
        var completionDateFiltered = null;

        if ($scope.modelAdd.requestDate != "") {
            requestDateFiltered = $filter('date')($scope.modelAdd.requestDate, "yyyy-MM-dd");
        }
        if ($scope.modelAdd.completionDate != "") {
            completionDateFiltered = $filter('date')($scope.modelAdd.completionDate, "yyyy-MM-dd");
        }

        var workOrder = {
            Description: $scope.modelAdd.description,
            Notes: $scope.modelAdd.notes,
            RequestDate: requestDateFiltered,
            CompletionDate: completionDateFiltered,
            TenantId: $scope.modelAdd.tenantId
        };

        var addResults = workOrderService.addWorkOrder(workOrder);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.modelAdd.workOrderId = response.data.Id;
            $scope.modelAdd.requestDate = new Date(response.data.RequestDate.replace('T', ' ').replace('-', '/'));
            $scope.showConfirmation = true;
            $scope.message = "Work Order Added"
        }, function (error) {
            $scope.message = error.statusText + " " + error.status;
        });
    } // close function

    $scope.addAnother = function () {
        $scope.modelAdd = {
            workOrderId: "",
            description: "",
            notes: "",
            requestDate: "",
            completionDate: "",
            tenantId: $scope.tenantId
        };
        $scope.message = "";
        $scope.form.$setPristine();
        $scope.showConfirmation = false;
    }

    function getWorkOrderById (id) {
        var RequestById = workOrderService.getByIdWorkOrder(id);
        RequestById.then(function (response) {
            $scope.modelEdit.description = response.data.Description;
            $scope.modelEdit.notes = response.data.Notes;
            $scope.modelEdit.tenantId = response.data.TenantId;
            $scope.modelEdit.workOrderId = response.data.Id;
            if (response.data.RequestDate != null) {
                $scope.modelEdit.requestDate = new Date(response.data.RequestDate.replace('T', ' ').replace('-', '/'));
            }
            if (response.data.CompletionDate != null) {
                $scope.modelEdit.completionDate = new Date(response.data.CompletionDate.replace('T', ' ').replace('-', '/'));
            }

        }, function (error) {
            $scope.errorMessage = error.statusText;
        })

    } // close function

    // *********** EDIT SECTION ******************************************

    $scope.editClick = function (id) {
        $location.path('/addworkorderrequest/' + id);
    }

    $scope.editWorkOrder = function () {

    var requestDateFiltered = null;
    var completionDateFiltered = null;

    if ($scope.modelEdit.requestDate != "") {
        requestDateFiltered = $filter('date')($scope.modelEdit.requestDate, "yyyy-MM-dd");
    }
    if ($scope.modelEdit.completionDate != "") {
        completionDateFiltered = $filter('date')($scope.modelEdit.completionDate, "yyyy-MM-dd");
    }

    var workOrder = {
         Id: $scope.editId,
         Description: $scope.modelEdit.description,
         Notes: $scope.modelEdit.notes,
         RequestDate: requestDateFiltered,
         CompletionDate: completionDateFiltered,
     };

    var editResults = workOrderService.editWorkOrder(workOrder, workOrder.Id);
    editResults.then(function (response) {
        console.log("edit");
        console.log(response);
        $scope.message = "Edit successful";
        $scope.showEditConfirmation = true;
    }, function (error) {
         $scope.message = error.statusText;
    });
       
    } // close function

    //************** DELETE ************************
    $scope.delete = function (id) {
        var deleteOne = workOrderService.deleteWorkOrder(id);
        deleteOne.then(function (response) {
            $scope.message = "Delete successfull";
            console.log(response);
            getAllTenantOrders($scope.tenantId);
        }, function (error) {
            $scope.errorMessage = "Cold not delete";
        });
    }

    $scope.cancelAdd = function () {
        $location.path('/workorderrequest');
    }

    $scope.goBack = function () {
        $location.path('/workorderrequest');
    }

}