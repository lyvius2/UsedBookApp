## 헌책방!

IONIC 프레임워크와 AngularJS로 개발한 간단한 하이브리드 앱입니다.  
서버는 Node.js로 개발한 별도 프로젝트로 되어 있으며 현재 [Heroku](https://usedbookserver.herokuapp.com)에 올려져 있습니다.

주요기능:

  - 중고서적 가격 통합검색
  - 중고서적 매각가 매입서점 사이트별로 비교검색(알라딘, YES24, 반디앤루니스, 인터파크)
  - 서점 웹사이트 링크

### Tech

아래와 같은 IDE와 기술을 사용:

* [JAVA Script](https://developer.mozilla.org/ko/docs/Web/JavaScript)
* [AngularJS] - v1.5.3
* [Ionic Framework] - v1.3.2. AngularJS 기반의 크로스플랫폼 프레임워크
* [node.js] - Ionic Framework는 npm 생태계에서 설치 구동됨
* [Gulp] - scss 컴파일 및 라이브러리 js 압축
* [jQuery] - v3.1.1
* [IntelliJ IDEA](https://www.jetbrains.com/idea/) - JAVA 용으로 유명하지만 거의 대부분의 웹 개발 언어를 지원하는 강력한 통합개발도구

### Installation

1. [node.js] 설치
2. 'npm install -g cordova ionic' Ionic Framework 설치
3. 소스 디렉터리에서 'npm install' 명령어로 라이브러리 및 플러그인 설치
4. 'ionic serve --lab' 명령어로 실행

### Screen Shot

![시작화면](http://res.cloudinary.com/dkbh91d9t/image/upload/v1482828460/IMG_2154_hzzqac.png "시작화면")
![초기검색](http://res.cloudinary.com/dkbh91d9t/image/upload/v1482828460/IMG_2150_ld2b3l.png "초기검색")
![중고책 판매가 검색](http://res.cloudinary.com/dkbh91d9t/image/upload/v1482828460/IMG_2151_bbizoy.png "중고책 판매가 검색")  
![중고책 매각가 비교검색](http://res.cloudinary.com/dkbh91d9t/image/upload/v1482828460/IMG_2152_yorozl.png "중고책 매각가 비교검색")
![최고액 매입 서점 웹사이트로 이동](http://res.cloudinary.com/dkbh91d9t/image/upload/v1482828460/IMG_2153_q0dwui.png "최고액 매입 서점 웹사이트로 이동")

### 개발 시 참고자료

레퍼런스 가이드를 주로 참고하였습니다.

* [Ionic Framework Getting Started](http://ionicframework.com/getting-started/)
* [Ionic Framework Documentation](http://ionicframework.com/docs/)
* [AngularJS API Reference](https://docs.angularjs.org/api/ng/)
* [너찐빵 Blog](http://steambread.tistory.com/category/Programing/Ionic_v1)

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [jQuery]: <http://jquery.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>
   [Ionic Framework]: <http://ionicframework.com>
   [IntelliJ IDEA]: <https://www.jetbrains.com/idea/>
