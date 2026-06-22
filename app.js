/* =============================================================
   화면 렌더링 — data.js 의 내용을 읽어 약도/타임라인/갤러리를 그림.
   내용은 data.js 에서만 고치면 됩니다.
   ============================================================= */

// ── 한 날(day)의 미디어(사진+동영상) 경로 목록 ──────────────
//   ① day.groups 가 있으면 묶음별 미디어를 순서대로 (소제목 묶음 표시)
//   ② day.media 배열이 있으면 그 순서 그대로 (파일명 직접 지정)
//   ③ 없으면 번호 규칙: 사진 01.jpg…(count) + 동영상 v01.mp4…(vcount)
const isVideoFile = (f) => /\.(mp4|mov|webm|m4v)$/i.test(f);
function mediaItem(folder, name) {
  // 폴더명(한글 가능)·파일명을 함께 URL 인코딩 (GitHub Pages에서도 안전)
  return { type: isVideoFile(name) ? "video" : "photo", src: encodeURI(`images/${folder}/${name}`) };
}
// 묶음 소제목 앞 아이콘: 식사류는 🍽, 그 외는 📍
function groupIcon(label) {
  return /기내식|도시락|점심|저녁|아침|조식|중식|석식|간식|식사|먹|맛집|디저트|마카롱|라면|퐁듀|와인|커피|브런치|치즈공장/.test(label) ? "🍽" : "📍";
}

// 사진 묶음을 GIF처럼 연속 재생하는 타일 (탭하면 멈춤/재생)
function animTile(folder, names, fps) {
  const wrap = document.createElement("div");
  wrap.className = "photo anim";
  const srcs = names.map((n) => encodeURI(`images/${folder}/${n}`));
  srcs.forEach((s) => { const p = new Image(); p.src = s; });   // 미리 로딩
  const img = document.createElement("img");
  img.alt = "연속 사진 (GIF처럼 재생)";
  img.src = srcs[0];
  let i = 0, timer = null;
  const delay = Math.round(1000 / (fps || 6));
  const play = () => { timer = setInterval(() => { i = (i + 1) % srcs.length; img.src = srcs[i]; }, delay); };
  const stop = () => { clearInterval(timer); timer = null; };
  play();
  const badge = document.createElement("span");
  badge.className = "anim-badge";
  badge.textContent = "GIF";
  wrap.addEventListener("click", () => { timer ? stop() : play(); });
  wrap.append(img, badge);
  return wrap;
}
function mediaOf(day) {
  if (Array.isArray(day.groups) && day.groups.length) {
    return day.groups.flatMap((g) => g.media.map((n) => mediaItem(day.folder, n)));
  }
  if (Array.isArray(day.media) && day.media.length) {
    return day.media.map((name) => mediaItem(day.folder, name));
  }
  const list = [];
  const ext = day.ext || "jpg";
  for (let i = 1; i <= (day.count || 0); i++) {
    const nn = String(i).padStart(2, "0");
    list.push({ type: "photo", src: `images/${day.folder}/${nn}.${ext}` });
  }
  const vext = day.vext || "mp4";
  for (let i = 1; i <= (day.vcount || 0); i++) {
    const nn = String(i).padStart(2, "0");
    list.push({ type: "video", src: `images/${day.folder}/v${nn}.${vext}` });
  }
  return list;
}

// 전체 미디어 / 라이트박스용 사진 인덱스
let ALL_MEDIA = [];   // 사진+동영상 (갤러리 표시용)
let ALL_IMAGES = [];  // 사진만 (라이트박스 좌우 탐색용)
function buildAllMedia() {
  ALL_MEDIA = [];
  TRIP.days.forEach((d) => {
    mediaOf(d).forEach((m) => {
      ALL_MEDIA.push({ ...m, cc: d.countryCode, day: d.day, caption: `Day ${d.day} · ${d.title}` });
    });
  });
  ALL_IMAGES = ALL_MEDIA.filter((m) => m.type === "photo");
}

// 미디어 한 칸 DOM 만들기 (사진=클릭 시 라이트박스 / 동영상=인라인 재생)
function mediaTile(m, altText) {
  if (m.type === "video") {
    const wrap = document.createElement("div");
    wrap.className = "photo video";
    const v = document.createElement("video");
    v.controls = true;
    v.playsInline = true;
    v.preload = "metadata";
    v.src = m.src;
    wrap.appendChild(v);
    const badge = document.createElement("span");
    badge.className = "video-badge";
    badge.textContent = "▶";
    wrap.appendChild(badge);
    return wrap;
  }
  const fig = document.createElement("div");
  fig.className = "photo";
  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = m.src;
  img.alt = altText || "사진";
  img.addEventListener("click", () => openLightbox(m.src));
  fig.appendChild(img);
  return fig;
}

/* ============ 히어로 ============ */
function renderHero() {
  document.getElementById("hero-eyebrow").textContent = "FRANCE · SWITZERLAND";
  document.getElementById("hero-title").textContent = TRIP.title;
  document.getElementById("hero-sub").textContent = TRIP.subtitle;
  document.title = `${TRIP.title} · 프랑스 · 스위스`;
}

/* ============ 약도 ============ */
function project(lon, lat) {
  const b = MAP_BOUNDS, W = 900, H = 620;
  const x = ((lon - b.lonMin) / (b.lonMax - b.lonMin)) * W;
  const y = ((b.latMax - lat) / (b.latMax - b.latMin)) * H;
  return { x, y };
}

function renderMap() {
  const svg = document.getElementById("map-svg");
  const NS = "http://www.w3.org/2000/svg";
  const el = (tag, attrs, parent) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  };

  // 1) 국가 영역
  for (const cc in REGIONS) {
    const pts = REGIONS[cc].map(([lon, lat]) => {
      const p = project(lon, lat); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    }).join(" ");
    el("polygon", { points: pts, class: "region", fill: COUNTRIES[cc].color }, svg);
    const c = REGIONS[cc].reduce((a, [lon, lat]) => ({ lon: a.lon + lon, lat: a.lat + lat }), { lon: 0, lat: 0 });
    const cp = project(c.lon / REGIONS[cc].length, c.lat / REGIONS[cc].length);
    const t = el("text", { x: cp.x, y: cp.y, class: "region-label", "text-anchor": "middle" }, svg);
    t.textContent = COUNTRIES[cc].flag + " " + COUNTRIES[cc].name;
  }

  // 2) 경로선
  const linePts = ROUTE.map((r) => { const p = project(r.lon, r.lat); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" ");
  el("polyline", { points: linePts, class: "route-line" }, svg);

  // 3) 핀
  ROUTE.forEach((r, i) => {
    const p = project(r.lon, r.lat);
    const g = el("g", { class: "pin" }, svg);
    g.addEventListener("click", () => {
      const target = document.getElementById(`day-${r.day}`);
      if (target) {
        target.querySelector(".day-card")?.classList.add("open");  // 펼치고 이동
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    el("circle", { cx: p.x, cy: p.y, r: 6.5, class: "pin-dot" }, g);
    const num = el("text", { x: p.x, y: p.y + 2.8, class: "pin-num" }, g);
    num.textContent = i + 1;
    if (r.label) {
      const label = el("text", { x: p.x + 11, y: p.y + 4, class: "pin-label" }, g);
      label.textContent = r.name;
      label.setAttribute("stroke", "#fff");
      label.setAttribute("stroke-width", "3");
      label.setAttribute("paint-order", "stroke");
    }
  });
}

/* ============ 타임라인 ============ */
function renderTimeline() {
  const wrap = document.getElementById("timeline-list");
  TRIP.days.forEach((d) => {
    const country = COUNTRIES[d.countryCode] || COUNTRIES.KR;
    const media = mediaOf(d);

    const day = document.createElement("article");
    day.className = "day";
    day.id = `day-${d.day}`;

    const card = document.createElement("div");
    card.className = "day-card";

    const head = document.createElement("div");
    head.className = "day-head clickable";
    head.innerHTML = `
      <div class="day-meta">
        <span class="day-country"><span class="day-flag">${country.flag}</span> ${country.name}</span>
        <span class="day-when">${d.day}일 · 6/${d.date.split("-")[1]} (${d.dow})</span>
      </div>
      <h3 class="day-title">${d.title}</h3>
      ${d.note ? `<p class="day-note">${d.note}</p>` : ""}
      <div class="day-places">${d.places.map((p) => `<span class="place-chip">${p}</span>`).join("")}</div>
      ${media.length
        ? `<div class="day-expand"><span class="day-expand-label">📷 사진 ${media.length}장</span><span class="day-expand-sep">·</span><span class="ea-open">눌러서 펼쳐보기 ▾</span><span class="ea-close">접기 ▴</span></div>`
        : `<div class="day-expand muted">사진 준비 중</div>`}`;
    card.appendChild(head);

    // 접히는 영역 (헤더 클릭 시 펼침)
    const collapse = document.createElement("div");
    collapse.className = "day-collapse";

    if (Array.isArray(d.groups) && d.groups.length) {
      // 묶음별 소제목 + 사진묶음
      const groupsWrap = document.createElement("div");
      groupsWrap.className = "day-groups";
      d.groups.forEach((g) => {
        const sec = document.createElement("div");
        sec.className = "media-group";
        const h = document.createElement("p");
        h.className = "group-label";
        h.textContent = `${groupIcon(g.label)} ${g.label}`;
        sec.appendChild(h);
        if (g.anim) {
          sec.appendChild(animTile(d.folder, g.media, g.fps));
        } else {
          const grid = document.createElement("div");
          grid.className = "day-photos";
          g.media.forEach((n) => grid.appendChild(mediaTile(mediaItem(d.folder, n), g.label)));
          sec.appendChild(grid);
        }
        groupsWrap.appendChild(sec);
      });
      collapse.appendChild(groupsWrap);
    } else {
      const photoWrap = document.createElement("div");
      if (media.length) {
        photoWrap.className = "day-photos";
        media.forEach((m) => photoWrap.appendChild(mediaTile(m, d.title + " 사진")));
      } else {
        photoWrap.className = "day-photos empty";
        photoWrap.innerHTML = `<div class="photo-empty">
          📷 <code>images/${d.folder}/</code> 에 사진(01.${d.ext}…)이나 동영상(v01.mp4…)을 넣고
          <code>data.js</code> 의 <b>count</b>(사진)·<b>vcount</b>(동영상)를 바꾸면 여기에 나타나요.
        </div>`;
      }
      collapse.appendChild(photoWrap);
    }
    // 펼친 영역 맨 아래 접기 버튼
    if (media.length) {
      const cb = document.createElement("button");
      cb.className = "collapse-btn";
      cb.textContent = "접기 ▴";
      cb.addEventListener("click", (e) => {
        e.stopPropagation();
        card.classList.remove("open");
        card.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      collapse.appendChild(cb);
    }
    card.appendChild(collapse);

    // 헤더(날짜) 클릭 → 펼침/접힘
    head.addEventListener("click", () => card.classList.toggle("open"));

    day.appendChild(card);
    wrap.appendChild(day);
  });
}

/* ============ 오른쪽 숫자 바로가기 (스티키) ============ */
// 배경색 밝기에 따라 글자색(검/흰) 선택
function textOn(hex) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) > 150 ? "#2c2a27" : "#fff";
}
function renderDayNav() {
  const rail = document.createElement("nav");
  rail.className = "day-rail";
  rail.setAttribute("aria-label", "일자 바로가기");
  TRIP.days.forEach((d) => {
    const country = COUNTRIES[d.countryCode] || COUNTRIES.KR;
    const b = document.createElement("button");
    b.textContent = d.day;
    b.dataset.day = d.day;
    b.title = `Day ${d.day} · ${d.title}`;
    b.style.setProperty("--c", country.color);
    b.style.setProperty("--t", textOn(country.color));
    b.addEventListener("click", () => {
      const t = document.getElementById(`day-${d.day}`);
      if (t) {
        t.querySelector(".day-card")?.classList.add("open");
        t.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    rail.appendChild(b);
  });
  document.body.appendChild(rail);

  // 화면에 보이는 일자 강조
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const n = e.target.id.replace("day-", "");
      rail.querySelectorAll("button").forEach((b) => b.classList.toggle("active", b.dataset.day === n));
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  TRIP.days.forEach((d) => {
    const el = document.getElementById(`day-${d.day}`);
    if (el) obs.observe(el);
  });
}

/* ============ 갤러리 ============ */
function renderGallery() {
  const grid = document.getElementById("gallery-grid");
  grid.innerHTML = "";
  if (!ALL_MEDIA.length) {
    grid.innerHTML = `<p class="gallery-empty">아직 사진/동영상이 없어요.</p>`;
    return;
  }
  ALL_MEDIA.forEach((m) => grid.appendChild(mediaTile(m, m.caption)));
}

/* ============ 라이트박스 (사진 전용) ============ */
let lbIndex = 0;
function openLightbox(src) {
  const idx = ALL_IMAGES.findIndex((p) => p.src === src);
  lbIndex = idx >= 0 ? idx : 0;
  showLightbox();
  document.getElementById("lightbox").hidden = false;
}
function showLightbox() {
  const p = ALL_IMAGES[lbIndex];
  if (!p) return;
  document.querySelector(".lb-img").src = p.src;
  document.querySelector(".lb-caption").textContent = p.caption;
}
function moveLightbox(step) {
  if (!ALL_IMAGES.length) return;
  lbIndex = (lbIndex + step + ALL_IMAGES.length) % ALL_IMAGES.length;
  showLightbox();
}
function setupLightbox() {
  const lb = document.getElementById("lightbox");
  lb.querySelector(".lb-close").addEventListener("click", () => (lb.hidden = true));
  lb.querySelector(".lb-prev").addEventListener("click", () => moveLightbox(-1));
  lb.querySelector(".lb-next").addEventListener("click", () => moveLightbox(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.hidden = true; });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") lb.hidden = true;
    if (e.key === "ArrowLeft") moveLightbox(-1);
    if (e.key === "ArrowRight") moveLightbox(1);
  });
}

/* ============ 시작 ============ */
document.addEventListener("DOMContentLoaded", () => {
  buildAllMedia();
  renderHero();
  renderMap();
  renderTimeline();
  renderDayNav();
  renderGallery();
  setupLightbox();
});
