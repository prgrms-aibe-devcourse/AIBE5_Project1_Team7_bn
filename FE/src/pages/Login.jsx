import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  // 기존 아이디/비밀번호 로그인
  const login = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.id === id && user.pw === pw) {
      sessionStorage.setItem("loginUser", id);
      sessionStorage.setItem("loginType", "local");

      alert("로그인 성공");
      navigate("/", { replace: true });
    } else {
      alert("로그인 실패");
    }
  };

  // 구글 로그인 성공 처리
  const handleGoogleSuccess = (credentialResponse) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      alert("구글 로그인 토큰을 받지 못했습니다.");
      return;
    }

    // ✅ 프로젝트용: 로그인 상태만 저장
    sessionStorage.setItem("loginUser", "google");
    sessionStorage.setItem("loginType", "google");
    sessionStorage.setItem("googleIdToken", idToken); // (선택) 나중에 사용 가능

    alert("구글 로그인 성공");
    navigate("/", { replace: true });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>로그인</h2>

      {/* 일반 로그인 */}
      <input
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="비밀번호"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
      />
      <br />
      <button onClick={login}>로그인</button>

      {/* 회원가입 */}
      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate("/signup")}>회원가입</button>
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* 구글 로그인 */}
      <div style={{ display: "inline-block" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("구글 로그인 실패")}
          useOneTap={false}
        />
      </div>
    </div>
  );
}

export default Login;
