import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function TasteTest() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("silent");

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

  const options = [
    {
      id: "silent",
      icon: "bedtime",
      title: "Silent Dusk",
      description: "Intimate acoustic sets under the first stars. Focused on heritage, tea, and calm reflection.",
      showStar: true,
    },
    {
      id: "ember",
      icon: "local_fire_department",
      title: "Ember Pulse",
      description: "High-energy beats by the riverside. Craft cocktails, fire dancers, and modern folk fusion.",
    },
    {
      id: "urban",
      icon: "auto_awesome",
      title: "Urban Glow",
      description: "Skyscraper silhouettes and neon art. Electronic melodies meeting traditional architecture.",
    },
  ];

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
                <span style={styles.badgeText}>Preference Discovery</span>
              </div>
              <div style={styles.progressBar}>
                <div style={styles.progressFill}></div>
              </div>
            </div>

            {/* Title */}
            <h1 style={styles.title}>
              What kind of <span style={styles.titleGolden}>golden hour</span>
              <br />
              resonates with you?
            </h1>

            {/* Subtitle */}
            <p style={styles.subtitle}>
              Your choice helps us curate a festival experience that mirrors your soul's rhythm.
            </p>

            {/* Cards */}
            <div style={styles.cardsContainer}>
              {options.map((option) => (
                <div
                  key={option.id}
                  className={`survey-card ${selectedOption === option.id ? "active" : ""}`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="icon-box">
                    <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>
                      {option.icon}
                    </span>
                  </div>
                  <h3 style={styles.cardTitle}>{option.title}</h3>
                  <p style={styles.cardDescription}>{option.description}</p>
                  {option.showStar && selectedOption === option.id && (
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
                  onClick={() => navigate("/after_home")}
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
                  Back
                </button>
                <button
                  style={styles.nextButton}
                  onClick={() => {
                    alert("Next chapter!");
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F39C12";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(230, 126, 34, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#E67E22";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(230, 126, 34, 0.3)";
                  }}
                >
                  Next Chapter
                  <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                    east
                  </span>
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
