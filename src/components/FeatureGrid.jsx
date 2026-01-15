import { useEffect, useRef, useState } from "react";
import {
    Zap,
    BadgeCheck,
    BookOpen,
    Stamp,
    Sparkles,
    Laptop,
    Building2,
    LayoutGrid,
} from "lucide-react";


const items = [
    { title: "Engineering Academy", color: "from-orange-200 to-orange-300", icon: "bolt" },
    {
        title: "Sertifikasi Komputer CASN",
        color: "from-blue-200 to-blue-300",
        badge: "Trending",
        icon: "badge",
    },
    { title: "Bimbel CASN", color: "from-teal-200 to-teal-300", icon: "book" },
    { title: "Beli e-Meterai", color: "from-pink-200 to-pink-300", icon: "stamp" },
    { title: "Skill Digital", color: "from-indigo-200 to-indigo-300", icon: "spark" },
    { title: "Bootcamp Online Intensif", color: "from-sky-200 to-sky-300", icon: "laptop" },
    {
        title: "Pelatihan untuk Instansi Pemerintah",
        color: "from-emerald-200 to-emerald-300",
        icon: "building",
    },
    { title: "Semua Program", color: "from-slate-200 to-slate-300", icon: "grid" },
];

function Icon({ name }) {
    const className = "w-9 h-9 text-slate-700";

    switch (name) {
        case "bolt":
            return <Zap className={className} strokeWidth={2.2} />;
        case "badge":
            return <BadgeCheck className={className} strokeWidth={2.2} />;
        case "book":
            return <BookOpen className={className} strokeWidth={2.2} />;
        case "stamp":
            return <Stamp className={className} strokeWidth={2.2} />;
        case "spark":
            return <Sparkles className={className} strokeWidth={2.2} />;
        case "laptop":
            return <Laptop className={className} strokeWidth={2.2} />;
        case "building":
            return <Building2 className={className} strokeWidth={2.2} />;
        case "grid":
        default:
            return <LayoutGrid className={className} strokeWidth={2.2} />;
    }
}


export default function FeatureGrid() {
    const scrollerRef = useRef(null);
    const [paused, setPaused] = useState(false);
    const [edge, setEdge] = useState({ left: true, right: true });

    // hitung step scroll = lebar card + gap
    const getStep = () => {
        const el = scrollerRef.current;
        if (!el) return 320;
        const firstCard = el.querySelector("[data-card='1']");
        if (!firstCard) return 320;
        const cardRect = firstCard.getBoundingClientRect();
        return Math.round(cardRect.width + 8); // ✅ gap-2 = 8px
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

    return (
        <section className="w-full bg-slate-900 py-10">
            <div className="mx-auto max-w-6xl px-4">
                <div className="rounded-2xl bg-slate-800 p-6">
                    <h2 className="mb-6 text-lg font-semibold text-white">
                        Program dan Fitur Unggulan
                    </h2>

                    <div
                        className="relative"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        {/* GRADIENT SHADOW (kiri) */}
                        <div
                            className={[
                                "pointer-events-none absolute left-0 top-0 h-full w-14 z-10",
                                "bg-gradient-to-r from-slate-800 to-transparent",
                                edge.left ? "opacity-0" : "opacity-100",
                                "transition-opacity",
                            ].join(" ")}
                        />

                        {/* GRADIENT SHADOW (kanan) */}
                        <div
                            className={[
                                "pointer-events-none absolute right-0 top-0 h-full w-14 z-10",
                                "bg-gradient-to-l from-slate-800 to-transparent",
                                edge.right ? "opacity-0" : "opacity-100",
                                "transition-opacity",
                            ].join(" ")}
                        />

                        {/* ARROW kiri */}
                        <button
                            type="button"
                            onClick={() => scrollByStep(-1)}
                            className={[
                                "absolute left-2 top-1/2 -translate-y-1/2 z-30",
                                "w-10 h-10 rounded-full bg-white/90 shadow",
                                "flex items-center justify-center",
                                "hover:bg-white transition",
                                edge.left ? "opacity-40 cursor-not-allowed" : "opacity-100",
                            ].join(" ")}
                            disabled={edge.left}
                            aria-label="Scroll left"
                        >
                            ‹
                        </button>

                        {/* ARROW kanan */}
                        <button
                            type="button"
                            onClick={() => scrollByStep(1)}
                            className={[
                                "absolute right-2 top-1/2 -translate-y-1/2 z-30",
                                "w-10 h-10 rounded-full bg-white/90 shadow",
                                "flex items-center justify-center",
                                "hover:bg-white transition",
                                edge.right ? "opacity-40 cursor-not-allowed" : "opacity-100",
                            ].join(" ")}
                            disabled={edge.right}
                            aria-label="Scroll right"
                        >
                            ›
                        </button>

                        {/* SCROLLER */}
                        <div
                            ref={scrollerRef}
                            className="
                flex snap-x snap-mandatory
                gap-4
                overflow-x-auto scroll-smooth pb-2 pl-16 pr-16 pt-3 [scrollbar-width:none]"
                            style={{ WebkitOverflowScrolling: "touch" }}
                        >
                            {items.map((item, i) => (
                                <div
                                    key={i}
                                    data-card={i === 0 ? "1" : undefined}
                                    className="
                    w-[170px]
                    shrink-0
                    snap-start sm:w-[190px] md:w-[145px]"
                                >
                                    {/* CARD — HEIGHT DIKUNCI 125px */}
                                    <div
                                        className="
                      relative flex h-[125px]
                      flex-col
                      rounded-xl
                      bg-white px-3
                      pt-3 shadow-sm"
                                    >
                                        {/* BADGE */}
                                        {item.badge && (
                                            <span
                                                className="
                          -translate-x-1/2 absolute -top-3 left-1/2 z-50
                          rounded-full bg-red-500 px-2
                          py-0.5 text-white text-[10px]"
                                            >
                                                {item.badge}
                                            </span>
                                        )}

                                        {/* ICON AREA + ICON */}
                                        <div
                                            className={`
    relative
    w-full h-[56px]
    rounded-lg
    mb-1
    overflow-hidden
    bg-gradient-to-t ${item.color}
    flex items-center justify-center
  `}
                                        >
                                            {/* BLUR EDGE KIRI */}
                                            <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white/60 to-transparent backdrop-blur-sm" />

                                            {/* BLUR EDGE KANAN */}
                                            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white/60 to-transparent backdrop-blur-sm" />

                                            {/* ICON CENTER */}
                                            <div className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-white shadow">
                                                <Icon name={item.icon} />
                                            </div>
                                        </div>


                                        {/* TITLE */}
                                        <p
                                            className="
                        line-clamp-2 text-center font-medium
                        leading-tight text-[12px]
                        text-slate-800"
                                        >
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-3 text-center text-xs text-white/60"> 
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

