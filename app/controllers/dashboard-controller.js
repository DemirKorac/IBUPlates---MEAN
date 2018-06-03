function DashboardController($scope, $route, $routeParams, $http){
  
  $scope.getActivities = function(){
    $http.get('/api/activities/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
      $scope.activities = response.data;
    });
  }
  $scope.deleteActivity = function(id){
    var id = id;
    $http.delete('/api/activities/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
      $route.reload();
    });
  }
}