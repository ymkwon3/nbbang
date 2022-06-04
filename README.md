#  :bread: N빵 ✨

위치 기반 서비스를 통해 주변 사람들과 같이 구매를 함으로써 경제적 부담을 줄여주는 공동 구매 플랫폼, [__N빵__](https://nbbang.site)


![image](https://user-images.githubusercontent.com/48580444/171997071-93a07d18-2707-4ea6-9a1b-b04721e56044.jpg)


🔗  [사이트](https://nbbang.site)<br>
🔗  [시연 영상(Youtube)](https://www.youtube.com/watch?v=BtlWQiGYH0g)  
🔗  [팀 노션 페이지](https://www.notion.so/N-e2bd04e8b0ee4a14aaf23805b96c7824)  

### 👨‍👧‍👧 아키텍쳐 설계
- 클라이언트 배포
  - AWS S3 + Cloudfront
- 클라이언트와 서버 SSL 인증서 적용하여 HTTPS로 통신

![image](https://user-images.githubusercontent.com/48580444/171999023-3b3eaa95-933e-473f-a392-e2300c648a76.png)


## :bread: 프로젝트 소개

### 🌱 기획 의도
- 필라테스 같은 경우 3명이서 회원권을 구매하는 경우, 저렴하게 이용할 수 있다
- 반찬 구매시 2+1를 나눠먹을 사람, 편의점 2+1를 나눠먹을 사람, 2마리 치킨을 나눠서 먹을 사람, 1인가구를 타켓

### 👨‍👧‍👧 팀원 소개
- Front-end : 권영민, 곽진호, 장수찬 🔗 [Front-end github repository](https://github.com/ymkwon3/nbbang)
- Back-end : 장윤아, 오경은, 한재혁 🔗 [Back-end github repository](https://github.com/moonhjang/09Project_BE)
- Designer : 이화정, 김원경

### 👨‍👧‍👧 개발 기간
- 2022년 04월 22일 ~ 06월 03일 (총 6주)

### 👨‍👧‍👧 사용 기술 스택
<div align='left'>
  <img src="https://img.shields.io/badge/react-282C34?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/JavaScript-FFE400?style=for-the-badge&logo=JavaScript&logoColor=black"><br>
  <img src="https://img.shields.io/badge/redux--toolkit-764ABC?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/socket.io--client-007CE2?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/Axios-%23593d88.svg?style=for-the-badge&logoColor=000000">
  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/GitHub%20Actions-232F3E?style=for-the-badge&logo=GitHubActions&logoColor=2088FF"/>
  <img src="https://img.shields.io/badge/AWS%20S3-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=FF9A00"/>
  <img src="https://img.shields.io/badge/AWS%20CloudFront-232F3E?style=for-the-badge&logo=AmazonAWS&logoColor=FF9A00"/>
</div>

## 📌 핵심 기능 요약

> 사용자가 **위치한 지역**의 게시물을 불러옵니다.
>
> 지도에서 **해당 위치에 등록된 게시물**을 볼 수 있습니다.
>
> 사용자 간 **실시간 채팅**을 이용한 소통이 가능합니다.
>
> 실시간 채팅 **참여자 확인 및 거래자 등록**이 가능합니다.
>
> 해당 채팅방에 있지않거나 오프라인 상태시, **알림 수신**이 가능합니다.
>
