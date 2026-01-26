import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useStore from "../store/useStore";

function TasteTest() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { addTasteTestAnswer, clearTasteTestAnswers } = useStore();

  // 테스트 시작 시 기존 답변 초기화
  useEffect(() => {
    clearTasteTestAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 5개의 질문 정의
  const questions = [
    {
      question: "어떤 축제 분위기를 선호하시나요?",
      subtitle: "당신의 취향에 맞는 축제를 찾아드릴게요.",
      options: [
        {
          id: 1,
          icon: "bedtime",
          title: "조용하고 차분한",
          description: "전통 문화와 차 한잔의 여유를 즐기는 고요한 분위기",
          showStar: true,
        },
        {
          id: 2,
          icon: "local_fire_department",
          title: "활기차고 열정적인",
          description: "신나는 음악과 불꽃쇼가 있는 에너지 넘치는 분위기",
        },
        {
          id: 3,
          icon: "auto_awesome",
          title: "현대적이고 화려한",
          description: "네온 조명과 현대 예술이 어우러진 도시적인 분위기",
        },
      ]
    },
    {
      question: "누구와 함께 축제를 즐기고 싶으신가요?",
      subtitle: "함께하는 사람에 따라 축제 경험이 달라져요.",
      options: [
        {
          id: 1,
          icon: "groups",
          title: "많은 사람들과",
          description: "북적이는 인파 속에서 즐기는 활기찬 축제",
        },
        {
          id: 2,
          icon: "people",
          title: "소수의 친구들과",
          description: "친한 사람들과 오붓하게 즐기는 아늑한 축제",
        },
        {
          id: 3,
          icon: "person",
          title: "나 혼자",
          description: "내 페이스대로 자유롭게 둘러보는 여유로운 축제",
        },
      ]
    },
    {
      question: "언제 축제를 즐기고 싶으신가요?",
      subtitle: "시간대에 따라 축제의 매력이 달라져요.",
      options: [
        {
          id: 1,
          icon: "wb_sunny",
          title: "아침/오전",
          description: "상쾌한 공기와 함께 시작하는 활기찬 하루",
        },
        {
          id: 2,
          icon: "wb_twilight",
          title: "오후/해질녘",
          description: "따스한 햇살 아래 여유롭게 즐기는 시간",
        },
        {
          id: 3,
          icon: "nightlight",
          title: "저녁/밤",
          description: "반짝이는 조명 아래 마법 같은 밤 축제",
        },
      ]
    },
    {
      question: "어떤 음식을 즐기고 싶으신가요?",
      subtitle: "축제의 또 다른 즐거움은 맛있는 음식이죠!",
      options: [
        {
          id: 1,
          icon: "restaurant",
          title: "전통 한식",
          description: "정갈한 한정식과 전통 방식으로 만든 음식",
        },
        {
          id: 2,
          icon: "ramen_dining",
          title: "길거리 음식",
          description: "떡볶이, 핫도그 등 간편하게 즐기는 분식",
        },
        {
          id: 3,
          icon: "cake",
          title: "디저트/음료",
          description: "달콤한 디저트와 시원한 음료가 메인!",
        },
      ]
    },
    {
      question: "어떤 추억을 만들고 싶으신가요?",
      subtitle: "축제에서 어떤 경험을 가장 원하시나요?",
      options: [
        {
          id: 1,
          icon: "photo_camera",
          title: "사진/영상 촬영",
          description: "인스타 감성 가득한 포토존과 아름다운 풍경",
        },
        {
          id: 2,
          icon: "music_note",
          title: "공연/음악 감상",
          description: "라이브 공연과 다양한 예술 프로그램 체험",
        },
        {
          id: 3,
          icon: "favorite",
          title: "사람들과의 교류",
          description: "새로운 사람들과 만나고 소통하는 시간",
        },
      ]
    },
  ];

  const handleOptionClick = (optionId) => {
    // 선택한 답변을 저장
    addTasteTestAnswer({
      questionIndex: currentQuestion,
      answerId: optionId,
      question: questions[currentQuestion].question,
    });

    // 다음 질문으로 이동 또는 완료
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/testresult");
    }
  };

  const globalStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;1,700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');
    
    :root {
      --bright-gradient: linear-gradient(180deg, #FFFFFF 0%, #FFF9F5 100%);
    }
    
    .tastetest-body {
      background: var(--bright-gradient);
      background-attachment: fixed;
      min-height: 100vh;
      font-family: 'Plus Jakarta Sans', 'Segoe UI', sans-serif;
      color: #2D1B14;
      -webkit-font-smoothing: antialiased;
    }
    
    .survey-card {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      border-radius: 2.5rem;
      background: white;
      border: 1px solid #FFE0B2;
      transition: all 0.3s ease;
      cursor: pointer;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      height: 100%;
    }
    
    .survey-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 25px -5px rgba(255, 153, 102, 0.1), 0 10px 10px -5px rgba(255, 153, 102, 0.04);
      border-color: #FFCC80;
    }
    
    .survey-card.active {
      border-color: #D4AF37;
      box-shadow: 0 0 0 4px rgba(212, 175, 55, 0.1);
      background: white;
    }
    
    .survey-card.active .icon-box {
      background: #E67E22 !important;
      color: white !important;
    }
    
    .icon-box {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
      transition: all 0.3s ease;
      background: #FFF3E0;
      color: #E67E22;
    }
    
    .survey-card:hover .icon-box {
      background: #E67E22;
      color: white;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    
    @keyframes pulse-soft {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
    
    .animate-pulse-soft {
      animation: pulse-soft 2s ease-in-out infinite;
    }
    
    .animate-spin-slow {
      animation: spin-slow 10s linear infinite;
    }
    
    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined';
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }
  `;

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "48px 24px",
      position: "relative",
      overflow: "hidden",
    },
    blob1: {
      position: "absolute",
      top: "10%",
      right: "-5%",
      width: "800px",
      height: "800px",
      background: "rgba(255, 152, 0, 0.1)",
      filter: "blur(120px)",
      borderRadius: "50%",
      zIndex: -1,
      animation: "pulse-soft 4s ease-in-out infinite",
    },
    blob2: {
      position: "absolute",
      bottom: "5%",
      left: "-5%",
      width: "600px",
      height: "600px",
      background: "rgba(255, 243, 224, 0.5)",
      filter: "blur(100px)",
      borderRadius: "50%",
      zIndex: -1,
    },
    badgeContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginBottom: "24px",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      borderRadius: "24px",
      background: "#FFF3E0",
      border: "1px solid #FFE0B2",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    },
    badgeDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "#E67E22",
    },
    badgeText: {
      color: "#E67E22",
      fontWeight: 700,
      fontSize: "10px",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
    },
    progressBar: {
      width: "96px",
      height: "6px",
      background: "#F5F5F5",
      borderRadius: "12px",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      width: "33%",
      background: "#E67E22",
      borderRadius: "12px",
    },
    title: {
      fontSize: "clamp(36px, 6vw, 64px)",
      fontWeight: 900,
      marginBottom: "24px",
      textAlign: "center",
      lineHeight: 1.2,
      color: "#2D1B14",
      letterSpacing: "-0.02em",
    },
    titleGolden: {
      fontStyle: "italic",
      fontFamily: "'Playfair Display', serif",
      color: "#E67E22",
      position: "relative",
      display: "inline-block",
    },
    subtitle: {
      fontSize: "clamp(16px, 2vw, 20px)",
      color: "rgba(45, 27, 20, 0.6)",
      textAlign: "center",
      maxWidth: "700px",
      margin: "0 auto 64px",
      lineHeight: 1.6,
      fontWeight: 500,
    },
    cardsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "32px",
      width: "100%",
      maxWidth: "1400px",
      marginBottom: "80px",
      padding: "0 16px",
    },
    cardTitle: {
      fontSize: "24px",
      fontWeight: 700,
      marginBottom: "12px",
      color: "#2D1B14",
      letterSpacing: "-0.01em",
    },
    cardDescription: {
      fontSize: "14px",
      color: "rgba(45, 27, 20, 0.5)",
      textAlign: "center",
      lineHeight: 1.6,
    },
    starIcon: {
      position: "absolute",
      top: "24px",
      right: "24px",
      color: "#D4AF37",
    },
    buttonsContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      width: "100%",
      maxWidth: "800px",
      margin: "0 auto",
    },
    backButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "16px 32px",
      borderRadius: "16px",
      background: "white",
      border: "1px solid #FFE0B2",
      color: "rgba(45, 27, 20, 0.6)",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.2s ease",
      width: "100%",
      justifyContent: "center",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    },
    nextButton: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "16px 40px",
      borderRadius: "16px",
      background: "#E67E22",
      border: "none",
      color: "white",
      fontWeight: 900,
      cursor: "pointer",
      transition: "all 0.2s ease",
      width: "100%",
      justifyContent: "center",
      boxShadow: "0 8px 24px rgba(230, 126, 34, 0.3)",
    },
    helpBubble: {
      position: "fixed",
      bottom: "40px",
      right: "40px",
      background: "white",
      padding: "12px 20px",
      borderRadius: "16px",
      borderBottomRightRadius: "4px",
      boxShadow: "0 4px 20px rgba(230, 126, 34, 0.2)",
      border: "1px solid #FFE0B2",
      fontSize: "14px",
      fontWeight: 700,
      color: "#2D1B14",
      zIndex: 50,
      marginBottom: "80px",
      pointerEvents: "auto",
    },
    helpButton: {
      position: "fixed",
      bottom: "40px",
      right: "40px",
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      background: "white",
      boxShadow: "0 8px 24px rgba(255, 152, 0, 0.2)",
      border: "2px solid #FFE0B2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      zIndex: 50,
      padding: "8px",
      pointerEvents: "auto",
    },
    footer: {
      width: "100%",
      padding: "32px 64px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderTop: "1px solid rgba(255, 224, 178, 0.5)",
      background: "rgba(255, 255, 255, 0.5)",
      backdropFilter: "blur(8px)",
      marginTop: "auto",
    },
  };

  const currentQ = questions[currentQuestion];

  return (
    <>
      <style>{globalStyles}</style>
      <Header />
      <div className="tastetest-body" style={styles.container}>
        <main style={styles.main}>
          <div style={styles.blob1}></div>
          <div style={styles.blob2}></div>

          <div style={{ maxWidth: "1400px", width: "100%" }}>
            {/* Badge and Progress */}
            <div style={styles.badgeContainer}>
              <div style={styles.badge}>
                <div className="animate-pulse-soft" style={styles.badgeDot}></div>
                <span style={styles.badgeText}>Question {currentQuestion + 1} of {questions.length}</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
              </div>
            </div>

            {/* Title */}
            <h1 style={styles.title}>
              {currentQ.question}
            </h1>

            {/* Subtitle */}
            <p style={styles.subtitle}>
              {currentQ.subtitle}
            </p>

            {/* Cards */}
            <div style={styles.cardsContainer}>
              {currentQ.options.map((option) => (
                <div
                  key={option.id}
                  className="survey-card"
                  onClick={() => handleOptionClick(option.id)}
                >
                  <div className="icon-box">
                    <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>
                      {option.icon}
                    </span>
                  </div>
                  <h3 style={styles.cardTitle}>{option.title}</h3>
                  <p style={styles.cardDescription}>{option.description}</p>
                  {option.showStar && (
                    <div style={styles.starIcon}>
                      <span className="material-symbols-outlined animate-spin-slow">stars</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", width: "100%" }}>
              <div style={{ display: "flex", gap: "16px", width: "100%", maxWidth: "600px", justifyContent: "center" }}>
                <button
                  style={styles.backButton}
                  onClick={() => {
                    if (currentQuestion > 0) {
                      setCurrentQuestion(currentQuestion - 1);
                    } else {
                      navigate("/after_home");
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 243, 224, 0.5)";
                    e.currentTarget.style.borderColor = "#FFCC80";
                    e.currentTarget.style.color = "#2D1B14";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.borderColor = "#FFE0B2";
                    e.currentTarget.style.color = "rgba(45, 27, 20, 0.6)";
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    west
                  </span>
                  {currentQuestion > 0 ? "Previous" : "Back"}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default TasteTest;
