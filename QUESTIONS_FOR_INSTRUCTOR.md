# 강사님께 물어볼 사항

## 1. 백엔드 API 스펙

### 1.1 회원가입 & 로그인
- **회원가입 API 엔드포인트:** POST /api/auth/signup 인가요?
  - 요청: {id, pw, name, nickname, phone, email, birthDate, gender}
  - 응답: {success, message, userId, token} 형식인가요?
  
- **로그인 API 엔드포인트:** POST /api/auth/login
  - 요청: {id, password}
  - 응답에 JWT 토큰 or Session ID?

- **토큰 방식:** JWT vs Session 어느 것으로 진행할 예정인가요?
  - 토큰 유효시간은?
  - Refresh token도 필요한가요?

### 1.2 소셜 로그인
- **Google OAuth:** 백엔드에서 토큰 검증하는 엔드포인트가 있나요?
- **Kakao API 키:** 어디서 받아야 하나요?
- **Naver API 키:** 어디서 받아야 하나요?
- 소셜 로그인 시 자동으로 회원가입되는 건가요, 아니면 추가 정보 입력 필요?

### ✅ [구현 완료] 구글 로그인 및 권한 관리
- **Google OAuth 통합:** @react-oauth/google 라이브러리로 Google 로그인 구현
- **권한 관리:** calendar.events 권한으로 Google Calendar에 직접 접근 (Google Maps API도 포함)
- **토큰 저장:** sessionStorage에 googleAccessToken 저장하여 캘린더/맵에서 재사용
- **흐름:**
  1. 홈페이지에서 로그인 → Login 페이지로 이동
  2. Google 로그인 → calendar.events 권한 요청
  3. 성공 시 sessionStorage에 토큰 저장 → 홈페이지로 이동
  4. 캘린더 페이지에서 저장된 토큰 자동 로드

- **추가 질문:**
  - 백엔드에서 Google 토큰 검증이 필요한가요?
  - 사용자 정보(이름, 이메일)도 저장해야 하나요?
  - Google 로그인과 일반 로그인을 어떻게 구분할 건가요?

---

## 2. 축제 데이터 및 검색

### 2.1 축제 정보
- 축제 데이터는 DB에 미리 저장되어 있나요?
- 축제 정보 조회 API: GET /api/festivals 인가요?
- 한 번에 몇 개씩 가져올 건가요? (페이지네이션)
- 필터링 기능 (지역, 기간, 카테고리)?

### ✅ [구현 완료] 축제 데이터 로드 및 캘린더 통합
- **데이터 소스:** festivals_with_geo.json (로컬 파일 사용)
- **캘린더 통합 방식:**
  - pSeq(축제 고유 ID) 입력 받기
  - 축제의 date 필드 파싱 (예: "2026. 1. 16. ~ 1. 18. | 10:00~17:00")
  - festival_name과 festival_description을 자동으로 캘린더 일정에 로드
  - Google Calendar에 저장

- **구현 상세:**
  - parseFestivalDate() 함수: 날짜 문자열 파싱
  - loadFestivalAndOpen() 함수: pSeq로 축제 검색 후 모달에 자동 입력
  - 헤더에 "🎪 축제 추가" 버튼: 축제 pSeq 입력 인터페이스
  - 위도/경도도 데이터에 포함되어 있어 지도 연동 가능

- **추가 질문:**
  - 추후에 festivals_with_geo.json을 API로 받아올 건가요?
  - 페이지네이션이 필요한가요?
  - 지역/기간/카테고리별 필터링은?

### 2.2 검색 기능
- 검색 API: GET /api/festivals/search?query=축제이름 인가요?
- 자동완성(autocomplete) 기능은 필요한가요?
- 검색 결과는 몇 개까지 표시할 예정인가요?

### 2.3 추천 기능
- Home 페이지의 "Minho님 취향에 딱 맞는 축제" 추천 로직은?
  - 사용자의 관심사 데이터를 수집하는 건가요?
  - 백엔드에서 추천 알고리즘을 처리하나요?
- 추천 축제 API: GET /api/festivals/recommendations?userId=xxx?

---

## 3. 사용자 프로필 & 데이터

### 3.1 사용자 정보 관리
- 회원정보 수정 API는 필요한가요?
- 비밀번호 변경 기능?
- 회원탈퇴 기능?

### 3.2 찜하기(Bookmarks) 기능
- 축제 찜하기/찜해제: POST/DELETE /api/bookmarks?
- 내 찜 목록 조회: GET /api/bookmarks/my?

### 3.3 축제 후기/리뷰
- 축제 참여 후 리뷰 작성 기능은 필요한가요?
- 평점 시스템 (별점)?

---

## 4. UI/UX 요구사항

### 4.1 추가 페이지
- **축제 상세 페이지:** 어떤 정보를 보여주려고 하나요?
  - 위치, 기간, 설명, 리뷰, 지도?
  
- **마이페이지:** 필수인가요?
  - 찜한 축제 목록?
  - 참여한 축제 목록?
  - 프로필 수정?

- **캘린더 기능:** 
  - 축제 일정을 표시하는 건가요?
  - 개인 일정도 저장할 수 있나요?

### ✅ [구현 완료] 캘린더 기능 추가 사항
- **Google Calendar API 연동:** 로그인 후 구글 캘린더에 축제 일정을 저장하도록 구현했습니다.
- **일정 CRUD 기능:** 날짜 선택으로 일정 추가, 클릭/드래그로 수정/삭제 가능합니다.
- **축제 데이터 자동 로드:** festivalsWithGeo.json의 pSeq로 축제 정보(날짜, 설명)를 자동으로 캘린더에 로드합니다.
- **현재 구현 방식:**
  - 모달 다이얼로그로 일정 추가/수정/삭제
  - Google Calendar API (events.insert, events.update, events.delete)
  - 모든 변경사항은 실시간 Google Calendar에 동기화
  - 하루종일 일정/시간대 일정 모두 지원

- **추가 질문:**
  - Google Calendar 외에 다른 캘린더 서비스 연동도 필요한가요? (Outlook, Apple Calendar 등)
  - 축제 일정 외에 개인 일정도 같은 Google Calendar에 저장할 건가요?
  - 캘린더 공유 기능이 필요한가요? (다른 사용자와 축제 일정 공유)
  - 캘린더 알림/노티피케이션 기능이 필요한가요? (축제 전날, 당일 알림)

- **지도 기능 (Map.jsx):**
  - 카카오맵/네이버맵 사용 중인데, 완성도를 높여야 하나요?
  - 축제 위치를 지도에 표시하고 클릭하면 상세정보 팝업?

### 4.2 반응형 디자인
- 모바일 최적화는 필수인가요?
- 타블릿 지원도 필요한가요?
- 어떤 해상도까지 고려해야 하나요?

---

## 5. 에러 처리 & 예외 상황

### 5.1 API 에러 처리
- API 응답 실패 시 어떻게 처리할 건가요?
  - 에러 메시지 형식: {error, message}?
  - HTTP 상태 코드는 표준 방식? (401, 403, 404, 500)

### 5.2 사용자 경험
- 로그인 중 사라진 토큰 (세션 만료) 시?
  - 자동으로 로그인 페이지로 리다이렉트?
  - Refresh token으로 자동 갱신?

- 네트워크 오류 처리?
- 중복 요청 방지 (디바운싱/스로틀링)?

---

## 6. 기술 결정사항

### 6.1 상태관리
- 현재 localStorage/useState로 충분한가요?
- 추후 Redux, Zustand 같은 라이브러리 필요한가요?

### 6.2 스타일링
- 현재 inline CSS 사용 중인데, Tailwind CSS로 전환할 건가요?
- 디자인 시스템 (컴포넌트 라이브러리) 필요한가요?

### 6.3 테스팅
- 유닛 테스트는 필요한가요?
- E2E 테스트 (Cypress, Playwright)?

---

## 7. 배포 & 운영

### 7.1 배포 환경
- 프론트엔드 배포 플랫폼? (Vercel, GitHub Pages, AWS S3?)
- 백엔드 배포 플랫폼?
- 개발/스테이징/프로덕션 환경 분리?

### 7.2 환경변수
- API 엔드포인트를 어디에 저장할 건가요? (.env 파일)
- Google OAuth 클라이언트 ID는 공개해도 괜찮나요?

---

## 8. 팀 협업

### 8.1 API 문서
- 백엔드 팀이 API 문서 (Swagger, Postman)를 제공하나요?
- 언제쯤 API가 준비될 예정인가요?

### 8.2 데이터 구조
- 현재 가정한 데이터 구조가 백엔드와 일치하나요?
  - {id, pw, name, nickname, phone, email, birthDate, gender}

### 8.3 Git 전략
- 브랜치 전략 (Git Flow, GitHub Flow)?
- 커밋 메시지 컨벤션?
- PR 리뷰 프로세스?

---

## 9. 성능 & 최적화

- 이미지 최적화 필요한가요? (WEBP 포맷, lazy loading)
- API 응답 캐싱 전략?
- 페이지 로딩 최적화 (Code splitting, dynamic import)?

---

## 10. 추가 기능 확인

- **알림 기능:** 새로운 축제 추천, 축제 시작 임박 알림?
- **공유 기능:** 축제를 SNS에 공유?
- **방문 기록:** 사용자가 방문한 축제 기록?
- **즐겨찾기 vs 찜하기:** 구분 필요한가요?
- **팔로우 기능:** 다른 사용자 팔로우?
