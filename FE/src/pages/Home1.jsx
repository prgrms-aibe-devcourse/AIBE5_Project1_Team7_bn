import React from "react";
import { Search, Bell } from "lucide-react";

// ✅ 너가 줄 이미지 경로로 바꿔줘
import sunLogo from "../assets/sun.png";
import mypageIcon from "../assets/mypage.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* =========================
          Header
      ========================== */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left: logo + title */}
            <div className="flex items-center gap-2">
              <img
                src={sunLogo}
                alt="LabelFest logo"
                className="w-9 h-9 rounded-full object-cover"
              />
              
            </div>

            {/* Center: search */}
            <div className="flex-1 mx-8">
              {/* ✅ 너비는 필요하면 w-[520px] 숫자만 조절 */}
              <div className="relative w-[520px] mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for any pages you need"
                  className="
                    w-full h-11
                    rounded-full
                    bg-gray-50
                    border border-gray-200
                    pl-12 pr-4
                    text-sm text-gray-700
                    placeholder:text-gray-400
                    focus:outline-none
                    focus:ring-2 focus:ring-orange-400
                    focus:bg-white
                    transition
                  "
                />
              </div>
            </div>

            {/* Right: bell + mypage */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>

              <button className="p-1 rounded-full hover:bg-gray-100 transition">
                <img
                  src={mypageIcon}
                  alt="My page"
                  className="w-9 h-9 rounded-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation (필요하면 유지/수정) */}
        <nav className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8 border-t border-gray-100">
            <button className="px-4 py-3 text-orange-500 font-medium">
              Home
            </button>
            <button className="px-4 py-3 text-gray-600 hover:text-gray-900">
              Festival List
            </button>
            <button className="px-4 py-3 text-gray-600 hover:text-gray-900">
              Calendar
            </button>
            <button className="px-4 py-3 text-gray-600 hover:text-gray-900">
              Plan & Curation
            </button>
          </div>
        </nav>
      </header>

      {/* =========================
          Main
      ========================== */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section (원래 있던 것 유지해도 되고, 나중에 바꿔도 됨) */}
        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden mb-12">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=600&fit=crop)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative px-12 py-16">
            <div className="text-orange-500 text-sm font-medium mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              WELCOME BACK!
            </div>

            <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-2">
              Find your
            </h2>
            <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text mb-6">
              Golden Harmony
            </h2>

            <p className="text-gray-200/80 text-lg mb-8 max-w-xl">
              We&apos;ll recommend festivals you&apos;ll love — with curation,
              schedules, and weather.
            </p>

            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-medium flex items-center gap-2 transition-colors">
              View Recommendations <span>→</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* =========================
              Left (2 columns)
              - 추천 카드 자리만 표시
              - 트렌딩/리스트도 자리만 표시 가능
          ========================== */}
          <div className="col-span-2 space-y-8">
            {/* ✅ 추천 카드(리스트) 자리 */}
            <section>
              <div className="flex items-start gap-2 mb-6">
                <span className="text-orange-500 text-2xl">✨</span>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    AI 추천 축제
                  </h3>
                  <p className="text-gray-600 mt-1">
                    (여기에 추천 라벨/설명 표시 예정)
                  </p>
                </div>
              </div>

              {/* ⬇️ 여기가 “축제 추천 카드 컴포넌트”가 들어갈 자리 */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 h-64 flex items-center justify-center text-gray-500">
                  추천 카드 컴포넌트 자리 (API/페이지 연결 예정)
                </div>
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 h-64 flex items-center justify-center text-gray-500">
                  추천 카드 컴포넌트 자리 (API/페이지 연결 예정)
                </div>
              </div>
            </section>

            {/* ✅ (선택) 트렌딩/축제 리스트도 나중에 페이지 넘길 거면 자리만 */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Trending Festivals
                  </h3>
                  <p className="text-gray-600 mt-1">
                    (여기에 트렌딩 축제 리스트 표시 예정)
                  </p>
                </div>
                <button className="text-orange-500 font-medium hover:underline">
                  View All →
                </button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 h-56 flex items-center justify-center text-gray-500">
                  트렌딩 카드 자리
                </div>
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 h-56 flex items-center justify-center text-gray-500">
                  트렌딩 카드 자리
                </div>
                <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 h-56 flex items-center justify-center text-gray-500">
                  트렌딩 카드 자리
                </div>
              </div>
            </section>
          </div>

          {/* =========================
              Right column
              - 캘린더 API 자리
              - 날씨 API 자리
          ========================== */}
          <div className="space-y-6">
            {/* ✅ 캘린더 API 자리 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Golden Calendar
                  </h3>
                  <p className="text-orange-500 text-sm font-medium">
                    (Calendar API)
                  </p>
                </div>
              </div>

              {/* ⬇️ 캘린더 위젯/컴포넌트 들어갈 자리 */}
              <div className="rounded-xl border-2 border-dashed border-gray-300 h-72 flex items-center justify-center text-gray-500">
                캘린더 컴포넌트 자리 (API 연동 예정)
              </div>

              <button className="w-full mt-4 text-orange-500 font-medium text-sm hover:underline">
                FULL CALENDAR VIEW
              </button>
            </div>

            {/* ✅ 날씨 API 자리 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">☀️</span>
                <h3 className="text-xl font-bold text-gray-900">Weather</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">(Weather API)</p>

              {/* ⬇️ 날씨 위젯/컴포넌트 들어갈 자리 */}
              <div className="rounded-xl border-2 border-dashed border-gray-300 h-40 flex items-center justify-center text-gray-500">
                날씨 컴포넌트 자리 (API 연동 예정)
              </div>
            </div>

            {/* Chatbot Widget (원하면 유지) */}
            <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-white font-medium mb-2">Got questions?</p>
                <p className="text-white text-sm mb-4">Ask me anytime! 😊</p>
              </div>
              <div className="absolute bottom-4 right-4 w-20 h-20 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
                😊
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
