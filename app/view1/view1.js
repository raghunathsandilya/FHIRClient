'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$rootScope','$http','$uibModal','$log',function($scope,$rootScope,$http,$uibModal, $log, $document,modalInstance) {
    var $ctrl = this;
    var $ctrls = this;
    $ctrl.animationsEnabled = true;


    $ctrl.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        $rootScope.modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'View1Ctrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });


        $rootScope.modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $ctrl.cancel = function () {
        $rootScope.modalInstance.dismiss();
    };


    $ctrls.noauthopen = function (size,parentSelector) {
        var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo1 ' + parentSelector)) : undefined;
        $rootScope.modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title1',
            ariaDescribedBy: 'modal-body1',
            templateUrl: 'myModalContent1.html',
            controller: 'View1Ctrl',
            controllerAs: '$ctrls',
           size: size,
           // component: 'modalComponent',
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });
        console.log($scope.modalInstances);

        $rootScope.modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }


    $ctrls.cancel = function () {
        console.log($rootScope.modalInstance);
        $rootScope.modalInstance.dismiss();
    };

    $scope.authorizeserver=function(authurl1) {
      $http({
          url: "https://fhirtest.sitenv.org/fhirserver/fhir/metadata?_format=json",
          type: "GET"
      }).then(function success(data) {
          console.log("in success http");
          console.log(data.data);

          var arg =data.data.rest[0].security.extension[0].extension;
          console.log(arg);
          for(var i=0;i<arg.length;i++){
              if (arg[i].url === "register") {
                 var regurl = arg[i].valueUri;
              } else if (arg[i].url === "authorize") {
                 var authurl = arg[i].valueUri;
                //  console.log(authurl);
                  localStorage.setItem('authurl',authurl);
                  var authurl1=localStorage.getItem('authurl');
                 // console.log(authurl1);
                  var queryParams={
                      "client_id":$scope.clientid,
                      "client_secret":$scope.clientsecret,
                      "scope":$scope.clientscope,
                      "serverurl":$scope.serverurl
                  }
                  var redirect_uri="http://localhost:8000";
                  var response_type="code";
                  var baseurl=authurl1+"?scope="+$scope.clientscope+"&client_id="+$scope.clientid+"&redirect_uri="+redirect_uri+ "&response_type="+response_type;
                    console.log(baseurl);
              } else if (arg[i].url === "token") {
                 var tokenurl = arg[i].valueUri;
                 // console.log(tokenurl);
                  localStorage.setItem('tokenurl',tokenurl);
                  var tokenurl1=localStorage.getItem('tokenurl');
                 // console.log(tokenurl1);

              }

          }

        },function error(response) {
                  console.log("error");
              });
        /*var queryParams={
            "client_id":$scope.clientid,
            "client_secret":$scope.clientsecret,
            "scope":$scope.clientscope,
            "serverurl":$scope.serverurl
        }
        var redirect_uri="http://localhost:8000";
        var response_type="code";
        var baseurl=authurl1+"?scope="+$scope.clientscope+"&client_id="+$scope.clientid+"&redirect_uri="+redirect_uri+ "&response_type="+response_type;

        console.log(authurl1);
        console.log(baseurl);*/




    };
}]);