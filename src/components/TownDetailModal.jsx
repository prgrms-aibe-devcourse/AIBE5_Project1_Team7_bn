export function TownDetailModal({ festival, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 모달 본체 */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* 헤더 이미지 */}
        <div className="relative h-80 overflow-hidden bg-gray-200">
          <img
            src={festival.image_url}
            alt={festival.festival_name}
            className="h-full w-full object-cover"
          />
          {/* 그라디언트 오버레이 */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-20 rounded-full bg-white/90 p-2 hover:bg-white transition-all"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 축제 이름 오버레이 */}
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-500/90 text-white text-sm font-bold mb-3">
              {festival.personality || "축제"}
            </span>
            <h2 className="text-4xl font-black text-white leading-tight">
              {festival.festival_name}
            </h2>
          </div>
        </div>

        {/* 내용 영역 */}
        <div className="p-8">
          {/* 기본 정보 그리드 */}
          <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-gray-100">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">📅 기간</p>
              <p className="text-lg font-bold text-gray-900">{festival.date}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">📍 지역</p>
              <p className="text-lg font-bold text-gray-900">{festival.region}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">📌 장소</p>
              <p className="text-lg font-bold text-gray-900">{festival.location}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">💰 입장료</p>
              <p className="text-lg font-bold text-orange-500">{festival.fee}</p>
            </div>
          </div>

          {/* 축제 설명 */}
          <div className="mb-8">
            <h3 className="text-xl font-black text-gray-900 mb-4">축제 소개</h3>
            <p className="text-gray-700 leading-relaxed text-base">
              {festival.festival_description}
            </p>
          </div>

          {/* 주최처 정보 */}
          {festival.institution && (
            <div className="mb-8 bg-linear-to-r from-orange-50 to-yellow-50 p-6 rounded-2xl border border-orange-100">
              <p className="text-sm font-semibold text-gray-600 mb-2">주최 · 주관</p>
              <p className="font-bold text-gray-900">{festival.institution}</p>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex gap-4">
            {festival.festival_site && (
              <a
                href={festival.festival_site}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-linear-to-r from-orange-500 to-yellow-500 px-6 py-3 font-bold text-white hover:shadow-lg transition-shadow text-center"
              >
                공식 웹사이트 →
              </a>
            )}
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border-2 border-gray-300 px-6 py-3 font-bold text-gray-900 hover:border-gray-400 transition-colors"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
