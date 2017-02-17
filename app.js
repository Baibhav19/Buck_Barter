var app = angular.module('localDeals', [
    'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/mainpage.html'
        })
        .state('register',{
        	url: 'register' ,
        	templateUrl: 'templates/registration1.html'
        })
        .state('login',{
        	url:'login' ,
        	templateUrl:'templates/login.html' 
       })
})
