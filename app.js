var app = angular.module('localDeals', [
    'ui.router',
    'ngGeolocation' ,
    'uiGmapgoogle-maps'
]);

app.config(function($stateProvider, $urlRouterProvider ,$httpProvider) {
    $stateProvider
        .state("home", {
            url: '/home',
            templateUrl: 'templates/mainpage.html',
            controller:'mainpageController',
            controllerAs:'mpCtrl'
        })
        .state("shopkeeper", {
            url: '/shopkeeper',
            abstract : true ,
            templateUrl: 'templates/shopkeeper.html'
        })
        .state("shopkeeper.showProduct", {
            url: '/showProduct',
            templateUrl: 'templates/showProduct.html'
        })
        .state("shopkeeper.addProduct", {
            url: '/addProduct',
            templateUrl: 'templates/shopAddProduct.html'
        })
        .state("shopkeeper.updateProduct", {
            url: '/updateProduct',
            template: 'in processsss'
        })
        .state("shopkeeper.deleteProduct", {
            url: '/deleteProduct',
            template: 'temp'
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
