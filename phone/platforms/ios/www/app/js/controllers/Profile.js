/**
 * Created by Henrikh on 1/20/16.
 */

app.controller('Profile', ['$scope', '$state', '$http', '$ionicPopup', 'RestURL', 'People_testId', 'Settings',
    function ($scope, $state, $http, $ionicPopup, RestURL, People_testId, Settings) {

    var self = $scope;

    self.connectionMode = false;
    
    console.log('Profile');
    console.log(Settings.global);

    var chart = c3.generate({
        data: {
            columns: [
                ['canceled', 80],
                ['hired', 120]
            ],
            type: 'donut',
            colors: {
                canceled: '#f5f5f5',
                hired: '#387ef5'
            },
            onclick: function (d, i) {},
            onmouseover: function (d, i) {},
            onmouseout: function (d, i) {}
        },
        donut: {
            title: 'Job Success'
        }
    });
}]);