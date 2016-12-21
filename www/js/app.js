// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ngRoute', 'ngMaterial', 'ngSanitize'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(function($routeProvider){
  $routeProvider
    .when('/buy', {
      templateUrl: 'ng-template/buyBook.html'
    })
    .when('/sell',{
      templateUrl: 'ng-template/sellBook.html'
    });
}).directive('ngEnter', function() {
    return function($scope, element, attrs) {
      element.on('keydown keypress',function(event) {
        if(event.which === 13) {
          $scope.$apply(function() {
            $scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
}).controller('starterCtrl', function($scope, $http, $q, $location, $ionicModal, $timeout, $filter, $window, $ionicLoading, $ionicScrollDelegate, $ionicPopup, $ionicActionSheet, $ionicSideMenuDelegate){
  var parent = this;
  var start = 1;
  /* 중고책 매입사 */
  $scope.bookBuyerStoreData = [
    {kor:'알라딘', eng:'aladin', uri:'http://www.aladin.co.kr/m/c2b/c2b_search.aspx?start=momain&KeyWord='},
    {kor:'YES24', eng:'yes24', uri:'http://m.yes24.com/BuyBack/Search'},
    {kor:'반디앤루니스', eng:'bandi', uri:'http://minibandi.com/m/usedProduct/usedProdSearch.do'},
    {kor:'인터파크', eng:'interpark', uri:'http://bookdb.interpark.com/display/buyGoodsMobile.do?_method=main&bid1=NMB_SNB&bid2=ubook'}
  ];
  /* 중고책 판매사 */
  var bookSellerStoreData = [
    {code:'bl',name:'반디앤루니스'},
    {code:'kb',name:'교보문고'},
    {code:'y1',name:'영록서점'},
    {code:'y2',name:'YES24'},
    {code:'bk',name:'북코아'},
    {code:'sg',name:'신고로'},
    {code:'gb',name:'좋은책많은데'},
    {code:'ip',name:'인터파크'}
  ];
  /* Common : Alert Popup */
  var showAlert = function(title, msg, callback) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });

    alertPopup.then(function(res) {
      return callback(res);
    });
  };
  /* Common : Confirm Popup */
  var showConfirm = function(title, msg, callback) {
    var confirmPopup = $ionicPopup.confirm({
      title: title,
      template: msg
    });

    confirmPopup.then(function(res) {
      if(res) {
        return callback();
      }
    });
  };
  /* Common : 로딩 View - Back Process는 callback method로 call */
  var loading = function(word, targetObj, callback) {
    $ionicLoading.show({
      template: '<i class="fa fa-refresh fa-spin fa-fw light"></i> ' + word + '...'
    }).then(function(){
      return callback(targetObj);
    })
  };

  /*
  * Sell : 중고책 매입가 검색 Methods
  * */

  /* Sell : 책 검색 결과 Data */
  this.findBookList = null;
  /* Sell : 책 검색 결과(Naver API)에서 무한 스크롤 적용 Handler */
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
  /* Sell : 책 검색(Naver API) 후 데이터 binding */
  var findSuccessHandler = function(error, data) {
    $ionicLoading.hide();
    if(error) {
      console.log(error);
    } else {
      if(data.rss.channel.total > 0) {
        if(parent.findBookList == null) {
          parent.findBookList = data;
          if(typeof parent.findBookList.rss.channel.item.length == 'undefined') {
            loading('Checking Price', parent.findBookList.rss.channel.item, checkPriceSuccessHandler);
          } else {
            parent.openResultModal();
          }
        } else if(parent.findBookList.rss) {
          parent.findBookList.rss.channel.item = parent.findBookList.rss.channel.item.concat(data.rss.channel.item);
        }
        if(parent.findBookList.rss.channel.item.length < parent.findBookList.rss.channel.total) start = data.rss.channel.start + data.rss.channel.display;
      } else {
        showAlert('검색 결과가 없습니다.', '다시 검색해주십시오.', function(){
          parent.closeResultModal();
        });
      }
      angular.element('#findBookLayer').on('scroll', scrollHandler);
    }
    return;
  };
  /* Sell : 각 서점 별 매입가를 검색하여 callback mathod로 List 객체에 binding */
  var checkPriceSuccessHandler = function(targetObj) {
    var isbn = targetObj.isbn13;
    if(!isbn) isbn = targetObj.isbn10;
    inquiryPrice(isbn, function(error, data){
      $ionicLoading.hide();
      if(error) {
        console.log(error);
      } else {
        targetObj.aladin = data[0];
        targetObj.yes24 = data[1];
        targetObj.interpark = data[2];
        targetObj.bandi = data[3];
        targetObj.status = 'bestPrice';
        $scope.sellBookList.push(targetObj);
      }
      parent.closeResultModal();
      return;
    });
  };
  /* Sell : 각 서점 별로 중고책 매입가를 조회 */
  var inquiryPrice = function(isbn, callback) {
    var getSellPrice = function(platform){
      return $http.jsonp('https://usedbookserver.herokuapp.com/sell?callback=JSON_CALLBACK', {params:{platform:platform,keyword:isbn}});
    };

    var getSellPriceBandi = $http.jsonp('http://222.122.120.242:7570/ksf/api/search?callback=JSON_CALLBACK', {params:{sn:'usedbook',q:isbn,s:'bpr'}});

    var priceHandler = function(prev, next) {
      var item, value = null;
      if(typeof next.data.data == 'object' && next.data.data != null && next.data.data.length > 0){   // 기타 3개사
        item = next.data.data[0];
        value = {
          available:item.available,
          bestPrice:item.bestPrice,
          normalPrice:item.normalPrice,
          lowPrice:item.lowPrice,
          selectedPrice:item.bestPrice    // default setting
        };
      } else if(typeof next.data.result == 'object' && typeof next.data.result.length != 'undefined' && next.data.count > 0){  // 반디앤루니스
        item = next.data.result[0];
        value = {
          available:(item.buy_rate != '' && item.buy_rate != '0')?true:false,
          bestPrice:Number(item.buy_price),
          selectedPrice:Number(item.buy_price)    // default setting
        };
      }
      prev.push(value);
      return prev;
    };

    var serviceList = new Array();
    ['al','y2','ip'].forEach(function(item){
      serviceList.push(getSellPrice(item));
    });
    serviceList.push(getSellPriceBandi);

    $q.all(serviceList).then(function(results){
      results = results.reduce(priceHandler, []);
      return callback(null, results);
    }, function(error){
      return callback(error);
    });
  };
  /* Sell : 책 검색(Naver API) */
  this.find = function(searchText, callback) {
    loading('Searching for a Book', null, function(){
      var uri = 'https://usedbookserver.herokuapp.com/api?callback=JSON_CALLBACK';
      $http.jsonp(uri, {params:{keyword:searchText,start:start}})
        .then(function(result){
          return callback(null, result.data);
        }, function(error){
          $ionicLoading.hide();
          return callback(error);
        });
    });
  };
  /* Sell : 책 검색 결과에서 선택 후 touch 시 ActionSheet */
  this.selectBook = function(event, obj){
    event.preventDefault();
    var hideSheet = $ionicActionSheet.show({
      buttons: [
        {text: '매입가 검색'}
      ],
      titleText: '매입 목록에 추가',
      destructiveText: '취소',
      buttonClicked: function(){
        loading('Checking Price', obj, checkPriceSuccessHandler);
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
  /* Sell : 중고책 매입 리스트에서 삭제 */
  this.removeBook = function(sellBook, index) {
    showConfirm('책 목록에서 삭제',
      '"' + sellBook.title + '" 책을 목록에서 삭제하시겠습니까?',
      function() {
        $scope.sellBookList.splice(index, 1);
      }
    );
  };
  /* Sell : 중고책 상태를 변경 */
  this.changeStatus = function(event, target, status) {
    event.preventDefault();
    target.status = status;
    ['aladin', 'yes24'].forEach(function(item){
      if(target[item] != null && target[item].available == true) target[item].selectedPrice = target[item][status];
    });
  };
  /* Sell : 중고책 매입가 총합을 계산 */
  this.showCalculation = function() {
    var priceFilter = function(prev, curr) {
      var next = [];
      $scope.bookBuyerStoreData.forEach(function(item, index) {
        if(curr[item.eng] != null && curr[item.eng].available == true && curr[item.eng].selectedPrice > 0) {
          var value = prev[index] + curr[item.eng].selectedPrice;
          next.push(value);
          item.totalPrice = value;
        } else {
          next.push(prev[index]);
          item.totalPrice = prev[index];
        }
      });
      return next;
    };

    var totalArray = $scope.sellBookList.reduce(priceFilter, [0, 0, 0, 0]);
    $scope.totalPriceMax = Math.max(totalArray[0], totalArray[1], totalArray[2], totalArray[3]);
    return $scope.bookBuyerStoreData;
  };
  /* Sell : 중고책 매입 웹사이트로 이동 Popup */
  this.showHyperlink = function() {
    var linkPopup = $ionicPopup.show({
      templateUrl:'bookStoreHyperlink.html',
      title:'서점 웹사이트로 이동',
      subTitle:'어디로 팔러 가실래요? <i class="fa fa-check-circle"></i> : 최고가',
      scope:$scope,
      buttons:[
        {text:'취소', type:'button-assertive'}
      ]
    });

    linkPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  };
  /* Sell : 중고책 매입 웹사이트로 이동 */
  this.moveToBookStore = function(bookStore) {
    var isbn = '';
    $scope.sellBookList.some(function(book){
      if(book.aladin != null && book.aladin.available) {
        isbn = book.isbn13;
        return true;
      }
    });
    window.open(bookStore.uri + (bookStore.eng == 'aladin'?isbn:''), '_system', 'location=yes');
    return false;
  };

  /*
   * Buy : 중고책 구매가 검색 Methods
   * */

  /* Buy : 중고책 구매가 검색 횟수 */
  this.loop;
  /* Buy : 중고책 구매가 조회 */
  var searchAction = function(pageNo, seller, searchText) {
    var common = function() {
      parent.loop--;
      if(parent.loop == 0) {
        $ionicLoading.hide();
        if ($scope.sellerList.length == 0) {
          showAlert('검색 결과가 없습니다.', '"' + parent.searchText + '" 검색어로 찾을 수 있는 책이 없습니다.', function () {
          });
        }
      }
    };
    /* 구매가 검색 결과 binding */
    var searchSuccessHandler = function(result) {
      if(pageNo == 1) {
        seller.rowOfNum = result.data.data.length;
        if(result.data.data.length > 0) {
          $scope.sellerList.push(angular.extend(seller, result.data));
        }
      } else {
        seller.data = seller.data.concat(result.data.data);
        if(result.data.data.length < seller.rowOfNum) {
          seller.paging = false;
        }
        if(result.data.data.length == 0) {
          showAlert('검색 결과가 없습니다.', seller.name + '에서는 책이 더 이상 없습니다.', function() {
            seller.page--;
          });
        }
      }
      common();
    };

    if(seller.code == 'bl') { // 반디앤루니스
      var getBuyPriceBandi = $http.jsonp('http://222.122.120.242:7570/ksf/api/search?sn=product&s=&l=40&pt=05&callback=JSON_CALLBACK', {params:{q:searchText,o:(pageNo-1)}});
      getBuyPriceBandi.then(function(result) {
        var bandiData = {
          page: pageNo,
          paging: true,
          keyword: searchText
        };
        bandiData.data = result.data.result.map(function(item) {
          var obj = {};
          obj.img = 'http://image.bandinlunis.com/upload' + item.prod_img;
          obj.uri = 'http://minibandi.com/m/product/detailProduct.do?prodId=' + item.prod_id;
          obj.title = item.prod_name;
          obj.author = item.author;
          obj.publisher = item.maker;
          obj.originalprice = $filter('currency')(item.price1, '', 0) + '원';
          obj.sellprice = $filter('currency')(item.price2, '', 0) + '원';
          obj.release = item.pdate.substring(0,4) + '.' + item.pdate.substring(4,6) + '.' + item.pdate.substring(6);
          return obj;
        });
        searchSuccessHandler({data: bandiData});
      }, function(error) {
        console.log(error);
        common();
      });
    } else {  // 기타 서점
      var uri = 'https://usedbookserver.herokuapp.com/buy?callback=JSON_CALLBACK';
      $http.jsonp(uri, {params:{keyword:searchText,platform:seller.code,pageNo:pageNo}}).then(function(result) {
        searchSuccessHandler(result);
      }, function(error) {
        console.log(error);
        common();
      });
    }
    return;
  };
  /* Buy : 중고책 구매가 통합 검색 */
  this.search = function(pageNo, sellerList, searchText) {
    parent.loop = sellerList.length;
    loading('Searching for Used Book', null, function() {
      angular.forEach(sellerList, function(item) {
        searchAction(pageNo, item, searchText);
      });
    });
  };
  /* Buy : 중고책 구매가 서점별 개별 검색 */
  this.addSearch = function(seller) {
    seller.page++;
    parent.loop = 1;
    loading('Searching for Used Book in ' + seller.name, null, function() {
      searchAction(seller.page, seller, seller.keyword);
    });
  };
  /* Buy : 중고책 구매 웹사이트로 이동 */
  this.moveToSellerPage = function(event, uri) {
    event.preventDefault();
    window.open(uri, '_system', 'location=yes');
  };
  /* Buy : 책 검색 결과 모달 Open */
  this.openResultModal = function(){
    $scope.modal.show();
    //angular.element('#findBookLayer').on('scroll', scrollHandler);
  };
  /* Buy : 책 검색 결과 모달 Close */
  this.closeResultModal = function(){
    $scope.modal.hide();
  };
  /* Buy : 책 검색 결과 모달 Template 정의 */
  $ionicModal.fromTemplateUrl('findBookResult.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });
  /* Buy : 책 검색 결과 모달 Close 시 데이터 초기화 처리 */
  $scope.$on('modal.hidden', function() {
    parent.searchText = '';
    parent.findBookList = null;
    start = 1;
    $ionicScrollDelegate.$getByHandle('findBookScroll').scrollTop();
    angular.element('#findBookLayer').off('scroll');
  });

  /* Common : URL 및 데이터 결과에 따라 검색창 View Handling */
  $scope.$watch(function(){ return $location.path() }, function(params){
    var section, placeholderText, isListOpen;
    switch(params) {
      case '/buy' :
        section = '중고책 구매가 검색';
        placeholderText = section + ' : Book Title';
        isListOpen = (parent.searchText != null && parent.searchText != '' && $scope.sellerList.length < 1)?false:true;
        angular.element('ion-footer-bar').hide();
        angular.element('ion-content').removeClass('has-footer');
        break;
      case '/sell' :
        $ionicScrollDelegate.$getByHandle('usedBookListScroll').scrollTop();
        section = '중고책 매입가 검색';
        placeholderText = section + ' : Book Title or ISBN';
        isListOpen = (parent.searchText != null && parent.searchText != '' && $scope.sellBookList.length < 1)?false:true;
        angular.element('ion-footer-bar').show();
        angular.element('ion-content').addClass('has-footer');
        break;
    }
    angular.element('input[type=search]').attr('placeholder', placeholderText);
    if(params != '' && !isListOpen) {
      showConfirm(section, '"' + parent.searchText + '" 검색어로 검색하시겠습니까?', function() {
        angular.element(document.forms[0]).trigger('submit');
      });
    }
    document.getElementById('search').focus();
  });
  /* Common : 사이드 메뉴 Open */
  $scope.openSideMenu = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
  /* Common : main 검색 창 show/hide - 결과 리스트가 있으면 header 검색 창만 표시 */
  $scope.validateSearchInput = function() {
    switch($location.path()) {
      case '/sell' :
        return ($scope.sellBookList.length > 0)?false:true;
      case '/buy' :
        return ($scope.sellerList.length > 0)?false:true;
      default :
        return false;
    }
  };
  /* Common : main 검색 창 submit action */
  $scope.insert = function() {
    document.activeElement.blur();
    angular.element('md-input-container').hide();
    angular.element('form#findBook').show();
    switch($location.path()) {
      case '/sell' :
        parent.find(parent.searchText, findSuccessHandler);
        break;
      case '/buy' :
        $scope.sellerList = [];
        $ionicScrollDelegate.$getByHandle('usedBookListScroll').scrollTop();
        parent.search(1, bookSellerStoreData, parent.searchText);
        break;
    }
  };
  angular.element(document.forms[0]).on('submit', function(e){
    e.preventDefault();
    $scope.insert();
  });
  /* Buy : 서점 bar touch 시 결과 리스트 show/hide event */
  angular.element(document).on('click', 'div.list div.item.item-divider', function(e) {
    e.preventDefault();
    angular.element(this).parent().find('div[id^=bookDetail]').slideToggle('slow', function() {
      var down = angular.element(this).parent().find('i.fa.fa-chevron-down');
      var up = angular.element(this).parent().find('i.fa.fa-chevron-up');
      if(angular.element(this)[0].style.display=='none') {
        down.show(); up.hide();
      } else {
        down.hide(); up.show();
      }
    });
  });

  /* Common : 앱 초기화 */
  $scope.startUp = function() {
    $scope.sellBookList = new Array();
    $scope.sellerList = new Array();
    var initPopup = $ionicPopup.show({
      templateUrl:'startUp.html',
      title:'헌책방!',
      subTitle:'메뉴를 선택해주세요',
      scope:$scope
    });

    initPopup.then(function(res) {
      console.log('Tapped!', res);
    });

    angular.element(document).on('click', '#startUp > button', function() {
      initPopup.close();
    });
  };
  $scope.startUp();
});
