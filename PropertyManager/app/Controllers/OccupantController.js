﻿angular.module("propertyManagerApp").controller("occupantController", ["$scope", "$filter", '$location', "$routeParams", "occupantService", "userProfile", "tenantService", "leaseService", occupantController]);

function occupantController($scope, $filter, $location, $routeParams, occupantService, userProfile, tenantService, leaseService) {

    $scope.editId = "";
    $scope.isEdit = false;
    $scope.showEditConfirmation = false;

    if ($routeParams.occupant_id) {
        $scope.editId = $routeParams.occupant_id;
        $scope.isEdit = true;
        getOccupantById($scope.editId);
    }
    else {
        getOccupant();
    }

    $scope.modelAdd = {
        occupantId: "",
        tenantEmail: "",
        tenantId: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        workNumber: "",
        email: "",
        birthDate: "",
        apartmentNumber: ""
    };

    $scope.modelEdit = {
        occupantId: "",
        tenantEmail: "",
        tenantId: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        workNumber: "",
        email: "",
        birthDate: "",
        apartmentNumber: ""
    };

    $scope.message = "";
    $scope.errorMessage = '';
    $scope.occupants = [];
    $scope.sortType = 'FirstName';
    $scope.sortReverse = false;
    $scope.searchOccupant = "";

    // ADD SECTION 

    $scope.addOneClick = function () {
        $location.path('/addoccupant');
    }

    $scope.addOccupant = function () {       

        var findTenant = tenantService.getByEmailTenant($scope.modelAdd.tenantEmail);
        findTenant.then(function (response) {
            console.log(response.data);
            $scope.modelAdd.tenantId = response.data.Id; 
            return response.data.Id;      
        }).then(function (tenantId) {
            if (tenantId != "") {
                var lease = leaseService.getLeaseByTenantId(tenantId);
                lease.then(function (response) {
                    if (response.data.Apartment.ApartmentNumber == $scope.modelAdd.apartmentNumber) {
                        addOccupantTrue();
                    }
                    else {
                        $scope.message = "The apartment number is wrong for this tenant";
                    }
                }, function (error) {
                    $scope.message = "Couldn't find apartment";
                })           
            }
        }, function (error) {
            $scope.message = "Couldn't find a tenant";
        });
                  

    } // close function

    function addOccupantTrue() {
        var birthDateFiltered = null;

        if ($scope.modelAdd.birthDate != "") {
            birthDateFiltered = $filter('date')($scope.modelAdd.birthDate, "yyyy-MM-dd");
        }

        var occupant = {
            FirstName: $scope.modelAdd.firstName,
            LastName: $scope.modelAdd.lastName,
            MobilePhone: $scope.modelAdd.mobileNumber,
            WorkPhone: $scope.modelAdd.workNumber,
            Email: $scope.modelAdd.email,
            BirthDate: birthDateFiltered,
            TenantId: $scope.modelAdd.tenantId,
            ApartmentNumber: $scope.modelAdd.apartmentNumber,
        };
        var addResults = occupantService.addOccupant(occupant);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.modelAdd.occupantId = response.data.Id;
            $scope.showConfirmation = true;
            $scope.message = "Occupant Added"
        }, function (error) {
            $scope.message = error.statusText + " " + error.status;
        });
    }

    $scope.addAnother = function () {
        $scope.modelAdd = {
            occupantId: "",
            tenantEmail: "",
            tenantId: "",
            firstName: "",
            lastName: "",
            mobileNumber: "",
            workNumber: "",
            email: "",
            birthDate: "",
            apartmentNumber: ""
        };
        $scope.message = "";
        $scope.form.$setPristine();
        $scope.showConfirmation = false;
    }

    //******************************************************************************************//

    //GET ALL

    function getOccupant() {
        var allResults = occupantService.getAllOccupant();
        allResults.then(function (response) {
            $scope.occupants = response.data;
            console.log($scope.occupants);
        }, function (error) {
            $scope.message = error.statusText;
        })

    } // close function

    function getOccupantById(id) {
        var resultById = occupantService.getByIdOccupant(id);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.modelEdit.firstName = response.data.FirstName;
            $scope.modelEdit.lastName = response.data.LastName;
            $scope.modelEdit.mobileNumber = response.data.MobilePhone;
            $scope.modelEdit.email = response.data.Email;
            $scope.modelEdit.workNumber = response.data.WorkPhone;
            $scope.modelEdit.birthDate = new Date(response.data.BirthDate.replace('T', ' ').replace('-', '/'));
            $scope.modelEdit.apartmentNumber = response.data.ApartmentNumber;
        }, function (error) {
            $scope.error = response.statusText;
        })

    } // close function

    // *********** EDIT SECTION ******************************************

    $scope.editClick = function (id) {
        $location.path('/addoccupant/' + id);
    }

    $scope.editOccupant = function () {

        var birthDateFiltered = null;

        if ($scope.modelEdit.birthDate != "") {
            birthDateFiltered = $filter('date')($scope.modelEdit.birthDate, "yyyy-MM-dd");
        }

        var occupant = {
            Id: $scope.editId,
            FirstName: $scope.modelEdit.firstName,
            LastName: $scope.modelEdit.lastName,
            MobilePhone: $scope.modelEdit.mobileNumber,
            WorkPhone: $scope.modelEdit.workNumber,
            Email: $scope.modelEdit.email,
            BirthDate: birthDateFiltered,
            ApartmentNumber: $scope.modelEdit.apartmentNumber,
        };

        var editResults = occupantService.editOccupant(occupant, occupant.Id);
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
        $scope.errorMessage = "";
        var deleteOne = occupantService.deleteOccupant(id);
        deleteOne.then(function (response) {
            $scope.message = "Delete successfull";
            console.log(response);
            getOccupant();
        }, function (error) {
            $scope.errorMessage = error.statusText;
        });
    }

    $scope.cancelAdd = function () {
        $location.path('/occupant');
    }

    $scope.goBack = function () {
        $location.path('/occupant');
    }

}