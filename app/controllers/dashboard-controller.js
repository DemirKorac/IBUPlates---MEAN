function DashboardController($scope, $route, $routeParams, $http){
  $scope.firstname=localStorage.getItem('detailsfirst');
  $scope.lastname=localStorage.getItem('detailslast');
  var activityuser = localStorage.getItem('detailsid');
  $scope.admin=localStorage.getItem('detailsadmin');
  $scope.getActivities = function(){
    $http.get('/api/activities/'+ activityuser, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
      $scope.activities = response.data;
    });
  }

  
}