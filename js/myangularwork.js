(function () {
    var app = angular.module("myApp", ['ngRoute','cart']);

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
                templateUrl: 'partial/cart.html',
                controller: 'CartCtrl'

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
            .when('/product/:productId', {
                templateUrl: 'partial/single.html',
                controller: 'ProductDetailCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    });
    app.filter('uniqueCategory', function () {
        return function (allproduct) {
            if (angular.isArray(allproduct)) {
                var cat = {};
                var catlist = [];
                angular.forEach(allproduct, function (aproduct) {
                    var nowcat = aproduct.Categories;
                    if (angular.isUndefined(cat[nowcat])) {
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
                    var nowcat = aproduct.Categories;
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
    app.directive('myLeft', function() {
          return {
            restrict: 'E',
            templateUrl: 'partial/left_side.html'
          };
    });




    app.controller("myCtrl", ['$scope', '$http', '$location','cart', function ($scope, $http, $location,cart) {
        $scope.productList = [];
        $scope.selectpro = null;

        $http.get('/productlist_latest.json').then(function (response) {
            $scope.productList = response.data;
        }, function () {

        });
        $scope.seletedProduct = function (aCategory) {
            $scope.selectpro = aCategory;
        };
        $scope.clicktoselect = function (aproduct) {
            return $scope.selectpro == null || $scope.selectpro == aproduct.Categories;
        };
        $scope.selectactive = function (category) {
            return category == $scope.selectpro ? "active1" : null;
        };
        $scope.isActive = function (viewLocation) {
            var active = (viewLocation === $location.path());
            return active;
        };
        $scope.addProduct = function(aproduct){
            cart.addProduct(aproduct);
        };
    }]);
    app.controller('ProductDetailCtrl', ['$scope', '$routeParams',function($scope, $routeParams) {
            $scope.productId = $routeParams.productId;
            $scope.selectedProduct = {};
            angular.forEach($scope.productList, function(aproduct) {
                if(aproduct.ID == $scope.productId){
                    $scope.selectedProduct = aproduct;

                }
            });
            $scope.seletedimage = null;
            $scope.getImageZoom = function(image){
                $scope.seletedimage = image;
            }

        }]);

    app.controller("CartCtrl", ['$scope', '$http', '$location','cart', function ($scope, $http, $location,cart) {
        $scope.allCartProduct = cart.getProducts();
    }]);
    
})();
