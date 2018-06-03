function actionsController($scope,$http,$location,$route,$routeParams,toastr){

	$scope.getActions = function(){
		$http.get('/api/actions/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.actions = response.data;
		});
	}

	$scope.addAction = function(){
        $http.post('/api/actions/', $scope.action, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
          $location.path('/actions');
        });
	}

	$scope.deleteAction = function(id){
		var id = id;
		$http.delete('/api/actions/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$route.reload();
			toastr.success('You have successfully removed selected action!', 'Success');
		});
	}

	$scope.showSelectedAction = function(){
		var id = $routeParams.id;
		$http.get('/api/actions/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.action = response.data;
		});
	}

	$scope.updateAction = function(){
		var id = $routeParams.id;
		$http.put('/api/actions/'+ id , $scope.action, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$location.path('/actions');
			toastr.success('You have successfully updated selected action!', 'Success');
		});
	}
}