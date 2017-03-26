var app = angular.module('localDeals', [
    'ui.router',
    'ngGeolocation' ,
    'uiGmapgoogle-maps' ,
    'ui.carousel'
]);

app.config(function($stateProvider, $urlRouterProvider ,$httpProvider) {
    $stateProvider
    .state("home", {
        url: '/home',
        templateUrl: 'templates/mainpage.html',
    })
    .state("shopkeeper", {
        url: '/shopkeeper',
        abstract : true ,
        templateUrl: 'templates/shopkeeper.html',
        resolve: { authenticate: authenticate }
    })
    .state("shopkeeper.showProduct", {
        url: '/showProduct',
        template: '<shop-dir></shop-dir>'
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
    .state("shopByStores", {
        url: "/shopByStores" ,
        templateUrl: 'templates/shopByStores.html'
    })
    .state("store_name", {
        url: "store_name/:store",
        template: "<product-dir></product-dir>"
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
    function authenticate($q, authToken, $state, $timeout) {
        if (authToken.isAuthenticated()) {
            return $q.when()
        } 
        else {
            $timeout(function() {
            // This code runs after the authentication promise has been rejected.
                $state.go('login')
            })
            // Reject the authentication promise to prevent the state from loading
            return $q.reject()
        }
    };
    
});