var app=angular.module("orderApp",[]);
app.controller('orderCtrl', function($scope,$http){
    $scope.editingData = [];
    
    $http({
      method: 'GET',
      url: '/showOrders'
  }).then(function successCallback(response) {
    $scope.orders=response.data
    for (var i = 0, length = $scope.orders.length; i < length; i++) {
      $scope.editingData[i] = false;
  }
}, function errorCallback(response) {
    $scope.orders=[]
});

  $scope.msg="Orders"
  $scope.edit = function(index){
    $scope.editingData[index] = true;
};


$scope.save = function(){
    for (var i = 0, length = $scope.orders.length; i < length; i++) {
      if( $scope.editingData[i])
        $scope.quantity=parseInt($scope.orders[i].quantity)
  }
  $http({
      method: 'POST',
      url: '/saveOrders',
      data:$scope.orders
  }).then(function successCallback(response) {

    $scope.msg="Saved!"

}, function errorCallback(response) {
    $scope.msg="Sorry, server problem, try again!"
});


  for (var i = 0, length = $scope.orders.length; i < length; i++) {
      $scope.editingData[i] = false;
  }
}   
})