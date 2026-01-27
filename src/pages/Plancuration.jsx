import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { TownDetailModal } from "../components/TownDetailModal";
import GoogleMap from "../components/GoogleMap";
import useStore from "../store/useStore";
import festivalsData from "../data/festivals.json";

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

// AI가 추천한 축제 (pSeq 4, 5, 6)
const getRecommendedFestivals = () => {
  return festivalsData.filter(festival => [4, 5, 6].includes(festival.pSeq));
};

// 여러 축제를 지도에 표시하는 컴포넌트
function PlanGoogleMap({ festivals }) {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    async function initMap() {
      if (!mapRef.current || !festivals || festivals.length === 0) return;

      try {
        const { loadGoogleMaps } = await import('../lib/googleMaps');
        const google = await loadGoogleMaps();
        
        if (!mapRef.current) return;

        // 지도 중심 계산 (첫 번째 축제의 위치 또는 서울 중심)
        let centerLat = 37.5665;
        let centerLng = 126.9780;
        
        const firstFestival = festivals[0];
        if (firstFestival.latitude && firstFestival.longitude) {
          centerLat = firstFestival.latitude;
          centerLng = firstFestival.longitude;
        }

        const map = new google.maps.Map(mapRef.current, {
          zoom: 12,
          center: { lat: centerLat, lng: centerLng },
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        });

        // 기존 마커 제거
        markersRef.current.forEach(marker => marker.setMap(null));
        markersRef.current = [];

        // 각 축제에 대한 마커 추가
        const bounds = new google.maps.LatLngBounds();
        let hasValidLocation = false;

        for (let i = 0; i < festivals.length; i++) {
          const festival = festivals[i];
          
          if (festival.latitude && festival.longitude) {
            const position = { lat: festival.latitude, lng: festival.longitude };
            
            const marker = new google.maps.Marker({
              position,
              map,
              title: festival.fstvlNm,
              label: {
                text: `${i + 1}`,
                color: 'white',
                fontSize: '14px',
                fontWeight: 'bold'
              },
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 20,
                fillColor: '#FF6B35',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
              }
            });

            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; min-width: 200px;">
                  <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1a1a1a;">
                    ${festival.fstvlNm}
                  </h3>
                  <p style="margin: 4px 0; font-size: 13px; color: #666;">
                    📍 ${festival.rdnmadr || festival.opar || '위치 정보 없음'}
                  </p>
                  <p style="margin: 4px 0; font-size: 13px; color: #666;">
                    📅 ${festival.fstvlStartDate || ''} ~ ${festival.fstvlEndDate || ''}
                  </p>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });

            markersRef.current.push(marker);
            bounds.extend(position);
            hasValidLocation = true;
          } else if (festival.rdnmadr || festival.lnmadr) {
            // 주소로 지오코딩
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ address: festival.rdnmadr || festival.lnmadr }, (results, status) => {
              if (status === 'OK' && results[0]) {
                const position = results[0].geometry.location;
                
                const marker = new google.maps.Marker({
                  position,
                  map,
                  title: festival.fstvlNm,
                  label: {
                    text: `${i + 1}`,
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  },
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 20,
                    fillColor: '#FF6B35',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 3
                  }
                });

                const infoWindow = new google.maps.InfoWindow({
                  content: `
                    <div style="padding: 8px; min-width: 200px;">
                      <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1a1a1a;">
                        ${festival.fstvlNm}
                      </h3>
                      <p style="margin: 4px 0; font-size: 13px; color: #666;">
                        📍 ${festival.rdnmadr || festival.opar || '위치 정보 없음'}
                      </p>
                      <p style="margin: 4px 0; font-size: 13px; color: #666;">
                        📅 ${festival.fstvlStartDate || ''} ~ ${festival.fstvlEndDate || ''}
                      </p>
                    </div>
                  `
                });

                marker.addListener('click', () => {
                  infoWindow.open(map, marker);
                });

                markersRef.current.push(marker);
                bounds.extend(position);
              }
            });
            hasValidLocation = true;
          }
        }

        // 모든 마커가 보이도록 지도 범위 조정
        if (hasValidLocation && markersRef.current.length > 1) {
          map.fitBounds(bounds);
          
          // 줌 레벨이 너무 높으면 조정
          const listener = google.maps.event.addListener(map, "idle", function() {
            if (map.getZoom() > 15) map.setZoom(15);
            google.maps.event.removeListener(listener);
          });
        }

      } catch (error) {
        console.error('Google Maps 로드 실패:', error);
      }
    }

    initMap();
  }, [festivals]);

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '40px' }} />
  );
}

function Plancuration() {
  const navigate = useNavigate();
  const trips = useStore((state) => state.trips);
  const currentTripId = useStore((state) => state.currentTripId);
  const setCurrentTrip = useStore((state) => state.setCurrentTrip);
  const deleteTrip = useStore((state) => state.deleteTrip);
  const setEditingTripId = useStore((state) => state.setEditingTripId);
  const likedFestivals = useStore((state) => state.likedFestivals);
  const toggleLikeFestival = useStore((state) => state.toggleLikeFestival);
  const tripSchedules = useStore((state) => state.tripSchedules);
  const addFestivalToSchedule = useStore((state) => state.addFestivalToSchedule);
  const removeFestivalFromSchedule = useStore((state) => state.removeFestivalFromSchedule);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [showChatBubble, setShowChatBubble] = useState(true);
  const [showTripDropdown, setShowTripDropdown] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [modalTab, setModalTab] = useState('my'); // 'ai' | 'my' | 'search'
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // 현재 선택된 trip 가져오기
  const currentTrip = trips.find(trip => trip.id === currentTripId);
  
  // 현재 day의 축제 목록 가져오기
  const currentDayFestivals = (currentTripId && tripSchedules[currentTripId] && tripSchedules[currentTripId][currentDayIndex]) || [];

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

  // 검색된 축제 필터링
  const getSearchedFestivals = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return festivalsData.filter(festival => 
      festival.fstvlNm.toLowerCase().includes(query) ||
      (festival.ministry_region && festival.ministry_region.toLowerCase().includes(query)) ||
      (festival.opar && festival.opar.toLowerCase().includes(query))
    );
  };

  // 모달에서 표시할 축제 목록
  const getModalFestivals = () => {
    if (modalTab === 'ai') {
      return getRecommendedFestivals();
    } else if (modalTab === 'search') {
      return getSearchedFestivals();
    } else {
      return likedFestivals;
    }
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
            onClick={() => {
              setEditingTripId(null); // 편집 모드 해제
              navigate('/dateregistration');
            }}
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
                  onClick={() => {
                    if (currentTripId) {
                      setEditingTripId(currentTripId);
                      navigate('/dateregistration');
                    } else {
                      alert('선택된 일정이 없습니다.');
                    }
                  }}
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
              
              {/* 축제 일정 목록 */}
              {currentDayFestivals.map((festival, index) => (
                <div key={festival.pSeq} className="relative">
                  <div className="absolute -left-8 top-1.5 size-6 bg-primary rounded-full border-4 border-white shadow-md flex items-center justify-center text-[10px] font-bold text-white z-10">
                    {index + 1}
                  </div>
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 hover:shadow-xl hover:border-primary/20 transition-all group overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <span className="text-primary text-xs font-black uppercase tracking-widest block mb-1">
                          축제 일정
                        </span>
                        <h4 className="text-2xl font-black text-gray-900 mb-2">{festival.fstvlNm}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="material-symbols-outlined text-lg">calendar_today</span>
                          <span className="font-semibold">
                            {festival.fstvlStartDate && festival.fstvlEndDate
                              ? `${festival.fstvlStartDate} ~ ${festival.fstvlEndDate}`
                              : festival.ministry_date || '날짜 정보 없음'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFestivalFromSchedule(currentTripId, currentDayIndex, festival.pSeq)}
                        className="p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
                      >
                        <span className="material-symbols-outlined text-xl">close</span>
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-5 leading-relaxed line-clamp-2">
                      {festival.ministry_description || festival.fstvlCo || '축제 설명이 없습니다.'}
                    </p>
                    {festival.ministry_image_url ? (
                      <img
                        src={festival.ministry_image_url}
                        alt={festival.fstvlNm}
                        className="w-full aspect-video rounded-2xl object-cover mb-5 ring-1 ring-black/5"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full aspect-video rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 mb-5 ring-1 ring-black/5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-orange-300 text-6xl">festival</span>
                      </div>
                    )}
                    <button 
                      onClick={() => setSelectedFestival(festival)}
                      className="w-full py-3.5 bg-white border-2 border-primary/10 text-primary rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">info</span>
                      축제 상세보기
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Plan Button */}
              <div className="relative">
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-6 h-0.5 bg-primary/20"></div>
                <button 
                  onClick={() => setShowAddPlanModal(true)}
                  className="w-full py-5 border-2 border-dashed border-gray-200 rounded-3xl flex items-center justify-center gap-3 text-gray-400 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all font-bold group"
                >
                  <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">
                    add_circle
                  </span>
                  Add New Plan
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Map */}
          <div className="lg:w-1/2">
            <div className="sticky top-40 w-full h-[calc(100vh-320px)] min-h-[500px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-200 relative">
              {currentDayFestivals.length > 0 ? (
                <PlanGoogleMap festivals={currentDayFestivals} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-white">
                  <span className="material-symbols-outlined text-orange-200 text-8xl mb-4">map</span>
                  <p className="text-gray-400 font-bold text-lg">일정을 추가하면</p>
                  <p className="text-gray-400 font-bold text-lg">지도에 표시됩니다</p>
                </div>
              )}
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
              {getRecommendedFestivals().map((festival) => (
                <div 
                  key={festival.pSeq}
                  className="min-w-[340px] bg-white rounded-[32px] overflow-hidden shadow-sm border border-orange-50 group hover:shadow-2xl transition-all translate-y-0 hover:-translate-y-2"
                >
                  <div className="h-56 relative overflow-hidden">
                    {festival.ministry_image_url ? (
                      <img
                        src={festival.ministry_image_url}
                        alt={festival.fstvlNm}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.classList.add('bg-gradient-to-br', 'from-orange-100', 'to-orange-50');
                          const icon = document.createElement('div');
                          icon.className = 'absolute inset-0 flex items-center justify-center';
                          icon.innerHTML = '<span class="material-symbols-outlined text-orange-300 text-6xl">festival</span>';
                          e.target.parentElement.appendChild(icon);
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
                        <span className="material-symbols-outlined text-orange-300 text-6xl">festival</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <span className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-md text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg text-primary">
                      {festival.ministry_region || '축제'}
                    </span>
                    <button 
                      onClick={() => toggleLikeFestival(festival)}
                      className="absolute top-4 right-4 size-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all"
                    >
                      <span className={`material-symbols-outlined text-xl ${likedFestivals.some(f => f.pSeq === festival.pSeq) ? 'filled text-red-500' : ''}`}>
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-black text-xl text-gray-900 line-clamp-1">{festival.fstvlNm}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
                      {festival.ministry_description || festival.fstvlCo || '축제 설명이 없습니다.'}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                      <span className="material-symbols-outlined text-lg">calendar_today</span>
                      <span className="font-semibold line-clamp-1">
                        {festival.fstvlStartDate && festival.fstvlEndDate
                          ? `${festival.fstvlStartDate} ~ ${festival.fstvlEndDate}`
                          : festival.ministry_date || '날짜 정보 없음'}
                      </span>
                    </div>
                    <button 
                      onClick={() => setSelectedFestival(festival)}
                      className="w-full bg-white border-2 border-primary text-primary py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary hover:text-white shadow-lg shadow-primary/10 transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">info</span> 상세보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* My Saved List - 찜한 축제 */}
        <div className="mt-20 pb-20">
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black flex items-center gap-4">
                <span className="material-symbols-outlined text-red-500 text-4xl">favorite</span>
                My Saved List
              </h3>
              <span className="text-sm font-bold text-gray-500">
                {likedFestivals.length}개의 축제
              </span>
            </div>

            {likedFestivals.length === 0 ? (
              <div className="bg-gray-50 rounded-3xl p-16 text-center">
                <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">bookmark_border</span>
                <p className="text-gray-400 font-bold text-lg mb-2">찜한 축제가 없습니다</p>
                <p className="text-gray-400 text-sm">마음에 드는 축제를 찜해보세요!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedFestivals.map((festival) => (
                  <div
                    key={festival.pSeq}
                    className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all group"
                  >
                    {/* 축제 이미지 */}
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      {festival.ministry_image_url ? (
                        <img
                          src={festival.ministry_image_url}
                          alt={festival.fstvlNm}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-orange-100', 'to-orange-50');
                            const icon = document.createElement('span');
                            icon.className = 'material-symbols-outlined text-orange-300 text-5xl';
                            icon.textContent = 'festival';
                            e.target.parentElement.appendChild(icon);
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50">
                          <span className="material-symbols-outlined text-orange-300 text-5xl">festival</span>
                        </div>
                      )}
                      {/* 찜 버튼 */}
                      <button
                        onClick={() => toggleLikeFestival(festival)}
                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all"
                      >
                        <span className="material-symbols-outlined text-red-500 filled">favorite</span>
                      </button>
                    </div>

                    {/* 축제 정보 */}
                    <div className="p-5">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-2">
                          {festival.ministry_region || festival.province || '지역'}
                        </span>
                        <h4 className="text-xl font-black text-gray-900 line-clamp-1 mb-1">
                          {festival.fstvlNm}
                        </h4>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {festival.opar || festival.rdnmadr || '장소 정보 없음'}
                        </p>
                      </div>

                      {/* 날짜 정보 */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <span className="material-symbols-outlined text-lg">calendar_today</span>
                        <span className="font-semibold">
                          {festival.fstvlStartDate && festival.fstvlEndDate
                            ? `${festival.fstvlStartDate} ~ ${festival.fstvlEndDate}`
                            : festival.ministry_date || '날짜 정보 없음'}
                        </span>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedFestival(festival)}
                          className="flex-1 py-2.5 bg-white border-2 border-primary text-primary rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all"
                        >
                          상세보기
                        </button>
                        <button className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all">
                          <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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

      {/* 축제 상세 모달 */}
      {selectedFestival && (
        <TownDetailModal
          festival={selectedFestival}
          onClose={() => setSelectedFestival(null)}
        />
      )}

      {/* Add Plan Modal - 찜한 축제 목록 */}
      {showAddPlanModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">add_circle</span>
                    일정에 축제 추가
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">일정에 추가할 축제를 선택하세요</p>
                </div>
                <button
                  onClick={() => {
                    setShowAddPlanModal(false);
                    setSearchQuery('');
                    setModalTab('my');
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 transition-all"
                >
                  <span className="material-symbols-outlined text-2xl text-gray-600">close</span>
                </button>
              </div>

              {/* 검색창 */}
              <div className="relative mb-4">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400">search</span>
                <input
                  type="text"
                  placeholder="축제 이름, 지역으로 검색..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value.trim()) {
                      setModalTab('search');
                    } else {
                      setModalTab('my');
                    }
                  }}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-all"
                />
              </div>

              {/* 탭 버튼 */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setModalTab('ai');
                    setSearchQuery('');
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center ${
                    modalTab === 'ai'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl mr-2">auto_awesome</span>
                  <span className="text-base">AI 추천</span>
                </button>
                <button
                  onClick={() => {
                    setModalTab('my');
                    setSearchQuery('');
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center ${
                    modalTab === 'my'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl mr-2">favorite</span>
                  <span className="text-base">내 축제</span>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(80vh-240px)] custom-scroll">
              {modalTab === 'my' && likedFestivals.length === 0 ? (
                <div className="text-center py-16">
                  <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">bookmark_border</span>
                  <p className="text-gray-400 font-bold text-lg mb-2">찜한 축제가 없습니다</p>
                  <p className="text-gray-400 text-sm">먼저 축제를 찜해주세요!</p>
                </div>
              ) : modalTab === 'search' && getSearchedFestivals().length === 0 ? (
                <div className="text-center py-16">
                  <span className="material-symbols-outlined text-gray-300 text-6xl mb-4 block">search_off</span>
                  <p className="text-gray-400 font-bold text-lg mb-2">검색 결과가 없습니다</p>
                  <p className="text-gray-400 text-sm">다른 키워드로 검색해보세요</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getModalFestivals().map((festival) => {
                    const isAlreadyAdded = currentDayFestivals.some(f => f.pSeq === festival.pSeq);
                    
                    return (
                      <div
                        key={festival.pSeq}
                        onClick={() => {
                          if (!isAlreadyAdded) {
                            addFestivalToSchedule(currentTripId, currentDayIndex, festival);
                          }
                        }}
                        className={`bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-md hover:border-primary hover:shadow-xl transition-all ${
                          isAlreadyAdded ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-[1.02]'
                        }`}
                      >
                        {/* 축제 이미지 */}
                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                          {festival.ministry_image_url ? (
                            <img
                              src={festival.ministry_image_url}
                              alt={festival.fstvlNm}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-orange-100', 'to-orange-50');
                                const icon = document.createElement('span');
                                icon.className = 'material-symbols-outlined text-orange-300 text-5xl';
                                icon.textContent = 'festival';
                                e.target.parentElement.appendChild(icon);
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50">
                              <span className="material-symbols-outlined text-orange-300 text-5xl">festival</span>
                            </div>
                          )}
                          {isAlreadyAdded && (
                            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">check</span>
                              추가됨
                            </div>
                          )}
                        </div>

                        {/* 축제 정보 */}
                        <div className="p-5">
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-2">
                              {festival.ministry_region || festival.province || '지역'}
                            </span>
                            <h4 className="text-lg font-black text-gray-900 line-clamp-1 mb-1">
                              {festival.fstvlNm}
                            </h4>
                          </div>

                          {/* 날짜 정보 */}
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                            <span className="material-symbols-outlined text-lg">calendar_today</span>
                            <span className="font-semibold line-clamp-1">
                              {festival.fstvlStartDate && festival.fstvlEndDate
                                ? `${festival.fstvlStartDate} ~ ${festival.fstvlEndDate}`
                                : festival.ministry_date || '날짜 정보 없음'}
                            </span>
                          </div>

                          {/* 액션 버튼 */}
                          <button
                            onClick={() => {
                              if (!isAlreadyAdded) {
                                addFestivalToSchedule(currentTripId, currentDayIndex, festival);
                              }
                            }}
                            disabled={isAlreadyAdded}
                            className={`w-full py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                              isAlreadyAdded
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-orange-600'
                            }`}
                          >
                            <span className="material-symbols-outlined text-lg">
                              {isAlreadyAdded ? 'check' : 'add'}
                            </span>
                            {isAlreadyAdded ? '이미 추가됨' : '일정에 추가'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Plancuration;
