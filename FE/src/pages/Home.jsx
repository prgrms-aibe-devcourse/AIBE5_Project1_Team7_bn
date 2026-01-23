import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "0 20px",
      }}>
        <div style={{
          maxWidth: "1600px",
          margin: "0 auto",
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "28px" }}>😊</div>
            <span style={{ fontSize: "24px", fontWeight: 900, letterSpacing: "-0.02em" }}>
              Festory
            </span>
          </div>
          <input
            type="text"
            placeholder="Search for any pages you need"
            style={{
              flex: 1,
              maxWidth: "600px",
              padding: "10px 16px",
              marginRight: "20px",
              borderRadius: "12px",
              border: "1px solid #e5e7eb",
              backgroundColor: "#f3f4f6",
              fontSize: "14px",
              outline: "none",
              transition: "all 0.2s",
            }}
            onFocus={(e) => {
              e.target.style.backgroundColor = "#fff";
              e.target.style.borderColor = "#FF5F33";
              e.target.style.boxShadow = "0 0 0 3px rgba(255, 95, 51, 0.1)";
            }}
            onBlur={(e) => {
              e.target.style.backgroundColor = "#f3f4f6";
              e.target.style.borderColor = "#e5e7eb";
              e.target.style.boxShadow = "none";
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontSize: "20px",
              display: "none",
            }}>
              🔔
            </button>
            <button
              onClick={() => navigate("/login")}
              style={{
                padding: "10px 24px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(90deg, #FF5F33 0%, #FF7A4D 100%)",
                color: "white",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(255, 95, 51, 0.3)",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(255, 95, 51, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(255, 95, 51, 0.3)";
              }}
            >
              로그인
            </button>
                  height: "40px",
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        position: "sticky",
        top: "80px",
        zIndex: 90,
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        gap: "30px",
        padding: "0 20px",
        maxWidth: "1600px",
        margin: "0 auto",
      }}>
        {["Home", "Festival List", "Calendar", "Plan & Curation"].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              padding: "16px 0",
              fontSize: "14px",
              fontWeight: 700,
              color: item === "Home" ? "#FF5F33" : "#6b7280",
              textDecoration: "none",
              borderBottom: item === "Home" ? "3px solid #FF5F33" : "none",
              cursor: "pointer",
            }}
          >
            {item}
          </a>
        ))}
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: "1600px", margin: "0 auto", padding: "24px 20px" }}>
        {/* Hero Banner */}
        <div style={{
          marginBottom: "40px",
          borderRadius: "32px",
          overflow: "hidden",
          aspectRatio: "16/9",
          backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.9) 100%), url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=675&fit=crop")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          padding: "60px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}>
          <div style={{ maxWidth: "600px" }}>
            <div style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 95, 51, 0.1)",
              border: "1px solid rgba(255, 95, 51, 0.2)",
              marginBottom: "24px",
            }}>
              <span style={{
                fontSize: "11px",
                fontWeight: 700,
                color: "#FF5F33",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}>
                🟠 Welcome Back, User!
              </span>
            </div>
            <h2 style={{
              fontSize: "56px",
              fontWeight: 900,
              marginBottom: "16px",
              color: "#111827",
              lineHeight: 1.1,
            }}>
              Find your <br />
              <span style={{
                background: "linear-gradient(90deg, #FF5F33 0%, #EAB308 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Golden Harmony
              </span>
            </h2>
            <p style={{
              fontSize: "16px",
              color: "#4b5563",
              marginBottom: "32px",
              lineHeight: 1.6,
            }}>
              We&apos;ve curated festivals that match your love for traditional arts and sunset photography.
            </p>
            <button
              onClick={() => navigate("/map")}
              style={{
                padding: "16px 32px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(90deg, #FF5F33 0%, #EAB308 100%)",
                color: "white",
                fontWeight: 800,
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(255, 95, 51, 0.3)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
            >
              Start Recommendation with AI ✨
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "32px" }}>
          {/* Main Content */}
          <div>
            {/* Recommendation Section */}
            <section style={{ marginBottom: "48px" }}>
              <div style={{ marginBottom: "24px" }}>
                <h3 style={{
                  fontSize: "28px",
                  fontWeight: 900,
                  marginBottom: "8px",
                  color: "#111827",
                }}>
                  ✨ Minho님 취향에 딱 맞는 축제예요!
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280",
                }}>
                  AI가 분석한 민호님의 선호 라벨: #전통예술 #야경 #사진명소
                </p>
              </div>

              {/* Festival Cards */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}>
                {[
                  {
                    title: "안동 국제 탈춤 페스티벌",
                    subtitle: "HERITAGE • MASK DANCE",
                    match: "98% Match",
                    tag: "AI Choice",
                    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
                  },
                  {
                    title: "서울 빛초롱 축제",
                    subtitle: "NIGHT LIGHT • PHOTO SPOT",
                    match: "92% Match",
                    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
                  },
                ].map((festival, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "relative",
                      borderRadius: "24px",
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "transform 0.3s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <img
                      src={festival.image}
                      alt={festival.title}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)",
                    }} />
                    <div style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      display: "flex",
                      gap: "8px",
                    }}>
                      <span style={{
                        padding: "4px 12px",
                        borderRadius: "9999px",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        color: "#FF5F33",
                        fontSize: "10px",
                        fontWeight: 700,
                      }}>
                        {festival.match}
                      </span>
                      {festival.tag && (
                        <span style={{
                          padding: "4px 12px",
                          borderRadius: "9999px",
                          backgroundColor: "#FF5F33",
                          color: "white",
                          fontSize: "10px",
                          fontWeight: 700,
                        }}>
                          {festival.tag}
                        </span>
                      )}
                    </div>
                    <div style={{
                      position: "absolute",
                      bottom: "16px",
                      left: "16px",
                      right: "16px",
                      color: "white",
                    }}>
                      <p style={{ fontSize: "10px", color: "#fca5a5", marginBottom: "4px" }}>
                        {festival.subtitle}
                      </p>
                      <h4 style={{ fontSize: "18px", fontWeight: 700 }}>
                        {festival.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            {/* Calendar Widget */}
            <div style={{
              backgroundColor: "white",
              borderRadius: "24px",
              padding: "24px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              stickyTop: "140px",
              position: "sticky",
              top: "140px",
            }}>
              <div style={{ marginBottom: "24px" }}>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: "4px",
                }}>
                  Golden Calendar
                </h3>
                <p style={{
                  fontSize: "11px",
                  color: "#d97706",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}>
                  OCTOBER 2024
                </p>
              </div>

              {/* Mini Calendar */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "8px",
                marginBottom: "24px",
              }}>
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                  <div
                    key={day}
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      textAlign: "center",
                      color: "#d1d5db",
                    }}
                  >
                    {day}
                  </div>
                ))}
                {[29, 30, 1, 2, 3, 4, 5].map((date, idx) => (
                  <div
                    key={idx}
                    style={{
                      aspectRatio: "1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: date === 3 ? 900 : 500,
                      backgroundColor: date === 3 ? "#FF5F33" : "transparent",
                      color: date === 3 ? "white" : date >= 1 && date <= 5 ? "#111827" : "#d1d5db",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    {date}
                  </div>
                ))}
              </div>

              {/* Event */}
              <div style={{
                padding: "12px",
                borderRadius: "16px",
                backgroundColor: "#f3f4f6",
                marginBottom: "16px",
              }}>
                <div style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#FF5F33",
                    marginTop: "6px",
                    flexShrink: 0,
                  }} />
                  <div>
                    <p style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#111827",
                      marginBottom: "2px",
                    }}>
                      Jinju Lantern Opening
                    </p>
                    <p style={{
                      fontSize: "11px",
                      color: "#6b7280",
                    }}>
                      Oct 3 • Peak Sunset: 17:42
                    </p>
                  </div>
                </div>
              </div>

              <a
                href="#"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "12px",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "#FF5F33",
                  border: "1px solid rgba(255, 95, 51, 0.2)",
                  borderRadius: "16px",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255, 95, 51, 0.05)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                FULL CALENDAR VIEW
              </a>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default Home;