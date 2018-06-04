function addController($scope,$http){
  var platesuser = localStorage.getItem('detailsid');
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
        $http.get('/api/plates/'+platesuser, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.plates = response.data;
        });
      }
      $scope.addUser = function(){
        var username= $scope.user.username
        var password= $scope.user.password
        var firstname= $scope.user.firstname
        var lastname= $scope.user.lastname
          $http.post('/api/users/', { 'username':username, 'password':password,'firstname':firstname,'lastname':lastname }, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
           
            window.location.href = '/';
          });
        }

      $scope.getActions = function(){
        $http.get('/api/actions/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $scope.actions = response.data;
        });
      }
}