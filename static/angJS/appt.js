var app=angular.module("apptApp",[]);
app.controller('apptCtrl', function($scope, $http, $window){
    $http({
  method: 'GET',
  url: '/appointment'
}).then(function successCallback(response) {
    $scope.items=response.data
  }, function errorCallback(response) {
    $scope.items=[]
  });
    $scope.cart=JSON.parse(localStorage.getItem("appt"))
    if ($scope.appt==null) {
        $scope.appt=[]
        $scope.numItems=0
    }
    else {
}
$scope.makeAppt=function() {
    var apptData = []
    apptData.push($scope.appt)
    var custom = [{firstName:$scope.first_name}, {lastName:$scope.last_name}, {customID:$scope.phone_num}, {email:$scope.appt_email}, {dropOff:$scope.drop_off}, {pickUp:$scope.pick_up}, {userMessage:$scope.user_message}]
    apptData.push(custom)

    $http({
        method: 'POST',
        url: '/makeAppt',
        data: checkoutData,
    }).then(function successCallback(response) {
        $scope.msg = "Your dog boarding appointment has been booked!"
    }, function errorCallback (response) {
        $scope.msg = "Error. Try again."
    });
}
})