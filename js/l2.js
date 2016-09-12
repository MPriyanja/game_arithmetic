
var app = angular.module('tutorialWebApp', ['ngRoute']);

/**
 * Configure the Routes
 */


app.config(['$routeProvider', function ($routeProvider) {
 
  $routeProvider
   
    .when("/level2", {templateUrl: "partials/level2.html", controller: "level2Ctrl"}); 
    
}]);

app.controller('level2Ctrl', function ($scope,$window) {
  $(document).ready(function(){
    $('.tooltipped').tooltip({delay: 50});
  });