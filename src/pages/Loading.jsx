import { useEffect, useState } from 'react';

function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fef3e8 0%, #f9e4c8 50%, #f5d9b8 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      {/* 배경 장식 요소들 */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(150px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        .float-icon {
          animation: float 3s ease-in-out infinite;
          opacity: 0.4;
        }
        .orbit-icon {
          animation: orbit 15s linear infinite;
        }
      `}</style>

      {/* 떠다니는 아이콘들 */}
      <div style={{ position: 'absolute', top: '15%', left: '10%' }} className="float-icon">
        <span style={{ fontSize: '32px' }}>🎪</span>
      </div>
      <div style={{ position: 'absolute', top: '20%', right: '15%', animationDelay: '1s' }} className="float-icon">
        <span style={{ fontSize: '28px' }}>🎨</span>
      </div>
      <div style={{ position: 'absolute', bottom: '25%', left: '12%', animationDelay: '2s' }} className="float-icon">
        <span style={{ fontSize: '30px' }}>🎭</span>
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '18%', animationDelay: '1.5s' }} className="float-icon">
        <span style={{ fontSize: '26px' }}>🎵</span>
      </div>
      <div style={{ position: 'absolute', top: '40%', left: '8%', animationDelay: '0.5s' }} className="float-icon">
        <span style={{ fontSize: '24px' }}>🎉</span>
      </div>
      <div style={{ position: 'absolute', top: '50%', right: '10%', animationDelay: '2.5s' }} className="float-icon">
        <span style={{ fontSize: '28px' }}>🎊</span>
      </div>

      {/* 메인 컨텐츠 */}
      <div style={{
        textAlign: 'center',
        zIndex: 10,
        animation: 'float 4s ease-in-out infinite'
      }}>
        {/* 달걀 프라이 캐릭터 */}
        <div style={{
          width: '180px',
          height: '180px',
          background: 'white',
          borderRadius: '50% 40% 50% 40%',
          margin: '0 auto 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(255, 140, 0, 0.3)',
          position: 'relative',
          transform: 'rotate(-5deg)',
        }}>
          {/* 노른자 */}
          <div style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(251, 191, 36, 0.4)',
            position: 'relative'
          }}>
            {/* 얼굴 */}
            <div>
              <div style={{
                display: 'flex',
                gap: '18px',
                marginBottom: '8px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#422006',
                  borderRadius: '50%'
                }}></div>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#422006',
                  borderRadius: '50%'
                }}></div>
              </div>
              <div style={{
                width: '24px',
                height: '12px',
                borderBottom: '3px solid #422006',
                borderRadius: '0 0 12px 12px',
                margin: '0 auto'
              }}></div>
            </div>
          </div>

          {/* 공전하는 작은 요소들 */}
          <div className="orbit-icon" style={{
            position: 'absolute',
            fontSize: '20px',
          }}>
            🎈
          </div>
          <div className="orbit-icon" style={{
            position: 'absolute',
            fontSize: '22px',
            animationDelay: '-3s',
            animationDuration: '12s'
          }}>
            🎵
          </div>
          <div className="orbit-icon" style={{
            position: 'absolute',
            fontSize: '18px',
            animationDelay: '-7s',
            animationDuration: '18s'
          }}>
            🎸
          </div>
          <div className="orbit-icon" style={{
            position: 'absolute',
            fontSize: '20px',
            animationDelay: '-11s',
            animationDuration: '14s'
          }}>
            ✨
          </div>
        </div>

        {/* 텍스트 */}
        <h2 style={{
          fontSize: '32px',
          fontWeight: '800',
          color: '#78350f',
          marginBottom: '12px',
          letterSpacing: '-0.5px'
        }}>
          Searching for your <span style={{
            background: 'linear-gradient(90deg, #f59e0b, #ef4444)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontStyle: 'italic'
          }}>golden moment</span>...
        </h2>

        {/* 프로그레스 바 */}
        <div style={{
          width: '400px',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.4)',
          borderRadius: '999px',
          margin: '0 auto 20px',
          overflow: 'hidden',
          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #f59e0b 0%, #ef4444 50%, #f59e0b 100%)',
            borderRadius: '999px',
            width: `${progress}%`,
            transition: 'width 0.3s ease-out',
            boxShadow: '0 0 10px rgba(245, 158, 11, 0.6)',
            animation: 'pulse-glow 2s ease-in-out infinite'
          }}></div>
        </div>

        {/* 설명 텍스트 */}
        <p style={{
          fontSize: '16px',
          color: '#92400e',
          fontWeight: '600',
          marginBottom: '60px',
          letterSpacing: '0.3px'
        }}>
          Festory is curating the perfect festival path for you.
        </p>

        {/* 하단 브랜딩 */}
        <div style={{
          fontSize: '11px',
          color: '#d97706',
          fontWeight: '700',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          opacity: 0.6
        }}>
          FESTORY LOADING EXPERIENCE
        </div>
      </div>
    </div>
  );
}

export default Loading;