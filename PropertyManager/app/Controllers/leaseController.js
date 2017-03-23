angular.module("propertyManagerApp").controller("leaseController", ["$scope", "$filter", '$location', "$routeParams", "leaseService", "userProfile", leaseController]);

function leaseController($scope, $filter, $location, $routeParams, leaseService, userProfile) {

    $scope.editId = "";
    $scope.isEdit = false;
    $scope.showEditConfirmation = false;

    console.log($routeParams.lease_id);

    if ($routeParams.lease_id) {
        $scope.editId = $routeParams.lease_id;
        $scope.isEdit = true;
        getLeaseById($scope.editId);
    }
    else {
        getLease();
    }


    $scope.modelAdd = {
        leaseId: "",
        startDate: "",
        endDate: "",
        monthlyRent: "",
        securityDeposit: "",
        terms: "",
        apartmentId: "",
        tenantId: "",
        tenantName: ""
    };

    $scope.modelEdit = {
        leaseId: "",
        startDate: "",
        endDate: "",
        monthlyRent: "",
        securityDeposit: "",
        terms: "",
        apartmentId: "",
        tenantId: "",
        tenantName: ""
    };
  
    $scope.message = "";
    $scope.leases = [];
    $scope.sortType = "ApartmentNumber";
    $scope.sortReverse = false;
    $scope.searchLease = "";
    $scope.tenants = [];
    $scope.aptNumbers = [];

    // ADD SECTION 

    var today = new Date();
    $scope.today = today;

    var start = document.getElementById('startDate');
    var enddate = document.getElementById('endDate');

    if (start != null) {
        start.addEventListener('change', function () {
            if (start.value)
                enddate.min = start.value;
        }, false);
    }

    $scope.addOneClick = function () {
        $location.path('/addlease');
    }

    $scope.addLease = function () {
        var startDateFiltered = null;
        var endDateFiltered = null;

        if ($scope.modelAdd.startDate != "") {
            startDateFiltered = $filter('date')($scope.modelAdd.startDate, "yyyy-MM-dd");
        }
        if ($scope.modelAdd.expireDate != "") {
            endDateFiltered = $filter('date')($scope.modelAdd.endDate, "yyyy-MM-dd");
        }

        var lease = {
            StartDate: startDateFiltered,
            EndDate: endDateFiltered,
            SecurityDeposit: $scope.modelAdd.securityDeposit,
            MonthlyRent: $scope.modelAdd.monthlyRent,
            Terms: $scope.modelAdd.terms,
            ApartmentNumber: $scope.modelAdd.apartmentId,
            TenantId: $scope.modelAdd.tenantId
        };

        var addResults = leaseService.addLease(lease);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.modelAdd.leaseId = response.data.Id;
            $scope.showConfirmation = true;
            $scope.message = "Lease Added"
        }, function (error) {
            $scope.message = error.statusText + " " + error.status;
        });
    } // close function

    $scope.addAnother = function () {
        $scope.modelAdd = {
            leaseId: "",
            startDate: "",
            endDate: "",
            monthlyRent: "",
            securityDeposit: "",
            terms: "",
            apartmentId: "",
            tenantId: "",
            tenantName: ""
        };
        $scope.message = "";
        $scope.form.$setPristine();
        $scope.showConfirmation = false;
    }

    function getLease() {
        var allLeases = leaseService.getAllLease();
        allLeases.then(function (response) {
            $scope.leases = response.data;
            console.log($scope.leases);
        }, function (error) {
            $scope.message = error.statusText;
        })
    } // close function

    $scope.getLeaseById = function () {
        var leaseById = leaseService.getByIdLease($scope.leaseId);
        leaseById.then(function (response) {
            $scope.securityDeposit = response.data[0].SecurityDeposit;
            $scope.monthlyRent = response.data[0].MonthlyRent;
            $scope.terms = response.data[0].Terms;
            $scope.apartmentId = response.data[0].Apartment.ApartmentNumber;
            $scope.tenantId = response.data[0].TenantId;
            $scope.tenantName = response.data[0].Tenant.FirstName + ' ' + response.data[0].Tenant.LastName;
            console.log(response);
            if (response.data[0].StartDate != null) {
                $scope.startDate = new Date(response.data[0].StartDate.replace('T', ' ').replace('-', '/'));
                $scope.startDateDetail = $scope.startDate.toString().substring(0, 15);
            }
            if (response.data[0].EndDate != null) {
                $scope.endDate = new Date(response.data[0].EndDate.replace('T', ' ').replace('-', '/'));
                $scope.endDateDetail = $scope.endDate.toString().substring(0, 15);
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

   

    $scope.searchTenant = function () {

    }

}