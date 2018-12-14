var app=angular.module("shopApp",[]);
app.controller('shopCtrl', function($scope,$http,$window) {
	$http({
	method:'GET',
	url: '/shop'
	}).then(function successCallback(response) {
	$scope.shop=response.data
	}, function errorCallback(response) {
	$scope.shop=[]
	});
	
	$scope.msg="Shop"

$scope.updateShop=function(item){
	$http({
	method:'POST',
	url: '/updateShop', 
	data: item
	}).then(function successCallback(response) {
	$scope.msg="Updated!"
	}, function errorCallback(response) {
	$scope.msg="Server problem, try again later"
	});
}
})