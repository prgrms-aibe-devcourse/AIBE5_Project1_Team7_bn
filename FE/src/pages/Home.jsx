import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const isLogin = sessionStorage.getItem("loginUser");

  return (
    <div style={{ textAlign: "center" }}>
      <h1>여행 계획 추천 사이트</h1>

      {!isLogin ? (
        <button onClick={() => navigate("/login")}>로그인 / 회원가입</button>
      ) : (
        <>
          <p>환영합니다!</p>
          <button
            onClick={() =>
              navigate("/map2", {
                state: { festivalId: "12116", radius: 3000 }, 
              })
            }
          >
            축제 기준 주변 숙소
          </button>

          <button onClick={() => navigate("/calendar")}>캘린더 화면</button>
        </>
      )}
    </div>
  );
}

export default Home;