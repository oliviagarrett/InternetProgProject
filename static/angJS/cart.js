var app=angular.module("cartApp",[]);
app.controller('cartCtrl', function($scope, $http, $window){
    $http({
  method: 'GET',
  url: '/shop'
}).then(function successCallback(response) {
    $scope.items=response.data
  }, function errorCallback(response) {
    $scope.items=[]
  });
 	$scope.cart=JSON.parse(localStorage.getItem("cart"))
    if ($scope.cart==null) {
        $scope.cart=[]
        $scope.total=0.0
        $scope.numItems=0
    }
    else {
    $scope.numItems=$scope.cart.reduce((total, item) => total + item.quantity,0)
}
    $scope.addToCart=function(item) {
     let index=$scope.cart.findIndex(x=>x.itemName==item.itemName)
    if(index==-1)
    {
        item.quantity=1
        $scope.cart.push(item)
    }
    else
        $scope.cart[index].quantity+=1

    $scope.numItems+=1
    localStorage.setItem("cart", JSON.stringify($scope.cart))
}

$scope.removeFromCart=function(item) {
    let index=$scope.cart.findIndex(x=>x.name==item.name)
        $scope.cart[index].quantity-=1
        $scope.cart.splice(item, 1) 
        $scope.numItems-=1
        localStorage.setItem("cart", JSON.stringify($scope.cart))
        $scope.calcTotalPrice()
}


$scope.clearCart=function() {
    $scope.cart.splice(0, $scope.numItems)
    $scope.numItems=0
    localStorage.clear()
    localStorage.setItem("cart".JSON.stringify($scope.cart))
}

$scope.calcTotalPrice=function() {
    var total=0;
    for(var i in $scope.cart) {
        total += $scope.cart[i].price*$scope.cart[i].quantity
    }
    $scope.total = total
}
 
$scope.checkout=function() {
    $window.location.href = "checkout.html";
}


$scope.placeOrder=function() {
    var checkoutData = []
    checkoutData.push($scope.cart)
    var custom = [{customID:$scope.phone}, {email:$scope.email}]
    checkoutData.push(custom)

    $http({
        method: 'POST',
        url: '/placeOrder',
        data: checkoutData,
    }).then(function successCallback(response) {
        $scope.msg = "Thank you for your order!"
        $scope.clearCart()
    }, function errorCallback (response) {
        $scope.msg = "Error. Try again."
    });
}
})