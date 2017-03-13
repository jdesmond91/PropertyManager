angular.module("propertyManagerApp").controller("serviceRequestController", ["$scope", "$filter", "serviceRequestService", "userProfile", serviceRequestController]);

function serviceRequestController($scope, $filter, serviceRequestService, userProfile) {

    $scope.Description = "";
    $scope.Notes = "";
    $scope.RequestDate = "";
    $scope.CompletionDate = "";

    //NEED TO INCLUDE SERVICE ID

    $scope.Id = "";
    $scope.serviceRequests = [];
    $scope.message = "";

    $scope.addServiceRequest = function () {
        var RequestDateFiltered = null;
        var CompletionDateFiltered = null;

        if ($scope.RequestDate != "") {
            RequestDateFiltered = $filter('date')($scope.RequestDate, "yyyy-MM-dd");
        }
        if ($scope.CompletionDate != "") {
            CompletionDateFiltered = $filter('date')($scope.CompletionDate, "yyyy-MM-dd");
        }

        var serviceRequest = {
            Description: $scope.Description,
            Notes: $scope.Notes,
            RequestDate: RequestDateFiltered,
            CompletionDate: CompletionDateFiltered
        };

        var addResults = serviceRequestService.addServiceRequest(serviceRequest);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.Id = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });
    } // close function

    $scope.getServiceRequest = function () {
        var allServiceRequests = serviceRequestService.getAllServiceRequest();
        allServiceRequests.then(function (response) {
            $scope.serviceRequests = response.data;
            console.log($scope.serviceRequests);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getServiceRequestById = function () {
        var serviceRequestById = serviceRequestService.getByIdServiceRequest($scope.Id);
        serviceRequestById.then(function (response) {

            $scope.Description = response.data.Description;
            $scope.Notes = response.data.Notes;

            if (response.data.RequestDate != "") {
                $scope.RequestDate = new Date(response.data.RequestDate.replace('T', ' ').replace('-', '/'));
            }
            if (response.data.CompletionDate != "") {
                $scope.CompletionDate = new Date(response.data.CompletionDate.replace('T', ' ').replace('-', '/'));
            }

        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editServiceRequest = function () {

        var RequestDateFiltered = null;
        var CompletionDateFiltered = null;

        if ($scope.RequestDate != "") {
            RequestDateFiltered = $filter('date')($scope.RequestDate, "yyyy-MM-dd");
        }
        if ($scope.CompletionDate != "") {
            CompletionDateFiltered = $filter('date')($scope.CompletionDate, "yyyy-MM-dd");
        }

        var serviceRequest = {
            Id: $scope.Id,
            Description: $scope.Description,
            Notes: $scope.Notes,
            RequestDate: RequestDateFiltered,
            CompletionDate: CompletionDateFiltered
        };

        var editResults = serviceRequestService.editServiceRequest(serviceRequest, $scope.Id);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

}