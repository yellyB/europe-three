/* =============================================================
   여행 데이터 — 여기만 고치면 사이트 전체가 바뀝니다.
   -------------------------------------------------------------
   여행: 2026-06-12 ~ 06-21 (10일) · 프랑스 · 스위스 2개국 (독일은 출국 경유)
   흐름: 프랑스(파리·노르망디) → 스위스 → 프랑스(알자스) → 독일 프랑크푸르트(경유·출국)

   ── 사진/동영상 넣는 법 (자세한 건 README.md) ───────────────
     · 사진/영상은 그 날 폴더에 넣습니다.  예) images/2일차(6.13)/
     · 묶음(그룹)으로 보여주려면 각 day 의 groups 배열에 파일명을 적습니다.
       { label: "에펠 전망대", media: ["d2-06-1.jpeg", ...] }  ← 식사류는 🍽, 장소는 📍 자동
     · 그냥 순서대로만 보여주려면 groups 대신 count(사진 장수)/vcount(영상 개수)만 바꿔도 됩니다.
     ※ 파일명은 ASCII 권장(한글·공백은 GitHub Pages에서 깨질 수 있음).
       동영상은 mp4(H.264) 권장, 파일당 100MB 제한.
   ============================================================= */

const TRIP = {
  title: "유럽 두 나라 여행",
  subtitle: "프랑스 · 스위스 · 2026.06.12 – 06.21",
  routeColor: "#e85d4e",        // 약도 경로선 색

  // ── 일정 (날짜 순서대로) ─────────────────────────────────
  days: [
    {
      day: 1, date: "06-12", dow: "금", folder: "1일차(6.12)", countryCode: "FR",
      title: "출국 · 파리 도착",
      places: ["인천(ICN) 출발 — 아시아나 OZ501", "파리(CDG) 도착"],
      move: "비행 14시간 15분", hotel: "베스트 웨스턴 플러스 파리 벨리지 4성급 (BEST WESTERN PLUS PARIS VELIZY)",
      note: "설렘 가득한 출발. 14시간을 날아 파리에 닿다.",
      count: 0, ext: "jpg", vcount: 0, vext: "mp4",
      groups: [
        { label: "공항에서 기다리는 중", media: ["d1-01-1.jpeg", "d1-01-2.jpeg"] },
        { label: "비행기 · 기내식", media: ["d1-02-1.jpeg", "d1-02-2.jpeg", "d1-02-3.jpeg", "d1-02-4.jpeg", "d1-02-5.jpeg"] },
        { label: "파리 공항", media: ["d1-03-1.jpeg"] },
        { label: "호텔 한식 도시락", media: ["d1-04-1.jpeg"] },
      ],
    },
    {
      day: 2, date: "06-13", dow: "토", folder: "2일차(6.13)", countryCode: "FR",
      title: "낭만의 도시, 파리",
      places: ["에펠탑", "개선문", "샹젤리제 거리", "콩코르드 광장", "세느강 유람선"],
      move: "파리 시내", hotel: "베스트 웨스턴 플러스 파리 벨리지 4성급 (BEST WESTERN PLUS PARIS VELIZY)",
      note: "에펠탑 전망대와 세느강 유람선까지, 파리를 가득 담은 하루.",
      count: 0, ext: "jpg", vcount: 0, vext: "mp4",
      groups: [
        { label: "버스에서 본 에펠", media: ["d2-05-1.jpeg"] },
        { label: "에펠 전망대", media: ["d2-06-1.jpeg", "d2-06-2.jpeg", "d2-06-3.jpeg"] },
        { label: "콩코드 광장", media: ["d2-07-1.jpeg", "d2-07-2.jpeg", "d2-07-3.jpeg", "d2-07-4.jpeg"] },
        { label: "점심", media: ["d2-08-1.jpeg", "d2-08-2.jpeg"] },
        { label: "개선문", media: ["d2-09-1.jpeg"] },
        { label: "샹젤리제", media: ["d2-10-1.jpeg", "d2-10-2.jpeg"] },
        { label: "유람선", media: ["d2-11-1.mp4", "d2-11-2.mp4"] },
      ],
    },
    {
      day: 3, date: "06-14", dow: "일", folder: "3일차(6.14)", countryCode: "FR",
      title: "베르사유 · 옹플뢰르",
      places: ["베르사유 궁전", "옹플뢰르", "에릭 사티 생가"],
      move: "파리→베르사유→옹플뢰르→푸제르", hotel: "브릿 호텔 피신 & 스파 - 푸제르 (Brit Hotel Piscine & Spa - Fougères)",
      note: "절대왕정의 베르사유에서 인상파의 항구마을 옹플뢰르로.",
      count: 0, ext: "jpg", vcount: 0, vext: "mp4",
      groups: [
        { label: "베르사유 궁전 앞", media: ["d3-01-1.jpeg"] },
        { label: "베르사유 궁전 (점프샷)", anim: true, fps: 8, media: ["d3-02-1.jpeg", "d3-02-2.jpeg", "d3-02-3.jpeg", "d3-02-4.jpeg", "d3-02-5.jpeg", "d3-02-6.jpeg", "d3-02-7.jpeg"] },
        { label: "베르사유 궁전 내부", media: ["d3-03-1.jpeg", "d3-03-2.jpeg", "d3-03-3.jpeg", "d3-03-4.jpeg", "d3-03-5.jpeg", "d3-03-6.jpeg", "d3-03-7.jpeg"] },
        { label: "베르사유 정원", media: ["d3-04-1.jpeg", "d3-04-2.jpeg", "d3-04-3.jpeg", "d3-04-4.jpeg", "d3-04-5.jpeg", "d3-04-6.jpeg"] },
        { label: "점심", media: ["d3-05-1.jpeg", "d3-05-3.jpeg", "d3-05-2.jpeg"] },
        { label: "옹플뢰르 · 에릭 사티 생가", media: ["d3-06-3.jpeg", "d3-06-4.jpeg", "d3-06-5.jpeg", "d3-06-6.jpeg", "d3-06-7.jpeg", "d3-06-2.jpeg", "d3-06-1.jpeg"] },
        { label: "저녁 호텔식", media: ["d3-07-1.jpeg", "d3-07-2.jpeg", "d3-07-3.jpeg"] },
      ],
    },
    {
      day: 4, date: "06-15", dow: "월", folder: "4일차(6.15)", countryCode: "FR",
      title: "몽생미셸",
      places: ["몽생미셸 수도원", "오믈렛 (몽생미셸 명물)"],
      move: "푸제르→몽생미셸→파리", hotel: "코트야드 바이 메리어트 파리 크레테일",
      note: "바다 위 신비의 섬, 몽생미셸 수도원.",
      count: 0, ext: "jpg", vcount: 0, vext: "mp4",
      groups: [
        { label: "멀리서 본 몽생미셸", media: ["d4-01-1.jpeg", "d4-01-2.jpeg"] },
        { label: "몽생미셸 앞 기념사진", media: ["d4-02-1.jpeg", "d4-02-2.jpeg", "d4-02-3.jpeg", "d4-02-4.jpeg"] },
        { label: "몽생미셸 내부", media: ["d4-03-1.jpeg", "d4-03-2.jpeg", "d4-03-3.jpeg", "d4-03-4.jpeg", "d4-03-5.jpeg", "d4-03-6.jpeg", "d4-03-7.jpeg", "d4-03-8.jpeg", "d4-03-9.jpeg"] },
        { label: "점심", media: ["d4-04-1.jpeg", "d4-04-2.jpeg", "d4-04-3.jpeg", "d4-04-4.jpeg"] },
        { label: "저녁", media: ["d4-05-1.jpeg", "d4-05-2.jpeg"] },
        { label: "호텔 창문 풍경", media: ["d4-06-1.jpeg"] },
      ],
    },
    {
      day: 5, date: "06-16", dow: "화", folder: "5일차(6.16)", countryCode: "CH",
      title: "TGV로 스위스 — 제네바 · 몽트뢰 · 로이커바트",
      places: ["TGV 리리아 (파리→제네바)", "제네바", "몽트뢰 · 시용성", "로이커바트 온천"],
      move: "파리→제네바→몽트뢰→로이커바트", hotel: "LE BRISTOL",
      note: "TGV로 국경을 넘어 레만 호수와 알프스 온천마을로.",
      count: 0, ext: "jpg", vcount: 0, vext: "mp4",
      groups: [
        { label: "TGV 기차 안", media: ["d5-01-1.jpeg", "d5-01-2.mp4", "d5-01-3.jpeg", "d5-01-4.jpeg", "d5-01-5.jpeg", "d5-01-6.jpeg"] },
        { label: "레만 호수 가는 길", media: ["d5-02-1.jpeg"] },
        { label: "레만 호수", media: ["d5-03-1.jpeg", "d5-03-2.jpeg", "d5-03-3.jpeg", "d5-03-4.jpeg", "d5-03-5.jpeg", "d5-03-6.jpeg"] },
        { label: "몽트뢰 · 시옹성", media: ["d5-04-2.jpeg", "d5-04-6.jpeg", "d5-04-7.jpeg"] },
        { label: "점심 (Molino 자유식)", media: ["d5-04-3.jpeg", "d5-04-4.jpeg", "d5-04-1.jpeg", "d5-04-5.jpeg"] },
        { label: "로이커바트 가는 길", media: ["d5-05-1.jpeg", "d5-05-2.jpeg"] },
        { label: "저녁 (중식 코스)", media: ["d5-06-1.jpeg", "d5-06-2.jpeg"] },
        { label: "저녁 후 산책", media: ["d5-07-1.jpeg", "d5-07-2.jpeg", "d5-07-3.jpeg", "d5-07-4.jpeg", "d5-07-5.jpeg", "d5-07-6.jpeg"] },
        { label: "호텔 밖 풍경", media: ["d5-09-1.jpeg"] },
      ],
    },
    {
      day: 6, date: "06-17", dow: "수", folder: "6일차(6.17)", countryCode: "CH",
      title: "그뤼에르 · 베른 · 인터라켄",
      places: ["그뤼에르 치즈마을", "그뤼에르 성", "베른 구시가지 · 장미공원", "인터라켄"],
      move: "로이커바트→그뤼에르→베른→인터라켄", hotel: "더 헤이 호텔 (The Hey Hotel)",
      note: "치즈마을과 중세 수도 베른, 그리고 융프라우의 관문 인터라켄.",
      count: 0, ext: "jpg", vcount: 0, vext: "mp4",
      groups: [
        { label: "로이커바트 떠나는 풍경", media: ["d6-01-1.jpeg"] },
        { label: "치즈공장 견학", media: ["d6-02-1.jpeg", "d6-02-2.jpeg"] },
        { label: "점심", media: ["d6-03-3.jpeg", "d6-03-4.jpeg", "d6-03-5.jpeg", "d6-03-2.jpeg", "d6-03-1.jpeg"] },
        { label: "그뤼에르 마을", media: ["d6-04-1.jpeg", "d6-04-2.jpeg", "d6-04-3.jpeg", "d6-04-4.jpeg", "d6-04-5.jpeg", "d6-04-6.jpeg", "d6-04-7.jpeg", "d6-04-8.jpeg"] },
        { label: "베른", media: ["d6-05-1.jpeg", "d6-05-2.jpeg", "d6-05-3.mp4", "d6-05-4.jpeg", "d6-05-5.jpeg", "d6-05-6.jpeg"] },
        { label: "납작복숭아 인증샷", media: ["d6-06-1.jpeg", "d6-06-2.jpeg"] },
        { label: "인터라켄", media: ["d6-07-1.jpeg", "d6-07-2.jpeg", "d6-07-3.jpeg", "d6-07-4.jpeg"] },
      ],
    },
    {
      day: 7, date: "06-18", dow: "목", folder: "7일차(6.18)", countryCode: "CH",
      title: "융프라우 · 루체른",
      places: ["융프라우요흐 (유럽의 지붕)", "아이거 익스프레스", "스핑크스 전망대", "루체른 카펠교", "빈사의 사자상"],
      move: "인터라켄→융프라우→루체른", hotel: "테일러메이드 호텔 Sihlpark Schindellegi (Tailormade Hotel SIHLPARK Schindellegi)",
      note: "유럽의 지붕 융프라우요흐, 그리고 호수도시 루체른.",
      count: 0, ext: "jpg", vcount: 0, vext: "mp4",
      groups: [
        { label: "호텔 조식", media: ["d7-01-1.mp4", "d7-01-2.jpeg"] },
        { label: "융프라우 기차", media: ["d7-02-1.jpeg", "d7-02-2.jpeg", "d7-02-3.jpeg", "d7-02-4.jpeg", "d7-02-5.jpeg", "d7-02-6.jpeg", "d7-02-7.jpeg"] },
        { label: "융프라우 얼음궁전", media: ["d7-03-1.mp4", "d7-03-2.jpeg", "d7-03-3.jpeg", "d7-03-4.jpeg"] },
        { label: "융프라우요흐 정상", media: ["d7-04-1.jpeg", "d7-04-2.jpeg", "d7-04-3.jpeg"] },
        { label: "융프라우 컵라면", media: ["d7-05-1.jpeg", "d7-05-2.jpeg"] },
        { label: "내려오는 케이블카", media: ["d7-06-1.mp4", "d7-06-2.jpeg"] },
        { label: "점심 (치즈 퐁듀)", media: ["d7-07-1.jpeg", "d7-07-2.mp4", "d7-07-3.jpeg"] },
        { label: "루체른", media: ["d7-08-1.jpeg", "d7-08-2.jpeg", "d7-08-3.jpeg"] },
        { label: "빈사의 사자상", media: ["d7-09-1.jpeg"] },
        { label: "저녁", media: ["d7-10-1.jpeg", "d7-10-2.jpeg"] },
      ],
    },
    {
      day: 8, date: "06-19", dow: "금", folder: "8일차(6.19)", countryCode: "FR",
      title: "알자스 — 콜마르 · 스트라스부르",
      places: ["콜마르 쁘띠 베니스", "스트라스부르 노트르담 대성당", "쁘띠 프랑스"],
      move: "루체른→콜마르→스트라스부르", hotel: "노보텔 스트라스부르 상트르 알르 4성급 (Novotel Strasbourg Centre Halles)",
      note: "동화 같은 알자스, 콜마르의 운하와 스트라스부르 쁘띠 프랑스.",
      count: 0, ext: "jpg", vcount: 0, vext: "mp4",
      groups: [
        { label: "콜마르", media: ["d8-01-1.jpeg", "d8-01-2.jpeg", "d8-01-3.jpeg", "d8-01-4.jpeg", "d8-01-5.jpeg"] },
        { label: "점심", media: ["d8-02-1.jpeg", "d8-02-2.jpeg", "d8-02-3.jpeg"] },
        { label: "스트라스부르 (노트르담 대성당)", media: ["d8-03-1.jpeg", "d8-03-2.jpeg", "d8-03-3.jpeg"] },
        { label: "자유식 저녁 (밀맥주)", media: ["d8-04-1.jpeg", "d8-04-2.jpeg", "d8-04-3.jpeg", "d8-04-4.jpeg", "d8-04-5.jpeg"] },
        { label: "호텔 돌아오는 길", media: ["d8-05-1.jpeg"] },
        { label: "호텔 밖 풍경", media: ["d8-06-1.jpeg"] },
      ],
    },
    {
      day: 9, date: "06-20", dow: "토", folder: "9일차(6.20)", countryCode: "DE",
      title: "프랑크푸르트 · 출국",
      places: ["프랑크푸르트 뢰머 광장 · 시청사", "프랑크푸르트(FRA) 출발 — 아시아나 OZ542"],
      move: "스트라스부르→프랑크푸르트", hotel: "기내",
      note: "출국 전 잠깐 들른 독일 프랑크푸르트. 뢰머 광장을 끝으로 귀국길에.",
      count: 0, ext: "jpg", vcount: 0, vext: "mp4",
      groups: [
        { label: "조식", media: ["d9-01-1.jpeg"] },
        { label: "프랑크푸르트 가는 길", media: ["d9-going-1.jpeg"] },
        { label: "뢰머 광장", media: ["d9-02-1.jpeg", "d9-02-2.jpeg", "d9-02-3.jpeg"] },
        { label: "마지막 점심", media: ["d9-03-1.jpeg", "d9-03-2.jpeg"] },
        { label: "프랑크푸르트 공항", media: ["d9-04-1.jpeg", "d9-04-2.jpeg"] },
        { label: "악몽", media: ["d9-05-1.jpeg", "d9-05-2.jpeg"] },
      ],
    },
    {
      day: 10, date: "06-21", dow: "일", folder: "10일차(6.21)", countryCode: "KR",
      title: "인천 도착",
      places: ["서울(ICN) 도착"],
      move: "비행 11시간 55분", hotel: "—",
      note: "10일간의 유럽, 무사히 집으로.",
      count: 0, ext: "jpg", vcount: 0, vext: "mp4",
      groups: [
        { label: "기내식", media: ["d10-01-1.jpeg", "d10-01-2.jpeg"] },
        { label: "수고하셨습니다", media: ["d10-02-1.jpeg"] },
      ],
    },
  ],
};

// 나라코드 → 표시 정보
const COUNTRIES = {
  FR: { name: "프랑스", flag: "🇫🇷", color: "#3a6ea5" },
  CH: { name: "스위스", flag: "🇨🇭", color: "#e2474a" },
  DE: { name: "독일", flag: "🇩🇪", color: "#e0a92e" },
  KR: { name: "한국",   flag: "🇰🇷", color: "#777777" },
};

/* ── 약도용 경로 (방문 순서대로) ─────────────────────────────
   pin: 지도에 점으로 찍을 도시. day: 클릭 시 이동할 일차.
   lat/lon 으로 자동 배치되고 순서대로 경로선이 이어집니다.    */
const ROUTE = [
  { name: "파리",        lat: 48.8566, lon: 2.3522,  day: 2, cc: "FR", label: true },
  { name: "옹플뢰르",     lat: 49.4194, lon: 0.2330,  day: 3, cc: "FR", label: true },
  { name: "몽생미셸",     lat: 48.6361, lon: -1.5115, day: 4, cc: "FR", label: true },
  { name: "제네바",       lat: 46.2044, lon: 6.1432,  day: 5, cc: "CH", label: true },
  { name: "몽트뢰",       lat: 46.4312, lon: 6.9106,  day: 5, cc: "CH", label: true },
  { name: "로이커바트",   lat: 46.3792, lon: 7.6280,  day: 5, cc: "CH", label: true },
  { name: "그뤼에르",     lat: 46.5836, lon: 7.0825,  day: 6, cc: "CH", label: true },
  { name: "베른",        lat: 46.9480, lon: 7.4474,  day: 6, cc: "CH", label: true },
  { name: "인터라켄",     lat: 46.6863, lon: 7.8632,  day: 6, cc: "CH", label: true },
  { name: "융프라우요흐", lat: 46.5474, lon: 7.9856,  day: 7, cc: "CH", label: true },
  { name: "루체른",       lat: 47.0502, lon: 8.3093,  day: 7, cc: "CH", label: true },
  { name: "콜마르",       lat: 48.0794, lon: 7.3585,  day: 8, cc: "FR", label: true },
  { name: "스트라스부르", lat: 48.5734, lon: 7.7521,  day: 8, cc: "FR", label: true },
  { name: "프랑크푸르트", lat: 50.1109, lon: 8.6821,  day: 9, cc: "DE", label: true },
];

/* ── 약도용 국가 영역 (대략적인 약도 모양, lon/lat 다각형) ──── */
const REGIONS = {
  FR: [
    [-2.5, 48.5], [-2.5, 49.7], [0.2, 49.9], [1.6, 51.0], [4.2, 49.5],
    [7.6, 49.0], [7.6, 47.5], [6.1, 46.2], [5.5, 45.5], [-2.5, 45.5],
  ],
  CH: [
    [6.0, 46.2], [6.9, 47.4], [8.6, 47.8], [9.5, 47.6], [9.5, 45.9], [7.0, 45.9],
  ],
  DE: [
    [7.6, 47.6], [7.6, 49.0], [8.2, 50.0], [9.5, 51.0], [9.5, 47.6],
  ],
};

// 지도 투영 범위 (이 여행 권역)
const MAP_BOUNDS = { lonMin: -2.5, lonMax: 9.5, latMin: 45.5, latMax: 51 };
