function editController($scope,$routeParams,$http){

	$scope.getPlates = function(){
		$http.get('/api/plates/', {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.plates = response.data;
		});
	};
	$scope.updateActivity = function(){
		var id = $routeParams.id;
		$http.put('/api/activities/'+ id , $scope.activity, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.activity = response.data;
			//window.location.href = '/';
		});
	};
	$scope.showActivity = function(){
		var id = $routeParams.id;
		$http.get('/api/activities/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.activity = response.data;
		});
	};
}