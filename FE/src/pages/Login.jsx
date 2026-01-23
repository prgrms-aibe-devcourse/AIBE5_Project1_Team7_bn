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
      background: "#f7f7f7",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: 360,
      background: "#fff",
      border: "1px solid #e6e6e6",
      borderRadius: 16,
      padding: "24px 20px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
    },
    topRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      marginBottom: 12,
    },
    backBtn: {
      position: "absolute",
      left: 0,
      width: 32,
      height: 32,
      borderRadius: "50%",
      border: "1px solid #e6e6e6",
      background: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
    },
    topTitle: { fontWeight: 700, fontSize: 13, color: "#111" },

    headline: {
      textAlign: "center",
      marginTop: 8,
      marginBottom: 8,
      fontSize: 20,
      fontWeight: 800,
      color: "#111",
      lineHeight: 1.3,
    },
    sub: {
      textAlign: "center",
      marginBottom: 20,
      fontSize: 12,
      color: "#888",
      lineHeight: 1.4,
    },

    label: { fontSize: 12, color: "#111", fontWeight: 700, marginBottom: 8 },
    inputWrap: { marginBottom: 14 },
    input: {
      width: "100%",
      height: 44,
      borderRadius: 8,
      border: "1px solid #d9d9d9",
      padding: "0 14px",
      outline: "none",
      fontSize: 13,
      boxSizing: "border-box",
      transition: "border-color 0.2s",
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
    },

    helpText: {
      marginTop: 6,
      fontSize: 11,
      color: "#3b82f6",
      textAlign: "right",
      minHeight: 14,
    },

    primaryBtn: {
      width: "100%",
      height: 44,
      borderRadius: 8,
      border: "1px solid #111",
      background: "#fff",
      cursor: "pointer",
      fontWeight: 800,
      fontSize: 14,
      marginTop: 12,
      transition: "all 0.2s",
    },

    linkRow: {
      display: "flex",
      justifyContent: "center",
      gap: 12,
      marginTop: 14,
      fontSize: 12,
      color: "#888",
    },
    linkBtn: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      color: "#888",
      padding: 0,
      fontSize: 12,
    },

    divider: {
      margin: "16px 0 14px",
      borderTop: "1px solid #eee",
    },

    socialBtn: {
      width: "100%",
      height: 44,
      borderRadius: 8,
      border: "1px solid #d9d9d9",
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
    },
    iconBox: {
      width: 18,
      height: 18,
      border: "1px solid #bbb",
      borderRadius: 4,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 10,
      color: "#555",
      fontWeight: 800,
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

        {/* 이메일 */}
        <div style={styles.inputWrap}>
          <div style={styles.label}>아이디(이메일)</div>
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
          <div style={styles.label}>비밀번호</div>
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
              👁
            </button>
          </div>
          <div style={styles.helpText}>{pwError}</div>
        </div>

        {/* 로그인 버튼 */}
        <button style={styles.primaryBtn} onClick={login}>
          로그인
        </button>

        {/* 하단 링크 */}
        <div style={styles.linkRow}>
          <button style={styles.linkBtn} onClick={() => navigate("/find-id")}>
            아이디 찾기
          </button>
          <span>|</span>
          <button style={styles.linkBtn} onClick={() => navigate("/find-password")}>
            비밀번호 찾기
          </button>
          <span>|</span>
          <button style={styles.linkBtn} onClick={() => navigate("/signup")}>
            회원가입
          </button>
        </div>

        <div style={styles.divider} />

        {/* 소셜 로그인 3개 (카카오/구글/네이버) */}
        <button style={styles.socialBtn} onClick={handleKakaoLogin}>
          <span style={styles.iconBox}>K</span>
          카카오 계정으로 계속하기
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
        <button style={{ ...styles.socialBtn, marginTop: 10 }} onClick={handleNaverLogin}>
          <span style={styles.iconBox}>N</span>
          네이버 계정으로 계속하기
        </button>
      </div>
    </div>
  );
}

export default Login;
