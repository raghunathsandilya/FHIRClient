'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
      .when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$uibModal','$log','$scope',function($uibModal, $log, $document) {
    var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];

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
    $ctrl.ok = function () {
        $uibmodalInstance.close($ctrl.selected.item);
    };

    $ctrl.cancel = function () {
        $uibView1Ctrl.dismiss('cancel');
    };

   /* $ctrl.openComponentModal = function () {
        var modalInstance = $uibModal.open({
            animation: $ctrl.animationsEnabled,
            component: 'modalComponent',
            resolve: {
                items: function () {
                    return $ctrl.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $ctrl.selected = selectedItem;
        }, function () {
            $log.info('modal-component dismissed at: ' + new Date());
        });
    };

    $ctrl.openMultipleModals = function () {
        $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title-bottom',
            ariaDescribedBy: 'modal-body-bottom',
            templateUrl: 'stackedModal.html',
            size: 'sm',
            controller: function($scope) {
                $scope.name = 'bottom';
            }
        });

        $uibModal.open({
            animation: $ctrl.animationsEnabled,
            ariaLabelledBy: 'modal-title-top',
            ariaDescribedBy: 'modal-body-top',
            templateUrl: 'stackedModal.html',
            size: 'sm',
            controller: function($scope) {
                $scope.name = 'top';
            }
        });
    };*/
}]);