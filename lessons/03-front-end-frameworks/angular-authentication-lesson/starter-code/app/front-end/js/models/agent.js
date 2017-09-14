angular
  .module('mi6')
  .factory('Agent', Agent);

Agent.$inject = ['$resource', 'API'];
function Agent($resource, API) {
  
  return $resource(
    API+'/agents/:id',
    {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: true},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' }
    }
  );
}