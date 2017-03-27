angular.module("common.services").factory("userService", ["$http", "$q", "appSettings", userService]);
function userService($http, $q, appSettings) {

    var accessToken = sessionStorage.getItem('accessToken');

    this.getAllUser = function () {
        var response = $http({
            url: appSettings.serverPath + "/api/user",
            method: "GET",
            headers: { Authorization: 'Bearer ' + accessToken },
        });
        return response;
    };

    this.getByEmailUser = function (tenantEmail) {
        var response = $http({
            url: appSettings.serverPath + "/api/user/email/" + tenantEmail + "/find",
            method: "GET",
            headers: { Authorization: 'Bearer ' + accessToken },
        });
        return response;
    };

    this.deleteUser = function (email) {
        var response = $http({
            url: appSettings.serverPath + "/api/user/" + email + "/delete",
            method: "DELETE",
            headers: { Authorization: 'Bearer ' + accessToken },
        });
        return response;
    };

    return {
        getAllUser: this.getAllUser,
        getByEmailUser: this.getByEmailUser,
        deleteUser: this.deleteUser
    }


}