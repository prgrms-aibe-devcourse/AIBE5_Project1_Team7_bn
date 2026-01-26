import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import festivals from "../data/festivals.json";
import useStore from "../store/useStore";
import Header from "../components/Header";

// ✅ FullCalendar 이벤트 텍스트 중앙정렬 및 스타일 개선
const calendarStyles = `
  .fc {
    font-family: 'Plus Jakarta Sans','Segoe UI',sans-serif;
  }
  
  .fc-event-title {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-weight: 600;
  }
  
  .fc-daygrid-event {
    padding: 4px 8px !important;
    border-radius: 6px !important;
    border: none !important;
    background: linear-gradient(135deg, rgb(244,133,37) 0%, rgb(255,153,102) 100%) !important;
    box-shadow: 0 2px 4px rgba(244,133,37,0.2) !important;
    transition: all 0.2s ease !important;
  }
  
  .fc-daygrid-event:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(244,133,37,0.3) !important;
  }
  
  .fc-col-header-cell {
    background: #f9fafb !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    font-size: 11px !important;
    letter-spacing: 0.5px !important;
    color: #6b7280 !important;
    padding: 12px 0 !important;
  }
  
  .fc-daygrid-day-number {
    font-weight: 600 !important;
    color: #111827 !important;
    padding: 8px !important;
  }
  
  .fc-day-today {
    background: rgba(244,133,37,0.05) !important;
  }
  
  .fc-day-today .fc-daygrid-day-number {
    background: rgb(244,133,37) !important;
    color: white !important;
    border-radius: 50% !important;
    width: 32px !important;
    height: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  .fc-button {
    background: linear-gradient(90deg, rgb(244,133,37) 0%, rgb(255,153,102) 100%) !important;
    border: none !important;
    border-radius: 8px !important;
    padding: 8px 16px !important;
    font-weight: 700 !important;
    text-transform: capitalize !important;
    transition: all 0.2s ease !important;
  }
  
  .fc-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(244,133,37,0.3) !important;
  }
  
  .fc-button-active {
    background: linear-gradient(90deg, rgb(230,120,30) 0%, rgb(240,140,90) 100%) !important;
  }
`;

// ✅ 화면에 캘린더(월/주) 항상 표시
// ✅ 로그인 후 구글 캘린더 일정 불러오기
// ✅ 날짜/드래그 선택 → 일정 추가 → Google Calendar에 실제로 insert

function Calendar() {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID || "primary";

  // ✅ 일정 추가하려면 readonly 말고 write scope 필요
  // 가장 무난: calendar.events (이벤트 CRUD)
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  // ✅ zustand store로 Google 토큰과 축제 pSeq 관리
  const { googleAccessToken, setGoogleAccessToken, selectedFestivalPSeq, clearSelectedFestivalPSeq } = useStore();
  
  const [token, setToken] = useState(googleAccessToken);
  const [tokenClient, setTokenClient] = useState(null);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]); // FullCalendar용 이벤트 배열
  const [loading, setLoading] = useState(false);

  // 오른쪽 "Upcoming" 패널용 원본(구글 이벤트)
  const [rawEvents, setRawEvents] = useState([]);

  // ✅ 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" | "edit" | "delete"
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    startDateTime: "",
    endDateTime: "",
    allDay: false,
  });

  // ✅ 축제 pSeq 입력 상태
  const [festivalPSeq, setFestivalPSeq] = useState("");
  const [showFestivalInput, setShowFestivalInput] = useState(false);

  // ✅ 축제 추가 여부 추적 (중복 방지)
  const festivalAddedRef = useRef(false);

  // ✅ 뷰 전환: 'calendar' | 'saved'
  const [activeView, setActiveView] = useState('calendar');

  // ✅ 축제 상세정보 모달
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [festivalDetailOpen, setFestivalDetailOpen] = useState(false);

  // ✅ FullCalendar ref
  const calendarRef = useRef(null); // My Festival Calendar용
  const festivalCalendarRef = useRef(null); // Festival Calendar용
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [currentTitle, setCurrentTitle] = useState("");
  const [festivalCurrentTitle, setFestivalCurrentTitle] = useState("");

  // ✅ 필터 상태
  const [activeFilters, setActiveFilters] = useState({
    location: false,
    region: false,
    vibe: false,
    genres: false
  });

  // ---------- GIS init ----------
  useEffect(() => {
    setError("");

    // ✅ zustand store에서 토큰 가져오기
    if (googleAccessToken) {
      setToken(googleAccessToken);
    }

    if (!CLIENT_ID) {
      setError("VITE_GOOGLE_CLIENT_ID가 없습니다. (.env 확인)");
      return;
    }

    if (!window.google?.accounts?.oauth2) {
      setError("Google Identity Services 로딩이 아직 안 됐습니다. (index.html 스크립트 확인)");
      return;
    }

    const tc = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (resp) => {
        if (resp?.access_token) {
          setToken(resp.access_token);
          setGoogleAccessToken(resp.access_token);
        } else {
          setError("토큰 발급에 실패했습니다.");
        }
      },
    });

    setTokenClient(tc);
  }, [CLIENT_ID, googleAccessToken, setGoogleAccessToken]);

  // ✅ 토큰이 없을 때 자동으로 Google 로그인 요청
  useEffect(() => {
    if (!token && tokenClient && !loading) {
      // 페이지 로드 후 0.5초 뒤에 자동으로 로그인 요청
      const timer = setTimeout(() => {
        tokenClient.requestAccessToken({ prompt: "" });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [token, tokenClient, loading]);

  // ---------- helpers ----------
  const fmtK = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString("ko-KR", { month: "short", day: "2-digit" });
    } catch {
      return "";
    }
  };

  // ✅ 축제 날짜 파싱 함수 - fstvlStartDate와 fstvlEndDate 사용
  const parseFestivalDate = (festival) => {
    try {
      // fstvlStartDate와 fstvlEndDate가 있으면 직접 사용
      if (festival.fstvlStartDate) {
        const startDateTime = festival.fstvlStartDate; // 이미 "YYYY-MM-DD" 형식
        const endDateTime = festival.fstvlEndDate || festival.fstvlStartDate;
        return { startDateTime, endDateTime };
      }

      // 없으면 ministry_date 파싱 (fallback)
      const dateStr = festival.ministry_date;
      if (!dateStr) return null;

      // 패턴 1: "2026. 1. 16. ~ 1. 18." (같은 연도)
      let match = dateStr.match(/(\d{4})\.\s+(\d{1,2})\.\s+(\d{1,2})\.\s*~\s*(\d{1,2})\.\s+(\d{1,2})\./);
      if (match) {
        const year = parseInt(match[1]);
        const startMonth = parseInt(match[2]);
        const startDay = parseInt(match[3]);
        const endMonth = parseInt(match[4]);
        const endDay = parseInt(match[5]);

        const startDateTime = `${year}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
        const endDateTime = `${year}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;

        return { startDateTime, endDateTime };
      }

      // 패턴 2: "2025. 11. 29. ~ 2026. 1. 18." (연도가 바뀌는 경우)
      match = dateStr.match(/(\d{4})\.\s+(\d{1,2})\.\s+(\d{1,2})\.\s*~\s*(\d{4})\.\s+(\d{1,2})\.\s+(\d{1,2})\./);
      if (match) {
        const startYear = parseInt(match[1]);
        const startMonth = parseInt(match[2]);
        const startDay = parseInt(match[3]);
        const endYear = parseInt(match[4]);
        const endMonth = parseInt(match[5]);
        const endDay = parseInt(match[6]);

        const startDateTime = `${startYear}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
        const endDateTime = `${endYear}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;

        return { startDateTime, endDateTime };
      }

      // 패턴 3: "2026. 1. 16." (단일 날짜)
      match = dateStr.match(/(\d{4})\.\s+(\d{1,2})\.\s+(\d{1,2})\./);
      if (match) {
        const year = parseInt(match[1]);
        const month = parseInt(match[2]);
        const day = parseInt(match[3]);

        const startDateTime = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const endDateTime = startDateTime; // 같은 날

        return { startDateTime, endDateTime };
      }

      return null;
    } catch {
      return null;
    }
  };

  // ✅ pSeq로 축제 정보 로드 및 모달 오픈
  const loadFestivalAndOpen = (pSeq) => {
    const festival = festivals.find((f) => String(f.pSeq) === String(pSeq));
    if (!festival) {
      alert("축제를 찾을 수 없습니다.");
      return;
    }

    const dateInfo = parseFestivalDate(festival);
    if (!dateInfo) {
      alert("축제 날짜를 파싱할 수 없습니다.");
      return;
    }

    setFormData({
      id: null,
      title: festival.fstvlNm,
      description: festival.ministry_description,
      startDateTime: dateInfo.startDateTime,
      endDateTime: dateInfo.endDateTime,
      allDay: true,
    });
    setModalMode("add");
    setModalOpen(true);
    setFestivalPSeq("");
    setShowFestivalInput(false);
  };

  // ---------- load events from Google ----------
  const fetchEvents = async (timeMinISO, timeMaxISO) => {
    if (!token) return;

    setLoading(true);
    setError("");
    try {
      const url =
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events` +
        `?timeMin=${encodeURIComponent(timeMinISO)}` +
        `&timeMax=${encodeURIComponent(timeMaxISO)}` +
        `&singleEvents=true&orderBy=startTime&maxResults=250` +
        `&fields=items(id,summary,description,start,end)`; // ✅ description 포함

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        // ✅ 401 에러인 경우 토큰이 만료되었으므로 재로그인 필요
        if (res.status === 401) {
          setError("Google 로그인이 만료되었습니다. 다시 로그인해주세요.");
          setToken(null);
          setGoogleAccessToken(null);
          // 자동으로 재로그인 요청
          if (tokenClient) {
            setTimeout(() => {
              tokenClient.requestAccessToken({ prompt: "" });
            }, 1000);
          }
          return;
        }
        
        const text = await res.text();
        throw new Error(`events.list 실패 (${res.status}): ${text}`);
      }

      const data = await res.json();
      const items = data.items || [];
      setRawEvents(items);

      // FullCalendar 형식으로 변환
      const fc = items.map((ev) => ({
        id: ev.id,
        title: ev.summary || "(제목 없음)",
        start: ev.start?.dateTime || ev.start?.date,
        end: ev.end?.dateTime || ev.end?.date,
        allDay: !!ev.start?.date, // 종일 이벤트면 date만 옴
        extendedProps: {
          description: ev.description || "", // ✅ description을 extendedProps에 저장
        },
      }));
      setEvents(fc);
    } catch (e) {
      console.error(e);
      setError("캘린더 이벤트를 불러오지 못했습니다. (콘솔 확인)");
    } finally {
      setLoading(false);
    }
  };

  // ---------- insert event to Google ----------
  const insertEvent = async ({ title, description, start, end, allDay }) => {
    if (!token) {
      setError("먼저 Google 로그인을 해주세요.");
      return;
    }

    setError("");
    try {
      // ✅ allDay 이벤트의 경우 end 날짜에 1일 추가 (Google Calendar API는 end date가 exclusive)
      let endDate = end;
      if (allDay && end) {
        const endDateObj = new Date(end);
        endDateObj.setDate(endDateObj.getDate() + 1);
        endDate = endDateObj.toISOString().split("T")[0];
      }

      const body = {
        summary: title,
        description: description || undefined,
        start: allDay
          ? { date: start.slice(0, 10) }
          : { dateTime: new Date(start).toISOString() },
        end: allDay
          ? { date: endDate }
          : { dateTime: new Date(end).toISOString() },
      };

      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          setError("Google 로그인이 만료되었습니다. 다시 로그인해주세요.");
          setToken(null);
          setGoogleAccessToken(null);
          if (tokenClient) {
            setTimeout(() => {
              tokenClient.requestAccessToken({ prompt: "" });
            }, 1000);
          }
          return;
        }
        const text = await res.text();
        throw new Error(`events.insert 실패 (${res.status}): ${text}`);
      }

      // 추가 후 현재 뷰 범위 다시 로드가 가장 확실
      // (FullCalendar가 제공하는 info.view.currentStart/end를 이용하려면 ref 쓰면 되는데,
      //  여기서는 간단하게 "이번달 전후" 다시 로드)
      const now = new Date();
      const timeMin = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const timeMax = new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString();
      await fetchEvents(timeMin, timeMax);
    } catch (e) {
      console.error(e);
      setError("일정 추가에 실패했습니다. (권한/스코프/캘린더ID 확인)");
    }
  };

  // ---------- update event in Google ----------
  const updateEvent = async (eventId, { title, description, start, end, allDay }) => {
    if (!token) {
      setError("먼저 Google 로그인을 해주세요.");
      return;
    }

    setError("");
    try {
      // ✅ 먼저 기존 이벤트 조회
      const getRes = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events/${encodeURIComponent(eventId)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!getRes.ok) {
        if (getRes.status === 401) {
          setError("Google 로그인이 만료되었습니다. 다시 로그인해주세요.");
          setToken(null);
          setGoogleAccessToken(null);
          if (tokenClient) {
            setTimeout(() => {
              tokenClient.requestAccessToken({ prompt: "" });
            }, 1000);
          }
          return;
        }
        throw new Error(`이벤트 조회 실패 (${getRes.status})`);
      }

      const existingEvent = await getRes.json();

      // ✅ 필드 업데이트
      // ✅ allDay 이벤트의 경우 end 날짜에 1일 추가
      let endDate = end;
      if (allDay && end) {
        const endDateObj = new Date(end);
        endDateObj.setDate(endDateObj.getDate() + 1);
        endDate = endDateObj.toISOString().split("T")[0];
      }

      const body = {
        ...existingEvent,
        summary: title,
        description: description || undefined,
        start: allDay
          ? { date: start.slice(0, 10) }
          : { dateTime: new Date(start).toISOString() },
        end: allDay
          ? { date: endDate }
          : { dateTime: new Date(end).toISOString() },
      };

      const updateRes = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events/${encodeURIComponent(eventId)}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!updateRes.ok) {
        if (updateRes.status === 401) {
          setError("Google 로그인이 만료되었습니다. 다시 로그인해주세요.");
          setToken(null);
          setGoogleAccessToken(null);
          if (tokenClient) {
            setTimeout(() => {
              tokenClient.requestAccessToken({ prompt: "" });
            }, 1000);
          }
          return;
        }
        const text = await updateRes.text();
        throw new Error(`events.update 실패 (${updateRes.status}): ${text}`);
      }

      // 다시 로드
      const now = new Date();
      const timeMin = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const timeMax = new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString();
      await fetchEvents(timeMin, timeMax);
    } catch (e) {
      console.error(e);
      setError("일정 수정에 실패했습니다.");
    }
  };

  // ---------- delete event from Google ----------
  const deleteEvent = async (eventId) => {
    if (!token) {
      setError("먼저 Google 로그인을 해주세요.");
      return;
    }

    if (!window.confirm("정말로 이 일정을 삭제하시겠습니까?")) {
      return;
    }

    setError("");
    try {
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events/${encodeURIComponent(eventId)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          setError("Google 로그인이 만료되었습니다. 다시 로그인해주세요.");
          setToken(null);
          setGoogleAccessToken(null);
          if (tokenClient) {
            setTimeout(() => {
              tokenClient.requestAccessToken({ prompt: "" });
            }, 1000);
          }
          return;
        }
        const text = await res.text();
        throw new Error(`events.delete 실패 (${res.status}): ${text}`);
      }

      // 다시 로드
      const now = new Date();
      const timeMin = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
      const timeMax = new Date(now.getFullYear(), now.getMonth() + 2, 0).toISOString();
      await fetchEvents(timeMin, timeMax);
    } catch (e) {
      console.error(e);
      setError("일정 삭제에 실패했습니다.");
    }
  };

  // ---------- auth ----------
  const _signIn = () => {
    setError("");
    if (!tokenClient) {
      setError("로그인 준비가 아직 안 됐습니다. 잠시 후 다시 시도하세요.");
      return;
    }
    tokenClient.requestAccessToken({ prompt: "" });
  };

  const _signOut = () => {
    setToken(null);
    setEvents([]);
    setRawEvents([]);
  };

  // ✅ pSeq로 축제 정보 로드 및 바로 캘린더에 추가 (모달 없이)
  const loadFestivalAndAdd = useCallback(async (pSeq) => {
    if (!token) return;
    
    const festival = festivals.find((f) => String(f.pSeq) === String(pSeq));
    if (!festival) return;

    const dateInfo = parseFestivalDate(festival);
    if (!dateInfo) return;

    // 바로 Google Calendar에 추가
    await insertEvent({
      title: festival.fstvlNm,
      description: festival.ministry_description,
      start: dateInfo.startDateTime,
      end: dateInfo.endDateTime,
      allDay: true,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // ✅ 홈에서 선택한 축제 자동 추가 (한 번만 실행)
  useEffect(() => {
    if (selectedFestivalPSeq && token && !festivalAddedRef.current) {
      festivalAddedRef.current = true;
      setTimeout(() => {
        loadFestivalAndAdd(selectedFestivalPSeq);
        clearSelectedFestivalPSeq();
      }, 1000);
    }
  }, [selectedFestivalPSeq, token, clearSelectedFestivalPSeq, loadFestivalAndAdd]);

  // ---------- upcoming (right panel) ----------
  const upcoming = useMemo(() => {
    return (rawEvents || []).slice(0, 3).map((ev) => {
      const s = ev.start?.dateTime || ev.start?.date;
      const e = ev.end?.dateTime || ev.end?.date;
      const range = s ? `${fmtK(s)}${e ? ` ~ ${fmtK(e)}` : ""}` : "날짜 정보 없음";
      return { id: ev.id, title: ev.summary || "(제목 없음)", date: range, location: ev.location || "" };
    });
  }, [rawEvents]);

  // ✅ 축제 데이터를 FullCalendar 이벤트로 변환
  const festivalEvents = useMemo(() => {
    // 필터가 하나라도 활성화되어 있는지 확인
    const hasActiveFilter = Object.values(activeFilters).some(v => v);
    
    // 필터가 활성화되지 않았으면 빈 배열 반환
    if (!hasActiveFilter) {
      return [];
    }

    // 필터에 따라 축제 필터링
    let filteredFestivals = festivals;

    if (activeFilters.location) {
      // Location 필터: 특정 pSeq만 표시
      const locationPSeqs = ["12116", "12038", "12970"];
      filteredFestivals = filteredFestivals.filter(festival => 
        locationPSeqs.includes(festival.pSeq)
      );
    }

    // 다른 필터들도 추가 가능 (현재는 모든 축제 표시)
    // if (activeFilters.region) { ... }
    // if (activeFilters.vibe) { ... }
    // if (activeFilters.genres) { ... }

    return filteredFestivals.map(festival => {
      const dateInfo = parseFestivalDate(festival);
      if (!dateInfo) return null;
      
      return {
        id: `festival-${festival.pSeq}`,
        title: festival.fstvlNm,
        start: dateInfo.startDateTime,
        end: dateInfo.endDateTime,
        allDay: true,
        backgroundColor: 'rgb(244,133,37)',
        borderColor: 'rgb(244,133,37)',
        extendedProps: {
          festival: festival
        }
      };
    }).filter(Boolean);
  }, [activeFilters]);

  // ---------- styles (기존 유지) ----------
  const styles = {
    container: { display: "flex", flexDirection: "column", minHeight: "calc(100vh - 64px)", background: "#f9fafb", fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif" },
    header: { height: 60, background: "#fff", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 0 },
    sidebar: { position: "fixed", left: 0, top: 124, width: 220, height: "calc(100vh - 124px)", background: "#fff", borderRight: "1px solid #e5e7eb", padding: 20, overflowY: "auto" },
    main: { marginLeft: 250, marginTop: 0, flex: 1, display: "flex", gap: 20, padding: 20 },
    calendarCard: { flex: 1, background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden", display: "flex", flexDirection: "column" },
    calendarTopBar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: "1px solid #e5e7eb", background: "#fff" },
    calendarBody: { padding: 16, overflowY: "auto", height: "calc(100vh - 120px)" },
    rightPanel: { width: 340, background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflowY: "auto" },
    sidebarSection: { marginBottom: 24 },
    sidebarTitle: { fontSize: 12, fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 12 },
    sidebarItem: { fontSize: 13, color: "#374151", padding: "8px 12px", borderRadius: 6, marginBottom: 8, cursor: "pointer", background: "transparent", border: "none", textAlign: "left", width: "100%" },
    sidebarItemActive: { background: "rgb(244,133,37)", color: "#fff", fontWeight: 600 },
    btn: { padding: "10px 12px", background: "linear-gradient(90deg, rgb(244,133,37) 0%, rgb(255,153,102) 100%)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" },
    btnGhost: { padding: "10px 12px", background: "#fff", color: "#111", border: "1px solid #e5e7eb", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" },
    errorBox: { margin: "12px 16px", padding: "10px 12px", borderRadius: 8, background: "#fff1f2", color: "#9f1239", border: "1px solid #fecdd3", fontSize: 13 },
    eventCard: { marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #e5e7eb" },
    eventImage: { width: "100%", height: 160, borderRadius: 8, background: "#f3f4f6", marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 },
    note: { fontSize: 12, color: "#6b7280" },
  };

  return (
    <>
      <Header />
      <div style={styles.container}>
        <style>{calendarStyles}</style>
        {/* 서브 헤더 - 캘린더 타이틀 */}
        <div style={styles.header}>
          <div style={{ fontSize: 18, fontWeight: 600, color: "rgb(244,133,37)" }}>Discovery Calendar</div>
        </div>

      {/* ✅ 축제 pSeq 입력 패널 */}
      {showFestivalInput && token && (
        <div style={{
          position: "fixed",
          top: 70,
          right: 20,
          background: "#fff",
          borderRadius: 12,
          padding: 16,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          zIndex: 500,
          minWidth: 300,
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#111827" }}>
            🎪 축제 pSeq 입력
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="text"
              value={festivalPSeq}
              onChange={(e) => setFestivalPSeq(e.target.value)}
              placeholder="축제 pSeq 입력"
              style={{
                flex: 1,
                padding: "10px 12px",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                fontSize: 13,
                outline: "none",
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter" && festivalPSeq.trim()) {
                  loadFestivalAndOpen(festivalPSeq);
                }
              }}
            />
            <button
              onClick={() => {
                if (festivalPSeq.trim()) {
                  loadFestivalAndOpen(festivalPSeq);
                }
              }}
              style={{
                ...styles.btn,
                padding: "10px 16px",
              }}
            >
              추가
            </button>
          </div>
        </div>
      )}

      {/* 사이드바 */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarSection}>
          <button 
            style={{ ...styles.sidebarItem, ...(activeView === 'calendar' ? styles.sidebarItemActive : {}) }}
            onClick={() => setActiveView('calendar')}
          >
            📅 Festival Calendar
          </button>
        </div>
        <div style={styles.sidebarSection}>
          <button 
            style={{ ...styles.sidebarItem, ...(activeView === 'saved' ? styles.sidebarItemActive : {}) }}
            onClick={() => setActiveView('saved')}
          >
            ⭐ Saved Festivals
          </button>
        </div>
        <div style={styles.sidebarSection}>
          <div style={styles.sidebarTitle}>FILTER SEARCH</div>
          <button 
            style={{ ...styles.sidebarItem, ...(activeFilters.location ? styles.sidebarItemActive : {}) }}
            onClick={() => setActiveFilters(prev => ({ ...prev, location: !prev.location }))}
          >
            📍 Location
          </button>
          <button 
            style={{ ...styles.sidebarItem, ...(activeFilters.region ? styles.sidebarItemActive : {}) }}
            onClick={() => setActiveFilters(prev => ({ ...prev, region: !prev.region }))}
          >
            🌍 Region
          </button>
          <button 
            style={{ ...styles.sidebarItem, ...(activeFilters.vibe ? styles.sidebarItemActive : {}) }}
            onClick={() => setActiveFilters(prev => ({ ...prev, vibe: !prev.vibe }))}
          >
            🎨 Vibe
          </button>
          <button 
            style={{ ...styles.sidebarItem, ...(activeFilters.genres ? styles.sidebarItemActive : {}) }}
            onClick={() => setActiveFilters(prev => ({ ...prev, genres: !prev.genres }))}
          >
            🎭 Genres
          </button>
        </div>
      </div>

      {/* 메인 */}
      <div style={styles.main}>
        {activeView === 'calendar' ? (
          /* ✅ 단순 캘린더 뷰 */
          <div style={styles.calendarCard}>
          {/* 커스텀 상단 헤더 */}
          <div style={{ padding: '32px 24px 24px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 700, color: '#111', margin: 0, marginBottom: 8 }}>
                  {festivalCurrentTitle || 'October 2024'}
                </h2>
                <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
                  Discover the vibrant autumn spirit of Korea.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button 
                  onClick={() => {
                    const calendarApi = festivalCalendarRef.current?.getApi();
                    if (calendarApi) calendarApi.prev();
                  }}
                  style={{
                    width: 32,
                    height: 32,
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderLeft: '2px solid #374151',
                    borderBottom: '2px solid #374151',
                    transform: 'rotate(45deg)',
                    marginLeft: 2
                  }}></span>
                </button>
                <button 
                  onClick={() => {
                    const calendarApi = festivalCalendarRef.current?.getApi();
                    if (calendarApi) calendarApi.next();
                  }}
                  style={{
                  width: 32,
                  height: 32,
                  border: '1px solid #e5e7eb',
                  backgroundColor: '#fff',
                  borderRadius: 6,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRight: '2px solid #374151',
                    borderTop: '2px solid #374151',
                    transform: 'rotate(45deg)',
                    marginRight: 2
                  }}></span>
                </button>
              </div>
            </div>
          </div>

          <div style={styles.calendarBody}>
            <FullCalendar
              ref={festivalCalendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="100%"
              selectable={false}
              editable={false}
              events={festivalEvents}
              headerToolbar={false}
              datesSet={() => {
                const calendarApi = festivalCalendarRef.current?.getApi();
                if (calendarApi) {
                  setFestivalCurrentTitle(calendarApi.view.title);
                }
              }}
              viewDidMount={(info) => {
                setFestivalCurrentTitle(info.view.title);
              }}
              eventClick={(info) => {
                const festival = info.event.extendedProps?.festival;
                if (festival) {
                  setSelectedFestival(festival);
                  setFestivalDetailOpen(true);
                }
              }}
            />
          </div>
        </div>
        ) : (
          /* ✅ Saved Festivals 뷰 - Google 캘린더 일정 관리 */
          <div style={styles.calendarCard}>
          {/* 커스텀 상단 헤더 */}
          <div style={{ padding: '32px 24px 24px', borderBottom: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 32, fontWeight: 700, color: '#111', margin: 0, marginBottom: 8 }}>
                  {currentTitle || 'January 2026'}
                </h2>
                <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>
                  {token ? "날짜를 선택해서 일정을 추가하고 관리하세요" : "로그인하면 일정 추가/수정/삭제가 됩니다."}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ display: 'flex', backgroundColor: '#f3f4f6', borderRadius: 8, padding: 4 }}>
                  <button 
                    onClick={() => {
                      const calendarApi = calendarRef.current?.getApi();
                      if (calendarApi) {
                        calendarApi.changeView('dayGridMonth');
                        setCurrentView('dayGridMonth');
                      }
                    }}
                    style={{
                      padding: '6px 16px',
                      border: 'none',
                      backgroundColor: currentView === 'dayGridMonth' ? '#fff' : 'transparent',
                      color: currentView === 'dayGridMonth' ? '#111' : '#6b7280',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: currentView === 'dayGridMonth' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                    }}>
                    Month
                  </button>
                  <button 
                    onClick={() => {
                      const calendarApi = calendarRef.current?.getApi();
                      if (calendarApi) {
                        calendarApi.changeView('timeGridWeek');
                        setCurrentView('timeGridWeek');
                      }
                    }}
                    style={{
                      padding: '6px 16px',
                      border: 'none',
                      backgroundColor: currentView === 'timeGridWeek' ? '#fff' : 'transparent',
                      color: currentView === 'timeGridWeek' ? '#111' : '#6b7280',
                      borderRadius: 6,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: currentView === 'timeGridWeek' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                    }}>
                    Week
                  </button>
                </div>
                <button 
                  onClick={() => {
                    const calendarApi = calendarRef.current?.getApi();
                    if (calendarApi) calendarApi.prev();
                  }}
                  style={{
                    width: 32,
                    height: 32,
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16
                  }}>
                  ‹
                </button>
                <button 
                  onClick={() => {
                    const calendarApi = calendarRef.current?.getApi();
                    if (calendarApi) calendarApi.next();
                  }}
                  style={{
                    width: 32,
                    height: 32,
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16
                  }}>
                  ›
                </button>
              </div>
            </div>
          </div>

          {error ? <div style={styles.errorBox}>{error}</div> : null}

          <div style={styles.calendarBody}>
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="100%"
              selectable={!!token}
              editable={!!token}
              events={events}
              headerToolbar={false}
              datesSet={(info) => {
                if (!token) return;
                fetchEvents(info.start.toISOString(), info.end.toISOString());
                // 타이틀 업데이트
                const calendarApi = calendarRef.current?.getApi();
                if (calendarApi) {
                  setCurrentTitle(calendarApi.view.title);
                }
              }}
              viewDidMount={(info) => {
                setCurrentTitle(info.view.title);
                setCurrentView(info.view.type);
              }}
              select={(info) => {
                if (!token) return;

                setFormData({
                  id: null,
                  title: "",
                  description: "",
                  startDateTime: info.startStr,
                  endDateTime: info.endStr,
                  allDay: info.allDay,
                });
                setModalMode("add");
                setModalOpen(true);
              }}
              eventClick={(info) => {
                if (!token) return;

                setFormData({
                  id: info.event.id,
                  title: info.event.title,
                  description: info.event.extendedProps?.description || "",
                  startDateTime: info.event.startStr || info.event.start.toISOString(),
                  endDateTime: info.event.endStr || (info.event.end ? info.event.end.toISOString() : info.event.start.toISOString()),
                  allDay: info.event.allDay,
                });
                setModalMode("edit");
                setModalOpen(true);
              }}
              eventDrop={(info) => {
                if (!token) return;

                updateEvent(info.event.id, {
                  title: info.event.title,
                  start: info.event.startStr || info.event.start.toISOString(),
                  end: info.event.endStr || (info.event.end ? info.event.end.toISOString() : info.event.start.toISOString()),
                  allDay: info.event.allDay,
                });
              }}
              eventResize={(info) => {
                if (!token) return;

                updateEvent(info.event.id, {
                  title: info.event.title,
                  start: info.event.startStr || info.event.start.toISOString(),
                  end: info.event.endStr || (info.event.end ? info.event.end.toISOString() : info.event.start.toISOString()),
                  allDay: info.event.allDay,
                });
              }}
            />

            {!token && (
              <div style={{ marginTop: 12, fontSize: 12, color: "#6b7280" }}>
                ※ 로그인 전에도 캘린더는 보이지만, Google 캘린더에 저장/동기화는 로그인 후 가능합니다.
              </div>
            )}
          </div>
        </div>
        )}

        {/* 오른쪽 패널 */}
        {activeView === 'calendar' ? (
          <div style={styles.rightPanel}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 20 }}>
              🎉 UPCOMING FESTIVALS
            </div>
            <div style={{ textAlign: "center", color: "#6b7280", padding: "40px 20px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎪</div>
              <div style={{ fontSize: 14 }}>축제를 클릭하여 상세정보를 확인하세요!</div>
            </div>
          </div>
        ) : (
        <div style={styles.rightPanel}>
          <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 20 }}>
            🎉 UPCOMING FESTIVALS
          </div>

          {!token ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  로그인하면 다가오는 일정이 표시됩니다.
                </p>
              </CardContent>
            </Card>
          ) : loading ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  불러오는 중…
                </p>
              </CardContent>
            </Card>
          ) : upcoming.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  다가오는 일정이 없습니다.
                </p>
              </CardContent>
            </Card>
          ) : (
            upcoming.map((ev, idx) => (
              <Card key={ev.id} className="mb-4">
                <CardHeader className="pb-3">
                  <div 
                    className="w-full h-32 rounded-lg mb-3 flex items-center justify-center text-5xl"
                    style={{
                      background: idx === 0 
                        ? 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)' 
                        : idx === 1 
                        ? 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)' 
                        : 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
                    }}
                  >
                    📌
                  </div>
                  <CardTitle className="text-base">{ev.title}</CardTitle>
                  <CardDescription className="flex flex-col gap-1">
                    <span>📅 {ev.date}</span>
                    {ev.location && <span>📍 {ev.location}</span>}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteEvent(ev.id)}
                    title="삭제"
                  >
                    🗑️
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        )}
      </div>

      {/* ✅ 일정 추가/수정/삭제 모달 */}
      {modalOpen && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}>
          <div style={{
            background: "#fff",
            borderRadius: 16,
            padding: 28,
            maxWidth: 450,
            width: "90%",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
            fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
          }}>
            {/* 헤더 */}
            <div style={{ marginBottom: 28 }}>
              <h2 style={{
                fontSize: 20,
                fontWeight: 700,
                margin: 0,
                color: "#111827",
              }}>
                {modalMode === "add" ? "🎉 새 일정 추가" : "✏️ 일정 수정"}
              </h2>
              <p style={{
                fontSize: 13,
                color: "#9ca3af",
                margin: "4px 0 0 0",
              }}>
                {modalMode === "add" ? "새로운 일정을 추가하세요" : "일정 정보를 수정하세요"}
              </p>
            </div>

            {/* 제목 */}
            <div style={{ marginBottom: 22 }}>
              <label style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 8,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}>
                제목
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="일정 제목을 입력하세요"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  fontSize: 14,
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "all 0.2s",
                  color: "#111827",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#FF5F33";
                  e.target.style.boxShadow = "0 0 0 3px rgba(255,95,51,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* 설명 */}
            <div style={{ marginBottom: 22 }}>
              <label style={{
                display: "block",
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 8,
                color: "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}>
                설명
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="일정에 대한 설명을 추가하세요"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 10,
                  fontSize: 14,
                  boxSizing: "border-box",
                  outline: "none",
                  minHeight: 80,
                  resize: "vertical",
                  fontFamily: "'Plus Jakarta Sans','Segoe UI',sans-serif",
                  transition: "all 0.2s",
                  color: "#111827",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#FF5F33";
                  e.target.style.boxShadow = "0 0 0 3px rgba(255,95,51,0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            {/* 시작/종료 시간 (2열) */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 22 }}>
              {/* 시작 시간 */}
              <div>
                <label style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                  시작
                </label>
                <input
                  type={formData.allDay ? "date" : "datetime-local"}
                  value={
                    formData.allDay
                      ? formData.startDateTime.split("T")[0]
                      : formData.startDateTime.includes("T")
                      ? formData.startDateTime.slice(0, 16)
                      : ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (formData.allDay) {
                      setFormData({ ...formData, startDateTime: val });
                    } else {
                      setFormData({ ...formData, startDateTime: val + ":00" });
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    fontSize: 13,
                    boxSizing: "border-box",
                    outline: "none",
                    transition: "all 0.2s",
                    color: "#111827",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#FF5F33";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255,95,51,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* 종료 시간 */}
              <div>
                <label style={{
                  display: "block",
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 8,
                  color: "#6b7280",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}>
                  종료
                </label>
                <input
                  type={formData.allDay ? "date" : "datetime-local"}
                  value={
                    formData.allDay
                      ? formData.endDateTime.split("T")[0]
                      : formData.endDateTime.includes("T")
                      ? formData.endDateTime.slice(0, 16)
                      : ""
                  }
                  onChange={(e) => {
                    const val = e.target.value;
                    if (formData.allDay) {
                      setFormData({ ...formData, endDateTime: val });
                    } else {
                      setFormData({ ...formData, endDateTime: val + ":00" });
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    fontSize: 13,
                    boxSizing: "border-box",
                    outline: "none",
                    transition: "all 0.2s",
                    color: "#111827",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#FF5F33";
                    e.target.style.boxShadow = "0 0 0 3px rgba(255,95,51,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* 하루종일 토글 */}
            <div style={{
              marginBottom: 28,
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 14px",
              background: "#f9fafb",
              borderRadius: 10,
            }}>
              <input
                type="checkbox"
                id="allDayCheck"
                checked={formData.allDay}
                onChange={(e) => setFormData({ ...formData, allDay: e.target.checked })}
                style={{
                  cursor: "pointer",
                  width: 18,
                  height: 18,
                }}
              />
              <label htmlFor="allDayCheck" style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#374151",
                cursor: "pointer",
              }}>
                하루종일 일정
              </label>
            </div>

            {/* 버튼 영역 */}
            <div style={{
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
            }}>
              {modalMode === "edit" && (
                <button
                  onClick={() => {
                    deleteEvent(formData.id);
                    setModalOpen(false);
                  }}
                  style={{
                    padding: "11px 18px",
                    border: "1px solid #fee2e2",
                    background: "#fff",
                    color: "#dc2626",
                    borderRadius: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#fef2f2";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#fff";
                  }}
                >
                  🗑️ 삭제
                </button>
              )}
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  padding: "11px 20px",
                  border: "1px solid #e5e7eb",
                  background: "#fff",
                  color: "#6b7280",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#fff";
                }}
              >
                취소
              </button>
              <button
                onClick={async () => {
                  if (!formData.title.trim()) {
                    alert("제목을 입력하세요");
                    return;
                  }

                  if (modalMode === "add") {
                    await insertEvent({
                      title: formData.title,
                      description: formData.description,
                      start: formData.startDateTime,
                      end: formData.endDateTime,
                      allDay: formData.allDay,
                    });
                  } else {
                    await updateEvent(formData.id, {
                      title: formData.title,
                      description: formData.description,
                      start: formData.startDateTime,
                      end: formData.endDateTime,
                      allDay: formData.allDay,
                    });
                  }
                  setModalOpen(false);
                }}
                style={{
                  padding: "11px 20px",
                  background: "linear-gradient(90deg, rgb(244,133,37) 0%, rgb(255,153,102) 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 4px 12px rgba(244,133,37,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 16px rgba(244,133,37,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(244,133,37,0.3)";
                }}
              >
                {modalMode === "add" ? "➕ 추가" : "💾 수정"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ 축제 상세정보 모달 */}
      {festivalDetailOpen && selectedFestival && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
        onClick={() => setFestivalDetailOpen(false)}
        >
          <div style={{
            background: "#fff",
            borderRadius: 16,
            padding: 32,
            maxWidth: 600,
            width: "90%",
            maxHeight: "80vh",
            overflow: "auto",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
          onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24 }}>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: "#111" }}>
                {selectedFestival.fstvlNm}
              </h2>
              <button
                onClick={() => setFestivalDetailOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 24,
                  cursor: "pointer",
                  color: "#6b7280",
                  padding: 0,
                  width: 32,
                  height: 32,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
                <strong>📅 기간:</strong> {selectedFestival.ministry_date}
              </div>
              <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
                <strong>📍 위치:</strong> {selectedFestival.ministry_region || "정보 없음"}
              </div>
              {selectedFestival.phoneNumber && (
                <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 8 }}>
                  <strong>📞 연락처:</strong> {selectedFestival.phoneNumber}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "#111" }}>축제 설명</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "#374151", margin: 0 }}>
                {selectedFestival.festival_description || "설명이 없습니다."}
              </p>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => {
                  loadFestivalAndOpen(selectedFestival.pSeq);
                  setFestivalDetailOpen(false);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "linear-gradient(90deg, rgb(244,133,37) 0%, rgb(255,153,102) 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                📅 내 캘린더에 추가
              </button>
              <button
                onClick={() => setFestivalDetailOpen(false)}
                style={{
                  padding: "12px 24px",
                  background: "#f3f4f6",
                  color: "#111",
                  border: "none",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default Calendar;
