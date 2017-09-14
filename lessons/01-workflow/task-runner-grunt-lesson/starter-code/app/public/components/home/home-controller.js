angular.module('gruntApp')

.controller('homeController', function($scope) {
  $scope.grunt = {
    description: 'task runner',
    purpose: 'Automation!'
  };
});