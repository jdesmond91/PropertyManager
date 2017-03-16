angular.module("propertyManagerApp").controller("facilityBookingController", ["$scope", "$filter", "facilityBookingService", "userProfile", facilityBookingController]);

function facilityBookingController($scope, $filter, facilityBookingService, userProfile) {

    $scope.StartTime = "";
    $scope.EndTime = "";
    $scope.Notes = "";
    $scope.BookedDate = "";

    //NEED TO INCLUDE TENANT ID AND FACILITY ID

    $scope.Id = "";
    $scope.facilityBookings = [];
    $scope.message = "";

    $scope.addFacilityBooking = function () {
        var BookedDateFiltered = null;

        if ($scope.BookedDate != "") {
            BookedDateFiltered = $filter('date')($scope.BookedDate, "yyyy-MM-dd");
        }

        var facilityBooking = {
            StartTime: $scope.StartTime,
            EndTime: $scope.EndTime,
            Notes: $scope.Notes,
            BookedDate: BookedDateFiltered
        };

        var addResults = facilityBookingService.addFacilityBooking(facilityBooking);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.Id = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });
    } // close function

    $scope.getFacilityBooking = function () {
        var allFacilityBookings = facilityBookingService.getAllFacilityBooking();
        allFacilityBookings.then(function (response) {
            $scope.facilityBookings = response.data;
            console.log($scope.facilityBookings);
        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.getFacilityBookingById = function () {
        var facilityBookingById = facilityBookingService.getByIdFacilityBooking($scope.Id);
        facilityBookingById.then(function (response) {

            $scope.StartTime = response.data.StartTime;
            $scope.EndTime = response.data.EndTime;
            $scope.Notes = response.data.Notes;

            if (response.data.BookedDate != "") {
                $scope.BookedDate = new Date(response.data.BookedDate.replace('T', ' ').replace('-', '/'));
            }

        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editFacilityBooking = function () {

        var BookedDateFiltered = null;

        if ($scope.BookedDate != "") {
            BookedDateFiltered = $filter('date')($scope.BookedDate, "yyyy-MM-dd");
        }

        var facilityBooking = {
            Id: $scope.Id,
            StartTime: $scope.StartTime,
            EndTime: $scope.EndTime,
            Notes: $scope.Notes,
            BookedDate: BookedDateFiltered
        };

        var editResults = facilityBookingService.editFacilityBooking(facilityBooking, $scope.Id);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

}