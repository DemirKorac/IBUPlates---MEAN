function addController($scope,$http){
    $scope.addActivity = function(){
      var time= $scope.activity.time
      var action= $scope.activity.action
      var registration= $scope.activity.registration
      var detailsid = localStorage.getItem('detailsid');
        $http.post('/api/activities/', { 'registration':registration, 'detailsid':detailsid,'time':time,'action':action }, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          //$scope.activity = response.data;
          window.location.href = '/';
        });
      }
      $scope.getPlates = function(){
        $http.get('/api/plates/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.plates = response.data;
        });
      }

      $scope.getActions = function(){
        $http.get('/api/actions/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.actions = response.data;
        });
      }
}