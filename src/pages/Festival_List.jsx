import React, { useState, useEffect } from "react";
import festivals from "../data/festivals.json";
import Header from "../components/Header";
import { TownCard } from "../components/TownCard";
import { TownDetailModal } from "../components/TownDetailModal";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

function Festival_List() {
	const [selectedFestival, setSelectedFestival] = useState(null);
	const [keyword, setKeyword] = useState("");
	const [theme, setTheme] = useState("");
	const [date, setDate] = useState("");
	const [region, setRegion] = useState("");
	const [isLoading, setIsLoading] = useState(() => {
		// 1/3 확률로 로딩 화면 표시 결정 (초기값으로만 계산)
		return Math.random() < 1/3;
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (isLoading) {
			// 2~4초 랜덤 대기
			const randomDelay = 2000 + Math.random() * 2000;
			const timer = setTimeout(() => {
				setIsLoading(false);
			}, randomDelay);
			return () => clearTimeout(timer);
		}
	}, [isLoading]);

	if (isLoading) {
		return <Loading />;
	}

	// 필터링 예시 (실제 옵션은 필요에 따라 구현)
	const filtered = festivals.filter(f => {
		return (
			(!keyword || f.fstvlNm.includes(keyword)) &&
			(!theme || (f.ministry_personality && f.ministry_personality.includes(theme))) &&
			(!region || (f.ministry_region && f.ministry_region.includes(region)))
		);
	});

	return (
		<div className="bg-background-light text-[#181411] font-display min-h-screen">
			<Header />
			<div className="max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-12 gap-8">
				{/* FILTERS */}
				<aside className="col-span-12 lg:col-span-3 space-y-6">
					<div className="bg-[#FFFBF6] rounded-xl p-5 border border-[#e6dfdb] sticky top-36">
						<h3 className="font-bold text-lg mb-4 text-[#181411]">Filters</h3>
						<div className="space-y-">
							<div className="space-y-2">
								<label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Keyword</label>
								<div className="flex w-full items-center rounded-lg bg-white border border-[#e6dfdb] h-10 px-3 overflow-hidden focus-within:ring-1 focus-within:ring-primary focus-within:border-primary">
									<span className="material-symbols-outlined text-[#8c725f] text-[18px]">search</span>
									<input
										className="flex-1 bg-transparent border-none focus:ring-0 text-[#181411] placeholder:text-[#8c725f]/70 text-sm ml-2 p-0"
										placeholder="Festival name..."
										value={keyword}
										onChange={e => setKeyword(e.target.value)}
									/>
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Theme</label>
								<div className="relative">
									<select className="w-full h-10 rounded-lg bg-white border border-[#e6dfdb] text-[#181411] text-sm px-3 appearance-none focus:ring-primary focus:border-primary cursor-pointer"
										value={theme} onChange={e => setTheme(e.target.value)}>
										<option value="">All Themes</option>
										<option>Quiet</option>
										<option>Active</option>
										<option>Ember Pulse</option>
										<option>Music</option>
										<option>Traditional</option>
										<option>Food</option>
									</select>
									<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#8c725f] pointer-events-none text-[18px]">style</span>
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Date</label>
								<div className="relative">
									<select className="w-full h-10 rounded-lg bg-white border border-[#e6dfdb] text-[#181411] text-sm px-3 appearance-none focus:ring-primary focus:border-primary cursor-pointer"
										value={date} onChange={e => setDate(e.target.value)}>
										<option>This Weekend</option>
										<option>Next Week</option>
										<option>This Month</option>
									</select>
									<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#8c725f] pointer-events-none text-[18px]">calendar_month</span>
								</div>
							</div>
							<div className="space-y-2">
								<label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Region</label>
								<div className="relative">
									<select className="w-full h-10 rounded-lg bg-white border border-[#e6dfdb] text-[#181411] text-sm px-3 appearance-none focus:ring-primary focus:border-primary cursor-pointer"
										value={region} onChange={e => setRegion(e.target.value)}>
										<option>All Regions</option>
										<option>Seoul</option>
										<option>Busan</option>
										<option>Jeju</option>
									</select>
									<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#8c725f] pointer-events-none text-[18px]">location_on</span>
								</div>
							</div>
							<div className="pt-2">
								// 필터 적용 버튼
								<button
									className="w-full font-bold h-10 rounded-lg shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm text-white"
									style={{
										background: 'linear-gradient(90deg, #FFA500 0%, #FFD700 100%)',
										border: 'none',
									}}
								>
									Apply Filters
								</button>
							</div>
						</div>
					</div>
				</aside>
				<main className="col-span-12 lg:col-span-9 space-y-12">
					{/* 맞춤 추천 */}
					<section className="space-y-6">
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white shadow-lg">
									<span className="material-symbols-outlined">auto_awesome</span>
								</div>
								<div>
									<h2 className="text-2xl font-extrabold text-[#181411]">Customized for Minho</h2>
									<p className="text-sm text-gray-500">Based on your recent interests and searches</p>
								</div>
							</div>
							<button className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-full font-bold text-[15px] flex items-center gap-2 shadow-[0_4px_15px_rgba(99,102,241,0.3)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] transition-all transform hover:-translate-y-0.5 active:scale-95"
								onClick={() => navigate("/tastetest")}
							>
								<span className="material-symbols-outlined text-[20px]">auto_awesome</span>
								AI로 선택 축제여행 추천받기
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filtered.slice(0, 2).map(f => (
								<TownCard
									key={f.pSeq}
									town={{
										id: f.pSeq,
										name: f.fstvlNm,
										image: f.ministry_image_url,
										description: f.ministry_description
									}}
									onClick={() => setSelectedFestival(f)}
								/>
							))}
							<div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#e6dfdb] hover:shadow-md transition-shadow group cursor-pointer flex flex-col justify-center items-center p-4 text-center border-dashed min-h-[180px] max-w-[220px] mx-auto">
								<div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/10 transition-colors">
									<span className="material-symbols-outlined text-gray-400 text-2xl group-hover:text-primary">add</span>
								</div>
								<h4 className="font-bold text-[#181411] text-base">More Recommendations</h4>
								<p className="text-xs text-gray-500 mt-1">See more personalized picks</p>
							</div>
						</div>
					</section>
					{/* 전체 축제 리스트 */}
					<section className="space-y-6">
						<div className="flex items-center justify-between pb-4 border-b border-gray-100">
							<h2 className="text-[#181411] font-bold text-2xl flex items-center gap-2">
								All Festivals <span className="text-gray-400 text-lg font-medium">({filtered.length})</span>
							</h2>
							<div className="flex items-center gap-6">
								<div className="flex items-center gap-2">
									<span className="text-sm text-gray-500 whitespace-nowrap">Show:</span>
									<div className="relative">
										<select 
											defaultValue="20"
											className="appearance-none bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold text-[#181411] pl-3 pr-8 py-1 focus:ring-primary focus:border-primary cursor-pointer hover:bg-gray-100 transition-colors"
										>
											<option value="10">10</option>
											<option value="20">20</option>
											<option value="50">50</option>
										</select>
										<span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[16px]">expand_more</span>
									</div>
									<span className="text-sm text-gray-500 whitespace-nowrap">per page</span>
								</div>
								<div className="flex items-center gap-4">
									<span className="text-sm text-gray-500">Sorted by:</span>
									<button className="flex items-center gap-1 text-sm font-bold text-[#181411] hover:text-primary transition-colors">
										Date <span className="material-symbols-outlined text-[18px]">expand_more</span>
									</button>
								</div>
							</div>
						</div>
						// 전체 축제 카드 그리드
						<div className="flex flex-wrap gap-4">
							{filtered.slice(2, 10).length > 0 ? (
								filtered.slice(2, 10).map(f => (
									<div key={f.pSeq} className="max-w-sm w-full">
										<TownCard
											town={{
												id: f.pSeq,
												name: f.fstvlNm,
												image: f.ministry_image_url,
												description: f.ministry_description
											}}
											onClick={() => setSelectedFestival(f)}
										/>
									</div>
								))
							) : (
								<div className="text-center text-gray-400 py-12 text-lg font-semibold w-full">
									표시할 축제가 없습니다.<br />
									(데이터가 없거나, 필터 조건에 맞는 축제가 없습니다.)
								</div>
							)}
						</div>
					</section>
				</main>
			</div>
			{/* 상세 모달 */}
			{selectedFestival && (
				<TownDetailModal festival={selectedFestival} onClose={() => setSelectedFestival(null)} />
			)}
		</div>
	);
}

export default Festival_List;
