(function () {
    var app = angular.module("myApp", ['ngRoute']);

    app.config(function ($routeProvider) {
        $routeProvider

        // route for the home page
            .when('/home', {
                templateUrl: 'partial/home.html'
            })

            // route for the about page
            .when('/blog', {
                templateUrl: 'partial/blog.html'
            })
            .when('/cart', {
                templateUrl: 'partial/cart.html'
            })
            .when('/checkout', {
                templateUrl: 'partial/checkout.html'
            })
            .when('/login', {
                templateUrl: 'partial/login.html'
            })
            .when('/404', {
                templateUrl: 'partial/404.html'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl: 'partial/contact.html'
                // controller: 'contactController'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });
    app.filter('uniqueCategory',function(){
       return function(allproduct) {
           if(angular.isArray(allproduct)){
               var cat = {};
               var catlist  = [];
               angular.forEach(allproduct, function(aproduct) {
                   var nowcat = aproduct.category;
                   if(angular.isUndefined(cat[nowcat])){
                       cat[nowcat] = true;
                       catlist.push(nowcat);
                   }
               });
               return catlist;
           }
           return allproduct;
       }
    });

    app.filter('uniqueCategory', function () {
        return function (allproduct) {
            if (angular.isArray(allproduct)) {
                var cat = {};
                var catlist = [];
                angular.forEach(allproduct, function (aproduct) {
                    var nowcat = aproduct.category;
                    if (angular.isUndefined(cat[nowcat])) {
                        cat[nowcat] = true;
                        catlist.push(nowcat);
                        console.log(cat);
                    }
                });
                return catlist;
            }
            return allproduct;
        }
    });

    app.controller("myCtrl", ['$scope', '$http','$location', function ($scope, $http,$location) {
        $scope.productList = [];
        $scope.selectpro = null;
        $http.get('/productlist.json').then(function (response) {
            $scope.productList = response.data;
        }, function () {

        });
        $scope.seletedProduct = function (aCategory) {
            $scope.selectpro = aCategory;
        };
        $scope.clicktoselect = function (aproduct) {
            return $scope.selectpro == null || $scope.selectpro == aproduct.category;
        };
        $scope.selectactive = function (category) {
            return category == $scope.selectpro ? "active1" : null;
        };
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
    }]);
})();
