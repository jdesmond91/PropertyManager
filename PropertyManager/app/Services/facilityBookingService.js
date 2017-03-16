angular.module("common.services").factory("facilityBookingService", ["$http", "$q", "appSettings", facilityBookingService]);
function facilityBookingService($http, $q, appSettings) {

    this.addFacilityBooking = function (facilityBooking) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/FacilityBookings",
            method: "POST",
            data: facilityBooking,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllFacilityBooking = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/FacilityBookings",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdFacilityBooking = function (facilityBookingId) {
        var response = $http({
            url: appSettings.serverPath + "/api/FacilityBookings/" + facilityBookingId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editFacilityBooking = function (facilityBooking, facilityBookingId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/FacilityBookings/" + facilityBookingId,
            method: "PUT",
            data: facilityBooking,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    return {
        addFacilityBooking: this.addFacilityBooking,
        getAllFacilityBooking: this.getAllFacilityBooking,
        getByIdFacilityBooking: this.getByIdFacilityBooking,
        editFacilityBooking: this.editFacilityBooking
    }
    
}