angular.module('gruntApp')

.controller('homeController', ["$scope", function($scope) {
  $scope.grunt = {
    description: 'task runner',
    purpose: 'Automation!'
  };
}]);