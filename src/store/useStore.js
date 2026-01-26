import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      // 사용자 정보
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),

      // 로그인 상태
      loginUser: null,
      loginType: null, // 'local' | 'google' | 'kakao' | 'naver'
      setLogin: (loginUser, loginType) => set({ loginUser, loginType }),
      clearLogin: () => set({ loginUser: null, loginType: null }),

      // Google 토큰
      googleAccessToken: null,
      setGoogleAccessToken: (token) => set({ googleAccessToken: token }),
      clearGoogleAccessToken: () => set({ googleAccessToken: null }),

      // 카카오 인증 코드
      kakaoAuthCode: null,
      setKakaoAuthCode: (code) => set({ kakaoAuthCode: code }),
      clearKakaoAuthCode: () => set({ kakaoAuthCode: null }),

      // 선택된 축제 pSeq
      selectedFestivalPSeq: null,
      setSelectedFestivalPSeq: (pSeq) => set({ selectedFestivalPSeq: pSeq }),
      clearSelectedFestivalPSeq: () => set({ selectedFestivalPSeq: null }),

      // 찜한 축제 목록
      likedFestivals: [],
      toggleLikeFestival: (festival) => set((state) => {
        const exists = state.likedFestivals.some(f => f.pSeq === festival.pSeq);
        if (exists) {
          return {
            likedFestivals: state.likedFestivals.filter(f => f.pSeq !== festival.pSeq)
          };
        } else {
          return {
            likedFestivals: [...state.likedFestivals, festival]
          };
        }
      }),
      isLiked: (pSeq) => (state) => state.likedFestivals.some(f => f.pSeq === pSeq),

      // 전체 초기화 (로그아웃 시 사용)
      clearAll: () => set({
        user: null,
        loginUser: null,
        loginType: null,
        googleAccessToken: null,
        kakaoAuthCode: null,
        selectedFestivalPSeq: null,
        likedFestivals: [],
      }),
    }),
    {
      name: 'festory-storage', // localStorage 키 이름
      // 부분 persist 옵션: 특정 필드만 localStorage에 저장
      partialize: (state) => ({
        user: state.user,
        loginUser: state.loginUser,
        loginType: state.loginType,
        googleAccessToken: state.googleAccessToken,
        kakaoAuthCode: state.kakaoAuthCode,
        selectedFestivalPSeq: state.selectedFestivalPSeq,
        likedFestivals: state.likedFestivals,
      }),
    }
  )
);

export default useStore;
