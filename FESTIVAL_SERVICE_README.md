# Korean Festival Discovery Service

## 개요 (Overview)

한국 축제 발견 웹 서비스는 규칙 기반 논리와 라벨 매칭을 통해 사용자의 선호도에 맞는 축제를 추천하는 시스템입니다.

This is a Korean festival discovery web service that recommends festivals based on user preferences using rule-based logic and label matching.

## 핵심 원칙 (Core Principles)

1. **실제 데이터만 사용**: 모든 축제 데이터는 실제 한국 축제 정보입니다.
2. **결정론적 추천**: 모든 추천은 미리 정의된 라벨 사전을 기반으로 합니다.
3. **설명 가능성**: 모든 추천 결과는 매칭된 라벨을 통해 설명 가능합니다.
4. **규칙 기반 필터링**: 필터링과 정렬은 명확한 규칙을 따릅니다.

## 주요 기능 (Key Features)

### 1. 축제 검색 및 필터링
- 지역별 검색
- 날짜 범위 검색
- 카테고리별 필터링
- 무료/유료 필터링
- 다양한 정렬 옵션 (날짜, 이름, 지역)

### 2. 맞춤 추천
사용자 선호도에 따른 축제 추천:
- **가족여행**: 가족친화적, 체험형, 교육적, 여유로운
- **데이트**: 데이트추천, 낭만적, 여유로운, 관람형
- **친구와함께**: 친구모임, 활기찬, 참여형, 체험형
- **혼자여행**: 혼자가기좋은, 여유로운, 관람형, 교육적
- **전통문화체험**: 전통적, 교육적, 체험형
- **음식즐기기**: 체험형, 가족친화적, 친구모임

### 3. 비슷한 축제 찾기
선택한 축제와 라벨이 유사한 다른 축제 추천

## 아키텍처 (Architecture)

### 데이터 모델
```
Festival
├── 기본 정보: 이름, 날짜, 장소, 지역
├── 비용 정보: 입장료, 무료 여부
├── 카테고리: 전통문화, 음악, 예술, 음식, 꽃축제, 불꽃축제, 지역특산, 계절행사
└── 라벨: 분위기, 활동 유형, 계절, 규모, 접근성 등
```

### 라벨 사전 (Label Dictionary)
미리 정의된 라벨과 카테고리를 통해 일관된 추천을 제공합니다.

**카테고리 (Categories)**:
- 전통문화, 음악, 예술, 음식, 꽃축제, 불꽃축제, 지역특산, 계절행사

**라벨 (Labels)**:
- 분위기: 가족친화적, 데이트추천, 친구모임, 혼자가기좋은
- 활동 유형: 체험형, 관람형, 참여형, 교육적
- 분위기/무드: 활기찬, 여유로운, 낭만적, 전통적
- 계절: 봄축제, 여름축제, 가을축제, 겨울축제
- 규모: 대규모, 중규모, 소규모
- 접근성: 교통편리, 주차가능, 실내, 실외

## API 엔드포인트

### REST API

#### 축제 목록 및 조회
- `GET /api/festivals` - 모든 축제 조회
- `GET /api/festivals/{id}` - 특정 축제 상세 조회
- `GET /api/festivals/region/{region}` - 지역별 축제 조회
- `GET /api/festivals/ongoing` - 현재 진행중인 축제
- `GET /api/festivals/upcoming?days=30` - 다가오는 축제
- `GET /api/festivals/free` - 무료 축제

#### 필터링 및 검색
- `POST /api/festivals/filter` - 복합 조건 필터링
  ```json
  {
    "region": "서울",
    "categories": ["음악", "예술"],
    "isFree": true,
    "startDate": "2024-01-01",
    "endDate": "2024-12-31",
    "sortBy": "date",
    "sortOrder": "asc"
  }
  ```

#### 추천
- `GET /api/festivals/recommend/preference?preference=가족여행&region=서울&limit=10`
  - 선호도 기반 추천
- `GET /api/festivals/recommend/categories?categories=음악,예술&limit=10`
  - 카테고리 기반 추천
- `GET /api/festivals/{id}/similar?limit=5`
  - 유사 축제 찾기

#### 라벨 사전 정보
- `GET /api/festivals/dictionary/categories` - 모든 카테고리
- `GET /api/festivals/dictionary/labels` - 모든 라벨
- `GET /api/festivals/dictionary/regions` - 모든 지역
- `GET /api/festivals/dictionary/preferences` - 사용 가능한 선호도

### 웹 페이지

- `GET /festivals` - 축제 목록 페이지
- `GET /festivals/{id}` - 축제 상세 페이지
- `GET /festivals/recommend` - 맞춤 추천 페이지

## 실행 방법 (How to Run)

### 요구사항
- Java 11+
- Maven 3.6+
- MySQL 8.0+ (또는 H2 Database)

### 빌드 및 실행
```bash
# 의존성 설치 및 빌드
mvn clean install

# 테스트 실행
mvn test

# 애플리케이션 실행
mvn spring-boot:run
```

### 애플리케이션 접속
- 웹 UI: http://localhost:8080/festivals
- API 문서: http://localhost:8080/swagger-ui.html (Swagger UI)

## 데이터 초기화

애플리케이션 시작 시 `FestivalDataInitializer`가 다음 실제 한국 축제 데이터를 자동으로 로드합니다:

1. 진주남강유등축제 (경남)
2. 보령머드축제 (충남)
3. 전주국제영화제 (전북)
4. 화천산천어축제 (강원)
5. 서울세계불꽃축제 (서울)
6. 안동국제탈춤페스티벌 (경북)
7. 부산국제영화제 (부산)
8. 대구치맥페스티벌 (대구)
9. 제주들불축제 (제주)
10. 광주비엔날레 (광주)
11. 자라섬국제재즈페스티벌 (경기)
12. 함평나비축제 (전남)
13. 인천펜타포트락페스티벌 (인천)
14. 순천만국제정원박람회 (전남)
15. 담양대나무축제 (전남)
16. 춘천마임축제 (강원)

## 테스트

프로젝트는 25개의 단위 테스트를 포함하고 있습니다:

```bash
# 모든 테스트 실행
mvn test

# 특정 테스트 클래스 실행
mvn test -Dtest=FestivalLabelDictionaryTest
mvn test -Dtest=FestivalServiceTest
mvn test -Dtest=FestivalRecommendationServiceTest
```

### 테스트 커버리지
- `FestivalLabelDictionaryTest`: 라벨 사전 검증 (9 테스트)
- `FestivalServiceTest`: 필터링 및 조회 로직 (12 테스트)
- `FestivalRecommendationServiceTest`: 추천 알고리즘 (13 테스트)

## 확장 계획

### LLM 통합 (향후 계획)
LLM은 다음 용도로만 사용될 예정입니다:
1. 축제 설명 생성/요약
2. 추천 이유 상세 설명 생성
3. 라벨 제안 (새로운 축제 등록 시)

**중요**: LLM은 추천 결정에 직접 관여하지 않으며, 텍스트 생성 목적으로만 사용됩니다.

## 기술 스택 (Tech Stack)

- **Backend**: Spring Boot 2.7.1, Java 11
- **Database**: JPA/Hibernate, MySQL/H2
- **Frontend**: Thymeleaf, HTML/CSS/JavaScript
- **Testing**: JUnit 5, Mockito
- **Build Tool**: Maven
- **Documentation**: SpringDoc OpenAPI (Swagger)

## 프로젝트 구조

```
src/main/java/com/example/portpilot/domain/festival/
├── Festival.java                      # 축제 엔티티
├── FestivalDto.java                   # 데이터 전송 객체
├── FestivalRepository.java            # 데이터 접근 레이어
├── FestivalService.java               # 비즈니스 로직 (필터링/조회)
├── FestivalRecommendationService.java # 추천 로직
├── FestivalLabelDictionary.java       # 라벨 사전
├── FestivalFilterCriteria.java        # 필터 기준
├── FestivalRecommendationResult.java  # 추천 결과
└── FestivalDataInitializer.java       # 초기 데이터 로드

src/main/java/com/example/portpilot/web/controller/festival/
├── FestivalApiController.java         # REST API 컨트롤러
└── FestivalController.java            # 웹 페이지 컨트롤러

src/main/resources/templates/festivals/
├── list.html                          # 축제 목록 페이지
├── detail.html                        # 축제 상세 페이지
└── recommend.html                     # 추천 페이지

src/test/java/com/example/portpilot/domain/festival/
├── FestivalLabelDictionaryTest.java
├── FestivalServiceTest.java
└── FestivalRecommendationServiceTest.java
```

## 라이선스

This project is part of the AIBE5 course project.

## 기여자

- Team 7
