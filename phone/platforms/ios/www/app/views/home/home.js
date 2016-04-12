/**
 * @author Rashmi
 * @date Jan'04 2016
 *
 */

angular.module('Social')
  .controller('HomeController', ['$log', '$scope', '$http', '$location', '$ionicPopup', '$timeout', '$ionicLoading', '$q', '$state', '$window', 'RestURL',
    function ($log, $scope, $http, $location, $ionicPopup, $timeout, $ionicLoading, $q, $state, $window, RestURL) {

      var self = $scope;

      self.user = {};
      self.init = function () {
        $log.log('Initializing login controller!');
      };

      /**
       * Facebook Login implementation
       */

      // This is the success callback from the login method
      var fbLoginSuccess = function (response) {
        if (!response.authResponse) {
          fbLoginError("Cannot find the authResponse");
          return;
        }

        var authResponse = response.authResponse;

        getFacebookProfileInfo(authResponse)
          .then(function (profileInfo) {
            console.log("profileInfo.id" + profileInfo.id);
            $ionicLoading.hide();
            $state.go('home');
          }, function (fail) {
            // Fail get profile info
            console.log('profile info fail', fail);
          });
      };

      // This is the fail callback from the login method
      var fbLoginError = function (error) {
        console.log('fbLoginError', error);
        $ionicLoading.hide();
      };

      // This method is to get the user profile info from the facebook api
      var getFacebookProfileInfo = function (authResponse) {
        var info = $q.defer();

        facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
          function (response) {
            console.log(response);
            info.resolve(response);
          },
          function (response) {
            console.log(response);
            info.reject(response);
          }
        );
        return info.promise;
      };

      //This method is executed when the user press the "Login with facebook" button
      $scope.facebookSignIn = function () {
        facebookConnectPlugin.getLoginStatus(function (success) {
          if (success.status === 'connected') {
            // The user is logged in and has authenticated your app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed request, and the time the access token
            // and signed request each expire
            console.log('getLoginStatus', success.status);
            $scope.showAlert("FB status : " + success.status);
            getFacebookProfileInfo(success.authResponse)
              .then(function (profileInfo) {
                $scope.showAlert("User ID....... " + profileInfo.id);
                $state.go('home');
              }, function (fail) {
                // Fail get profile info
                console.log('profile info fail', fail);
              });
          } else {
            // If (success.status === 'not_authorized') the user is logged in to Facebook,
            // but has not authenticated your app
            // Else the person is not logged into Facebook,
            // so we're not sure if they are logged into this app or not.

            console.log('getLoginStatus', success.status);
            $ionicLoading.show({
              template: 'Logging in...'
            });

            // Ask the permissions you need. You can learn more about
            // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
            facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
          }
        });
      };

      /*.......FB END ......*/

      /**
       * G+ login implementation
       */

      $scope.isAvailable = function () {
        $window.plugins.googleplus.isAvailable(function (avail) {
          $scope.showAlert(avail);
        });
      };

      $scope.login = function () {
        $ionicLoading.show();
        $window.plugins.googleplus.login(
          {},
          function (obj) {
            $scope.showAlert("Heeey: " + obj.email);
            $ionicLoading.hide();

            $state.go('organization');
            //document.querySelector("#feedback").innerHTML = "Hi, " + obj.displayName + ", " + obj.email;
          },
          function (msg) {
            $scope.showAlert("ERROR: " + msg);
          }
        );
      };

      self.init();

      $scope.showAlert = function (msg) {
        var alertPopup = $ionicPopup.alert({
          title: 'Message',
          template: msg
        });

        alertPopup.then(function (res) {
          console.log('Thanks');
        });
      };

    }]);
