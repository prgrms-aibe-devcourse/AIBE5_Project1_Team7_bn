import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import festivals from "../data/festivals.json";
import useStore from "../store/useStore";
import Header from "../components/Header";
import { TownCard } from "../components/TownCard";
import { TownDetailModal } from "../components/TownDetailModal";
import Loading from "./Loading";
import WeatherWidget from "../components/WeatherWidget";

function After_Home() {
  const navigate = useNavigate();
  const [pSeqInput, setPSeqInput] = useState("");
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [isLoading, setIsLoading] = useState(() => {
    // 1/3 확률로 로딩 화면 표시 결정 (초기값으로만 계산)
    return Math.random() < 1/3;
  });

  const {
    setSelectedFestivalPSeq,
    clearTasteTestAnswers,
  } = useStore();

  useEffect(() => {
    if (isLoading) {
      // 2~4초 랜덤 대기
      const randomDelay = 2000 + Math.random() * 2000;
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, randomDelay);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Header />

      {/* ================= MAIN ================= */}
      <main style={{ maxWidth: "1600px", margin: "0 auto", padding: "24px 20px" }}>
        {/* ================= HERO ================= */}
        <section
          style={{
            marginBottom: 40,
            borderRadius: 32,
            overflow: "hidden",
            aspectRatio: "16 / 6",
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,.95), rgba(255,255,255,.4), rgba(255,255,255,.9)),
              url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            alignItems: "center",
            padding: 60,
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <span
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: 999,
                backgroundColor: "rgba(255,95,51,.1)",
                color: "#FF5F33",
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              🍏 Welcome back, 풋사과님
            </span>

            <h1 style={{ fontSize: 56, fontWeight: 900, lineHeight: 1.1 }}>
              Find your <br />
              <span
                style={{
                  background: "linear-gradient(90deg,#FF5F33,#EAB308)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Golden Harmony
              </span>
            </h1>

            <p style={{ color: "#4b5563", margin: "24px 0" }}>
              풋사과님의 이전 기록과 취향을 바탕으로
              가장 잘 어울리는 축제를 추천했어요.
            </p>

            <button
              onClick={() => {
                clearTasteTestAnswers();
                navigate("/tastetest");
              }}
              style={{
                padding: "16px 32px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(90deg,#FF5F33,#EAB308)",
                color: "white",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              추천 계속 보기 ✨
            </button>

            {/* pSeq Quick Save */}
            <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
              <input
                value={pSeqInput}
                onChange={(e) => setPSeqInput(e.target.value)}
                placeholder="축제 번호 입력"
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "1px solid #FF5F33",
                }}
              />
              <button
                onClick={() => {
                  const f = festivals.find(
                    (x) => String(x.pSeq) === String(pSeqInput)
                  );
                  if (f) {
                    setSelectedFestivalPSeq(pSeqInput);
                    alert("캘린더에 저장했어요!");
                    setPSeqInput("");
                  } else {
                    alert("축제를 찾지 못했어요.");
                  }
                }}
                style={{
                  padding: "12px 24px",
                  borderRadius: 12,
                  border: "none",
                  background: "#FF5F33",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                캘린더로 🎪
              </button>
            </div>
          </div>
        </section>

        {/* ================= GRID ================= */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 15 }}>
          {/* LEFT */}
          <section>
            <h2 style={{ fontSize: 28, fontWeight: 900 }}>
              ✨ 풋사과님 취향에 딱 맞는 축제
            </h2>
            <p style={{ color: "#6b7280", marginBottom: 24 }}>
              AI 분석 결과: #전통예술 #야경 #사진명소
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {festivals.slice(0, 3).map((f) => (
                <TownCard
                  key={f.pSeq}
                  town={{
            
                    name: f.fstvlNm,
                    description: f.ministry_description,
                    image: f.ministry_image_url || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
                  }}
                  festival={f}
                  onClick={() => {
                    setSelectedFestival(f);
                  }}
                />
              ))}
            </div>
          </section>

          {/* RIGHT - 캘린더 & 날씨 */}
          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              height: "fit-content",
              position: "sticky",
              top: 140,
            }}
          >
            {/* 캘린더 섹션 */}
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 24,
                padding: 24,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ fontWeight: 800 }}>My Festival Calendar</h3>
              <p style={{ fontSize: 12, color: "#FF5F33", marginBottom: 16 }}>
                풋사과님의 저장된 일정
              </p>

              {/* 미니 캘린더 */}
              <div style={{
                backgroundColor: "#f9fafb",
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
              }}>
                {(() => {
                  const today = new Date();
                  const year = today.getFullYear();
                  const month = today.getMonth();
                  const firstDay = new Date(year, month, 1).getDay();
                  const daysInMonth = new Date(year, month + 1, 0).getDate();
                  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
                  
                  return (
                    <>
                      <div style={{ 
                        textAlign: "center", 
                        fontWeight: 700, 
                        marginBottom: 12,
                        color: "#1f2937",
                        fontSize: 14,
                      }}>
                        {year}년 {monthNames[month]}
                      </div>
                      
                      {/* 요일 */}
                      <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(7, 1fr)", 
                        gap: 4,
                        marginBottom: 8,
                      }}>
                        {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
                          <div key={day} style={{
                            textAlign: "center",
                            fontSize: 11,
                            fontWeight: 600,
                            color: i === 0 ? "#ef4444" : i === 6 ? "#3b82f6" : "#6b7280",
                            padding: "4px 0",
                          }}>
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      {/* 날짜 */}
                      <div style={{ 
                        display: "grid", 
                        gridTemplateColumns: "repeat(7, 1fr)", 
                        gap: 4,
                      }}>
                        {Array.from({ length: firstDay }).map((_, i) => (
                          <div key={`empty-${i}`} style={{ height: 32 }} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1;
                          const isToday = day === today.getDate();
                          const dayOfWeek = (firstDay + i) % 7;
                          
                          return (
                            <div key={day} style={{
                              textAlign: "center",
                              padding: 6,
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: isToday ? 700 : 500,
                              backgroundColor: isToday ? "#FF5F33" : "transparent",
                              color: isToday ? "white" : dayOfWeek === 0 ? "#ef4444" : dayOfWeek === 6 ? "#3b82f6" : "#374151",
                              cursor: "pointer",
                              transition: "all 0.2s ease",
                            }}
                            onMouseEnter={(e) => {
                              if (!isToday) {
                                e.currentTarget.style.backgroundColor = "#f3f4f6";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isToday) {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }
                            }}>
                              {day}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>

              <button
                onClick={() => navigate("/calendar")}
                style={{
                  width: "100%",
                  padding: 12,
                  borderRadius: 16,
                  border: "1px solid #FF5F33",
                  background: "transparent",
                  color: "#FF5F33",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FF5F33";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#FF5F33";
                }}
              >
                전체 캘린더 보기
              </button>
            </div>
            
            {/* 날씨 위젯 */}
            <WeatherWidget />
          </aside>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer
        style={{
          marginTop: 80,
          padding: "40px 20px",
          borderTop: "1px solid #e5e7eb",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            maxWidth: "1600px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h4 style={{ fontWeight: 800 }}>Festory</h4>
            <p style={{ color: "#6b7280", fontSize: 14 }}>
              Discover festivals curated just for you.
            </p>
          </div>
          <div>
            <p>Explore</p>
            <p>Tradition</p>
            <p>Modern</p>
          </div>
          <div>
            <p>Support</p>
            <p>FAQ</p>
            <p>Contact</p>
          </div>
        </div>
      </footer>

      {selectedFestival && (
        <TownDetailModal
          festival={selectedFestival}
          onClose={() => setSelectedFestival(null)}
        />
      )}
    </div>
  );
}

export default After_Home;
