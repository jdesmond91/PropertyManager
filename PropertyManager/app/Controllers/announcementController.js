angular.module("propertyManagerApp").controller("announcementController", ["$scope", "$filter", "announcementService", "userProfile", announcementController]);

function announcementController($scope, $filter, announcementService, userProfile) {

    $scope.title = "";
    $scope.startDate = "";
    $scope.expireDate = "";
    $scope.announcementId = "";
    $scope.message = "";
    $scope.announces = [];

    $scope.addAnnouncement = function () {
        var startDateFiltered = null;
        var expireDateFiltered = null;

        if($scope.startDate != ""){
            startDateFiltered = $filter('date')($scope.startDate, "yyyy-MM-dd");            
        }
        if($scope.expireDate != ""){
            expireDateFiltered = $filter('date')($scope.expireDate, "yyyy-MM-dd");
        }

        var announcement = {
            Title : $scope.title,
            StartDate: startDateFiltered,
            ExpireDate: expireDateFiltered
        };

        var addResults = announcementService.addAnnouncement(announcement);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.announcementId = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });
    } // close function

    $scope.getAnnouncement = function () {
        var allAnnounces = announcementService.getAllAnnouncement();
        allAnnounces.then(function (response) {
            $scope.announces = response.data;
            console.log($scope.announces);
        }, function (error){
            $scope.message = response.statusText;       
        })

    } // close function

    $scope.getAnnouncementById = function () {
        var announceById = announcementService.getByIdAnnouncement($scope.announcementId);
        announceById.then(function (response) {
            $scope.title = response.data.Title;
            if (response.data.StartDate != "") {
                $scope.startDate = new Date(response.data.StartDate.replace('T', ' ').replace('-', '/'));
            }
            if (response.data.ExpireDate != "") {
                $scope.expireDate = new Date(response.data.ExpireDate.replace('T', ' ').replace('-', '/'));
            }
            
        }, function (error){
            $scope.message = response.statusText;
        })

    } // close function

    $scope.editAnnouncement = function () {

        var startDateFiltered = null;
        var expireDateFiltered = null;

        if ($scope.startDate != "") {
            startDateFiltered = $filter('date')($scope.startDate, "yyyy-MM-dd");
        }
        if ($scope.expireDate != "") {
            expireDateFiltered = $filter('date')($scope.expireDate, "yyyy-MM-dd");
        }

        var announcement = {
            Id: $scope.announcementId,
            Title: $scope.title,
            StartDate: startDateFiltered,
            ExpireDate: expireDateFiltered
        };

        var editResults = announcementService.editAnnouncement(announcement, $scope.announcementId);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function


}