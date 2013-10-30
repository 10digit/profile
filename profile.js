angular.module('10digit.profile', ['ui.mask', '10digit.utils', 'ui.validate', 'ui.bootstrap.tooltip'])
.value('foo', 'bar')
.factory('ProfileConfig', function(){
    var config = {
        testMode: false,
        initialValues: {
            profile: {
                name: 'Calvin Froedge',
                email: 'calvin@numbergarage.com',
                password: 'Tester1234',
                confirm_password: 'Tester1234',
                phone: {phone: '8084461375'}
            }
        }
    };
    return config;
})

.factory('Profile', ['$ajax', function($ajax){
    var profile = {};

    return {
        profile: profile,
        load: function(){
            $ajax.run('members/me/profile', {
                success: function(res, status){
                    profile.name = res.name;
                    profile.email = res.email;
                    profile.phone = res.phones[0];
                }
            });
        },
        update: function(opts){
            var put = angular.copy(profile);
            $ajax.run('members/me/profile', {
                method: 'PUT',
                data: put,
                success: function(res, status){
                    if(opts.success){ 
                        opts.success(res);
                    }
                }
            });
        }
    };
}])

.controller('ProfileCtrl', ['$scope', 'Profile', 'ProfileConfig', function($scope, Profile, Config){
    $scope.profile = Profile.profile;

    if($scope.signup && Config.testMode){
        $scope.profile = Config.initialValues.profile;
    }

    if(!$scope.signup){
        Profile.load();
    }

    $scope.update = function(){
        Profile.update({
            success: function(){
                $scope.success = "Profile updated successfully.";
            }
        });
    };
}])

.directive('profile', function () {
  return {
    restrict:'E',
    controller:'ProfileCtrl',
    transclude: true,
    replace: false,
    templateUrl: 'template/10digit/profile.html'
  };
});
