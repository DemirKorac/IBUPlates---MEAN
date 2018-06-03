myApp.controller('sidebarCtrl', function($scope, $location, $http, toastr){
    $scope.firstname=localStorage.getItem('detailsfirst');
    $scope.lastname=localStorage.getItem('detailslast');
    $scope.check_login = function(){
        if(localStorage.getItem('user')){
            return true;
        }
        return false;
    }

    $scope.login = function(credentials){
        $http.post('/api/authenticate', credentials).then(function(response){
            if (typeof response.data.token != 'undefined'){
                localStorage.setItem('user',response.data.token);
                localStorage.setItem('detailsfirst',response.data.firstname);
                localStorage.setItem('detailslast',response.data.lastname);
                localStorage.setItem('detailsadmin',response.data.admin);
                localStorage.setItem('detailsid',response.data._id);
                toastr.success('You have successfully logged in!', 'Welcome');
            }else if(response.data.user == false){
                toastr.error('No User Found', 'Login Error');
            }else{
                toastr.warning('Wrong Password', 'Login Error');
            }
        }),function(error){
            console.log(error);
        }
    }

    $scope.logout = function(){
        localStorage.clear();
    }

    $scope.getClass = function (path) {
        if (path == '/dashboard' && $location.path() == '/') return 'active';
        return ($location.path() === path) ? 'active' : '';
    }

    $scope.openNavigationDrawer = function(){
        if ($scope.mobileNavigationOpen == 'nav-open'){
            $scope.mobileNavigationOpen = '';
        }else{
            $scope.mobileNavigationOpen = 'nav-open';
        }
        
    }
    $scope.menuItemClicked = function(){
        $scope.mobileNavigationOpen = '';
    }

});