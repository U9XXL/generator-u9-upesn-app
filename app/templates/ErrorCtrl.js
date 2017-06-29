
angular.module('<%= appId %>')

.controller('ErrorCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
    $scope.msg = $stateParams.msg;
}]);
