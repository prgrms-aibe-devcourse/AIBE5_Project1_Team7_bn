# 🎊 Festory - AI 기반 축제 추천 플랫폼
**Your Festival, Your Story** > 당신의 취향에 딱 맞는 축제를 AI가 찾아드립니다

---

## 📖 Project Overview

**Festory**는 국내 축제를 탐색하고 개인 맞춤형 추천을 받을 수 있는 AI 기반 축제 플랫폼입니다.

복잡한 검색 과정 없이, **간단한 취향 테스트만으로 나에게 딱 맞는 축제**를 추천받을 수 있습니다.

- **Core Value**: 사용자의 여행 스타일과 선호도를 분석하여 최적의 축제 경험을 제공합니다.
- **MVP Focus**: AI 추천 시스템과 직관적인 UX를 통해 축제 발견부터 일정 관리까지 원스톱 서비스를 제공합니다.

---

## ✨ Key Features

### 1. 🎯 취향 테스트 (Taste Test)
**7개의 질문**으로 사용자의 축제 취향을 분석합니다.

- **Flow**: 동행자 → 날씨 선호 → 활동 스타일 → 음식 → 분위기 → 시간대 → 참여도
- **UX**: 이모지와 카드 선택 방식으로 **1분 이내 완료** 가능
- **Result**: 사용자 타입 분석 + 매칭률 기반 축제 추천

### 2. 🤖 AI 맞춤 추천 (AI Recommendation)
**Google Gemini AI**를 활용한 개인화 추천 시스템

- **After Login**: 이전 취향 분석을 바탕으로 자동 추천
- **Real-time Analysis**: 찜한 축제와 일정 패턴 분석
- **Smart Tags**: #전통예술 #야경 #사진명소 등 자동 태그 생성

### 3. 📅 축제 일정 관리 (Calendar & Planner)
**FullCalendar** 기반의 직관적인 일정 관리

- **Features**:
  - 축제를 캘린더에 저장하고 날짜별 확인
  - 저장된 축제 클릭으로 상세 정보 조회
  - 일정 추가/삭제 기능
- **Integration**: 찜한 축제와 저장된 일정을 통합 관리

### 4. 🗺️ 지도 기반 탐색 (Google Maps)
**Google Maps API** 연동으로 축제 위치 시각화

- **Map View**: 전국 축제를 지도에서 한눈에 확인
- **Location Filter**: 지역별 필터링으로 원하는 지역 축제만 표시
- **Route Optimization**: 여러 축제를 방문할 때 최적 경로 제안

### 5. ❤️ 찜하기 & 리뷰 시스템
사용자 참여형 콘텐츠 관리

- **Like System**: 마음에 드는 축제를 찜하여 보관
- **Review**: 방문 후기와 평점 작성
- **My Archive**: 마이페이지에서 찜한 축제와 내가 쓴 리뷰 통합 관리

### 6. 💬 AI 챗봇 (ChatBot)
실시간 축제 정보 안내

- **Features**: 축제 관련 질문에 즉시 답변
- **Persistent**: 모든 페이지에서 우측 하단 고정 위치
- **UX**: 말풍선 디자인으로 친근한 인터페이스

### 7. 👤 소셜 로그인 & 마이페이지
간편한 인증과 개인화 서비스

- **Auth**: Google, Kakao, Naver 소셜 로그인 지원
- **My Profile**: 회원 정보 관리, PRO MEMBER 뱃지
- **Taste Profile**: 나침반 디자인의 취향 시각화
  - 사용자 타입 (예: Experience Explorer)
  - 해시태그 (#신체활동, #전통감성)
  - 취향 설명 및 재설문 기능

---

## 🎨 Core Features Detail

### 홈 & 추천 페이지
| 메인 화면 | AI 추천 | 축제 리스트 |
|---------|--------|-----------|
| 요즘 **난리 난 축제들** 큐레이션 | 노을 한 스푼 맞춤 추천 | 지역/카테고리별 필터링 |

### 핵심 페이지별 기능
| 기능 분류 | 상세 설명 |
|----------|----------|
| **Landing Page** | 브랜드 소개 영상과 시작하기 버튼으로 첫 진입 경험 최적화 |
| **Home** | 인기 축제 4개 카드로 큐레이션, WeatherWidget으로 날씨 정보 제공 |
| **After_Home** | 로그인 후 개인화 추천, "노을 한 스푼" + "난리 난 축제들" 섹션 |
| **Taste Test** | 7개 질문 기반 취향 분석, 단계별 진행률 표시 |
| **Test Result** | AI 분석 결과, 사용자 타입, 추천 축제 목록, MAIN EVENT/NEARBY SPOT 표시 |
| **Festival List** | 전체 축제 목록, 검색/필터/정렬 기능 |
| **Calendar** | FullCalendar 기반 일정 관리, Saved/Liked Festivals 통합 뷰 |
| **Map** | Google Maps 연동, 축제 위치 마커, 상세 정보 모달 |
| **Plan Curation** | AI 추천 콘텐츠 + 내가 저장한 리스트 통합 관리 |
| **My Page** | 회원 정보, 취향 프로필, 찜한 축제, 작성한 리뷰 관리 |

---

## 🛠 Tech Stack

| 항목 | 기술 |
|-----|------|
| **Frontend** | React 19.2.0, React Router DOM 7.12.0 |
| **Build Tool** | Vite 7.2.4 |
| **State Management** | Zustand 5.0.10 (with persist) |
| **Styling & UI** | TailwindCSS 4.1.18, CSS Modules, Lucide React Icons |
| **Calendar** | FullCalendar 6.1.20 (Day Grid, Time Grid, Interaction) |
| **Map** | Google Maps JavaScript API (@googlemaps/js-api-loader 2.0.2) |
| **Date Handling** | date-fns 4.1.0, React Day Picker 9.13.0 |
| **Auth** | Google OAuth (@react-oauth/google 0.13.4), Kakao/Naver Social Login |
| **AI Integration** | Google Gemini API |
| **Utilities** | clsx 2.1.1, class-variance-authority 0.7.1, tailwind-merge 3.4.0 |
| **Code Quality** | ESLint 9.39.1, Prettier, PostCSS |

---

## 📁 프로젝트 파일 구조

```
PROJECT7/
├── public/
│   ├── fonts/                    # Pretendard 폰트
│   │   └── web/static/
│   └── images/                   # 이미지 에셋
│       ├── hotels/
│       └── resorts/
│
├── src/
│   ├── main.jsx                  # 앱 진입점
│   ├── App.jsx                   # 라우팅 설정
│   ├── index.css                 # 글로벌 스타일
│   │
│   ├── pages/                    # 페이지 컴포넌트
│   │   ├── LandingPage.jsx       # 랜딩 페이지
│   │   ├── Home.jsx              # 메인 홈 (비로그인)
│   │   ├── After_Home.jsx        # 로그인 후 홈
│   │   ├── TasteTest.jsx         # 취향 테스트 (7개 질문)
│   │   ├── Testresult.jsx        # 테스트 결과 및 추천
│   │   ├── Festival_List.jsx     # 전체 축제 목록
│   │   ├── Map.jsx               # 지도 뷰
│   │   ├── Calendar.jsx          # 캘린더 일정 관리
│   │   ├── Plancuration.jsx      # 일정 큐레이션
│   │   ├── Mypage.jsx            # 마이페이지
│   │   ├── Review.jsx            # 리뷰 페이지
│   │   ├── Login.jsx             # 로그인
│   │   ├── Signup.jsx            # 회원가입
│   │   ├── OAuthKakaoCallback.jsx # 카카오 OAuth 콜백
│   │   ├── Dateregistration.jsx  # 날짜 등록
│   │   └── Loading.jsx           # 로딩 화면
│   │
│   ├── components/               # 재사용 컴포넌트
│   │   ├── Header.jsx            # 공통 헤더
│   │   ├── Header_home.jsx       # 홈 전용 헤더
│   │   ├── TownCard.jsx          # 축제 카드
│   │   ├── TownDetailModal.jsx   # 축제 상세 모달
│   │   ├── GoogleMap.jsx         # 구글 맵 컴포넌트
│   │   ├── PlanGoogleMap.jsx     # 일정용 맵
│   │   ├── WeatherWidget.jsx     # 날씨 위젯
│   │   ├── ChatBot.jsx           # AI 챗봇
│   │   └── ui/                   # shadcn/ui 컴포넌트
│   │       ├── button.jsx
│   │       ├── calendar.jsx
│   │       └── card.jsx
│   │
│   ├── store/
│   │   └── useStore.js           # Zustand 전역 상태 관리
│   │
│   ├── data/
│   │   └── festivals.json        # 축제 데이터
│   │
│   ├── lib/
│   │   ├── googleMaps.js         # Google Maps 유틸
│   │   └── utils.js              # 공통 유틸리티
│   │
│   └── assets/                   # 정적 에셋 (비디오, 이미지 등)
│
├── components.json               # shadcn/ui 설정
├── tailwind.config.js            # Tailwind CSS 설정
├── vite.config.js                # Vite 빌드 설정
├── postcss.config.js             # PostCSS 설정
├── eslint.config.js              # ESLint 설정
├── jsconfig.json                 # JavaScript 프로젝트 설정
└── package.json                  # 의존성 관리
```

---

## 🗄️ 데이터 구조 (Zustand Store)

### 주요 State
```javascript
{
  // 사용자 인증
  user: null,
  loginUser: null,
  loginType: 'local' | 'google' | 'kakao' | 'naver',
  googleAccessToken: null,
  kakaoAuthCode: null,

  // 축제 관련
  selectedFestivalPSeq: null,      // 선택된 축제 ID
  likedFestivals: [],              // 찜한 축제 목록
  savedCalendarFestivals: [],      // 캘린더 저장 축제

  // 취향 테스트
  tasteTestAnswers: [],            // 7개 질문 답변
  
  // UI 상태
  selectedRegion: null,            // 선택된 지역
  searchQuery: '',                 // 검색어
}
```

---

## 🎨 주요 디자인 시스템

### 컬러 팔레트
- **Primary Orange**: `#FF5F33` (강조 색상)
- **Gradient**: `linear-gradient(90deg, #FF5F33, #EAB308)` (주황-노랑)
- **Background**: `#f9fafb` (밝은 회색)

### 타이포그래피
- **Main Font**: Pretendard Variable
- **Icon Font**: Material Symbols, Lucide React

### UI 컴포넌트
- **Cards**: 둥근 모서리 (32px), 그림자 효과
- **Spacing**: 카드 간격 5.5px (밀집 레이아웃)
- **Grid**: 1행 4개 카드 레이아웃

---

## 🚀 로컬 실행 방법

### 1. 저장소 클론
```bash
git clone <repository-url>
cd PROJECT7
```

### 2. 패키지 설치
```bash
npm install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일 생성:

```env
# Google OAuth
VITE_GOOGLE_CLIENT_ID=your_google_client_id

# Google Maps API
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Kakao
VITE_KAKAO_CLIENT_ID=your_kakao_client_id
VITE_KAKAO_REDIRECT_URI=http://localhost:5173/oauth/kakao/callback

# Naver
VITE_NAVER_CLIENT_ID=your_naver_client_id
VITE_NAVER_REDIRECT_URI=http://localhost:5173/oauth/naver/callback

# Gemini AI (백엔드)
GEMINI_API_KEY=your_gemini_api_key
```

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 5. 빌드
```bash
npm run build
npm run preview
```

---

## 🎯 AI 백엔드 API 스펙

### 1. 맞춤 추천 API (After_Home)
```http
POST /api/recommendations/user
Content-Type: application/json

{
  "userId": "user123",
  "limit": 4
}
```

**Response:**
```json
{
  "tags": ["#전통예술", "#야경", "#사진명소"],
  "festivals": [
    {
      "pSeq": 201,
      "fstvlNm": "정선 얼음나라축제",
      "matchRate": 95
    }
  ]
}
```

### 2. 취향 테스트 결과 API (Testresult)
```http
POST /api/recommendations/taste-test
Content-Type: application/json

{
  "answers": [
    { "questionId": 1, "selectedOptions": [1, 3] },
    { "questionId": 2, "selectedOptions": [2] }
  ]
}
```

**Response:**
```json
{
  "userType": {
    "type": "Experience Explorer",
    "description": "새로운 경험을 추구하는 모험가형",
    "image": "/assets/explorer.png"
  },
  "recommendedFestivals": [
    {
      "pSeq": 750,
      "fstvlNm": "화천 산천어축제",
      "matchRate": 92
    }
  ]
}
```

---

## 📊 주요 기능 플로우

### 사용자 여정 (User Journey)
```
1. Landing Page
   ↓ (시작하기)
2. Home (비로그인 상태)
   → 인기 축제 둘러보기
   → 취향 테스트 시작
   ↓
3. Taste Test (7개 질문)
   ↓
4. Test Result
   → 사용자 타입 분석
   → 추천 축제 목록
   → "나의 일정으로 저장하기"
   ↓
5. Login (소셜 로그인)
   ↓
6. After_Home (로그인 후)
   → AI 맞춤 추천 "노을 한 스푼"
   → 찜하기/일정 저장
   ↓
7. Calendar
   → 저장된 축제 일정 관리
   ↓
8. My Page
   → 찜한 축제
   → 내 취향 프로필
   → 작성한 리뷰
```

---

## 🎭 페이지별 핵심 UX

### Testresult.jsx
- **MAIN EVENT**: 클릭한 축제의 fstvlNm, rdnmadr 표시
- **NEARBY SPOT**: ministry_region 기반 19개 지역 명소 자동 매칭
  - 예: 평창 → 대관령 양떼목장, 강릉 → 경포대, 부산 → 해운대
- **TownDetailModal**: 페이지 이동 없이 팝업으로 상세 정보 확인
- **찜 버튼**: TownCard 컴포넌트 사용으로 하트 아이콘 표시

### Calendar.jsx
- **Saved Festivals 저장**: Testresult에서 "나의 일정으로 저장하기"
- **FullCalendar 통합**: `[...events, ...savedFestivalEvents]` 병합
- **삭제 기능**: `saved-` prefix 감지 → 확인 다이얼로그 → 제거

### After_Home.jsx
- **"추천 계속 보기"**: 클릭 시 `clearTasteTestAnswers()` 호출
- **매번 새로운 설문**: 취향 테스트 재시작 가능

### Home.jsx
- **4개 카드 레이아웃**: pSeq [201, 750, 272, 388] 고정 큐레이션
- **"난리 난 축제들"**: 주황색 강조 텍스트
- **비디오 배너**: 풍랑 영상 자동 재생

### Mypage.jsx
- **나침반 디자인**: compass-glow 효과로 취향 시각화
- **PRO MEMBER 뱃지**: 회원 등급 표시
- **Two Tabs**: My info / 내 축제 취향

---

## 🐛 최근 버그 수정 (UPDATE_LOG 참고)

### 2026-01-28
- ✅ useMemo 의존성 배열 경고 수정
- ✅ React Compiler memoization 충돌 해결
- ✅ 미사용 import 제거

### 2026-01-26
- ✅ Material Symbols 폰트 추가 (auto_awesome, calendar_add_on, festival 아이콘)
- ✅ TownCard 클릭 동작 변경 (페이지 이동 → 모달 팝업)
- ✅ NEARBY SPOT 지역별 명소 자동 매핑
- ✅ mainEventFestival state 추가로 모달 닫아도 정보 유지

---

## 📝 개발 규칙

### Git 브랜치 전략
- **main**: 프로덕션 배포 브랜치
- **develop**: 개발 통합 브랜치
- **feature/기능명**: 기능 개발 브랜치

### 커밋 컨벤션
```
[YYMMDD] TYPE: 커밋메시지

### 작업 내용
- 작업 내용 1
- 작업 내용 2
```

**타입:**
- `FEAT`: 새로운 기능 추가
- `FIX`: 버그 수정
- `STYLE`: UI/CSS 변경
- `REFACTOR`: 코드 리팩토링
- `DOCS`: 문서 수정
- `CHORE`: 기타 수정

---

## 🔮 향후 계획

### Phase 1 (MVP 완성)
- [ ] 백엔드 API 연동 (Gemini AI)
- [ ] 리뷰 시스템 고도화
- [ ] 반응형 디자인 최적화

### Phase 2 (고도화)
- [ ] 실시간 축제 정보 업데이트
- [ ] 커뮤니티 기능 (축제 후기 공유)
- [ ] PDF 일정표 다운로드
- [ ] 알림 시스템 (축제 D-7, D-1 알림)

### Phase 3 (확장)
- [ ] 모바일 앱 개발
- [ ] 축제 티켓 예매 연동
- [ ] 숙박/교통 통합 추천

---

## 👥 팀원 및 기여

| 이름 | 역할 | 주요 기여 |
|-----|------|----------|
| 송지훈/한경수 | Frontend Lead | 전체 Frontend 기능 구현 |
| 이효연 | Design | UI/UX 설계, 브랜딩, 컴포넌트 디자인, 데이터처리 |
| 손주현 | QA | 테스트, 버그 리포팅 및 수정 |
| 이병남 | Backend Lead | RAG AI/Typesense Search API 연동, Github Strategy  |
---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Claude 3.5**: AI 추천/Persona 엔진
- **Typesense**: Intelligent Search Engine
- **FullCalendar**: 일정 관리 라이브러리
- **shadcn/ui**: UI 컴포넌트 시스템
- **Pretendard**: 한글 폰트 시스템
- **Lucide React**: 아이콘 라이브러리

---

**Made with ❤️ by Festory Team**



