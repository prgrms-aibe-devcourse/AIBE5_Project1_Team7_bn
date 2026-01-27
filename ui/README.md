# UI 리소스 및 랜딩 페이지 구현 가이드

## 📁 디렉토리 구조

```
ui/
├── Pretendard/          # Pretendard 폰트 파일
│   ├── LICENSE.txt
│   ├── public/static/   # OTF, TTF 폰트 파일
│   └── web/            # 웹용 폰트 (woff, woff2)
├── sea/                # 영상 리소스
│   ├── 바닷가.mp4
│   └── 풍랑30.mp4
└── README.md
```

---

## 🎬 랜딩 페이지 구현

### 1. 새로 생성된 파일

#### `src/pages/LandingVideo.jsx`
영상 랜딩 페이지 컴포넌트
- 바닷가 영상 배경
- "Your golden hour starts here — with Festory." 텍스트 애니메이션
- 10초 후 자동으로 홈 페이지로 이동
- 페이드아웃 효과

```jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingVideo.css';

function LandingVideo() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 9초 후 페이드아웃 시작
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 9000);

    // 10초 후 홈으로 이동
    const navTimer = setTimeout(() => {
      navigate('/home');
    }, 10000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`landing-container ${fadeOut ? 'fade-out' : ''}`}>
      <video autoPlay muted className="background-video">
        <source src="/videos/바닷가.mp4" type="video/mp4" />
      </video>
      <div className="text-overlay">
        <h1 className="welcome-text text-fade-in">
          Your golden hour starts here
        </h1>
        <p className="subtitle-text subtitle-fade-in">— with Festory.</p>
      </div>
    </div>
  );
}

export default LandingVideo;
```

#### `src/pages/LandingVideo.css`
랜딩 페이지 스타일시트
- 전체 화면 영상 배경
- 문장 단위 페이드인 애니메이션
- 페이드아웃 전환 효과
- 반응형 디자인

#### `public/videos/바닷가.mp4`
배경 영상 파일 (ui/sea/바닷가.mp4에서 복사)

---

### 2. 수정된 파일

#### `src/App.jsx`

**변경 사항:**
```jsx
// 17번째 줄: import 추가
import LandingVideo from "./pages/LandingVideo";

// 22번째 줄: 루트 경로 변경
// Before:
<Route path="/" element={<Navigate to="/home" replace />} />

// After:
<Route path="/" element={<LandingVideo />} />
```

#### `src/index.css`

**변경 사항:**
```css
/* 2번째 줄: Pretendard 폰트 CDN 추가 */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

/* 68번째 줄: body에 font-family 추가 */
body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
}
```

---

## 🎨 구현 특징

### 애니메이션 효과
1. **텍스트 페이드인**: 2초에 걸쳐 서서히 나타남
2. **서브타이틀 페이드인**: 1.5초 지연 후 2초간 나타남
3. **페이드아웃**: 9초 후 1초간 페이드아웃
4. **자동 전환**: 10초 후 홈 페이지로 자동 이동

### 디자인 요소
- **폰트**: Ivypresto Display (serif, italic)
- **색상**: #FFD700 (황금색)
- **텍스트 그림자**: 가독성 향상
- **전체 화면 영상**: object-fit: cover

### 타이밍
```
0s   - 영상 시작
0s   - 메인 텍스트 페이드인 시작 (2초간)
1.5s - 서브타이틀 페이드인 시작 (2초간)
9s   - 페이드아웃 시작 (1초간)
10s  - 홈 페이지로 이동
```

---

## 📦 리소스

### Pretendard 폰트
- 라이선스: SIL Open Font License 1.1
- 용도: 전체 웹페이지 기본 폰트
- CDN: https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css

### 영상 리소스
- **바닷가.mp4**: 랜딩 페이지 배경 영상
- **풍랑30.mp4**: 추가 영상 (미사용)

---

## 🚀 적용 방법

### 1. 영상 파일 복사
```bash
mkdir -p public/videos
cp ui/sea/바닷가.mp4 public/videos/
```

### 2. 컴포넌트 생성
- `src/pages/LandingVideo.jsx` 생성
- `src/pages/LandingVideo.css` 생성

### 3. 라우팅 설정
- `src/App.jsx`에 LandingVideo import 및 루트 경로 설정

### 4. 전역 폰트 적용
- `src/index.css`에 Pretendard 폰트 추가

### 5. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 http://localhost:5173/ 접속

---

## 📝 참고사항

- 로컬 변경사항은 `git push` 전까지 원격 저장소에 영향 없음
- 원상태 복구: `git reset --hard origin/fe`
- 영상 시간 조정: `LandingVideo.jsx`의 setTimeout 값 변경
- 애니메이션 속도 조정: `LandingVideo.css`의 animation duration 변경

---

**작성일**: 2026년 1월 27일
