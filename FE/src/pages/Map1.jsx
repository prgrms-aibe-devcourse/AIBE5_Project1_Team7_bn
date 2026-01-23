import { useEffect, useRef } from "react";

const KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY;

function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    // 이미 로드됐으면 바로 끝
    if (window.google?.maps) return resolve();

    // 중복 삽입 방지
    const existing = document.getElementById("google-maps-script");
    if (existing) {
      existing.addEventListener("load", resolve);
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.async = true;
    script.defer = true;

    // ✅ 표준 파라미터는 key=
    script.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&v=weekly`;
    script.onload = resolve;
    script.onerror = reject;

    document.head.appendChild(script);
  });
}

export default function Map1() {
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!KEY) {
        console.error("VITE_GOOGLE_MAPS_KEY가 없습니다.");
        return;
      }

      await loadGoogleMapsScript();
      if (cancelled) return;

      const cityHall = { lat: 37.5665, lng: 126.978 };

      const map = new window.google.maps.Map(mapRef.current, {
        center: cityHall,
        zoom: 15,
      });

      new window.google.maps.Marker({
        position: cityHall,
        map,
        title: "서울시청",
      });
    }

    init().catch((e) => console.error("Map1 init error:", e));

    return () => {
      cancelled = true;
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
}
