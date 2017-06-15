
angular.module('<%= appId %>', ['ionic', 'ionicU9Upesn'])

.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', 'umobStorageProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, umobStorageProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'tpls/home.html',
                controller: 'HomeCtrl'
            });

        $urlRouterProvider.otherwise('/home');

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
    if (typeof yyesn === 'undefined') {
        angular.element(document).ready(onReady);
    } else {
        yyesn.ready(function() {
            onReady();
        });
    }

    function onReady () {
        angular.bootstrap(document, ['<%= appId %>']);
    }
})();
