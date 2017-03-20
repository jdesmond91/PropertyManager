angular.module("propertyManagerApp").controller("facilityBookingController", ["$scope", "$filter", "facilityBookingService", "userProfile", facilityBookingController]);

function facilityBookingController($scope, $filter, facilityBookingService, userProfile) {

    $scope.startTime = "";
    $scope.endTime = "";
    $scope.notes = "";
    $scope.bookedDate = "";
    $scope.sortType = "description";
    $scope.sortReverse = false;
    $scope.searchBooking = "";
    $scope.bookingId = "";
    $scope.facilityBookings = [];
    $scope.message = "";

    $scope.addFacilityBooking = function () {
        var bookedDateFiltered = null;

        if ($scope.BookedDate != "") {
            bookedDateFiltered = $filter('date')($scope.bookedDate, "yyyy-MM-dd");
        }

        var facilityBooking = {
            StartTime: $scope.startTime,
            EndTime: $scope.endTime,
            Notes: $scope.notes,
            BookedDate: bookedDateFiltered
        };

        var addResults = facilityBookingService.addFacilityBooking(facilityBooking);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.bookingId = response.data.Id;
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

            $scope.startTime = response.data.StartTime;
            $scope.endTime = response.data.EndTime;
            $scope.notes = response.data.Notes;

            if (response.data.BookedDate != null) {
                $scope.bookedDate = new Date(response.data.bookedDate.replace('T', ' ').replace('-', '/'));
            }

        }, function (error) {
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editFacilityBooking = function () {

        var bookedDateFiltered = null;

        if ($scope.BookedDate != "") {
            bookedDateFiltered = $filter('date')($scope.bookedDate, "yyyy-MM-dd");
        }

        var facilityBooking = {
            Id: $scope.bookingId,
            StartTime: $scope.startTime,
            EndTime: $scope.endTime,
            Notes: $scope.notes,
            BookedDate: bookedDateFiltered
        };

        var editResults = facilityBookingService.editFacilityBooking(facilityBooking, $scope.Id);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

    $scope.getFacilityBooking();

}