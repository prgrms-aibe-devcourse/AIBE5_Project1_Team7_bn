export function TownDetailModal({ town, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* 모달 본체 */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <img
          src={town.image}
          alt={town.name}
          className="h-64 w-full object-cover"
        />

        <div className="p-6">
          <h2 className="text-2xl font-bold">
            {town.name}
          </h2>
          <p className="mt-4 text-gray-700">
            {town.fullDescription}
          </p>

          <button
            onClick={onClose}
            className="mt-6 rounded-lg bg-black px-4 py-2 text-white"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
