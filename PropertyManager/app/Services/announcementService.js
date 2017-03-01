angular.module("common.services").factory("announcementService", ["$http", "$q", "appSettings", announcementService]);
function announcementService($http, $q, appSettings) {

    this.addAnnouncement = function (announcement) {
        var accessToken = sessionStorage.getItem('accessToken');
        //var authHeaders = {};
        //if (accessToken) {
        //authHeaders.Authorization = 'Bearer ' + accessToken;
        //}
        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/announcements",
            method: "POST",
            data: announcement,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    this.getAllAnnouncement = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/Announcements",
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.getByIdAnnouncement = function (announcementId) {
        var response = $http({
            url: appSettings.serverPath + "/api/Announcements/" + announcementId,
            method: "GET",
            //headers: authHeaders
        });
        return response;
    };

    this.editAnnouncement = function (announcement, announcementId) {

        var def = $q.defer();
        $http({
            url: appSettings.serverPath + "/api/announcements/" + announcementId,
            method: "PUT",
            data: announcement,
        }).then(function (response) {
            def.resolve(response);
        }, function (err) {
            def.reject(err);
        });
        return def.promise;
    };

    return {
        addAnnouncement: this.addAnnouncement,
        getAllAnnouncement: this.getAllAnnouncement,
        getByIdAnnouncement: this.getByIdAnnouncement,
        editAnnouncement: this.editAnnouncement
    }


}