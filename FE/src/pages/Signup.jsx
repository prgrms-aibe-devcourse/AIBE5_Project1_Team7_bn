import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    pw: "",
    pwConfirm: "",
    name: "",
    nickname: "",
    phone: "",
    email: "",
    emailDomain: "naver.com",
    year: "",
    month: "",
    day: "",
    gender: "남성",
  });

  const [touched, setTouched] = useState({
    id: false,
    pw: false,
    pwConfirm: false,
    name: false,
    nickname: false,
    phone: false,
    email: false,
  });

  // ✅ 유효성 검사
  const idError = useMemo(() => {
    if (!touched.id) return "";
    if (!formData.id.trim()) return "아이디를 입력해주세요";
    if (formData.id.length < 6 || formData.id.length > 20) return "아이디는 6~20자여야 합니다";
    return "";
  }, [formData.id, touched.id]);

  const pwError = useMemo(() => {
    if (!touched.pw) return "";
    if (!formData.pw.trim()) return "비밀번호를 입력해주세요";
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
    if (!regex.test(formData.pw)) return "영문+숫자+특수문자 조합 8~20자여야 합니다";
    return "";
  }, [formData.pw, touched.pw]);

  const pwConfirmError = useMemo(() => {
    if (!touched.pwConfirm) return "";
    if (formData.pw !== formData.pwConfirm) return "비밀번호가 일치하지 않습니다";
    return "";
  }, [formData.pw, formData.pwConfirm, touched.pwConfirm]);

  const nicknameError = useMemo(() => {
    if (!touched.nickname) return "";
    if (!formData.nickname.trim()) return "닉네임을 입력해주세요";
    if (formData.nickname.length < 2 || formData.nickname.length > 10) return "닉네임은 2~10자여야 합니다";
    return "";
  }, [formData.nickname, touched.nickname]);

  // ✅ 중복확인 핸들러
  const checkIdDuplicate = () => {
    if (!formData.id.trim()) {
      alert("아이디를 입력해주세요");
      return;
    }
    // TODO: 백엔드 API 호출
    alert("사용 가능한 아이디입니다");
  };

  // ✅ 회원가입
  const signup = () => {
    setTouched({
      id: true,
      pw: true,
      pwConfirm: true,
      name: true,
      nickname: true,
      phone: true,
      email: true,
    });

    if (
      !formData.id.trim() ||
      !formData.pw.trim() ||
      formData.pw !== formData.pwConfirm ||
      !formData.name.trim() ||
      !formData.nickname.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.year ||
      !formData.month ||
      !formData.day ||
      idError ||
      pwError ||
      pwConfirmError ||
      nicknameError
    ) {
      alert("모든 필드를 올바르게 입력해주세요");
      return;
    }

    const user = {
      id: formData.id,
      pw: formData.pw,
      name: formData.name,
      nickname: formData.nickname,
      phone: formData.phone,
      email: `${formData.email}@${formData.emailDomain}`,
      birthDate: `${formData.year}-${formData.month}-${formData.day}`,
      gender: formData.gender,
    };

    localStorage.setItem("user", JSON.stringify(user));
    alert("회원가입 성공");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTouched = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
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
      maxWidth: 380,
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
    logoBox: {
      textAlign: "center",
      marginBottom: 16,
      fontSize: 12,
      color: "#666",
    },
    headline: {
      textAlign: "center",
      marginBottom: 8,
      fontSize: 20,
      fontWeight: 800,
      color: "#111",
    },
    sub: {
      textAlign: "center",
      marginBottom: 20,
      fontSize: 12,
      color: "#888",
    },
    label: { fontSize: 12, color: "#111", fontWeight: 700, marginBottom: 6 },
    inputWrap: { marginBottom: 12 },
    input: {
      width: "100%",
      height: 40,
      borderRadius: 8,
      border: "1px solid #d9d9d9",
      padding: "0 12px",
      outline: "none",
      fontSize: 13,
      boxSizing: "border-box",
      transition: "border-color 0.2s",
    },
    inputRow: {
      display: "flex",
      gap: 8,
      marginBottom: 12,
    },
    inputHalf: {
      flex: 1,
      height: 40,
      borderRadius: 8,
      border: "1px solid #d9d9d9",
      padding: "0 12px",
      outline: "none",
      fontSize: 13,
      boxSizing: "border-box",
    },
    dupleBtn: {
      height: 40,
      padding: "0 12px",
      borderRadius: 8,
      border: "1px solid #111",
      background: "#fff",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: 12,
      whiteSpace: "nowrap",
    },
    helpText: {
      marginTop: 4,
      fontSize: 11,
      color: "#e74c3c",
      minHeight: 14,
    },
    selectWrap: {
      display: "flex",
      gap: 8,
      marginBottom: 12,
    },
    select: {
      flex: 1,
      height: 40,
      borderRadius: 8,
      border: "1px solid #d9d9d9",
      padding: "0 12px",
      outline: "none",
      fontSize: 13,
      cursor: "pointer",
      boxSizing: "border-box",
    },
    emailRow: {
      display: "flex",
      gap: 8,
      alignItems: "center",
      marginBottom: 12,
    },
    emailInput: {
      flex: 1,
      height: 40,
      borderRadius: 8,
      border: "1px solid #d9d9d9",
      padding: "0 12px",
      outline: "none",
      fontSize: 13,
      boxSizing: "border-box",
    },
    atSymbol: {
      fontSize: 14,
      fontWeight: 700,
      color: "#111",
    },
    emailSelect: {
      flex: 1,
      height: 40,
      borderRadius: 8,
      border: "1px solid #d9d9d9",
      padding: "0 12px",
      outline: "none",
      fontSize: 13,
      cursor: "pointer",
      boxSizing: "border-box",
    },
    genderWrap: {
      display: "flex",
      gap: 20,
      marginBottom: 12,
    },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      color: "#111",
      cursor: "pointer",
    },
    radio: {
      cursor: "pointer",
    },
    termsText: {
      fontSize: 11,
      color: "#666",
      lineHeight: 1.4,
      marginBottom: 12,
      textAlign: "center",
    },
    termsLink: {
      color: "#3b82f6",
      textDecoration: "none",
      fontWeight: 700,
    },
    primaryBtn: {
      width: "100%",
      height: 44,
      borderRadius: 8,
      border: "1px solid #111",
      background: "#111",
      color: "#fff",
      cursor: "pointer",
      fontWeight: 800,
      fontSize: 14,
      transition: "all 0.2s",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* 로고 */}
        <div style={styles.logoBox}>📍 사이트 이름</div>

        {/* 헤드라인 */}
        <div style={styles.headline}>회원가입</div>
        <div style={styles.sub}>나만의 축제 여행을 발견하는 가장 쉬운 방법</div>

        {/* 아이디 */}
        <div style={styles.inputWrap}>
          <div style={styles.label}>아이디</div>
          <div style={styles.inputRow}>
            <input
              style={styles.inputHalf}
              name="id"
              placeholder="아이디 6~20자 입력"
              value={formData.id}
              onChange={handleInputChange}
              onBlur={() => handleTouched("id")}
            />
            <button style={styles.dupleBtn} onClick={checkIdDuplicate}>
              중복확인
            </button>
          </div>
          <div style={styles.helpText}>{idError}</div>
        </div>

        {/* 비밀번호 */}
        <div style={styles.inputWrap}>
          <div style={styles.label}>비밀번호</div>
          <input
            style={styles.input}
            type="password"
            name="pw"
            placeholder="비밀번호 입력(영문, 숫자, 특수문자 조합 8~20자)"
            value={formData.pw}
            onChange={handleInputChange}
            onBlur={() => handleTouched("pw")}
          />
          <div style={styles.helpText}>{pwError}</div>
        </div>

        {/* 비밀번호 확인 */}
        <div style={styles.inputWrap}>
          <div style={styles.label}>비밀번호 확인</div>
          <input
            style={styles.input}
            type="password"
            name="pwConfirm"
            placeholder="비밀번호 재입력"
            value={formData.pwConfirm}
            onChange={handleInputChange}
            onBlur={() => handleTouched("pwConfirm")}
          />
          <div style={styles.helpText}>{pwConfirmError}</div>
        </div>

        {/* 이름 + 닉네임 */}
        <div style={{ ...styles.inputRow, gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={styles.label}>이름</div>
            <input
              style={styles.input}
              name="name"
              placeholder="이름 입력"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={() => handleTouched("name")}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={styles.label}>닉네임</div>
            <input
              style={styles.input}
              name="nickname"
              placeholder="닉네임 2~10자 입력"
              value={formData.nickname}
              onChange={handleInputChange}
              onBlur={() => handleTouched("nickname")}
            />
            <div style={styles.helpText}>{nicknameError}</div>
          </div>
        </div>

        {/* 전화번호 */}
        <div style={styles.inputWrap}>
          <div style={styles.label}>전화번호</div>
          <input
            style={styles.input}
            name="phone"
            placeholder="전화번호 입력(- 제외한 숫자 입력)"
            value={formData.phone}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              setFormData((prev) => ({ ...prev, phone: value }));
            }}
            onBlur={() => handleTouched("phone")}
          />
        </div>

        {/* 이메일 */}
        <div style={styles.inputWrap}>
          <div style={styles.label}>이메일 주소</div>
          <div style={styles.emailRow}>
            <input
              style={styles.emailInput}
              name="email"
              placeholder="아이디 6~20자 입력"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => handleTouched("email")}
            />
            <div style={styles.atSymbol}>@</div>
            <select
              style={styles.emailSelect}
              name="emailDomain"
              value={formData.emailDomain}
              onChange={handleInputChange}
            >
              <option value="naver.com">naver.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="daum.net">daum.net</option>
              <option value="hotmail.com">hotmail.com</option>
            </select>
          </div>
        </div>

        {/* 생년월일 */}
        <div style={styles.inputWrap}>
          <div style={styles.label}>생년월일</div>
          <div style={styles.selectWrap}>
            <select
              style={styles.select}
              name="year"
              value={formData.year}
              onChange={handleInputChange}
            >
              <option value="">년도</option>
              {Array.from({ length: 100 }, (_, i) => 2024 - i).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              style={styles.select}
              name="month"
              value={formData.month}
              onChange={handleInputChange}
            >
              <option value="">월</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <option key={month} value={String(month).padStart(2, "0")}>
                  {month}
                </option>
              ))}
            </select>
            <select
              style={styles.select}
              name="day"
              value={formData.day}
              onChange={handleInputChange}
            >
              <option value="">일</option>
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <option key={day} value={String(day).padStart(2, "0")}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 성별 */}
        <div style={styles.inputWrap}>
          <div style={styles.label}>성별</div>
          <div style={styles.genderWrap}>
            <label style={styles.radioLabel}>
              <input
                style={styles.radio}
                type="radio"
                name="gender"
                value="남성"
                checked={formData.gender === "남성"}
                onChange={handleInputChange}
              />
              남성
            </label>
            <label style={styles.radioLabel}>
              <input
                style={styles.radio}
                type="radio"
                name="gender"
                value="여성"
                checked={formData.gender === "여성"}
                onChange={handleInputChange}
              />
              여성
            </label>
          </div>
        </div>

        {/* 약관 동의 */}
        <div style={styles.termsText}>
          <span style={styles.termsLink}>개인정보 수집 및 이용</span>에 동의하며 <br />
          <span style={styles.termsLink}>서비스 이용약관</span>에 동의합니다
        </div>

        {/* 회원가입 버튼 */}
        <button style={styles.primaryBtn} onClick={signup}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default Signup;
