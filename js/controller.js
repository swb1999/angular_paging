var app = angular.module("myApp", []);
app.controller("myController", ["$scope", "myFactory", "myConstant", function($scope, myFactory, myConstant) {
    $scope.firstPage = 1; // 起始页
    $scope.pageNum = myConstant.pageNum; //页数
    $scope.currentPage = 1; // 当前点击页
    $scope.sub = function(page) {
        $scope.lastPage = Math.ceil(myConstant.length / myConstant.amount);
        $scope.firstPage = page >= $scope.pageNum ? page - Math.floor($scope.pageNum / 2) : 1;
        if ($scope.firstPage > $scope.lastPage - $scope.pageNum) {
            $scope.firstPage = $scope.lastPage - $scope.pageNum + 1;
        }
        $scope.pages = myFactory.setPage(myConstant.length, myConstant.amount, myConstant.pageNum, $scope.firstPage);
        $scope.currentPage = page;
    }
    $scope.sub($scope.currentPage);
}]);
app.factory("myFactory", function() {
    return {
        setPage: function(length, amount, num, first) {
            var pages = [],
                page = 0;
            page = Math.ceil(length / amount);
            if (page <= num) {
                for (var i = 1; i <= page; i++) {
                    pages.push(i);
                }
            } else {
                for (var i = first; i < first + num; i++) {
                    pages.push(i);
                }
            }
            return pages;
        }
    }
})
app.constant("myConstant", {
    "length": 100,
    "amount": 8,
    "pageNum": 5
})