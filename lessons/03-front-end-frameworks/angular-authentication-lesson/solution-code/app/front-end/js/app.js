angular
  .module('mi6', ['angular-jwt', 'ngResource'])
  .constant('API', 'http://localhost:3000/api')
  .config(function($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  })