import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import useStore from "../store/useStore";
import Loading from "./Loading";

function Review() {
  const navigate = useNavigate();
  const tripSchedules = useStore((state) => state.tripSchedules);
  const trips = useStore((state) => state.trips);
  const [isLoading, setIsLoading] = useState(() => {
    // 1/3 확률로 로딩 화면 표시 결정 (초기값으로만 계산)
    return Math.random() < 1/3;
  });
  
  // 로컬 스토리지에서 초기값 가져오기
  const getInitialReviews = () => {
    const savedReviews = localStorage.getItem("festival-reviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  };
  
  const [reviews, setReviews] = useState(getInitialReviews);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [activeTab, setActiveTab] = useState("write"); // 'write' | 'list'

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

  // 모든 일정의 축제 모으기
  const getAllFestivals = () => {
    const festivalMap = new Map();
    
    Object.keys(tripSchedules).forEach(tripId => {
      const trip = trips.find(t => t.id === parseInt(tripId));
      const schedule = tripSchedules[tripId];
      
      Object.keys(schedule).forEach(dayIndex => {
        schedule[dayIndex].forEach(festival => {
          if (!festivalMap.has(festival.pSeq)) {
            festivalMap.set(festival.pSeq, {
              ...festival,
              tripName: trip?.name || '알 수 없는 여행'
            });
          }
        });
      });
    });
    
    return Array.from(festivalMap.values());
  };

  const allFestivals = getAllFestivals();

  // 리뷰 작성 모달 열기
  const openReviewModal = (festival) => {
    const existingReview = reviews.find(r => r.festivalId === festival.pSeq);
    setSelectedFestival(festival);
    if (existingReview) {
      setRating(existingReview.rating);
      setReviewText(existingReview.text);
    } else {
      setRating(0);
      setReviewText("");
    }
    setShowReviewModal(true);
  };

  // 리뷰 저장
  const saveReview = () => {
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }

    const newReview = {
      id: Date.now(),
      festivalId: selectedFestival.pSeq,
      festivalName: selectedFestival.fstvlNm,
      festivalImage: selectedFestival.ministry_image_url,
      rating: rating,
      text: reviewText,
      date: new Date().toISOString(),
      isPlace: selectedFestival.isPlace,
      placeType: selectedFestival.placeType
    };

    const updatedReviews = reviews.filter(r => r.festivalId !== selectedFestival.pSeq);
    updatedReviews.push(newReview);
    
    setReviews(updatedReviews);
    localStorage.setItem("festival-reviews", JSON.stringify(updatedReviews));
    
    setShowReviewModal(false);
    setSelectedFestival(null);
    setRating(0);
    setReviewText("");
    alert("리뷰가 저장되었습니다!");
  };

  // 리뷰 삭제
  const deleteReview = (reviewId) => {
    if (window.confirm("리뷰를 삭제하시겠습니까?")) {
      const updatedReviews = reviews.filter(r => r.id !== reviewId);
      setReviews(updatedReviews);
      localStorage.setItem("festival-reviews", JSON.stringify(updatedReviews));
    }
  };

  // 리뷰 여부 확인
  const hasReview = (festivalId) => {
    return reviews.some(r => r.festivalId === festivalId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12">
        {/* 페이지 헤더 */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-gray-900 mb-3">
            ✍️ Festival Review
          </h1>
          <p className="text-gray-600 text-lg">
            여행에서 방문한 축제와 장소에 대한 솔직한 후기를 남겨주세요
          </p>
        </div>

        {/* 탭 버튼 */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("write")}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
              activeTab === "write"
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
            }`}
          >
            📝 리뷰 작성하기
          </button>
          <button
            onClick={() => setActiveTab("list")}
            className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
              activeTab === "list"
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
            }`}
          >
            📋 내 리뷰 ({reviews.length})
          </button>
        </div>

        {/* 리뷰 작성하기 탭 */}
        {activeTab === "write" && (
          <div>
            {allFestivals.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                <span className="material-symbols-outlined text-gray-300 text-8xl mb-4 block">event_busy</span>
                <p className="text-gray-400 font-bold text-xl mb-2">아직 방문한 축제가 없습니다</p>
                <p className="text-gray-400 mb-6">Plan & Curation에서 여행 계획을 세워보세요!</p>
                <button
                  onClick={() => navigate('/plancuration')}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  여행 계획하러 가기
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allFestivals.map((festival) => {
                  const reviewed = hasReview(festival.pSeq);
                  const review = reviews.find(r => r.festivalId === festival.pSeq);

                  return (
                    <div
                      key={festival.pSeq}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border-2 border-gray-100 hover:border-orange-200 group"
                    >
                      {/* 이미지 */}
                      <div className="relative aspect-video overflow-hidden bg-gray-100">
                        {festival.ministry_image_url ? (
                          <img
                            src={festival.ministry_image_url}
                            alt={festival.fstvlNm}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50">
                            {festival.isPlace ? (
                              <span style={{ fontSize: '64px' }}>
                                {festival.placeType === 'lodging' && '🏨'}
                                {festival.placeType === 'restaurant' && '🍽️'}
                                {festival.placeType === 'cafe' && '☕'}
                              </span>
                            ) : (
                              <span className="material-symbols-outlined text-orange-300 text-6xl">festival</span>
                            )}
                          </div>
                        )}
                        {reviewed && (
                          <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            리뷰 완료
                          </div>
                        )}
                      </div>

                      {/* 정보 */}
                      <div className="p-5">
                        <div className="mb-3">
                          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full mb-2">
                            {festival.ministry_region || festival.isPlace ? festival.ministry_region : '축제'}
                          </span>
                          <h3 className="text-xl font-black text-gray-900 line-clamp-1 mb-1">
                            {festival.fstvlNm}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {festival.tripName}
                          </p>
                        </div>

                        {reviewed && review && (
                          <div className="mb-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                            <div className="flex items-center gap-2 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className="text-yellow-500 text-lg">
                                  {star <= review.rating ? '⭐' : '☆'}
                                </span>
                              ))}
                              <span className="text-sm font-bold text-gray-600">
                                {review.rating}.0
                              </span>
                            </div>
                            {review.text && (
                              <p className="text-sm text-gray-700 line-clamp-2">
                                {review.text}
                              </p>
                            )}
                          </div>
                        )}

                        <button
                          onClick={() => openReviewModal(festival)}
                          className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                        >
                          {reviewed ? '리뷰 수정하기' : '리뷰 작성하기'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 내 리뷰 탭 */}
        {activeTab === "list" && (
          <div>
            {reviews.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl shadow-sm">
                <span className="material-symbols-outlined text-gray-300 text-8xl mb-4 block">rate_review</span>
                <p className="text-gray-400 font-bold text-xl mb-2">작성한 리뷰가 없습니다</p>
                <p className="text-gray-400">첫 리뷰를 작성해보세요!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {reviews.sort((a, b) => new Date(b.date) - new Date(a.date)).map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all p-6 border-2 border-gray-100"
                  >
                    <div className="flex gap-6">
                      {/* 이미지 */}
                      <div className="w-48 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100">
                        {review.festivalImage ? (
                          <img
                            src={review.festivalImage}
                            alt={review.festivalName}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-50">
                            {review.isPlace ? (
                              <span style={{ fontSize: '48px' }}>
                                {review.placeType === 'lodging' && '🏨'}
                                {review.placeType === 'restaurant' && '🍽️'}
                                {review.placeType === 'cafe' && '☕'}
                              </span>
                            ) : (
                              <span className="material-symbols-outlined text-orange-300 text-5xl">festival</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* 리뷰 내용 */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-2xl font-black text-gray-900 mb-1">
                              {review.festivalName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteReview(review.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                          >
                            <span className="material-symbols-outlined text-xl">delete</span>
                          </button>
                        </div>

                        {/* 별점 */}
                        <div className="flex items-center gap-2 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-yellow-500 text-2xl">
                              {star <= review.rating ? '⭐' : '☆'}
                            </span>
                          ))}
                          <span className="text-lg font-bold text-gray-700 ml-2">
                            {review.rating}.0
                          </span>
                        </div>

                        {/* 리뷰 텍스트 */}
                        {review.text && (
                          <p className="text-gray-700 leading-relaxed">
                            {review.text}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* 리뷰 작성 모달 */}
      {showReviewModal && selectedFestival && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* 모달 헤더 */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">리뷰 작성</h2>
                  <p className="text-sm text-gray-500 mt-1">{selectedFestival.fstvlNm}</p>
                </div>
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-all"
                >
                  <span className="material-symbols-outlined text-2xl text-gray-600">close</span>
                </button>
              </div>
            </div>

            {/* 모달 내용 */}
            <div className="p-8">
              {/* 별점 */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  별점을 선택해주세요 *
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="text-5xl transition-transform hover:scale-110"
                    >
                      {star <= (hoveredRating || rating) ? '⭐' : '☆'}
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-4 text-2xl font-bold text-gray-700 self-center">
                      {rating}.0
                    </span>
                  )}
                </div>
              </div>

              {/* 리뷰 텍스트 */}
              <div className="mb-8">
                <label className="block text-lg font-bold text-gray-900 mb-4">
                  후기를 작성해주세요 (선택)
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="축제나 장소에 대한 솔직한 후기를 작성해주세요&#10;다른 사람들에게 도움이 될 수 있습니다 😊"
                  className="w-full h-40 p-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  {reviewText.length} / 1000자
                </p>
              </div>

              {/* 저장 버튼 */}
              <button
                onClick={saveReview}
                className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl font-bold text-lg hover:shadow-lg transition-all"
              >
                리뷰 저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
