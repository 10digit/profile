'use strict';

describe('profile', function(){
    var $httpBackend, $rootScope, createController;

    beforeEach(module('10digit.profile'));
    beforeEach(inject(function($injector){
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        var $controller = $injector.get('$controller');
        $httpBackend.when('GET', '/api/members/me/profile').respond({name: 'Foo', email: 'foo@bar.com', phones: [{id: 1, phone: '2220334422'}]});

        createController = function(){
            return $controller('ProfileCtrl', {$scope: $rootScope});
        }
    }));

    it('should enter testing mode when asked', inject(function(ProfileConfig){
        ProfileConfig.testMode = true;
        expect(ProfileConfig.testMode).toEqual(true);
    }));


    it('should load the profile when not in signup', inject(function(Profile, ProfileConfig){
        createController();
        $httpBackend.flush();
    }));

    afterEach(function(){
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
