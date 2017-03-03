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
            template : '<add-product></add-product>'
        })
        .state("shopkeeper.updateProduct", {
            url: '/updateProduct',
            template: '<shop-dir></shop-dir>'
        })
        .state("shopkeeper.deleteProduct", {
            url: '/deleteProduct',
            template: '<shop-dir></shop-dir>'
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
