import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Header from "../components/Header";
import useStore from "../store/useStore";

// ✅ 캘린더 스타일
const calendarStyles = `
  .custom-calendar .fc {
    font-family: 'Plus Jakarta Sans','Segoe UI',sans-serif;
    border: none;
  }
  
  .custom-calendar .fc-theme-standard td {
    border: 1px solid #e5e7eb !important;
  }
  
  .custom-calendar .fc-theme-standard th {
    border: 1px solid #e5e7eb !important;
  }
  
  .custom-calendar .fc-col-header-cell {
    background: transparent !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    font-size: 0.875rem !important;
    letter-spacing: 0.2em !important;
    color: #9ca3af !important;
    padding: 1rem 0 !important;
    border-bottom: none !important;
  }
  
  .custom-calendar .fc-daygrid-day-number {
    font-weight: 500 !important;
    font-size: 2rem !important;
    color: #111827 !important;
    padding: 0 !important;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  .custom-calendar .fc-daygrid-day-frame {
    min-height: 100px !important;
    aspect-ratio: 1 / 1;
  }
  
  .custom-calendar .fc-day-today {
    background: transparent !important;
  }
  
  .custom-calendar .fc-day-today .fc-daygrid-day-number {
    background: transparent !important;
  }
  
  .custom-calendar .fc-daygrid-day-top {
    width: 100%;
    height: 100%;
    justify-content: center;
  }
  
  .custom-calendar .fc-scrollgrid {
    border: none !important;
  }
  
  .custom-calendar .fc-daygrid-body {
    border-top: 1px solid #e5e7eb !important;
  }
  
  .custom-calendar .fc-toolbar {
    display: none !important;
  }
  
  .custom-calendar .fc-view-harness {
    background: white;
  }

  .custom-calendar .fc-daygrid-day.selected-range {
    background: transparent !important;
  }

  .custom-calendar .fc-daygrid-day.selected-range .fc-daygrid-day-number {
    position: relative;
    font-weight: 700 !important;
    color: #F97316 !important;
  }

  .custom-calendar .fc-daygrid-day.selected-range .fc-daygrid-day-number::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30%;
    height: 40%;
    background: rgba(249, 115, 22, 0.15);
    z-index: -1;
  }

  .custom-calendar .fc-daygrid-day.selected-start .fc-daygrid-day-number::before {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .custom-calendar .fc-daygrid-day.selected-end .fc-daygrid-day-number::before {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }

  .custom-calendar .fc-highlight {
    background: rgba(249, 115, 22, 0.15) !important;
  }

  .custom-calendar .festival-label {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 0.75rem;
    font-weight: 700;
    color: #F97316;
    background: white;
    padding: 2px 8px;
    border-radius: 99px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    z-index: 2;
  }
`;

function Dateregistration() {
  const navigate = useNavigate();
  const calendarRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState(null);
  const setSelectedTravelDates = useStore((state) => state.setSelectedTravelDates);

  // 날짜 선택 핸들러
  const handleDateSelect = (selectInfo) => {
    // 이전 FullCalendar 선택 해제
    selectInfo.view.calendar.unselect();
    
    // FullCalendar의 날짜 문자열 직접 사용 (타임존 이슈 방지)
    const startStr = selectInfo.startStr; // YYYY-MM-DD
    const endStr = selectInfo.endStr;     // YYYY-MM-DD (exclusive, 다음날)
    
    // end는 exclusive이므로 -1일 계산
    const [year, month, day] = endStr.split('-').map(Number);
    const endDate = new Date(year, month - 1, day);
    endDate.setDate(endDate.getDate() - 1);
    
    const actualEndStr = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;
    
    // 표시용 포맷 (YYYY.MM.DD)
    const displayStart = startStr.replace(/-/g, '.');
    const displayEnd = actualEndStr.replace(/-/g, '.');

    const dateData = {
      start: startStr,
      end: actualEndStr,
      display: `${displayStart} ~ ${displayEnd}`
    };
    
    setSelectedDates(dateData);
    setSelectedTravelDates(dateData); // Zustand store에 저장

    // 선택 영역 스타일 적용
    applySelectionStyles(startStr, actualEndStr);
  };

  // 선택된 날짜 범위에 스타일 적용
  const applySelectionStyles = (startStr, endStr) => {
    // 기존 스타일 제거
    document.querySelectorAll('.fc-daygrid-day').forEach(cell => {
      cell.classList.remove('selected-range', 'selected-start', 'selected-end');
    });

    // 새로운 스타일 적용 (날짜 문자열 기반)
    const [startYear, startMonth, startDay] = startStr.split('-').map(Number);
    const [endYear, endMonth, endDay] = endStr.split('-').map(Number);
    
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      const cell = document.querySelector(`[data-date="${dateStr}"]`);
      
      if (cell) {
        cell.classList.add('selected-range');
        
        if (currentDate.getTime() === startDate.getTime()) {
          cell.classList.add('selected-start');
        }
        if (currentDate.getTime() === endDate.getTime()) {
          cell.classList.add('selected-end');
        }
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
  };

  // 캘린더 렌더링 후 스타일 재적용
  useEffect(() => {
    if (selectedDates) {
      applySelectionStyles(selectedDates.start, selectedDates.end);
    }
  }, [selectedDates]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <style>{calendarStyles}</style>
      
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white dark:bg-gray-900 flex flex-col min-h-0">
        <div className="max-w-[1440px] mx-auto w-full flex-1 flex flex-col min-h-0">
          {/* Header Section */}
          <section className="flex items-center justify-between mb-8 shrink-0">
            <div>
              <h2 className="text-gray-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">
                여행일정 등록
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal mt-1">
                일정에 따른 날씨예보, 여행 정보를 알려드립니다.
              </p>
            </div>
            {selectedDates && (
              <button 
                onClick={() => navigate('/plancuration')}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-orange-200/50 transition-all flex items-center gap-2"
              >
                <span>{selectedDates.display} / 등록완료</span>
                <span className="material-symbols-outlined text-lg">check_circle</span>
              </button>
            )}
          </section>

          {/* Calendar Scroll Container */}
          <div className="overflow-y-auto pr-4 flex-1 space-y-12">
            {/* 2026년 3월 */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-primary dark:text-primary">2026년 3월</h3>
              </div>
              <div className="custom-calendar">
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  initialDate="2026-03-01"
                  headerToolbar={false}
                  height="auto"
                  dayMaxEvents={false}
                  fixedWeekCount={false}
                  showNonCurrentDates={false}
                  selectable={true}
                  selectMirror={true}
                  select={handleDateSelect}
                  unselectAuto={false}
                  dayCellClassNames="cursor-pointer"
                  locale="ko"
                  dayHeaderFormat={{ weekday: 'short' }}
                />
              </div>
            </section>

            {/* 2026년 4월 */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-primary dark:text-primary">2026년 4월</h3>
              </div>
              <div className="custom-calendar opacity-60">
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  initialDate="2026-04-01"
                  headerToolbar={false}
                  height="auto"
                  dayMaxEvents={false}
                  fixedWeekCount={false}
                  showNonCurrentDates={false}
                  selectable={true}
                  selectMirror={true}
                  select={handleDateSelect}
                  unselectAuto={false}
                  locale="ko"
                  dayHeaderFormat={{ weekday: 'short' }}
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Floating Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button className="w-20 h-20 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 shadow-2xl flex items-center justify-center text-white border-4 border-white dark:border-gray-800 hover:scale-105 transition-transform">
          <span className="material-symbols-outlined text-5xl">face_6</span>
        </button>
      </div>
    </div>
  );
}

export default Dateregistration;
