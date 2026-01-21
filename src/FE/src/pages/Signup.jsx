import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const signup = () => {
    if (!id || !pw) {
      alert("아이디/비밀번호를 입력해 주세요.");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ id, pw }));
    alert("회원가입 성공");
    navigate("/login");
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>회원가입</h2>

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

      <button onClick={signup}>회원가입 완료</button>
      <button onClick={() => navigate("/login")}>로그인으로</button>
    </div>
  );
}

export default Signup;
