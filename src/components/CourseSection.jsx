import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const clamp01 = (v) => Math.max(0, Math.min(1, v));

const categories = [
    "Professional & Personal Development",
    "Technology & Software",
    "Design",
    "Business",
    "Sales & Marketing",
    "Language",
    "Office Productivity",
];

const courses = [
    {
        id: "course-1",
        title: "Storytelling dan Creative Writing untuk Menulis Cerita",
        instructor: "Meutia Azzura",
        role: "Content Writer",
        rating: 4.9,
        price: "Rp360.000",
        image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        chip: "Writing",
    },
    {
        id: "course-2",
        title: "Mulai Karier sebagai UX Designer",
        instructor: "Luky Primadani",
        role: "UX Researcher",
        rating: 4.8,
        price: "Rp166.667",
        image:
            "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        chip: "UX",
    },
    {
        id: "course-3",
        title: "Kunci Sukses Memulai Travel Agency",
        instructor: "Agung Yoga Asmoro",
        role: "Tourism Entrepreneur",
        rating: 4.9,
        price: "Rp240.000",
        image:
            "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        chip: "Travel",
    },
    {
        id: "course-4",
        title: "Sekretaris 101: Pengelolaan Surat dan Dokumen",
        instructor: "Regina Rima Rianti",
        role: "Executive Secretary",
        rating: 5.0,
        price: "Rp360.000",
        image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        chip: "Office",
    },
    {
        id: "course-5",
        title: "E-Commerce 101: Kunci Sukses Berjualan Online",
        instructor: "Carissa Mashinta",
        role: "E-Commerce Manager",
        rating: 5.0,
        price: "Rp100.000",
        oldPrice: "Rp200.000",
        badge: "Best Seller",
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        chip: "E-Commerce",
    },
];

// chip palette (warna-warni kaya FeatureGrid)
const chipPalette = [
    { bg: "from-fuchsia-100 to-indigo-100", fg: "from-pink-600 to-violet-600" },
    { bg: "from-sky-100 to-indigo-100", fg: "from-sky-600 to-blue-700" },
    { bg: "from-cyan-100 to-sky-100", fg: "from-emerald-600 to-cyan-700" },
    { bg: "from-rose-100 to-orange-100", fg: "from-rose-600 to-amber-600" },
];

function FancyTag({ text, idx = 0 }) {
    const t = chipPalette[idx % chipPalette.length];
    return (
        <span
            className={[
                "whitespace-nowrap inline-flex items-center justify-center",
                "rounded-full px-5 py-2",
                "text-sm font-semibold tracking-tight",
                "bg-gradient-to-br",
                t.bg,
                "ring-2 ring-white/70",
                "shadow-[0_0px_20px_rgba(15,23,42,0.12)]",
                "backdrop-blur",
            ].join(" ")}
        >
            <span className={["bg-gradient-to-br bg-clip-text text-transparent", t.fg].join(" ")}>
                {text}
            </span>
        </span>
    );
}

function FancyChip({ text, idx = 0 }) {
    const t = chipPalette[idx % chipPalette.length];
    return (
        <span
            className={[
                "inline-flex items-center",
                "rounded-full px-2.5 py-1",
                "text-[11px] font-semibold tracking-tight",
                "bg-gradient-to-br",
                t.bg,
                "ring-1 ring-white/70",
                "shadow-[0_10px_18px_rgba(15,23,42,0.10)]",
                "backdrop-blur",
            ].join(" ")}
        >
            <span className={["bg-gradient-to-br bg-clip-text text-transparent", t.fg].join(" ")}>
                {text}
            </span>
        </span>
    );
}

export default function CourseSection() {
    const navigate = useNavigate();

    const sectionRef = useRef(null);
    const tagRef = useRef(null);
    const sliderRef = useRef(null);

    const [index, setIndex] = useState(0);

    const visibleCards = 4;
    const cardStep = 256;

    const maxIndex = useMemo(() => {
        const m = courses.length - visibleCards;
        return m > 0 ? m : 0;
    }, []);

    const scrollTagLeft = () => tagRef.current?.scrollBy({ left: -200, behavior: "smooth" });
    const scrollTagRight = () => tagRef.current?.scrollBy({ left: 200, behavior: "smooth" });

    const slideLeft = () => {
        setIndex((prev) => {
            const next = prev > 0 ? prev - 1 : 0;
            if (next !== prev) sliderRef.current?.scrollBy({ left: -cardStep, behavior: "smooth" });
            return next;
        });
    };

    const slideRight = () => {
        setIndex((prev) => {
            const next = prev < maxIndex ? prev + 1 : prev;
            if (next !== prev) sliderRef.current?.scrollBy({ left: cardStep, behavior: "smooth" });
            return next;
        });
    };

    // decor geser ketika mendekati top frame
    const [sp, setSp] = useState(0);
    useEffect(() => {
        const START_PX = 140;
        const RANGE_PX = 260;
        const calc = () => {
            const el = sectionRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
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

    const onPickCourse = (course) => {
        navigate("/payment", { state: { course } });
    };

    return (
        <section ref={sectionRef} className="relative -mt-6 w-full overflow-hidden bg-[#F5FAFF] pb-20 pt-10">
            {/* DECOR */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="bottom-[-120px] absolute -right-32 h-[420px] w-[420px] rounded-full bg-[#BFF2E2] opacity-95"
                    style={decorStyleRight(1)}
                />
                <div
                    className="absolute -right-20 bottom-[160px] h-[190px] w-[190px] rounded-full bg-[#61CBD0] opacity-60"
                    style={decorStyleRight(0.8)}
                />
                <div
                    className="absolute -left-28 top-[50px] h-[320px] w-[320px] rounded-full bg-[#A9D4F2] opacity-55"
                    style={decorStyleLeft(1)}
                />
                <svg
                    className="-left-30 absolute top-[10px] h-[560px] w-[560px]"
                    viewBox="0 0 560 560"
                    fill="none"
                    style={decorStyleLeft(1.05)}
                >
                    <circle
                        cx="280"
                        cy="280"
                        r="210"
                        stroke="rgba(97,203,208,0.55)"
                        strokeWidth="3"
                        strokeDasharray="6 10"
                    />
                </svg>
            </div>

            {/* glow */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="bg-[#BFF2E2]/35 absolute left-10 top-10 h-[520px] w-[520px] rounded-full blur-[130px]"
                    style={decorStyleLeft(0.55)}
                />
                <div
                    className="bg-[#A9D4F2]/35 absolute bottom-0 right-10 h-[520px] w-[520px] rounded-full blur-[140px]"
                    style={decorStyleRight(0.55)}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-4">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#CFF9EA] via-[#DFF3FF] to-[#C7E6FF] p-8 shadow-[0_30px_90px_rgba(15,23,42,0.18)]">
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                        <div className="absolute -left-32 top-20 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#7FF5D4] to-[#9EE8FF] opacity-50 blur-3xl" />
                        <div className="absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#93C5FD] to-[#67E8F9] opacity-50 blur-3xl" />
                    </div>

                    <div className="relative rounded-2xl border border-white/70 bg-white/60 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                        {/* HEADER */}
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-800">Kelas Pro Course</h2>
                            <span className="text-sm font-medium text-sky-700">Klik course untuk checkout →</span>
                        </div>

                        {/* TAG SLIDER */}
                        <div className="relative mb-8">
                            <button
                                type="button"
                                onClick={scrollTagLeft}
                                className="-translate-y-1/2 absolute left-0 top-1/2 z-10 h-9 w-9 rounded-full bg-white/80 text-slate-700 shadow ring-1 ring-slate-200 backdrop-blur transition hover:bg-white"
                            >
                                ‹
                            </button>

                            <div ref={tagRef} className="flex gap-3 overflow-x-auto px-12 py-3 [scrollbar-width:none]" style={{ WebkitOverflowScrolling: "touch" }}>
                                {categories.map((cat, i) => (
                                    <FancyTag key={cat} text={cat} idx={i} />
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={scrollTagRight}
                                className="-translate-y-1/2 absolute right-0 top-1/2 z-10 h-9 w-9 rounded-full bg-white/80 text-slate-700 shadow ring-1 ring-slate-200 backdrop-blur transition hover:bg-white"
                            >
                                ›
                            </button>
                        </div>

                        {/* COURSE SLIDER */}
                        <div className="relative">
                            <div ref={sliderRef} className="flex gap-4 overflow-hidden pb-14">
                                {courses.map((c, i) => (
                                    <button
                                        key={c.id}
                                        type="button"
                                        onClick={() => onPickCourse(c)}
                                        className="flex min-w-[240px] cursor-pointer flex-col overflow-hidden rounded-xl bg-white text-left shadow-md transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-sky-400"
                                    >
                                        <div className="relative h-[120px] shrink-0 overflow-hidden">
                                            <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                                            <div className="absolute left-3 top-3">
                                                <FancyChip text={c.chip || "Course"} idx={i} />
                                            </div>
                                            {c.badge && (
                                                <span className="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white shadow">
                                                    {c.badge}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-1 flex-col p-3">
                                            <h3 className="mb-2 line-clamp-2 min-h-[40px] text-sm font-semibold text-slate-800">
                                                {c.title}
                                            </h3>

                                            <div className="mb-2 flex items-center gap-2">
                                                <img src={c.avatar} alt={c.instructor} className="h-6 w-6 rounded-full" />
                                                <p className="text-xs text-slate-500">
                                                    {c.instructor} · {c.role}
                                                </p>
                                            </div>

                                            <div className="mb-2 flex items-center gap-1 text-sm text-yellow-400">
                                                ★ ★ ★ ★ ★
                                                <span className="ml-1 text-xs text-slate-600">{c.rating}</span>
                                            </div>

                                            <div className="mt-auto text-sm font-semibold text-slate-800">
                                                {c.price}
                                                {c.oldPrice && <span className="ml-2 text-xs text-slate-400 line-through">{c.oldPrice}</span>}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* DOTS */}
                            <div className="-translate-x-1/2 absolute bottom-3 left-1/2 flex justify-center gap-2">
                                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`h-2 w-2 rounded-full ${i === index ? "bg-sky-500" : "bg-slate-300"}`}
                                    />
                                ))}
                            </div>

                            {/* ARROWS */}
                            <div className="absolute -bottom-2 right-2 flex gap-2">
                                <button
                                    type="button"
                                    onClick={slideLeft}
                                    className="h-9 w-9 rounded-full bg-white text-slate-800 shadow hover:bg-slate-50"
                                    disabled={index === 0}
                                    title="Sebelumnya"
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    onClick={slideRight}
                                    className="h-9 w-9 rounded-full bg-white text-slate-800 shadow hover:bg-slate-50"
                                    disabled={index === maxIndex}
                                    title="Berikutnya"
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* end glass */}
                </div>
            </div>
        </section>
    );
}
