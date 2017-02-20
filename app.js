var app = angular.module('localDeals', [
    'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider ,$httpProvider) {
    $stateProvider
        .state("home", {
            url: '/home',
            templateUrl: 'templates/mainpage.html'
        })
        .state("shopkeeper", {
            url: '/shopkeeper',
            templateUrl: 'templates/shopkeeper.html'
        })
        .state("register", {
        	url: '/register',
        	templateUrl: 'templates/register.html'
        })
        .state("login", {
        	url:'/login',
        	templateUrl:'templates/login.html' 
        })
        .state("logout", {
            url:'/home',
            controller : "logoutController" 
        });
        $urlRouterProvider.otherwise('/home');

        $httpProvider.interceptors.push('authInterceptor');
        
})
