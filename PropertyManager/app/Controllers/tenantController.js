﻿angular.module("propertyManagerApp").controller("tenantController", ["$scope", "$filter", '$location', "$routeParams", "tenantService", "userProfile", "leaseService", tenantController]);

function tenantController($scope, $filter, $location, $routeParams, tenantService, userProfile, leaseService) {

    $scope.editId = "";
    $scope.isEdit = false;
    $scope.showEditConfirmation = false;

    if ($routeParams.tenant_id) {
        $scope.editId = $routeParams.tenant_id;
        $scope.isEdit = true;
        getTenantById($scope.editId);
    }
    else {
        getTenant();
    }

    $scope.modelAdd = {
        tenantId: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        homeNumber: "",
        email: "",
        birthDate: "",
    };

    $scope.modelEdit = {
        tenantId: "",
        firstName: "",
        lastName: "",
        mobileNumber: "",
        homeNumber: "",
        email: "",
        birthDate: "",
    };

    $scope.apartmentNumber = "";
    $scope.message = "";
    $scope.errorMessage = '';
    $scope.tenants = [];
    $scope.sortType = 'FirstName';
    $scope.sortReverse = false;
    $scope.searchTenant = "";

    // ADD SECTION 

    $scope.addOneClick = function () {
        $location.path('/addtenant');
    }

    $scope.addTenant = function () {

        var birthDateFiltered = null;

        if ($scope.modelAdd.birthDate != "") {
            birthDateFiltered = $filter('date')($scope.modelAdd.birthDate, "yyyy-MM-dd");
        }

        var tenant = {
            FirstName: $scope.modelAdd.firstName,
            LastName: $scope.modelAdd.lastName,
            MobilePhone: $scope.modelAdd.mobileNumber,
            HomePhone: $scope.modelAdd.homeNumber,
            Email: $scope.modelAdd.email,
            BirthDate: birthDateFiltered
        };

        var addResults = tenantService.addTenant(tenant);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.modelAdd.tenantId = response.data.Id;
            $scope.showConfirmation = true;
            $scope.message = "Tenant Added"
        }, function (error) {
            $scope.message = error.statusText + " " + error.status;
        });

    } // close function

    $scope.addAnother = function () {
        $scope.modelAdd = {
            tenantId: "",
            firstName: "",
            lastName: "",
            mobileNumber: "",
            homeNumber: "",
            email: "",
            birthDate: "",
        };
        $scope.message = "";
        $scope.form.$setPristine();
        $scope.showConfirmation = false;
    }

    //******************************************************************************************//

    //GET ALL

    function getTenant () {
        var allResults = tenantService.getAllTenant();
        allResults.then(function (response) {
            $scope.tenants = response.data;
            console.log($scope.tenants);
        }, function (error) {
            $scope.message = error.statusText;
        })

    } // close function

    function getTenantById(id) {
        var resultById = tenantService.getByIdTenant(id);
        resultById.then(function (response) {
            console.log(response.data);
            $scope.modelEdit.firstName = response.data.FirstName;
            $scope.modelEdit.lastName = response.data.LastName;
            $scope.modelEdit.mobileNumber = response.data.MobilePhone;
            $scope.modelEdit.email = response.data.Email;
            $scope.modelEdit.homeNumber = response.data.HomePhone;
            $scope.modelEdit.birthDate = new Date(response.data.BirthDate.replace('T', ' ').replace('-', '/'));
            return response.data.Id;
        }).then(function (tenantId){
            var leaseInfo = leaseService.getLeaseByTenantId(tenantId);
            leaseInfo.then(function (response) {
                console.log(response);
                $scope.apartmentNumber = response.data.Apartment.ApartmentNumber;
            }, function (error) {
                $scope.error = response.statusText;
            })
        }, function (error) {
            $scope.error = response.statusText;
        })

    } // close function

    // *********** EDIT SECTION ******************************************

    $scope.editClick = function (id) {
        $location.path('/addtenant/' + id);
    }

    $scope.editTenant = function () {

        var birthDateFiltered = null;

        if ($scope.modelEdit.birthDate != "") {
            birthDateFiltered = $filter('date')($scope.modelEdit.birthDate, "yyyy-MM-dd");
        }

        var tenant = {
            Id: $scope.editId,
            FirstName: $scope.modelEdit.firstName,
            LastName: $scope.modelEdit.lastName,
            MobilePhone: $scope.modelEdit.mobileNumber,
            HomePhone: $scope.modelEdit.homeNumber,
            Email: $scope.modelEdit.email,
            BirthDate: birthDateFiltered
        };

        var editResults = tenantService.editTenant(tenant, tenant.Id);
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
        var deleteOne = tenantService.deleteTenant(id);
        deleteOne.then(function (response) {
            $scope.message = "Delete successfull";
            console.log(response);
            getTenant();
        }, function (error) {
            if (error.data == "Lease associated") {
                $scope.errorMessage = "There's a lease associated with this tenant.\nPlease delete the lease first.";
            }
        });
    }

    $scope.cancelAdd = function () {
        $location.path('/tenant');
    }

    $scope.goBack = function () {
        $location.path('/tenant');
    }

}