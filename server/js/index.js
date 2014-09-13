var annotateApp = angular.module('Annotate', ['ngRoute', 'localStorageModule']);

annotateApp.controller('AnnotateCtrl', function($scope, $storage, annotationFactory) {
	var annotateStorage = $storage('annotate');

	$scope.setup = function() {
		annotationFactory.data(function(response) {
			var snippets = response.snippets;
			var snippetTags = response.tags;
	    	annotateStorage.setItem('annotations', response);
	    	$scope.snippets = snippets;
	    	$scope.snippetTags = snippetTags;
	  	});		
	}

	$scope.retrieve = function() {
	  	console.log(annotateStorage.getItem('annotations'));
	}

	$scope.setup();
});


annotateApp.config(function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'templates/annotation.html',
      controller: 'AnnotateCtrl'
    })
});

annotateApp.factory('annotationFactory', function($http){
  return {
    data: function (callback){
      $http({
        method: 'GET',
        url: 'sample.json',
      }).success(callback);
    }
  };
});
