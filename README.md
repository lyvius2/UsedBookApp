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

![시작화면](https://lh3.googleusercontent.com/i4csnllAb_jZg9uH5KuFDq1grz8Xwcv37Hq3OkizxiLXei25dqo-SSXiD39sdhY1WThO4-0IR-aNQvigJPDyJTsg3EAosFu7_oBsS5uBQdk9y50-Yld_-xmtL374BTwl56BiD9FYma0I7jXr2fdoc7nyB2S9xhC97AflM3f8ppVHPRIhBgjywNm25gbVpeGhfjQFM0bq0YE-OTEgGL6UiNTCZZYb774nwHEmtIsxUmDssVAHBmy1YXKKDKD238Audta9ujbRIj4U8jhMZch2OimOT_eFeMpGVfKhf9xU_7rcP6K5XPmfIQadsl6HB389rb6bR6Xzc9mmMiNwZbyhJ0ZfoxaeO6C1KAkLTwXqyHxVudrr28NNHsKKhUoij1jMqEbilSjEqskqedSOI8ua5xMSMr_5M4XVcaSLdzs_crHqSpigaeeMmLoNdOJVFCMllkbaXsrxMuZIaDg_hpbKUIQobPWXt_jZtdtGQCDLI98PGrWK2l9EQAdw18rjAyoU_qQGV9TgiJOM6G3hRXUWm1d95Czf5PAyafSYmU_k6jNJXxeLIYltL9EDgUDlQ2MGdAPcegnxpwMuGovljKtg47YqVuIm0aU91OweG5VR6dwbN_H5=w150-h259-no "시작화면")
![초기검색](https://lh3.googleusercontent.com/poZ3cEazvSumPyWC5gdVBDwcaiUWJS3WxT81JQEPl-HygV3LPIUQgtTX99m-bAFoxfYiFMA9oJoggjKqxI3Ip0j8QRy2hYG8cf4KztFCrYWvoZaUdwgGBj6gElwT6ohgbySEC5RTTcuOcBMjFRvGCThI6dK5ug5Ikr_C1Pcnl4sWBgjH3QkEz3Aa4ifTvnvbijEyb-7-TCItYKassWy_FnZBYU7oAfQlZHUrUBiLug-4ZPI_Ml7iITzL_3bhC0qOSlYCQ-TXfJ1BzffW64Qt8iOt95WHluVR-RExUnbYHQcj5Ql0X2J1RXuhRc6KySZfbMhgzXAtZbDP8s-TCdwS-Xv6FFpz5VbJXSNf-6n5ypJQJ79MeYhPo1fkS0Lk-kp_bVjmm0HARdeNfVVKPq_eEyzyNVyGIsUolwe4sP0vbiKH5M14xL70QMf2APmHPDi2eIodxsMLC1bxg03M5H4IoXbwU15Z76cbVrbyAeS2JDCsvgekRZ69CrmSvqeAog6w7Cn4zs3Rk9LG27vUmlt2ou2ZMNs6E4foDyIz5eZ_MAXo3LGDnBj8vLapy38VznMZzHidsCXSDnLfGXqHMMHAjmUFCVcCgG5BB1iISBGnOsL1PThs=w151-h259-no "초기검색")
![중고책 판매가 검색](https://lh3.googleusercontent.com/1mtUTkTDSexW8S5EbqB5RyHSbtG5uZ3CwrV2KmUKzIP_PQqSrbLj-42gJxdfs6hwIzfrVoEt59MQZ8yXbyzOHme3WmP4i6ZdvvQVzng8sYscrIzQbjvYOV_Lf8n5zgLhpIfn4njf-lq2jR7vNvKbNFBpwq_CIZ2HuNQ10V6HQHaihw-KxyrxepupMs2gayWxDtF2Yx8JBIcYeIu-DRDNsxPYzB0PCSQZUeHqXnUvbB63mw8nRbvQTGC-HnUBDbHwx2nSUzeRzdMTyaSlY6RE7Bbv73nvsWg3BVBDnLWYCprsXX_qUSyQci00_9nqI4_QaMkQiD3vLlvmfk667eXvsxfRMIu42QI0GLPV5BZQgxOj8httckL8v4HxYWR92b9ERuLcro-BySsOsqaUgxXyIMOWVj6thhXCOyZjTcKQeAKWV1EiLH9YJIQAM3i34YMbdDu9uU8iQ2xdI-jhmc6Mbv8ll0iVkn7GtQExHcY2IxVR-Jdg0VsolJvPUEIKR8pnWiV3b_Igb2vnmp8J41RtL9JHBc9ltaCMymY9yEtDJkgl4dfJ8KG_NiOu7r1xaHvpxCeYNDUzjTFwVkTUVrUppPEperALMhKYHmtABAFKgRX_pHQh=w151-h259-no "중고책 판매가 검색")
![중고책 매각가 비교검색](https://lh3.googleusercontent.com/MtcSKWI2ZkrejJ9WaLW3gX1ujwyZyPWwLQ9UxUhez_B7Um-Q-VO0ifQ0mHdmc0xdAffc83YOMSXRYi0iWbbkKmWA2pRD2pZSZRU-YOrRIWFMo7iESKqnHKRSePAcpzEMasXjIhB8-AKtpROORW9e2vMCGl1kGBHXYZtw-uMF1nZKMSZt3VBH2S36ER_t6JTga5wF9X92FDSxcwJBma9JueaUNQNv11Ftrs_xGCWkuom3ibEceH-Tgxd1xCHHuZilYNZYqQrRpXNabzQ54JmY6okP6TdUFncfIutjA9oAeVnn9OuKUb62EqQ0QAG8kyaid_7a94g239cs95UuXv3x5GdKv0o9NdscwwMq9negG2hpKMIcvTF4GFy1LLCOiAM0khjgPvqesaDBVggzUhhdyod6mb3JqyIFfLsxD5tPwBC90IP7JufVNZL4ka1_ZyChmCE-yWJVVB_EB4h_CwJTpQUGFHHsLvXKRCrvjUNrzYwzKimo5n7ZTNeOhGM02guFu_iIHT-KxzyEdtoe5HrOS0ISljXweekNqKVhmL7BmA2f4lXUv0vioNXub0ipH6JHxb0MmpQF8UfNXFNqFCH1jFASEgZSVWAqZhB8eIreq74rv967=w151-h259-no "중고책 매각가 비교검색")
![최고액 매입 서점 웹사이트로 이동](https://lh3.googleusercontent.com/WPTxUhDRC4wWY_LcRWUPIvCcDuwmNUSlMN0LGyK6XvhRlA-74C3Z78XHDCwyD3ef-MhX97ThyR72Qsr07WajShyEu405FFoBvum6LexvTaDQvdlfLQI-LgRows4_2gdGndgQ9kH7Dz2Z2Ap0JqgWkzQ1C8SlkV4BXrqV73KCQmatQwZh4KjyjieAexf6Vj1bW7DKyw8qitSSYA2l0SXW0tqB94Vi12kyGRN0FEXe6FVO7ywyHnC0QQEWyVApNuGzipIAHg0jqYwM3n_ZK-NSOzIiEOxVn_4YD8JyeGZhwEbJp2IakRQgDHXOUhzfzOYzMWFN7D2t6BaUrURX_ECgssVqrciNRnqCBkRCL3YX-0qDUFclDdrQM6KikIlpBEgRvDWQx3tid5l4p0MmvvUOIBYKi7vd0oqD9YAzyJFkC8wVnNShnqAHSt8cWECwArmWgoDIBj4wIBCfECq8F1XSBt8URo626uElMMUyZKwDN69Feo5zkl90cLHylo6NXmQBWL7iMX8H2GPMWKB-PYKUDhYfCqMqwukQymR9YuCpCPxOC856OP3pWoCpVbFp8QXG6DgV7pvGrG9DC05jW9ucaHSySYd0r8unPMC2i7EaomPYt-qq=w150-h259-no "최고액 매입 서점 웹사이트로 이동")

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
