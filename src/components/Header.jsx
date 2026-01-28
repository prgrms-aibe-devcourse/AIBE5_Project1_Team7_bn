import { Link, useLocation } from "react-router-dom";
import { Bell, User } from "lucide-react";
import useStore from "../store/useStore";

function Header() {
  const location = useLocation();
  const store = useStore();

  const { loginUser, loginType, user } = store;

  const navItems = [
    { name: "Home", path: "/after_home" },
    { name: "Festival List", path: "/festivals" },
    { name: "Calendar", path: "/calendar" },
    { name: "Plan & Curation", path: "/plancuration" },
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
          <div className="flex items-center space-x-8">
            {/* 로고 */}
            <Link to="/after_home" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-linear-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                🎪
              </div>
              <span className="text-2xl font-bold text-gray-900">
                Festory
              </span>
            </Link>

            {/* 네비게이션 */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg text-sm
                           focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* 프로필 */}
            <Link
              to="/mypage"
              className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {loginType === "google"
                  ? loginUser && loginUser !== "google"
                    ? loginUser
                    : user?.name || "Google 사용자"
                  : loginType === "local"
                  ? user?.name || loginUser || "회원"
                  : "로그인"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
