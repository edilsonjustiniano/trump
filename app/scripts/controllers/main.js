'use strict';

/**
 * @ngdoc function
 * @name trumpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the trumpApp
 */
angular.module('trumpApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    console.log("OAPPAPAPAP");
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    console.log($scope.awesomeThings);
  }]);
