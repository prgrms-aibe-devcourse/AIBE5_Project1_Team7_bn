import { useState } from "react";
import Header from "../components/Header";
import useStore from "../store/useStore";

function Mypage() {
  const [activeTab, setActiveTab] = useState("myinfo");
  const [isEditing, setIsEditing] = useState(false);
  
  const { user, loginUser, setUser } = useStore();
  
  // 수정 가능한 필드를 위한 state
  const [editedInfo, setEditedInfo] = useState({
    id: user?.id || loginUser?.id || "",
    name: user?.name || loginUser?.name || "",
    nickname: user?.nickname || loginUser?.nickname || "",
    email: user?.email || loginUser?.email || "",
    phone: user?.phone || loginUser?.phone || "",
    gender: user?.gender || loginUser?.gender || "",
  });

  const userInfo = {
    id: user?.id || loginUser?.id || "festory_lover",
    email: user?.email || loginUser?.email || "festory_lover@goldenhour.com",
    name: user?.name || loginUser?.name || "김페스",
    nickname: user?.nickname || loginUser?.nickname || "선셋다이어리",
    phone: user?.phone || loginUser?.phone || "010-1234-5678",
    gender: user?.gender || loginUser?.gender || "여성",
    memberType: "PRO MEMBER",
    joinDate: user?.joinDate || loginUser?.joinDate || "2024. 05. 14"
  };

  const handleEdit = () => {
    if (isEditing) {
      // 저장 로직
      const updatedUser = {
        ...user,
        ...editedInfo,
      };
      setUser(updatedUser);
      setIsEditing(false);
    } else {
      // 편집 모드로 전환
      setEditedInfo({
        id: userInfo.id,
        name: userInfo.name,
        nickname: userInfo.nickname,
        email: userInfo.email,
        phone: userInfo.phone,
        gender: userInfo.gender,
      });
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedInfo({
      id: userInfo.id,
      name: userInfo.name,
      nickname: userInfo.nickname,
      email: userInfo.email,
      phone: userInfo.phone,
      gender: userInfo.gender,
    });
  };

  const handleChange = (field, value) => {
    setEditedInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#fff9f2]">
      <style>{`
        .vibrant-gradient {
          background: linear-gradient(135deg, #f48525 0%, #fbbf24 100%);
        }
        .compass-glow {
          box-shadow: 0 0 50px rgba(251, 191, 36, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.5);
        }
        .vintage-map {
          background: radial-gradient(circle at center, #f5e6d3 0%, #e8d5b7 100%);
          box-shadow: inset 0 0 100px rgba(0,0,0,0.05);
        }
      `}</style>

      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            마이페이지
          </h2>
          
          <div className="flex gap-8 border-b-2 border-gray-200 mb-10">
            <button
              onClick={() => setActiveTab("myinfo")}
              className={`pb-3 text-lg font-semibold transition-all ${
                activeTab === "myinfo"
                  ? "text-orange-500 border-b-4 border-orange-500 -mb-0.5"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              My info
            </button>
            <button
              onClick={() => setActiveTab("preference")}
              className={`pb-3 text-lg font-semibold transition-all ${
                activeTab === "preference"
                  ? "text-orange-500 border-b-4 border-orange-500 -mb-0.5"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              내 축제 취향
            </button>
          </div>

        {activeTab === "myinfo" && (
          <div>
            <div className="bg-white rounded-3xl shadow-md p-16 mb-6">
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-44 text-gray-400 text-sm font-medium pt-1">아이디</div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedInfo.id}
                        onChange={(e) => handleChange('id', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    ) : (
                      <div className="text-gray-900 text-base font-semibold">{userInfo.id}</div>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-gray-200"></div>
                
                <div className="flex items-start">
                  <div className="w-44 text-gray-400 text-sm font-medium pt-1">이메일</div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedInfo.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    ) : (
                      <div className="text-gray-900 text-base font-semibold">{userInfo.email}</div>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-gray-200"></div>
                
                <div className="flex items-start">
                  <div className="w-44 text-gray-400 text-sm font-medium pt-1">이름</div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedInfo.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    ) : (
                      <div className="text-gray-900 text-base font-semibold">{userInfo.name}</div>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-gray-200"></div>
                
                <div className="flex items-start">
                  <div className="w-44 text-gray-400 text-sm font-medium pt-1">닉네임</div>
                  <div className="flex-1 flex items-center gap-3">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedInfo.nickname}
                        onChange={(e) => handleChange('nickname', e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    ) : (
                      <span className="text-gray-900 text-base font-semibold">{userInfo.nickname}</span>
                    )}
                    <span className="px-3 py-1 bg-orange-100 text-orange-600 text-xs font-bold rounded-full">
                      PRO MEMBER
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200"></div>
                
                <div className="flex items-start">
                  <div className="w-44 text-gray-400 text-sm font-medium pt-1">전화번호</div>
                  <div className="flex-1">
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedInfo.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="010-1234-5678"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    ) : (
                      <div className="text-gray-900 text-base font-semibold">{userInfo.phone}</div>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-gray-200"></div>
                
                <div className="flex items-start">
                  <div className="w-44 text-gray-400 text-sm font-medium pt-1">성별</div>
                  <div className="flex-1">
                    {isEditing ? (
                      <select
                        value={editedInfo.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="">선택해주세요</option>
                        <option value="남성">남성</option>
                        <option value="여성">여성</option>
                        <option value="기타">기타</option>
                      </select>
                    ) : (
                      <div className="text-gray-900 text-base font-semibold">{userInfo.gender}</div>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-gray-200"></div>
                
                <div className="flex items-start">
                  <div className="w-44 text-gray-400 text-sm font-medium pt-1">가입일</div>
                  <div className="flex-1 text-gray-900 text-base font-semibold">{userInfo.joinDate}</div>
                </div>
              </div>
              
              <div className="mt-14 flex justify-center gap-4">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleCancel}
                      className="w-full max-w-md h-14 bg-gray-200 text-gray-700 font-bold text-base rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      취소
                    </button>
                    <button 
                      onClick={handleEdit}
                      className="w-full max-w-md h-14 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-base rounded-full shadow-md hover:shadow-lg transition-all"
                    >
                      저장하기
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={handleEdit}
                    className="w-full max-w-md h-14 bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold text-base rounded-full shadow-md hover:shadow-lg transition-all"
                  >
                    내 회원가입 정보 수정
                  </button>
                )}
              </div>
            </div>
            
            <div className="text-center py-6">
              <button className="text-gray-400 text-sm hover:text-gray-600 underline">
                회원 탈퇴하기
              </button>
            </div>
          </div>
        )}

        {activeTab === "preference" && (
          <div className="w-full max-w-[1000px]">
            <div className="bg-white rounded-[3rem] shadow-2xl shadow-orange-900/5 overflow-hidden border border-orange-50/50 aspect-video hidden lg:block">
              <div className="flex h-full">
                <div className="w-[45%] bg-[#fdf8f4] flex items-center justify-center relative p-12">
                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[2rem]">
                    <div className="absolute inset-4 vintage-map rounded-[2rem] border-4 border-[#d4c3a3] transform -rotate-1 shadow-lg">
                      <div className="absolute top-4 left-10 w-3 h-3 bg-yellow-200 rounded-full blur-[2px] shadow-[0_0_15px_#fef3c7]"></div>
                      <div className="absolute top-12 left-20 w-2 h-2 bg-orange-200 rounded-full blur-[1px] shadow-[0_0_10px_#ffedd5]"></div>
                      <div className="absolute bottom-16 right-12 w-4 h-4 bg-yellow-300 rounded-full blur-[3px] shadow-[0_0_20px_#fde68a]"></div>
                    </div>
                    <div className="relative z-20 transform -rotate-6">
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-yellow-500 via-yellow-200 to-yellow-600 p-2 shadow-2xl compass-glow">
                        <div className="w-full h-full rounded-full bg-[#fdf8f4] border-4 border-yellow-600/30 flex items-center justify-center relative overflow-hidden">
                          <div className="relative w-36 h-36 flex items-center justify-center transform rotate-[45deg]">
                            <div className="w-4 h-24 bg-gradient-to-t from-[#f48525] to-orange-400 rounded-full absolute shadow-lg"></div>
                            <div className="w-4 h-24 bg-gradient-to-b from-gray-400 to-gray-200 rounded-full absolute translate-y-12 shadow-md"></div>
                            <div className="w-6 h-6 bg-yellow-600 rounded-full border-2 border-white z-10 shadow-lg"></div>
                          </div>
                          <span className="text-yellow-700/20 text-8xl absolute"></span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-10 w-full text-center z-30">
                      <p className="text-orange-900/80 font-black text-2xl tracking-tighter uppercase">#Experience_Explorer</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-14 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="px-4 py-1.5 bg-orange-50 text-[#f48525] text-sm font-bold rounded-full">#Experience_Explorer</span>
                      <span className="px-4 py-1.5 bg-orange-50 text-[#f48525] text-sm font-bold rounded-full">#신체활동</span>
                      <span className="px-4 py-1.5 bg-orange-50 text-[#f48525] text-sm font-bold rounded-full">#전통감성</span>
                    </div>
                    <h3 className="text-4xl font-black text-[#1c140d] mb-8 leading-tight">
                      경험 중심의 <span className="text-[#f48525]">탐험가</span>
                    </h3>
                    <div className="space-y-6 text-gray-600 text-[15.5px] leading-relaxed font-medium">
                      <p><span className="text-[#f48525] font-bold">김페스</span>님은 단순한 관람보다는 직접 참여하고 몸으로 느끼는 역동적인 축제를 선호하시네요!</p>
                      <p>전통적인 가치를 소중히 여기면서도, 새로운 체험을 통해 성취감을 얻는 과정에서 가장 큰 행복을 느끼는 타입입니다. 다가오는 가을, 지역색이 짙은 체험형 전통 축제에 방문해보는 것은 어떨까요?</p>
                    </div>
                  </div>
                  <button className="w-full h-16 vibrant-gradient text-white font-black rounded-2xl text-lg shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                     다시 축제취향 설문하기
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[3rem] shadow-2xl p-10 lg:hidden mb-12 border border-orange-50/50">
              <div className="flex flex-col gap-10">
                <div className="w-full aspect-square bg-[#faf3eb] rounded-[2.5rem] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-4 vintage-map rounded-[2.5rem] transform -rotate-2"></div>
                  <div className="relative flex flex-col items-center gap-6 z-10">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 p-1.5 shadow-2xl compass-glow">
                      <div className="w-full h-full rounded-full bg-[#fdf8f4] flex items-center justify-center relative">
                        <div className="relative w-28 h-28 flex items-center justify-center transform rotate-[45deg]">
                          <div className="w-3 h-20 bg-[#f48525] rounded-full absolute shadow-md"></div>
                          <div className="w-3 h-20 bg-gray-300 rounded-full absolute translate-y-10"></div>
                        </div>
                        <span className="text-yellow-700/20 text-6xl absolute"></span>
                      </div>
                    </div>
                    <p className="text-orange-800 font-black text-xl tracking-tighter uppercase">EXPLORER</p>
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-4 py-1.5 bg-orange-50 text-[#f48525] text-sm font-bold rounded-full">#Experience_Explorer</span>
                    <span className="px-4 py-1.5 bg-orange-50 text-[#f48525] text-sm font-bold rounded-full">#신체활동</span>
                    <span className="px-4 py-1.5 bg-orange-50 text-[#f48525] text-sm font-bold rounded-full">#전통감성</span>
                  </div>
                  <h3 className="text-3xl font-black text-[#1c140d] mb-6 leading-tight">
                    경험 중심의 <span className="text-[#f48525]">탐험가</span>
                  </h3>
                  <div className="space-y-4 text-gray-600 text-base leading-relaxed font-medium">
                    <p><span className="text-[#f48525] font-bold">김페스</span>님은 단순한 관람보다는 직접 참여하고 몸으로 느끼는 역동적인 축제를 선호하시네요!</p>
                    <p>전통적인 가치를 소중히 여기면서도, 새로운 체험을 통해 성취감을 얻는 과정에서 가장 큰 행복을 느끼는 타입입니다.</p>
                  </div>
                  <button className="w-full h-16 vibrant-gradient text-white font-black rounded-2xl text-lg shadow-xl shadow-orange-500/20 mt-10 flex items-center justify-center gap-2">
                     다시 축제취향 설문하기
                  </button>
                </div>
              </div>
            </div>
            <div className="text-center pb-24">
              <p className="text-gray-400 text-sm font-medium">분석 결과가 마음에 드시나요? 친구들에게 내 취향을 공유해보세요.</p>
            </div>
          </div>
        )}
        </div>
      </main>

      <div className="fixed bottom-10 right-10 flex flex-col items-end group z-[100]">
        <div className="mb-5 bg-white shadow-2xl border border-orange-100 px-8 py-5 rounded-[2rem] rounded-br-none relative">
          <p className="text-[15px] font-bold text-[#1c140d] leading-relaxed">Got questions?<br />Ask me anytime! </p>
          <div className="absolute -bottom-2 right-0 w-6 h-6 bg-white border-r border-b border-orange-100 rotate-45 transform translate-y-[-50%] translate-x-[-50%]"></div>
        </div>
        <button className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all relative overflow-hidden ring-8 ring-white/50">
          <div className="w-10 h-10 bg-white rounded-full absolute -top-2 -right-2 opacity-40"></div>
          <div className="w-12 h-8 bg-white/90 rounded-full shadow-md flex items-center justify-center">
            <div className="w-5 h-1.5 bg-orange-400/20 rounded-full"></div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Mypage;
