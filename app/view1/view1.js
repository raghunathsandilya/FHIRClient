'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$rootScope','$uibModal','$log','$scope',function($scope,$rootScope,$uibModal, $log, $document,modalInstance) {
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
    $scope.authorizeserver=function() {
            var client_id="";
          	var client_secret="1234567";
          	var scope="user*/*";
            var redirect_uri="http://localhost:8000";
            var response_type="codein";
           	var url="http://FHIRClient/authorizeserver?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+ "&response_type="+response_type;
          	//window.location.replace(url);
          	console.log(url);
            };
}]);