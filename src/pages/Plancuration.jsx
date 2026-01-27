import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useStore from "../store/useStore";

// Custom CSS styles
const customStyles = `
  .custom-scroll::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .custom-scroll::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scroll::-webkit-scrollbar-thumb {
    background: #e9d9ce;
    border-radius: 10px;
  }
  .seoul-map-bg {
    background-color: #f3f4f6;
    background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuD-HY5FD_-6tQJiE_YkQfoIfrJwUrapHcAnAuFsl0hotkCdogBTC-s646o6yVOz1nAhTHN4zO2OvY8Z-R8AQCfZd_EJGhE8g_hpYUaG2ZUAD7RAt8vNSkk9wlWPkhz6wFZZlGMObCiZErKXf9g5Ytyjm3ZfxxhynYQmz9bGBduFh1jcctsWidO0muia9VJEpoLHf_kk3ESzEOxsvcOnSryv9eyisYXC3IFdiEo5EKwd5bFk-4UCj3-ZmoEVWETcuyZJ981MhJdom_ca);
    background-size: cover;
    background-position: center;
    background-blend-mode: luminosity;
  }
  .map-pin {
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
  }
  .egg-mascot {
    position: relative;
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  }
  .egg-yolk {
    width: 60%;
    height: 60%;
    background: #fbbf24;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  }
  .egg-yolk::before, .egg-yolk::after {
    content: '';
    position: absolute;
    background: #1c130d;
    border-radius: 50%;
    top: 35%;
    width: 3px;
    height: 3px;
  }
  .egg-yolk::before { left: 28%; }
  .egg-yolk::after { right: 28%; }
  .egg-smile {
    position: absolute;
    bottom: 22%;
    width: 10px;
    height: 5px;
    border-bottom: 2px solid #1c130d;
    border-radius: 0 0 10px 10px;
  }
  .chat-egg .egg-yolk::before, .chat-egg .egg-yolk::after {
    width: 4px;
    height: 4px;
  }
  .chat-egg .egg-smile {
    width: 14px;
    height: 7px;
    border-bottom-width: 2.5px;
  }
`;

const recommendedContents = [
  {
    id: 1,
    type: "Festival",
    name: "Lotus Lantern Festival",
    rating: 4.9,
    description: "Experience the vibrant colors and spiritual peace of this UNESCO heritage parade.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZCmy1Y1y0nUuCxw4HV9JrG70FZg4tdPXOvveDobZ_vNPvFonAiG1YfY5fyfM3vdO5LtDmRaQNfwYEm06VRP3hsDepSBSxGzJCwdAUopAp7NZM8-47NHrDYugvKKiGOwnyEkE69KXQFCAvei0fo7aBE0k2-BJYfLR_Mm1hvuGBl9o5eEJ_Y9w2Aqu1GfZbKkuhxGKKEfNhYcvOeB8n7O79k-S6vHhKK8u2Q8IGwvzbf30uLntM4FFxAC8vD-fTnRLD5G0uanZe6Wqa"
  },
  {
    id: 2,
    type: "Restaurant",
    name: "Hanok BBQ Grill",
    rating: 4.8,
    description: "Premium aged Korean beef served in an authentic traditional wooden house.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDynuuQArLC8x0ubLfDn9wQk3PSRdV9JhVUBlZd3m7n98q4c7TcsqRnrv5BUVUxwgi8bttyXz9MzaIG-zgW-MYC4iyYkoDLk0BBHF1Um68iHYmi_vFfXIkjILYl2FuWFUsFxM1GXX1Yg-KkZO5eMiQbY-xbX3S1a-XXPb5le_H8mWPh9mSmPM2HBb4OOftV6VPVTlPpGdRhYnCM3L2m6O2LgBnb4uqWvOTYgh4va1vJdY0NeBsVZeqOrPlcZhi1gl7elYlALqeCYcxQ"
  },
  {
    id: 3,
    type: "Festival",
    name: "Seoul Music Fest",
    rating: 4.7,
    description: "The ultimate K-pop performance experience featuring top global idols.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAuvwjiLqDzrTz7rZDL7PSF1Q_ZWhZFCt7t7mz-Yq9TBKULG8FCCwqy7uDQmIdd9_3THUP4DYeJYqhOp7JrkVuOnqPev8SV_VsVl5C2F4Qrx1U_Sx_D0s_7lduvq0LZ4IYjhEFuEpjmOTQRGATSCNqCwSv9SnWfq8vfbxrraowXbcE2hzOuv-Ub0nKAWgxPP5swQhXjtjzVILCNWy0jQY2RMuzXEZRVF3haLIDONvI34zu_0Sa3KNIJfQv51oGPCCVs6jY85KAdaUjy"
  }
];

function Plancuration() {
  const navigate = useNavigate();
  const trips = useStore((state) => state.trips);
  const currentTripId = useStore((state) => state.currentTripId);
  const setCurrentTrip = useStore((state) => state.setCurrentTrip);
  const deleteTrip = useStore((state) => state.deleteTrip);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [showChatBubble, setShowChatBubble] = useState(true);
  const [showTripDropdown, setShowTripDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // 현재 선택된 trip 가져오기
  const currentTrip = trips.find(trip => trip.id === currentTripId);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTripDropdown(false);
      }
    };

    if (showTripDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTripDropdown]);

  // 선택된 날짜 범위에서 날짜 배열 생성
  const getDatesArray = () => {
    if (!currentTrip) return [];
    
    const [startYear, startMonth, startDay] = currentTrip.start.split('-').map(Number);
    const [endYear, endMonth, endDay] = currentTrip.end.split('-').map(Number);
    
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    
    const dates = [];
    const current = new Date(startDate);
    
    while (current <= endDate) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return dates;
  };

  const datesArray = getDatesArray();
  const currentDate = datesArray[currentDayIndex];
  const totalDays = datesArray.length;

  // 이전/다음 날로 이동
  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDayIndex < totalDays - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  // 날짜 포맷 (M/D)
  const formatDate = (date) => {
    if (!date) return '';
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <style>{customStyles}</style>
      
      {/* Header */}
      <Header />

      {/* Top Buttons */}
      <div className="w-full max-w-[1600px] mx-auto px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          {/* Trip Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowTripDropdown(!showTripDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-primary rounded-full text-sm font-bold text-primary shadow-sm hover:bg-primary hover:text-white transition-all"
            >
              <span className="text-xl">🏠</span>
              {currentTrip ? currentTrip.name : '일정 선택'}
              <span className="material-symbols-outlined text-lg">
                {showTripDropdown ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            
            {/* Dropdown Menu */}
            {showTripDropdown && trips.length > 0 && (
              <div className="absolute top-full left-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl z-50 p-4 min-w-[400px]">
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {trips.map((trip) => (
                    <div
                      key={trip.id}
                      className={`relative flex-shrink-0 w-48 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        currentTripId === trip.id 
                          ? 'bg-orange-50 border-primary' 
                          : 'bg-white border-gray-200 hover:border-orange-300'
                      }`}
                      onClick={() => {
                        setCurrentTrip(trip.id);
                        setShowTripDropdown(false);
                        setCurrentDayIndex(0);
                      }}
                    >
                      {/* 삭제 버튼 */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`"${trip.name}" 일정을 삭제하시겠습니까?`)) {
                            deleteTrip(trip.id);
                            if (currentTripId === trip.id && trips.length > 1) {
                              const remainingTrips = trips.filter(t => t.id !== trip.id);
                              if (remainingTrips.length > 0) {
                                setCurrentTrip(remainingTrips[0].id);
                              }
                            }
                          }
                        }}
                        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition-all z-10"
                      >
                        <span className="material-symbols-outlined text-sm">close</span>
                      </button>

                      <div className="font-bold text-gray-900 mb-2 pr-6">{trip.name}</div>
                      <div className="text-xs text-gray-500">{trip.display}</div>
                      
                      {currentTripId === trip.id && (
                        <div className="absolute bottom-2 right-2">
                          <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => navigate('/dateregistration')}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-full text-sm font-bold text-gray-700 hover:border-primary hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            New Trip
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Panel - Timeline */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="flex items-center justify-between mb-8 sticky top-0 bg-white z-10 py-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={goToPreviousDay}
                  disabled={currentDayIndex === 0}
                  className="p-2 rounded-full hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-2xl text-gray-700">chevron_left</span>
                </button>
                <h2 className="text-4xl font-black text-gray-900 tracking-tight">
                  Day {currentDayIndex + 1} <span className="text-primary/60 text-2xl ml-2 font-bold">({currentDate ? formatDate(currentDate) : '날짜 선택 필요'})</span>
                </h2>
                <button
                  onClick={goToNextDay}
                  disabled={currentDayIndex === totalDays - 1}
                  className="p-2 rounded-full hover:bg-gray-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-2xl text-gray-700">chevron_right</span>
                </button>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/dateregistration')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-primary shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-lg">calendar_month</span>
                  날짜 일정 변경
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative space-y-10 pl-8 h-[calc(100vh-320px)] overflow-y-auto custom-scroll pr-4 pb-10">
              <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent"></div>
              
              {/* Event 1 */}
              <div className="relative">
                <div className="absolute -left-8 top-1.5 size-6 bg-primary rounded-full border-4 border-white shadow-md flex items-center justify-center text-[10px] font-bold text-white z-10">
                  1
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 hover:shadow-xl hover:border-primary/20 transition-all group overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-primary text-xs font-black uppercase tracking-widest block mb-1">
                        10:00 AM
                      </span>
                      <h4 className="text-2xl font-black text-gray-900">Gyeongbokgung Palace</h4>
                    </div>
                    <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                      Confirmed
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                    Traditional guard changing ceremony at the main gate. A must-see historic landmark in central Seoul.
                  </p>
                  <div 
                    className="w-full aspect-video rounded-2xl bg-cover bg-center mb-5 ring-1 ring-black/5" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBPWbIqkq6ffDvJnehMYDNuhCMELw3UftngtoRfme3AfxLBEoQNE5XSICWYFsNEUfwZu0D2FzyPBy3l_hKNZNkhllDeLnIGyK54HM7YxRty0j7OlB0QLCZHa-1sAJFoGIpiDnNWZowQT5dgloPaeG9lmGVveNGeQsOc30cQZlSxqyhPBTjeY9yCzbH1CU-O9GTx3muiiOQOZjT_k0Xws6O8EFx5XXsTWAuup02zRNIgY9G-CfmaEwRiRAE_vDSDoS2dSsAdu2U4DAOT')" }}
                  ></div>
                  <button className="w-full py-3.5 bg-white border-2 border-primary/10 text-primary rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all">
                    <span className="material-symbols-outlined text-lg">confirmation_number</span>
                    View Booking Details
                  </button>
                </div>
              </div>

              {/* Add Place Button */}
              <div className="relative">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-primary/20"></div>
                <button className="w-full py-5 border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center gap-3 text-gray-400 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all font-bold group">
                  <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">
                    add_circle
                  </span>
                  Add a place to your journey
                </button>
              </div>

              {/* Event 2 */}
              <div className="relative">
                <div className="absolute -left-8 top-1.5 size-6 bg-primary rounded-full border-4 border-white shadow-md flex items-center justify-center text-[10px] font-bold text-white z-10">
                  2
                </div>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-primary text-xs font-black uppercase tracking-widest block mb-1">
                        12:30 PM
                      </span>
                      <h4 className="text-2xl font-black text-gray-900">Local Traditional Market</h4>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                    Trying spicy tteokbokki and street food favorites. Gwangjang Market offers the best mung bean pancakes.
                  </p>
                  <div 
                    className="w-full aspect-video rounded-2xl bg-cover bg-center ring-1 ring-black/5" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuASc6JgVWBxR0IXYbV9oKyyTzAGfe20oIAmh1w0eCKhToEDj3fJ-ieml559CoYnV_GVaq_8jzaDproqE3EmtX2zH1dwMtI3JeXISiIJP1_9GRU5CWvWehhLSED31NkxtybQlExmG_L1Fzlf_7Tuswv2WupZwMH0dTTIMJft0xAybmZHgyH0slByq416hCiN4J_Txt_HeFKRi6htuzS6YSqO7hVsYKrLFENdSO0MHjalgfLGmIKN84u_GOBiXds2ewnxdB5M0pNbjTIM')" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Map */}
          <div className="lg:w-1/2">
            <div className="sticky top-40 w-full h-[calc(100vh-320px)] min-h-[500px] bg-gray-100 rounded-[40px] shadow-2xl overflow-hidden border border-gray-200 relative seoul-map-bg">
              <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
              
              {/* Map Pin 1 */}
              <div className="absolute top-[32%] left-[45%] cursor-pointer group z-20">
                <div className="map-pin bg-primary text-white size-14 rounded-full rounded-bl-none rotate-45 flex items-center justify-center shadow-xl border-4 border-white transition-all group-hover:scale-110 group-hover:bg-orange-600">
                  <span className="rotate-[-45deg] font-black text-xl">1</span>
                </div>
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap border border-gray-200">
                  <p className="text-xs font-black text-gray-900">Gyeongbokgung Palace</p>
                  <p className="text-[10px] text-primary font-bold">10:00 AM</p>
                </div>
              </div>

              {/* Map Pin 2 */}
              <div className="absolute top-[48%] left-[52%] cursor-pointer group z-20">
                <div className="map-pin bg-primary text-white size-14 rounded-full rounded-bl-none rotate-45 flex items-center justify-center shadow-xl border-4 border-white transition-all group-hover:scale-110 group-hover:bg-orange-600">
                  <span className="rotate-[-45deg] font-black text-xl">2</span>
                </div>
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap border border-gray-200">
                  <p className="text-xs font-black text-gray-900">Gwangjang Market</p>
                  <p className="text-[10px] text-primary font-bold">12:30 PM</p>
                </div>
              </div>

              {/* Map Controls */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-xl p-5 rounded-3xl border border-white/50 shadow-2xl flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined font-bold">explore</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5">
                      Currently Exploring
                    </p>
                    <p className="text-lg font-black text-gray-900">Jongno-gu District</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="size-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm">
                    <span className="material-symbols-outlined">add</span>
                  </button>
                  <button className="size-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 shadow-sm">
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommended Contents */}
        <div className="mt-20 space-y-20">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black flex items-center gap-4">
                <span className="material-symbols-outlined text-yellow-500 text-4xl">auto_awesome</span>
                AI Recommended Contents
              </h3>
              <div className="flex gap-2">
                <button className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="size-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            
            <div className="flex gap-6 overflow-x-auto pb-8 custom-scroll -mx-2 px-2">
              {recommendedContents.map((content) => (
                <div 
                  key={content.id}
                  className="min-w-[340px] bg-white rounded-[32px] overflow-hidden shadow-sm border border-orange-50 group hover:shadow-2xl transition-all translate-y-0 hover:-translate-y-2"
                >
                  <div className="h-56 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" 
                      style={{ backgroundImage: `url('${content.image}')` }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <span className={`absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-md text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg ${
                      content.type === 'Festival' ? 'text-primary' : 'text-green-600'
                    }`}>
                      {content.type}
                    </span>
                    <button className="absolute top-4 right-4 size-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all">
                      <span className="material-symbols-outlined text-xl">favorite</span>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-black text-xl text-gray-900">{content.name}</h4>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 font-black">★</span>
                        <span className="text-sm font-black text-gray-900">{content.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                      {content.description}
                    </p>
                    <button className="w-full bg-primary text-white py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-600 shadow-lg shadow-primary/20 transition-all">
                      <span className="material-symbols-outlined text-lg">add</span> Add to Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* My Saved List */}
          <section className="pb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-4xl">bookmark</span>
                My Saved List
              </h3>
            </div>
            <div className="flex gap-8 overflow-x-auto pb-8 custom-scroll">
              <div className="min-w-[420px] flex items-center gap-5 bg-white p-5 rounded-[28px] border border-orange-50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all cursor-pointer">
                <div 
                  className="size-28 rounded-2xl bg-cover bg-center shrink-0 shadow-inner" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC4Tiank3C7mozBYoV9CakczQanXQCuXYXbXxLf0qAEYWJtQjaL9R05Blm5BbJXYyt80bv-xDPcAZwFJfMUub56B6qKjzo_8nbMAZo4JB8ssV2DsfkMgvgqkc8RH60kfZb1V9ssO1_2bONiERaX-9JhqpEtG5smqyOO4BcQGlSmXmOZpp2wfX5_0l0EMC4zctdz2InP6LlSpMRupNyuApb2DBi06gfMJ92m-2dP9CS8ZUidCBo-y9fCNA8eAxK3JWvTimAmYIOUyVBg')" }}
                ></div>
                <div className="flex-1">
                  <h4 className="text-lg font-black text-gray-900 mb-1">Bukchon Hanok Village</h4>
                  <p className="text-sm text-gray-600 mb-4">Jongno-gu, Seoul</p>
                  <button className="flex items-center gap-2 text-primary text-xs font-black uppercase tracking-widest hover:translate-x-1 transition-transform">
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Add to Journey
                  </button>
                </div>
              </div>
              <div className="min-w-[420px] flex items-center gap-5 bg-gray-50 p-5 rounded-[28px] border-2 border-dashed border-gray-200 transition-all group cursor-pointer hover:border-primary/30">
                <div className="size-28 rounded-2xl bg-white flex items-center justify-center border border-gray-200 group-hover:bg-primary/5 transition-colors">
                  <span className="material-symbols-outlined text-gray-300 text-3xl group-hover:text-primary/40">
                    add_photo_alternate
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-400 group-hover:text-gray-500 transition-colors">
                    Add More Places
                  </h4>
                  <p className="text-sm text-gray-300">Discover your next favorite spot</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Floating Chat Button */}
      <div className="fixed bottom-10 right-10 flex flex-col items-end gap-4 z-[110]">
        {showChatBubble && (
          <div className="bg-white px-5 py-4 rounded-3xl rounded-br-none shadow-2xl border border-primary/10 max-w-[260px]">
            <p className="text-sm font-bold text-gray-800 leading-snug">
              Got questions? <br />
              Ask me anytime! 😊
            </p>
          </div>
        )}
        <button 
          onClick={() => setShowChatBubble(!showChatBubble)}
          className="size-20 p-1.5 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl ring-4 ring-white cursor-pointer hover:scale-110 transition-transform active:scale-95 group overflow-hidden"
        >
          <div className="relative size-full chat-egg">
            <div className="egg-mascot">
              <div className="egg-yolk">
                <div className="egg-smile"></div>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Plancuration;
