import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [touched, setTouched] = useState({ email: false, pw: false });

  // ✅ 에러 문구 (원하는 문구 그대로)
  const emailError = useMemo(() => {
    if (!touched.email) return "";
    if (!email.trim()) return "아이디나 비밀번호 기재 안 했을 시 문구 노출";
    return "";
  }, [email, touched.email]);

  const pwError = useMemo(() => {
    if (!touched.pw) return "";
    if (!pw.trim()) return "FE 만 구축하는 것이니 비었을 때만 문구 노출하면 될듯함";
    return "";
  }, [pw, touched.pw]);

  // ✅ 기존 아이디/비밀번호 로그인 (지금 방식 유지)
  const login = () => {
    setTouched({ email: true, pw: true });

    if (!email.trim() || !pw.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.id === email && user.pw === pw) {
      sessionStorage.setItem("loginUser", email);
      sessionStorage.setItem("loginType", "local");
      alert("로그인 성공");
      navigate("/", { replace: true });
    } else {
      alert("로그인 실패");
    }
  };

  // ✅ 구글 로그인 성공 처리 (너 코드 참고해서 유지)
  const handleGoogleSuccess = (credentialResponse) => {
    const idToken = credentialResponse?.credential;

    if (!idToken) {
      alert("구글 로그인 토큰을 받지 못했습니다.");
      return;
    }

    sessionStorage.setItem("loginUser", "google");
    sessionStorage.setItem("loginType", "google");
    sessionStorage.setItem("googleIdToken", idToken); // (선택) 나중에 백엔드로 보낼 때 사용

    alert("구글 로그인 성공");
    navigate("/", { replace: true });
  };

  // ✅ 카카오/네이버 로그인: API 붙일 자리
  const handleKakaoLogin = () => {
    // TODO: 카카오 로그인 API 연동 (리다이렉트 or SDK)
    // 예) window.location.href = KAKAO_AUTH_URL;
    alert("카카오 로그인 API 연결 예정");
  };

  const handleNaverLogin = () => {
    // TODO: 네이버 로그인 API 연동
    // 예) window.location.href = NAVER_AUTH_URL;
    alert("네이버 로그인 API 연결 예정");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      background: "linear-gradient(135deg, #FFEDD5 0%, #FEF3C7 100%)",
      fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: 360,
      background: "#fff",
      border: "none",
      borderRadius: 20,
      padding: "32px 24px 24px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    },
    topRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      marginBottom: 16,
    },
    backBtn: {
      position: "absolute",
      left: 0,
      width: 32,
      height: 32,
      borderRadius: "50%",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      color: "#6b7280",
    },
    topTitle: { fontWeight: 700, fontSize: 14, color: "#111", letterSpacing: "-0.5px" },

    headline: {
      textAlign: "center",
      marginTop: 8,
      marginBottom: 4,
      fontSize: 24,
      fontWeight: 900,
      color: "#FF5F33",
      lineHeight: 1.2,
      letterSpacing: "-0.5px",
    },
    sub: {
      textAlign: "center",
      marginBottom: 12,
      fontSize: 13,
      color: "#6b7280",
      lineHeight: 1.4,
    },
    subSmall: {
      textAlign: "center",
      marginBottom: 20,
      fontSize: 12,
      color: "#9ca3af",
      lineHeight: 1.4,
    },

    label: { fontSize: 13, color: "#374151", fontWeight: 600, marginBottom: 8, display: "block" },
    inputWrap: { marginBottom: 14 },
    input: {
      width: "100%",
      height: 44,
      borderRadius: 12,
      border: "1px solid #e5e7eb",
      padding: "0 14px",
      outline: "none",
      fontSize: 13,
      boxSizing: "border-box",
      transition: "all 0.2s",
      backgroundColor: "#f9fafb",
    },
    inputFocus: {
      borderColor: "#FF5F33",
      backgroundColor: "#fff",
      boxShadow: "0 0 0 3px rgba(255, 95, 51, 0.1)",
    },

    pwRow: { position: "relative" },
    eyeBtn: {
      position: "absolute",
      right: 12,
      top: "50%",
      transform: "translateY(-50%)",
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: 16,
      padding: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#9ca3af",
    },

    helpText: {
      marginTop: 6,
      fontSize: 11,
      color: "#f87171",
      textAlign: "right",
      minHeight: 14,
    },

    primaryBtn: {
      width: "100%",
      height: 44,
      borderRadius: 12,
      border: "none",
      background: "linear-gradient(90deg, #FF5F33 0%, #FF7A4D 100%)",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 800,
      fontSize: 14,
      marginTop: 16,
      transition: "all 0.2s",
      boxShadow: "0 4px 12px rgba(255, 95, 51, 0.3)",
    },
    primaryBtnHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(255, 95, 51, 0.4)",
    },

    linkRow: {
      display: "flex",
      justifyContent: "center",
      gap: 16,
      marginTop: 16,
      fontSize: 12,
      color: "#9ca3af",
      alignItems: "center",
    },
    linkBtn: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "#9ca3af",
      padding: 0,
      fontSize: 12,
      transition: "color 0.2s",
    },
    linkBtnHover: {
      color: "#FF5F33",
    },
    divider: {
      width: "1px",
      height: "16px",
      backgroundColor: "#e5e7eb",
    },

    dividerLine: {
      margin: "16px 0 14px",
      borderTop: "1px solid #e5e7eb",
    },

    socialBtn: {
      width: "100%",
      height: 44,
      borderRadius: 12,
      border: "none",
      background: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontWeight: 700,
      fontSize: 13,
      marginBottom: 10,
      boxSizing: "border-box",
      transition: "all 0.2s",
      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    },
    kakaoBtn: {
      background: "#FFE812",
      color: "#333",
    },
    naverBtn: {
      background: "#00C73C",
      color: "#fff",
    },
    googleWrap: {
      display: "flex",
      justifyContent: "center",
      marginTop: 8,
      marginBottom: 10,
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* 상단: 뒤로가기 + 로그인 타이틀 */}
        <div style={styles.topRow}>
          <button style={styles.backBtn} onClick={() => navigate(-1)} aria-label="back">
            ←
          </button>
          <div style={styles.topTitle}>로그인</div>
        </div>

        {/* 헤드라인 */}
        <div style={styles.headline}>
          Festory에 <br /> 오신 걸 환영합니다!
        </div>
        <div style={styles.sub}>나만의 축제 여행을 발견하는 가장 쉬운 방법</div>
        <div style={styles.subSmall}>다양한 축제 정보들을 받아보는 가장 쉬운 방법</div>

        {/* 이메일 */}
        <div style={styles.inputWrap}>
          <label style={styles.label}>이메일(아이디)</label>
          <input
            style={styles.input}
            placeholder="example@festory.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched((p) => ({ ...p, email: true }))}
          />
          <div style={styles.helpText}>{emailError}</div>
        </div>

        {/* 비밀번호 */}
        <div style={styles.inputWrap}>
          <label style={styles.label}>비밀번호</label>
          <div style={styles.pwRow}>
            <input
              style={{ ...styles.input, paddingRight: 42 }}
              type={showPw ? "text" : "password"}
              placeholder="영문+숫자+특수문자조합 8~16자리"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onBlur={() => setTouched((p) => ({ ...p, pw: true }))}
            />
            <button
              type="button"
              style={styles.eyeBtn}
              onClick={() => setShowPw((v) => !v)}
              aria-label="toggle password"
              title="비밀번호 보기/숨기기"
            >
              {showPw ? "👁" : "👁‍🗨"}
            </button>
          </div>
          <div style={styles.helpText}>{pwError}</div>
        </div>

        {/* 로그인 버튼 */}
        <button 
          style={styles.primaryBtn} 
          onClick={login}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.primaryBtnHover)}
          onMouseLeave={(e) => Object.assign(e.target.style, { transform: "translateY(0)", boxShadow: "0 4px 12px rgba(255, 95, 51, 0.3)" })}
        >
          로그인
        </button>

        {/* 하단 링크 */}
        <div style={styles.linkRow}>
          <button 
            style={styles.linkBtn} 
            onClick={() => navigate("/find-id")}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.linkBtnHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { color: "#9ca3af" })}
          >
            아이디 찾기
          </button>
          <div style={styles.divider} />
          <button 
            style={styles.linkBtn} 
            onClick={() => navigate("/find-password")}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.linkBtnHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { color: "#9ca3af" })}
          >
            비밀번호 찾기
          </button>
          <div style={styles.divider} />
          <button 
            style={styles.linkBtn} 
            onClick={() => navigate("/signup")}
            onMouseEnter={(e) => Object.assign(e.target.style, styles.linkBtnHover)}
            onMouseLeave={(e) => Object.assign(e.target.style, { color: "#9ca3af" })}
          >
            회원가입
          </button>
        </div>

        <div style={styles.dividerLine} />

        {/* 소셜 로그인 3개 (카카오/구글/네이버) */}
        <button 
          style={{ ...styles.socialBtn, ...styles.kakaoBtn }} 
          onClick={handleKakaoLogin}
          onMouseEnter={(e) => e.target.style.opacity = "0.85"}
          onMouseLeave={(e) => e.target.style.opacity = "1"}
        >
          🚀 카카오 계정으로 시작하기
        </button>

        {/* ✅ 구글은 실제 API 사용 */}
        <div style={styles.googleWrap}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("구글 로그인 실패")}
            useOneTap={false}
          />
        </div>

        {/* 네이버는 자리만 */}
        <button 
          style={{ ...styles.socialBtn, ...styles.naverBtn }} 
          onClick={handleNaverLogin}
          onMouseEnter={(e) => e.target.style.opacity = "0.85"}
          onMouseLeave={(e) => e.target.style.opacity = "1"}
        >
          ✓ 네이버 계정으로 시작하기
        </button>
      </div>
    </div>
  );
}

export default Login;
