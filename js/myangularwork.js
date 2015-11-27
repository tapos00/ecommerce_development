(function(){
    var app = angular.module("myApp",[]);

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

    app.controller("myCtrl",['$scope','$http',function($scope,$http){
        $scope.productList = [];
        $scope.selectpro = null;
        $http.get('/productlist.json').then(function(response){
            $scope.productList = response.data;
        }, function(){

        });
        $scope.seletedProduct = function(aCategory){
            $scope.selectpro = aCategory;
        };
        $scope.clicktoselect = function(aproduct){
            return $scope.selectpro ==null || $scope.selectpro == aproduct.category;
        };
        $scope.selectactive = function(category){
            return category==$scope.selectpro ? "active":null;
        }
    }]);
})();
