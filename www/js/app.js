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
}).controller('starterCtrl', function($scope, $http, $q, $ionicModal, $timeout, $ionicLoading, $ionicScrollDelegate, $ionicPopup, $ionicActionSheet, $ionicPopover){
  var parent = this;
  var start = 1;

  var showAlert = function(title, msg, callback) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });

    alertPopup.then(function(res) {
      return callback(res);
    });
  };

  var loading = function(word, callback) {
    $ionicLoading.show({
      template: '<i class="fa fa-refresh fa-spin fa-fw light"></i> ' + word + '...'
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
      $ionicLoading.hide();
      if(parent.findBookList == null) {
        parent.findBookList = data;
        if(typeof parent.findBookList.rss.channel.item.length == 'undefined') {
          var item = parent.findBookList.rss.channel.item;
          var isbn = item.isbn13;
          if(!isbn) isbn = item.isbn10;
          loading('Checking price', function(){
            inquiryPrice(isbn, function(error, data){
              $ionicLoading.hide();
              if(error) {
                console.log(error);
              } else {
                item.aladin = data[0];
                item.yes24 = data[1];
                item.interpark = data[2];
                item.bandi = data[3];
                item.status = 'bestPrice';
                parent.sellBookList.push(item);
              }
            });
          });
          console.log(parent.findBookList.rss.channel.item.isbn13);
        } else {
          parent.openResultModal();
        }
      } else if(parent.findBookList.rss) {
        parent.findBookList.rss.channel.item = parent.findBookList.rss.channel.item.concat(data.rss.channel.item);
      }
      if(data.rss.channel.total > 0 && parent.findBookList.rss.channel.item.length < parent.findBookList.rss.channel.total) {
        start = data.rss.channel.start + data.rss.channel.display;
      } else if(data.rss.channel.total == 0) {
        showAlert('검색 결과가 없습니다.', '다시 검색해주십시오.', function(res){
          parent.closeResultModal();
        });
      }
      angular.element('#findBookLayer').on('scroll', scrollHandler);
    }
    return;
  };

  var inquiryPrice = function(isbn, callback) {
    var getSellPrice = function(flatform){
      return $http.jsonp('https://usedbookserver.herokuapp.com/sellPrice?callback=JSON_CALLBACK', {params:{flatform:flatform,keyword:isbn}});
    };

    var getSellPriceBandi = function(){
      return $http.jsonp('http://222.122.120.242:7570/ksf/api/search?callback=JSON_CALLBACK', {params:{sn:'usedbook',q:isbn,s:'bpr'}});
    };

    var priceHandler = function(prev, next) {
      var item, value = null;
      console.log('next.data', next.data);
      if(typeof next.data.data == 'object' && next.data.data != null && next.data.data.length > 0){   // 3개사
        item = next.data.data[0];
        value = {
          available:item.available,
          bestPrice:item.bestPrice,
          normalPrice:item.normalPrice,
          lowPrice:item.lowPrice
        };
      } else if(typeof next.data.result == 'object' && typeof next.data.result.length != 'undefined'){  // 반디앤루니스
        item = next.data.result[0];
        value = {
          available:(item.buy_rate != '' && item.buy_rate != '0')?true:false,
          lowPrice:Number(item.buy_price)
        };
      }
      prev.push(value);
      return prev;
    };

    var serviceList = new Array();
    ['al','y2','ip'].forEach(function(item){
      serviceList.push(getSellPrice(item));
    });
    serviceList.push(getSellPriceBandi());

    $q.all(serviceList).then(function(results){
      results = results.reduce(priceHandler, []);
      return callback(null, results);
    }, function(error){
      return callback(error);
    });
  };

  this.findBookList = null;
  this.sellBookList = new Array();

  this.find = function(searchText, callback) {
    loading('Searching for a book', function(){
      var uri = 'https://usedbookserver.herokuapp.com/api?callback=JSON_CALLBACK';
      //$http.jsonp('http://localhost:3000/api?callback=JSON_CALLBACK', {params:{keyword:searchText,start:start}})
      $http.jsonp(uri, {params:{keyword:searchText,start:start}})
        .then(function(result){
          console.log(result.data);
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

  this.selectBook = function(obj, isbn){
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: '판매가 검색'}
      ],
      titleText: '매입 목록에 추가',
      destructiveText: '취소',
      buttonClicked: function(){
        loading('Checking price', function(){
          inquiryPrice(isbn, function(error, data){
            $ionicLoading.hide();
            if(error) {
              console.log(error);
            } else {
              obj.aladin = data[0];
              obj.yes24 = data[1];
              obj.interpark = data[2];
              obj.bandi = data[3];
              obj.status = 'bestPrice';
              parent.sellBookList.push(obj);
              console.log('sellBookList', parent.sellBookList);
            }
            parent.closeResultModal();
          });
        });
        return true;
      },
      destructiveButtonClicked: function(){
        return true;
      }
    });

    $timeout(function(){
      hideSheet();
    }, 5000);
  };

  this.getPriceByStatus = function(obj, status) {
    return obj[status];
  };

  this.changeStatus = function(event, target, status, dom) {
    event.preventDefault();
    console.log('event', event);
    console.log('dom', dom);
    target.status = status;
    $timeout(function(){
      $scope.$apply();
    }, 0);
  };

  $ionicModal.fromTemplateUrl('findBookResult.html', {
    scope: $scope,
    animation:'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.$on('modal.hidden', function() {
    parent.searchText = '';
    parent.findBookList = null;
    start = 1;
    $ionicScrollDelegate.$getByHandle('findBookScroll').scrollTop();
    angular.element('#findBookLayer').off('scroll');
  });

  angular.element(document.forms[0]).on('submit', function(e){
    e.preventDefault();
    document.activeElement.blur();
    console.log('isISBN?', validator.isISBN(parent.searchText));
    parent.find(parent.searchText, findSuccessHandler);
  });
});
