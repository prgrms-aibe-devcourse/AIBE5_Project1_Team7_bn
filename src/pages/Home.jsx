import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import festivals from "../data/festivals.json";
import useStore from "../store/useStore";

import Header_home from "../components/Header_home";
import { TownCard } from "../components/TownCard";
import { TownDetailModal } from "../components/TownDetailModal";

function Home() {
  const navigate = useNavigate();
  const [pSeqInput, setPSeqInput] = useState("");
  const [selectedFestival, setSelectedFestival] = useState(null);
  const { setSelectedFestivalPSeq } = useStore();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <Header_home />
      <main style={{ maxWidth: "1600px", margin: "0 auto", padding: "24px 20px" }}>
        {/* HERO 배너 */}
        <section
          style={{
            marginBottom: 40,
            borderRadius: 32,
            overflow: "hidden",
            aspectRatio: "16 / 6",
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,.95), rgba(255,255,255,.4), rgba(255,255,255,.9)), url('https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80')`,
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
              🍏 처음 오신 멘트 - 효연님 해주세요
            </span>
            <h1 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1 }}>
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
              축제와 사진의 황금시간을 찾아보세요.<br />
              AI가 추천하는 맞춤형 축제와 촬영 명소!
            </p>
            <button
              onClick={() => navigate("/tastetest")}
              style={{
                padding: "16px 32px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(90deg,#FF5F33,#EAB308)",
                color: "white",
                fontWeight: 800,
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              Start Recommendation with AI
            </button>
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
                  const f = festivals.find((x) => String(x.pSeq) === String(pSeqInput));
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
        {/* GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 15 }}>
          {/* LEFT - 추천 섹션 */}
          <section>
            <h2 style={{ fontSize: 28, fontWeight: 900 }}>
              ✨ 지금 뜨는 축제 - 멘트 정해주세요 효연님
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
                    id: f.pSeq,
                  }}
                  festival={f}
                  onClick={() => setSelectedFestival(f)}
                />
              ))}
            </div>
          </section>
          {/* RIGHT - 캘린더 */}
          <aside
            style={{
              backgroundColor: "white",
              borderRadius: 24,
              padding: 24,
              height: "fit-content",
              position: "sticky",
              top: 140,
            }}
          >
            <h3 style={{ fontWeight: 800 }}>My Festival Calendar</h3>
            <p style={{ fontSize: 12, color: "#FF5F33" }}>
              풋사과님의 저장된 일정
            </p>
            <button
              onClick={() => navigate("/calendar")}
              style={{
                marginTop: 16,
                width: "100%",
                padding: 12,
                borderRadius: 16,
                border: "1px solid #FF5F33",
                background: "transparent",
                color: "#FF5F33",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              전체 캘린더 보기
            </button>
          </aside>
        </div>
      </main>
      {/* FOOTER */}
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
              Elevating cultural tourism through the lens of aesthetic timing and premium curation. Discover Korea's hidden gems.
            </p>
          </div>
          <div>
            <p>Explore</p>
            <p>Tradition</p>
            <p>Modern</p>
            <p>Photography</p>
          </div>
          <div>
            <p>Support</p>
            <p>About Us</p>
            <p>FAQ</p>
            <p>Contact</p>
          </div>
        </div>
      </footer>
      {/* 상세 모달 */}
      {selectedFestival && (
        <TownDetailModal
          festival={selectedFestival}
          onClose={() => setSelectedFestival(null)}
        />
      )}
    </div>
  );
}

export default Home;
