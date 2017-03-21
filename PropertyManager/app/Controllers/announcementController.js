angular.module("propertyManagerApp").controller("announcementController", ["$scope", "$filter", "announcementService", "userProfile", announcementController]);

function announcementController($scope, $filter, announcementService, userProfile) {

    $scope.title = "";
    $scope.startDate = "";
    $scope.expireDate = "";
    $scope.startDateDetail = "";
    $scope.expireDateDetail = "";
    $scope.description = "";
    $scope.announcementId = "";
    $scope.message = "";
    $scope.announces = [];
    $scope.sortType = "name";
    $scope.sortReverse = false;
    $scope.searchAnnouncement = "";

    getAnnouncement();

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
            ExpireDate: expireDateFiltered,
            Description: $scope.description
        };

        var addResults = announcementService.addAnnouncement(announcement);
        addResults.then(function (response) {
            console.log(response.data);
            $scope.announcementId = response.data.Id;
        }, function (error) {
            $scope.message = response.statusText + " " + response.status;
        });
    } // close function

    //GET ALL
    function getAnnouncement () {
        var allAnnounces = announcementService.getAllAnnouncement();
        allAnnounces.then(function (response) {
            $scope.announces = response.data;
            console.log($scope.announces);
        }, function (error){
            $scope.message = response.statusText;       
        })

    } // close function

    $scope.getAnnouncementById = function (id) {
        var announceById = announcementService.getByIdAnnouncement(id);
        announceById.then(function (response) {
            console.log(response.data);
            $scope.title = response.data.Title;
            $scope.description = response.data.Description;
            if (response.data.StartDate != null) {              
                $scope.startDate = new Date(response.data.StartDate.replace('T', ' ').replace('-', '/'));               
                $scope.startDateDetail = $scope.startDate.toString().substring(0, 15);
            }
            if (response.data.ExpireDate != null) {
                $scope.expireDate = new Date(response.data.ExpireDate.replace('T', ' ').replace('-', '/'));
                $scope.expireDateDetail = $scope.expireDate.toString().substring(0, 15);
            }
            
        }, function (error){
            $scope.message = response.statusText;
        })

    } // close function


    //EDIT SECTION
    $scope.isEdit = false; 

    $scope.changeEdit = function () {
        $scope.isEdit = false;
    }

    $scope.cancelEdit = function () {
        $scope.isEdit = false;
    }

    $scope.editClick = function (announce) {
        $scope.model = {
            title: announce.Title,
            editStartDate: new Date(announce.StartDate.replace('T', ' ').replace('-', '/')),
            editExpireDate: new Date(announce.ExpireDate.replace('T', ' ').replace('-', '/')),
            editDescription: announce.Description
        };
        $scope.isEdit = true;
    }

    $scope.editAnnouncement = function (announce) {

        var startDateFiltered = null;
        var expireDateFiltered = null;

        if ($scope.model.editStartDate != "") {
            startDateFiltered = $filter('date')($scope.model.editStartDate, "yyyy-MM-dd");
        }
        if ($scope.model.editExpireDate != "") {
            expireDateFiltered = $filter('date')($scope.model.editExpireDate, "yyyy-MM-dd");
        }

        var announcement = {
            Id: announce.Id,
            Title: $scope.model.title,
            StartDate: startDateFiltered,
            ExpireDate: expireDateFiltered,
            Description: $scope.model.editDescription
        };

        var editResults = announcementService.editAnnouncement(announcement, announce.Id);
        editResults.then(function (response) {
            console.log("edit");
            console.log(response);
        })
        .then(function () {
            $scope.isEdit = false;
            getAnnouncement();
        }, function (error) {
            $scope.message = response.statusText;
        }, function (error) {
            $scope.message = response.statusText;
        });
    } // close function

    
}