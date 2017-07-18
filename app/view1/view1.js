'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$uibModal','$log','$scope',function($uibModal, $log, $document,modalInstance) {
    var $ctrl = this;
    $ctrl.animationsEnabled = true;


    $ctrl.open = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
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


        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $ctrl.cancel = function (modalInstance) {
       modalInstance.dismiss('cancel');
    };


    $ctrl.noauthopen = function (size,parentSelector) {
        var parentElem = parentSelector ?
        angular.element($document[0].querySelector('.modal-demo1 ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title1',
            ariaDescribedBy: 'modal-body1',
            templateUrl: 'myModalContent1.html',
            controller: 'View1Ctrl',
            controllerAs: '$ctrl',
           size: size,
           // component: 'modalComponent',
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });
    }
}]);