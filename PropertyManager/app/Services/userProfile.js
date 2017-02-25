angular.module("common.services").factory("userProfile", userProfile);
function userProfile() {
    var setProfile = function (username, token, refreshToken) {
        sessionStorage.setItem('userName', username);
        sessionStorage.setItem('accessToken', token);
        sessionStorage.setItem('refreshToken', refreshToken);
    };

    var getProfile = function () {
        var profile = {
            isLoggedIn: sessionStorage.getItem('accessToken') != null,
            username: sessionStorage.getItem('userName'),
            token: sessionStorage.getItem('accessToken'),
            refreshToken: sessionStorage.getItem('refreshToken')
        };
        return profile;
    }
    return {
        setProfile: setProfile,
        getProfile: getProfile,
    }
}