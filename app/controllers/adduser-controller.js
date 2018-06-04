function addUserController($scope,$http){
      $scope.addUser = function(){
        var username= $scope.user.username
        var password= $scope.user.password
        var firstname= $scope.user.firstname
        var lastname= $scope.user.lastname
          $http.post('/api/adduser/', { 'username':username, 'password':password,'firstname':firstname,'lastname':lastname }, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
           
            window.location.href = '/';
          });
        }
        
  }