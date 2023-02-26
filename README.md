# 🥑 TDZ
🚀 service-link : [TDZ 서비스 배포 링크](http://13.124.111.98:8301/)

![대지_1](https://user-images.githubusercontent.com/81758576/220225702-dcde8cb0-5f2b-44ef-8201-019419379687.png)


매일 먹은 식단을 기록하며 건강관리를 도와주는 모바일웹 서비스입니다.

## 🔗 1. 서비스 소개

1. 건강관리에서 중요한 식단을 더 간편하게 관리하기 위해 기획
2. 다이어터와 헬스인들 뿐만 아니라 식단으로 건강을 관리하고 싶은 현대인들
3. 자신이 설정한 식단 목표 달성 여부와 섭취 영양소를 한눈에 파악하여 동기부여

## 🔗 2. 서비스 주요 기능

- 회원가입 후 로그인
  - 사이트 로그인
  - 카카오 소셜 로그인
- 사용자별 3단계 설정
  - 1단계 : 필수정보(나이, 키, 체중, 사용 목적 등..)
  - 2단계 : 필수 정보를 바탕으로한 권장 칼로리 섭취량 설정
  - 3단계 : 사용목적에 따른 주요 영양소 섭취량 설정
- 식단
  - 날짜별 식단 리스트
  - Open API를 사용한 식단 검색
  - 식단검색 결과가 없을시 사용자가 직접 식단을 추가
  - 식단 즐겨찾기 / 기록하기
- 차트
  - 일간 / 주간 / 월간 별 사용자의 체중과 섭취한 영양소를 차트로 시각화
- 캘린더

  - 선택 식단 모드에 따른 성공여부를 캘린더에 표시
  - 캘린더를 이용해 날짜별 식단 정보 확인

### 📂 서비스 구조도 및 ERD

<br>
<img src="https://ifh.cc/g/Dxt2Rz.png" width="700">

### 👥 유스케이스

<img src="https://ifh.cc/g/0JFZqm.png" width="700">

## 🔗 3. 프로젝트 구성도

**기술스택**

- Main Language

  <img src ="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">

- Frontend

  <img src ="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
  <img src ="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  <img src ="https://img.shields.io/badge/Redux ToolKit-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
  <img src ="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"><br>

  - 외부 라이브러리 :
    <img src ="https://img.shields.io/badge/react--hook--form-yellow">
    <img src ="https://img.shields.io/badge/dayjs-orange">

- Backend

  <img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/mongoose-47A248?style=for-the-badge&logo=MongoDB&logoColor=white">
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/amazonaws-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/Multer-000000?&style=for-the-badge&logoColor=white">

- 와이어 프레임 : [피그마 링크](https://www.figma.com/file/v8i3yts5YeGuZ5XDqUA3cb/9%ED%8C%80-%EC%8B%9D%EB%8B%A8%EA%B4%80%EB%A6%AC%EC%96%B4%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98?node-id=0%3A1)
- 프로젝트 기록 : [노션 링크](https://www.notion.so/tdz-team/TDZ-c9aeac84ecff45688047f6608644f178)

## 🔗 4. 프로젝트 팀원 및 역할분담

| 이름           | 직군       | 담당업무                                                                                         |
| -------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| 박유환(팀장🙋🏻‍♂️) | 프론트엔드 | 협업 개발과정 리딩, 홈, 차트 페이지 화면 및 기능 구현                                            |
| 경지윤         | 프론트엔드 | 사용자정보 step1, 2, 3 입력 및 수정(정보 바탕으로 데이터 가공), 식단 성공여부에 따른 캘린더 스탬프                          |
| 김세희         | 프론트엔드 | 식단 검색 및 즐겨찾기, 식단 상세, 식단 장바구니 및 등록 페이지 구현                              |
| 신승철         | 프론트엔드 | 홈, 차트 페이지 화면 및 기능 구현                                                                |
| 이주연         | 백엔드     | 회원 관련 API, 즐겨찾기 API, 차트 API, 카카오 소셜 로그인 API, AWS 이미지 등록, 랜덤 닉네임 생성 |
| 여은지         | 백엔드     | 식단 API, 식품 API, Open API, 카카오 소셜 로그인 API                                             |
