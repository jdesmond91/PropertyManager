angular.module("propertyManagerApp").controller("leaseController", ["$scope", "$filter", "leaseService", "userProfile", leaseController]);

function leaseController($scope, $filter, leaseService, userProfile) {

    $scope.startDate = "";
    $scope.endDate = "";
    $scope.securityDeposit = "";
    $scope.monthlyRent = "";
    $scope.terms = "";
    $scope.apartmentId = "";
    $scope.tenantId = "";
    $scope.leaseId = "";
    $scope.message = "";
    $scope.leases = [];

    $scope.addLease = function () {
        var startDateFiltered = null;
        var endDateFiltered = null;

        if ($scope.startDate != "") {
            startDateFiltered = $filter('date')($scope.startDate, "yyyy-MM-dd");
        }
        if ($scope.expireDate != "") {
            endDateFiltered = $filter('date')($scope.endDate, "yyyy-MM-dd");
        }

        var lease = {
            StartDate: startDateFiltered,
            EndDate: endDateFiltered,
            SecurityDeposit: $scope.securityDeposit,
            MonthlyRent: $scope.monthlyRent,
            Terms: $scope.terms,
            ApartmentNumber: $scope.apartmentId,
            TenantId: $scope.tenantId
        };

        var addResults = leaseService.addLease(lease);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.leaseId = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });
    } // close function

    $scope.getLease = function () {
        var allLeases = leaseService.getAllLease();
        allLeases.then(function (response) {
            $scope.leases = response.data;
            console.log($scope.leases);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getLeaseById = function () {
        var leaseById = leaseService.getByIdLease($scope.leaseId);
        leaseById.then(function (response) {
            $scope.securityDeposit = response.data.SecurityDeposit;
            $scope.monthlyRent = response.data.MonthlyRent;
            $scope.terms = response.data.Terms;
            $scope.apartmentId = response.data.Apartment.ApartmentNumber;
            $scope.tenantId = response.data.TenantId;
            console.log(response);
            if (response.data.StartDate != null) {
                $scope.startDate = new Date(response.data.StartDate.replace('T', ' ').replace('-', '/'));
            }
            if (response.data.EndDate != null) {
                $scope.endDate = new Date(response.data.EndDate.replace('T', ' ').replace('-', '/'));
            }

        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editLease = function () {

        var startDateFiltered = null;
        var expireDateFiltered = null;

        if ($scope.startDate != "") {
            startDateFiltered = $filter('date')($scope.startDate, "yyyy-MM-dd");
        }
        if ($scope.endDate != "") {
            endDateFiltered = $filter('date')($scope.endDate, "yyyy-MM-dd");
        }

        var lease = {
            Id: $scope.leaseId,
            StartDate: startDateFiltered,
            EndDate: endDateFiltered,
            SecurityDeposit: $scope.securityDeposit,
            MonthlyRent: $scope.monthlyRent,
            Terms: $scope.terms,
            ApartmentId: $scope.apartmentId,
            TenantId: $scope.tenantId
        };

        var editResults = leaseService.editLease(lease, $scope.leaseId);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function


}