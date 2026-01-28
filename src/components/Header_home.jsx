import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import home_logo from "../assets/home_logo.png";

function Header() {
  const location = useLocation();

  /* ================= 상태 ================= */
  const [showNotifications, setShowNotifications] = useState(false);

  /* ================= 임시 알림 데이터 ================= */
  const upcomingTrips = []; // 추후 store / API 연결 가능

  const getDaysLeftText = (days) => {
    if (days === 0) return "오늘";
    if (days === 1) return "내일";
    return `${days}일 후`;
  };

  /* ================= 네비 ================= */
  const navItems = [
    { name: "Home", path: "/after_home" },
    { name: "Festival List", path: "/festivals" },
    { name: "Calendar", path: "/calendar" },
    { name: "Plan & Curation", path: "/plan" },
    { name: "Review", path: "/review" },
    { name: "My Page", path: "/mypage" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[85%] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🔑 핵심: relative */}
        <div className="flex items-center h-16 relative">
          {/* ================= 좌측 ================= */}
          <div className="flex items-center space-x-8 min-w-0 flex-shrink-0" style={{ marginLeft: '100px' }}>
            {/* 로고 */}
            <Link to="/after_home" className="flex items-center space-x-2" style={{ marginLeft: "-100px" }}>
              <img
                src={home_logo}
                alt="Festory Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* 네비게이션 */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-orange-600 bg-orange-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* ================= 중앙 ================= */}
          <div className="hidden lg:block absolute left-[79%] -translate-x-1/2 w-full max-w-xs">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for any pages you need..."
                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* ================= 우측 ================= */}
          <div className="ml-auto flex items-center space-x-5">
            {/* 알림 */}
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>

            {/* 🔔 알림 드롭다운 */}
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white border-2 border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200">
                  <h3 className="text-lg font-bold text-gray-900">🔔 알림</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {upcomingTrips.length > 0 ? (
                    upcomingTrips.map((trip) => (
                      <div
                        key={trip.id}
                        className="p-4 border-b border-gray-100 hover:bg-orange-50 transition-colors"
                      >
                        <p className="font-bold text-gray-900 mb-1">
                          {trip.name} 일정이 곧 시작됩니다!
                        </p>
                        <p className="text-sm text-orange-600 font-semibold">
                          {getDaysLeftText(trip.daysLeft)} 출발 🎉
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {trip.display}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">다가오는 일정이 없습니다</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 로그인 버튼 */}
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg font-bold text-white shadow transition-colors"
              style={{
                background: "linear-gradient(90deg, #FF5F33 0%, #EAB308 100%)",
                minWidth: 90,
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              로그인
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
