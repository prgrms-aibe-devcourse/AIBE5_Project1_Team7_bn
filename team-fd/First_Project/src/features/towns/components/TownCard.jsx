export function TownCard({ town, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        group w-full text-left
        rounded-2xl bg-white
        shadow-md hover:shadow-xl
        transition-shadow
        overflow-hidden
      "
    >
      {/* 이미지 영역 */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={town.image}
          alt={town.name}
          className="
            h-full w-full object-cover
            transition-transform duration-500 ease-out
            group-hover:scale-110
          "
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {town.name}
        </h3>
        <p className="mt-1 text-sm text-gray-600 line-clamp-2">
          {town.description}
        </p>
      </div>
    </button>
  );
}
