﻿angular.module("propertyManagerApp").controller("serviceRequestController", ["$scope", "$filter", '$location', "$routeParams", "serviceRequestService", "serviceService", "userProfile", serviceRequestController]);

function serviceRequestController($scope, $filter, $location, $routeParams, serviceRequestService, serviceService, userProfile) {

    $scope.editId = "";
    $scope.isEdit = false;
    $scope.showEditConfirmation = false;

    if ($routeParams.servicerequest_id) {
        $scope.editId = $routeParams.servicerequest_id;
        $scope.isEdit = true;
        getServiceRequestById($scope.editId);
    }
    else {
        getServiceRequest();
    }

    getAllServices();

    $scope.modelAdd = {
        serviceRequestId: "",
        Description: "",
        Notes: "",
        RequestDate: "",
        CompletionDate: "",
        ServiceId: "",
        ServiceName: "",
    };

    $scope.modelEdit = {
        serviceRequestId: "",
        Description: "",
        Notes: "",
        RequestDate: "",
        CompletionDate: "",
        ServiceId: "",
        ServiceName: "",
    };

    $scope.serviceRequests = [];
    $scope.services = [];
    $scope.message = "";
    $scope.sortType = "requestDate";
    $scope.sortReverse = false;
    $scope.searchRequest = "";

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    $scope.today = today;

    var startadd = document.getElementById('requestDate');
    var enddateadd = document.getElementById('completionDate');

    if (startadd != null) {
        startadd.addEventListener('change', function () {
            if (startadd.value)
                enddateadd.min = startadd.value;
        }, false);
    }

    // ADD SECTION 

    $scope.addOneClick = function () {
        $location.path('/addservicerequest');
    }

    $scope.addServiceRequest = function () {

        $scope.message = "";
        var add = false;

        if ($scope.modelAdd.RequestDate < $scope.today) {
            $scope.message = "Enter a date greater than today";
        }
        else {
            if ($scope.modelAdd.CompletionDate < $scope.modelAdd.RequestDate) {
                $scope.message = "Enter a date greater than or equal Start Date";
            }
            else {
                add = true;
            }
        }

        if (add == true) {
            var RequestDateFiltered = null;
            var CompletionDateFiltered = null;

            if ($scope.modelAdd.RequestDate != "") {
                RequestDateFiltered = $filter('date')($scope.modelAdd.RequestDate, "yyyy-MM-dd");
            }
            if ($scope.modelAdd.CompletionDate != "") {
                CompletionDateFiltered = $filter('date')($scope.modelAdd.CompletionDate, "yyyy-MM-dd");
            }

            var serviceRequest = {
                ServiceId: $scope.modelAdd.ServiceId,
                Description: $scope.modelAdd.Description,
                Notes: $scope.modelAdd.Notes,
                RequestDate: RequestDateFiltered,
                CompletionDate: CompletionDateFiltered
            };

            var addResults = serviceRequestService.addServiceRequest(serviceRequest);
            addResults.then(function (response) {
                console.log(response.data);
                $scope.modelAdd.serviceRequestId = response.data.Id;
                $scope.modelAdd.ServiceId = response.data.Id;
                $scope.modelAdd.ServiceName = response.data.Service.ServiceName;
                $scope.showConfirmation = true;
                $scope.message = "Service Request Added"
            }, function (error) {
                $scope.message = error.statusText + " " + error.status;
            });
        }
        
    } // close function

    $scope.addAnother = function () {
        $scope.modelAdd = {
            serviceRequestId: "",
            Description: "",
            Notes: "",
            RequestDate: "",
            CompletionDate: "",
            ServiceId: ""
        };
        $scope.message = "";
        $scope.form.$setPristine();
        $scope.showConfirmation = false;
    }

    function getServiceRequest() {
        var allServiceRequests = serviceRequestService.getAllServiceRequest();
        allServiceRequests.then(function (response) {
            $scope.serviceRequests = response.data;
            console.log($scope.serviceRequests);
        }, function (error) {
            $scope.message = error.statusText;
        })

    } // close function

    function getServiceRequestById (id) {
        var serviceRequestById = serviceRequestService.getByIdServiceRequest(id);
        serviceRequestById.then(function (response) {

            $scope.modelEdit.Description = response.data.Description;
            $scope.modelEdit.Notes = response.data.Notes;
            $scope.modelEdit.serviceRequestId = response.data.Id;
            $scope.modelEdit.ServiceName = response.data.Service.ServiceName;
            $scope.modelEdit.ServiceId = response.data.Service.Id;
            if (response.data.RequestDate != null) {
                $scope.modelEdit.RequestDate = new Date(response.data.RequestDate.replace('T', ' ').replace('-', '/'));
            }
            if (response.data.CompletionDate != null) {
                $scope.modelEdit.CompletionDate = new Date(response.data.CompletionDate.replace('T', ' ').replace('-', '/'));
            }

        }, function (error) {
            $scope.message = error.statusText;
        })

    } // close function

    // *********** EDIT SECTION ******************************************

    var startedit = document.getElementById('editrequestDate');
    var enddateedit = document.getElementById('editcompletionDate');

    if (startedit != null) {
        startedit.addEventListener('change', function () {
            if (startedit.value)
                enddateedit.min = startedit.value;
        }, false);
    }

    $scope.editClick = function (id) {
        $location.path('/addservicerequest/' + id);
    }

    $scope.editServiceRequest = function () {

        $scope.message = "";
        var add = false;

        if ($scope.modelEdit.RequestDate < $scope.today) {
            $scope.message = "Enter a date greater than today";
        }
        else {
            if ($scope.modelEdit.CompletionDate < $scope.modelEdit.RequestDate) {
                $scope.message = "Enter a date greater than or equal Start Date";
            }
            else {
                add = true;
            }
        }
        if (add == true) {
            var RequestDateFiltered = null;
            var CompletionDateFiltered = null;

            if ($scope.modelEdit.RequestDate != "") {
                RequestDateFiltered = $filter('date')($scope.modelEdit.RequestDate, "yyyy-MM-dd");
            }
            if ($scope.modelEdit.CompletionDate != "") {
                CompletionDateFiltered = $filter('date')($scope.modelEdit.CompletionDate, "yyyy-MM-dd");
            }

            var serviceRequest = {
                Id: $scope.editId,
                Description: $scope.modelEdit.Description,
                Notes: $scope.modelEdit.Notes,
                RequestDate: RequestDateFiltered,
                CompletionDate: CompletionDateFiltered,
                ServiceId: $scope.modelEdit.ServiceId

            };

            var editResults = serviceRequestService.editServiceRequest(serviceRequest, serviceRequest.Id);
            editResults.then(function (response) {
                console.log("edit");
                console.log(response);
                $scope.message = "Edit successful";
                $scope.showEditConfirmation = true;
            }, function (error) {
                $scope.message = error.statusText;
            });
        }
        
    } // close function

    //************** DELETE ************************
    $scope.delete = function (id) {
        var deleteOne = serviceRequestService.deleteServiceRequest(id);
        deleteOne.then(function (response) {
            $scope.message = "Delete successfull";
            console.log(response);
            getServiceRequest();
        }, function (error) {
            $scope.message = error.statusText;
        });
    }

    $scope.cancelAdd = function () {
        $location.path('/servicerequest');
    }

    $scope.goBack = function () {
        $location.path('/servicerequest');
    }

    function getAllServices() {
        var services = serviceService.getAllServiceForRequest();
        services.then(function (response) {
            $scope.services = response.data;
            console.log(response);
        }, function (error) {
            $scope.message = error.statusText;
        });
    }


}