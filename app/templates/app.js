
angular.module('<%= appId %>', ['ionic', 'ionicU9Upesn'])

.run(['$state', 'umobUser', 'umobJsBridge', function($state, umobUser, umobJsBridge) {
    umobUser.init.then(function() {
        return umobUser.checkLicense('<%= appId %>');
    }).then(function() {
        $state.go('home');
    }).finally(function() {
        if (window.yyesn) {
            umobJsBridge.call('configNavBar', {
                hide: 1,
                statusBarStyle: 0
            });
            ionic.requestAnimationFrame(function() {
                document.body.classList.remove('platform-preview');
            });
        }
    }).catch(function(err) {
        $state.go('error', { msg: err.msg });
    });
}])

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', 'umobStorageProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, umobStorageProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'tpls/home.html',
                controller: 'HomeCtrl'
            })
            .state('error', {
                url: '/error?msg',
                templateUrl: 'tpls/error.html',
                controller: 'ErrorCtrl'
            });

        $ionicConfigProvider.platform.android.scrolling.jsScrolling(true);
        $ionicConfigProvider.platform.android.navBar.alignTitle('center');
        $ionicConfigProvider.platform.android.backButton.previousTitleText(false);
        $ionicConfigProvider.platform.android.backButton.icon('ion-ios-arrow-back');
        $ionicConfigProvider.platform.android.spinner.icon('ios');
        $ionicConfigProvider.platform.android.views.swipeBackEnabled(true);
        $ionicConfigProvider.platform.android.views.swipeBackHitWidth(45);
        $ionicConfigProvider.platform.android.tabs.style('standard');
        $ionicConfigProvider.platform.android.tabs.position('bottom');
        $ionicConfigProvider.platform.android.form.toggle('large');

        $ionicConfigProvider.platform.default.backButton.previousTitleText(false);
        $ionicConfigProvider.platform.default.backButton.text(false);

        umobStorageProvider.setPrefix('<%= appId %>');
    }
]);

(function() {
    if (!window.yyesn) {
        angular.element(document).ready(onReady);
    } else {
        yyesn.ready(function() {
            onReady();
        });
        ionic.requestAnimationFrame(function() {
            document.body.classList.add('platform-preview');
            document.body.classList.add('platform-cordova');
        });
    }

    function onReady () {
        angular.bootstrap(document, ['<%= appId %>']);
    }
})();
