function platesController($scope,$http,$location,$route,$routeParams, toastr){
	var platesuser = localStorage.getItem('detailsid');
	$scope.getPlates = function(){
		
		$http.get('/api/plates/'+platesuser, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.plates = response.data;
			
		});
	}

	
	$scope.addRegistration = function(){
		var plate = $scope.registration.plate;
		var ownerid = localStorage.getItem('detailsid');
        $http.post('/api/plates/', { 'plate':plate, 'ownerid':ownerid }, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
		  $location.path('/plates');
		  toastr.success('You have successfully added a new registration!', 'Success');
        });
			}
			
	$scope.deleteRegistration = function(id){
		var id = id;
		$http.delete('/api/plates/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$route.reload();
			toastr.success('You have successfully removed selected registration!', 'Success');
		});
	}

	$scope.showSelectedRegistration = function(){
		var id = $routeParams.id;
		$http.get('/api/plates/'+ id, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$scope.registration = response.data;
		});
	}

	$scope.updateRegistration = function(){
		var id = $routeParams.id;
		$http.put('/api/plates/'+ id , $scope.registration, {headers: {'x-access-token': localStorage.getItem('user')}}).then(function(response){
			$route.reload();
		});
	}
}