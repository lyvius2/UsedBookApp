// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).controller('starterCtrl', function($scope, $http, $ionicModal, $timeout, $ionicLoading, $ionicScrollDelegate){
  var parent = this;
  var start = 1;

  var loading = function(callback) {
    $ionicLoading.show({
      template: '<i class="fa fa-refresh fa-spin fa-fw light"></i> Loading...'
    }).then(function(){
      return callback();
    })
  };

  var scrollHandler = function(e) {
    e.preventDefault();
    var layerHeight = angular.element(this).height();
    var listHeight = angular.element(this).find('div.list').height();
    var scrollTop = $ionicScrollDelegate.$getByHandle('findBookScroll').getScrollPosition().top;
    if((layerHeight + scrollTop >= listHeight -20) && parent.findBookList.rss.channel.item.length < parent.findBookList.rss.channel.total) {
      angular.element('#findBookLayer').off('scroll');
      parent.find(parent.searchText, findSuccessHandler);
    }
  };

  var findSuccessHandler = function(error, data) {
    if(error) {
      console.log(error);
    } else {
      if(parent.findBookList == null) {
        parent.findBookList = data;
        parent.openResultModal();
      } else if(parent.findBookList.rss) {
        parent.findBookList.rss.channel.item = parent.findBookList.rss.channel.item.concat(data.rss.channel.item);
      }
      if(parent.findBookList.rss.channel.item.length < parent.findBookList.rss.channel.total) start = data.rss.channel.start + data.rss.channel.display;
      $ionicLoading.hide();
      angular.element('#findBookLayer').on('scroll', scrollHandler);
    }
    return;
  };

  this.findBookList = null;

  this.find = function(searchText, callback) {
    loading(function(){
      console.log('start', start);
      var uri = 'https://usedbookserver.herokuapp.com/api?callback=JSON_CALLBACK'
      $http.jsonp('http://localhost:3000/api?callback=JSON_CALLBACK', {params:{keyword:searchText,start:start}})
        .then(function(result){
          return callback(null, result.data);
        }, function(error){
          $ionicLoading.hide();
          return callback(error);
        });
    });
  };

  this.openResultModal = function(){
    $scope.modal.show();
    //angular.element('#findBookLayer').on('scroll', scrollHandler);
  };

  this.closeResultModal = function(){
    $scope.modal.hide();
  };

  $ionicModal.fromTemplateUrl('findBookResult.html', {
    scope: $scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.$on('modal.hidden', function() {
    parent.findBookList = null;
    start = 1;
    $ionicScrollDelegate.$getByHandle('findBookScroll').scrollTop();
  });

  angular.element(document.forms[0]).on('submit', function(e){
    e.preventDefault();
    parent.find(parent.searchText, findSuccessHandler);
  });
});
