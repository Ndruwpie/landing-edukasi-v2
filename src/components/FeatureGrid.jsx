import { useEffect, useRef, useState } from "react";

// Pastikan ini sudah kamu import sekali di app (main.jsx / index.css):
// import "bootstrap-icons/font/bootstrap-icons.css";

const clamp01 = (v) => Math.max(0, Math.min(1, v));

/** Bootstrap Icons + wrapper fancy */
function BsFancyIcon({ icon = "bi-display", tone = "sky" }) {
    const toneMap = {
        sky: { bg: "from-sky-100 to-indigo-100", fg: "from-sky-500 to-blue-700" },
        mint: { bg: "from-cyan-100 to-sky-100", fg: "from-emerald-400 to-cyan-600" },
        pink: { bg: "from-fuchsia-100 to-indigo-100", fg: "from-pink-500 to-violet-600" },
        warm: { bg: "from-rose-100 to-orange-100", fg: "from-rose-500 to-amber-500" },
    };
    const t = toneMap[tone] || toneMap.sky;

    return (
        <div
            className={[
                "relative grid place-items-center",
                "w-10 h-10 rounded-full",
                "bg-gradient-to-b",
                t.bg,
                "shadow-[0_12px_32px_rgba(15,23,42,0.14)]",
            ].join(" ")}
        >
            {/* gloss */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/70 to-transparent opacity-60" />

            {/* icon */}
            <i
                className={[
                    "bi",
                    icon,
                    "relative text-[22px] leading-none",
                    "bg-gradient-to-br bg-clip-text text-transparent",
                    t.fg,
                    "drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)]",
                ].join(" ")}
            />
        </div>
    );
}

const items = [
    { title: "Engineering Academy", color: "from-pink-200 to-pink-300", badge: null, bsIcon: "bi-display", tone: "pink" },
    { title: "Sertifikasi Komputer CASN", color: "from-blue-200 to-blue-300", badge: "Trending", bsIcon: "bi-award", tone: "sky" },
    { title: "Bimbel CASN", color: "from-teal-200 to-teal-300", bsIcon: "bi-lightbulb", tone: "mint" },
    { title: "Beli e-Meterai", color: "from-pink-200 to-pink-300", bsIcon: "bi-chat-dots", tone: "pink" },
    { title: "Skill Digital", color: "from-orange-200 to-orange-300", bsIcon: "bi-collection-play", tone: "warm" },
    { title: "Bootcamp Online Intensif", color: "from-sky-200 to-sky-300", bsIcon: "bi-laptop", tone: "sky" },
    { title: "Pelatihan untuk Instansi Pemerintah", color: "from-emerald-200 to-emerald-300", bsIcon: "bi-building", tone: "mint" },
    { title: "Semua Program", color: "from-teal-200 to-teal-300", bsIcon: "bi-grid-3x3-gap", tone: "mint" },
];

export default function FeatureGrid() {
    const sectionRef = useRef(null);
    const scrollerRef = useRef(null);

    const [paused, setPaused] = useState(false);
    const [edge, setEdge] = useState({ left: true, right: true });

    // ✅ progress anim dekor: 0..1 (0 = diam, 1 = sudah geser+fade)
    const [sp, setSp] = useState(0);

    const getStep = () => {
        const el = scrollerRef.current;
        if (!el) return 260;
        const firstCard = el.querySelector("[data-card='1']");
        if (!firstCard) return 260;
        const cardRect = firstCard.getBoundingClientRect();
        return Math.round(cardRect.width + 16);
    };

    const updateEdges = () => {
        const el = scrollerRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        const x = el.scrollLeft;

        setEdge({
            left: x <= 2,
            right: x >= max - 2,
        });
    };

    const scrollByStep = (dir = 1) => {
        const el = scrollerRef.current;
        if (!el) return;
        const step = getStep();
        el.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        updateEdges();
        const onScroll = () => updateEdges();

        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateEdges);

        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateEdges);
        };
    }, []);

    useEffect(() => {
        if (paused) return;

        const t = setInterval(() => {
            const el = scrollerRef.current;
            if (!el) return;

            const max = el.scrollWidth - el.clientWidth;
            if (el.scrollLeft >= max - 2) {
                el.scrollTo({ left: 0, behavior: "smooth" });
            } else {
                scrollByStep(1);
            }
        }, 2800);

        return () => clearInterval(t);
    }, [paused]);

    // ✅ Dekor anim mulai ONLY saat section mendekati top frame
    useEffect(() => {
        const START_PX = 140; // mulai geser kalau top section < 140px dari top viewport
        const RANGE_PX = 260; // durasi anim geser+fade sepanjang 260px setelah START

        const calc = () => {
            const el = sectionRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            // rect.top: jarak top section ke top viewport
            // kalau rect.top masih besar -> sp = 0 (diam)
            // kalau rect.top <= START_PX -> mulai naik progress
            const raw = (START_PX - rect.top) / RANGE_PX;
            setSp(clamp01(raw));
        };

        calc();
        window.addEventListener("scroll", calc, { passive: true });
        window.addEventListener("resize", calc);
        return () => {
            window.removeEventListener("scroll", calc);
            window.removeEventListener("resize", calc);
        };
    }, []);

    /**
     * 2 tahap:
     * stage 1 (0..0.7): geser ke samping (opacity tetap)
     * stage 2 (0.7..1): fade out
     */
    const SLIDE_END = 0.7;
    const slideP = clamp01(sp / SLIDE_END);
    const fadeP = clamp01((sp - SLIDE_END) / (1 - SLIDE_END));

    const leftX = -260 * slideP;
    const rightX = 260 * slideP;
    const opacity = 1 - fadeP;

    const decorStyleLeft = (factor = 1) => ({
        transform: `translateX(${leftX * factor}px)`,
        opacity,
        transition: "transform 520ms cubic-bezier(.22,.61,.36,1), opacity 360ms ease",
        willChange: "transform, opacity",
    });

    const decorStyleRight = (factor = 1) => ({
        transform: `translateX(${rightX * factor}px)`,
        opacity,
        transition: "transform 520ms cubic-bezier(.22,.61,.36,1), opacity 360ms ease",
        willChange: "transform, opacity",
    });

    return (
        <section ref={sectionRef} className="relative w-full overflow-hidden bg-[#F5FAFF] py-10">
            {/* DECOR */}
            <div className="pointer-events-none absolute inset-0">
                {/* kiri (2 lingkaran full) */}
                <div
                    className="bg-[#93C5f0]/55 absolute -left-16 bottom-[60px] h-[260px] w-[260px] rounded-full"
                    style={decorStyleLeft(1)}
                />
                <div
                    className="bg-[#93c5f9]/95 absolute -left-16 bottom-[30px] h-[140px] w-[140px] rounded-full"
                    style={decorStyleLeft(0.75)}
                />

                {/* kanan dotted */}
                <svg
                    className="top-[-130px] absolute -right-40 h-[480px] w-[480px]"
                    viewBox="0 0 520 520"
                    fill="none"
                    style={decorStyleRight(1.05)}
                >
                    <circle
                        cx="260"
                        cy="260"
                        r="180"
                        stroke="rgba(37,99,235,0.35)" 
                        strokeWidth="3"
                        strokeDasharray="6 10"
                    />
                </svg>
            </div>
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="bg-[#93c5f9]/45 absolute right-10 top-80 h-[520px] w-[520px] rounded-full blur-[130px]"
                    style={decorStyleLeft(0.55)}
                />
                <div
                    className="bg-[#A9D4F2]/35 absolute bottom-0 right-10 h-[520px] w-[520px] rounded-full blur-[140px]"
                    style={decorStyleRight(0.55)}
                />
            </div>
            <div className="relative z-10 mx-auto max-w-6xl px-4">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-bl from-blue-300 via-blue-400 to-blue-800 p-6 shadow-[0_0px_80px_rgba(15,23,42,0.18)]">
                    <h2 className="mb-5 text-xl font-bold tracking-tight text-white">
                        ✨ Program dan Fitur Unggulan
                    </h2>

                    <div className="relative overflow-hidden rounded-2xl bg-white/45 p-5 shadow-[0_22px_70px_rgba(15,23,42,0.12)] ring-1 ring-white/70 backdrop-blur-xl">
                        <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
                            {/* Arrow Left */}
                            <button
                                type="button"
                                onClick={() => scrollByStep(-1)}
                                disabled={edge.left}
                                className={[
                                    "absolute left-2 top-1/2 -translate-y-1/2 z-30",
                                    "w-10 h-10 rounded-full",
                                    "bg-white/95 ring-1 ring-slate-200 text-slate-700",
                                    "flex items-center justify-center",
                                    "shadow-[0_14px_30px_rgba(15,23,42,0.16)]",
                                    edge.left ? "opacity-40 cursor-not-allowed" : "hover:bg-white",
                                ].join(" ")}
                            >
                                ‹
                            </button>

                            {/* Arrow Right */}
                            <button
                                type="button"
                                onClick={() => scrollByStep(1)}
                                disabled={edge.right}
                                className={[
                                    "absolute right-2 top-1/2 -translate-y-1/2 z-30",
                                    "w-10 h-10 rounded-full",
                                    "bg-white/95 ring-1 ring-slate-200 text-slate-700",
                                    "flex items-center justify-center",
                                    "shadow-[0_14px_30px_rgba(15,23,42,0.16)]",
                                    edge.right ? "opacity-40 cursor-not-allowed" : "hover:bg-white",
                                ].join(" ")}
                            >
                                ›
                            </button>

                            {/* SCROLLER */}
                            <div
                                ref={scrollerRef}
                                className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 pl-14 pr-14 pt-3 [scrollbar-width:none]"
                                style={{ WebkitOverflowScrolling: "touch" }}
                            >
                                {items.map((item, i) => (
                                    <div key={i} data-card={i === 0 ? "1" : undefined} className="w-[120px] shrink-0 snap-start">
                                        <div className="relative flex h-[120px] flex-col rounded-2xl bg-white p-3 shadow-[0_14px_30px_rgba(15,23,42,0.12)] ring-1 ring-slate-100">
                                            {item.badge && (
                                                <span className="-translate-x-1/2 absolute -top-3 left-1/2 z-50 rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white shadow">
                                                    {item.badge}
                                                </span>
                                            )}

                                            <div className={["relative w-full h-[60px] rounded-xl mb-2 overflow-hidden", "bg-gradient-to-r", item.color, "flex items-center justify-center"].join(" ")}>
                                                <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow ring-1 ring-slate-200/70">
                                                    <BsFancyIcon icon={item.bsIcon} tone={item.tone} />
                                                </div>
                                            </div>

                                            <p className="line-clamp-2 text-center text-xs font-semibold leading-snug text-slate-800">
                                                {item.title}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* end scroller */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
