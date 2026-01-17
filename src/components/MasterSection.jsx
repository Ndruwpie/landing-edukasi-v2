import { useEffect, useMemo, useRef, useState } from "react";

const clamp01 = (v) => Math.max(0, Math.min(1, v));

// ====== FOTO LOKAL (src/assets/teachers) ======
import ditaPhoto from "../assets/teachers/dita.jpg";
import dimasPhoto from "../assets/teachers/dimas.jpg";
import dillanPhoto from "../assets/teachers/dillan.jpg";
import naylaPhoto from "../assets/teachers/nayla.jpg";

const teachers = [
    {
        name: "Dita",
        title: "Master Teacher Geografi",
        photo: ditaPhoto,
        points: [
            "S2 Manajemen Bencana Universitas Pertahanan",
            "S1 Pendidikan Geografi Universitas Negeri Jakarta",
            "Perwakilan Mahasiswa Berprestasi Prodi Geografi Tahun 2014",
            "Lulusan Terbaik Prodi Geografi Tahun 2016",
        ],
    },
    {
        name: "Dimas",
        title: "Master Teacher Fisika",
        photo: dimasPhoto,
        points: [
            "S1 Pendidikan Fisika UNJ",
            "Teacher of Physics Olympiad 2013 - present",
            "CHIEF of the year (Educational Content Department Ruangguru) 2018",
            "Medalis Perak Kompetisi Olimpiade Rihand Creative Guru SMA/MA (ORC Guru) 2022",
        ],
    },
    {
        name: "Dillan",
        title: "Master Teacher Bahasa Inggris",
        photo: dillanPhoto,
        points: [
            "S1 Pendidikan Bahasa Inggris UIN Jakarta",
            "The Best Graduate of English Education Department at 104th Graduation",
            "Certification: Teaching Knowledge Test (TKT) - Module 1 | Band 4 | Cambridge",
        ],
    },
    {
        name: "Nayla",
        title: "Master Teacher Matematika",
        photo: naylaPhoto,
        points: [
            "S1 Pendidikan Matematika",
            "Pengajar Olimpiade Matematika",
            "Mentor Tryout & Pembahasan Soal Intensif",
        ],
    },
];

function CheckItem({ children }) {
    return (
        <li className="flex gap-3 leading-relaxed text-[13px] text-white/95">
            <span className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/95 text-slate-800 shadow">
                ✓
            </span>
            <span>{children}</span>
        </li>
    );
}

export default function MasterTeacherSection() {
    const sectionRef = useRef(null);
    const scrollerRef = useRef(null);

    const [index, setIndex] = useState(0);
    const [edge, setEdge] = useState({ left: true, right: false });

    // DECOR ANIM: enter and exit progress (0..1)
    const [enterP, setEnterP] = useState(0);
    const [exitP, setExitP] = useState(0);

    // combined progress for decor: sp=0(off-screen) .. sp=1(normal)
    const sp = useMemo(() => clamp01(enterP * (1 - exitP)), [enterP, exitP]);

    const cardStep = useMemo(() => {
        const el = scrollerRef.current;
        if (!el) return 420;
        const first = el.querySelector("[data-card='1']");
        if (!first) return 420;
        const r = first.getBoundingClientRect();
        return Math.round(r.width + 28);
    }, []);

    const updateEdges = () => {
        const el = scrollerRef.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        const x = el.scrollLeft;
        setEdge({ left: x <= 2, right: x >= max - 2 });
    };

    const scrollToIndex = (i) => {
        const el = scrollerRef.current;
        if (!el) return;
        const next = Math.max(0, Math.min(i, teachers.length - 1));
        el.scrollTo({ left: next * cardStep, behavior: "smooth" });
        setIndex(next);
    };

    const prev = () => scrollToIndex(index - 1);
    const next = () => scrollToIndex(index + 1);

    // scroller listener
    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        updateEdges();

        const onScroll = () => {
            updateEdges();
            const x = el.scrollLeft;
            const i = Math.round(x / (cardStep || 1));
            setIndex(Math.max(0, Math.min(i, teachers.length - 1)));
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateEdges);
        return () => {
            el.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateEdges);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * ✅ DECOR ANIM LOGIC:
     * - Saat MASUK frame: slide masuk (dari samping ke posisi normal)
     * - Saat KELUAR frame: geser ke samping lagi
     * Kita pakai progress berdasar posisi section terhadap viewport.
     */
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || 800;

            const ENTER_START = vh * 0.85;
            const ENTER_RANGE = vh * 0.35;
            const enterRaw = (ENTER_START - rect.top) / ENTER_RANGE;
            setEnterP(clamp01(enterRaw));

            const EXIT_START = vh * 0.35;
            const EXIT_RANGE = vh * 0.35;
            const exitRaw = (EXIT_START - rect.bottom) / EXIT_RANGE;
            setExitP(clamp01(exitRaw));
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    // sp=0 => decor di samping (off-screen), sp=1 => posisi normal
    const leftX = -280 * (1 - sp);
    const rightX = 280 * (1 - sp);
    const decorOpacity = 0.15 + 0.85 * sp;

    const decorStyleLeft = (factor = 1) => ({
        transform: `translateX(${leftX * factor}px)`,
        opacity: decorOpacity,
        transition: "transform 650ms cubic-bezier(.22,.61,.36,1), opacity 380ms ease",
        willChange: "transform, opacity",
    });

    const decorStyleRight = (factor = 1) => ({
        transform: `translateX(${rightX * factor}px)`,
        opacity: decorOpacity,
        transition: "transform 650ms cubic-bezier(.22,.61,.36,1), opacity 380ms ease",
        willChange: "transform, opacity",
    });

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-[#F5FAFF] py-10">
            {/* decor (anim masuk/keluar) */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="absolute -left-16 top-20 h-[360px] w-[360px] rounded-full border-4 border-dashed border-blue-200"
                    style={decorStyleLeft(1)}
                />
                <div
                    className="bg-[#93c5f9]/45 absolute -right-64 -top-40 h-[520px] w-[520px] rounded-full"
                    style={decorStyleRight(1)}
                />
                <div
                    className="bg-[#93C5FD]/25 absolute -right-56 top-44 h-[520px] w-[520px] rounded-full"
                    style={decorStyleRight(0.8)}
                />
            </div>

            <div className="relative mx-auto max-w-6xl px-4">
                <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold text-slate-900 md:text-2xl">
                        Kenalan dengan para Master Teacher berpengalaman
                    </h2>
                </div>

                <div className="relative">
                    {/* scroller */}
                    <div
                        ref={scrollerRef}
                        className="flex snap-x snap-mandatory gap-7 overflow-x-auto scroll-smooth px-12 pb-10 pt-12 [scrollbar-width:none]"
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
                        {teachers.map((t, i) => (
                            <div
                                key={t.name}
                                data-card={i === 0 ? "1" : undefined}
                                className="w-[320px] shrink-0 snap-center md:w-[340px]"
                            >
                                {/* photo */}
                                <div className="relative z-0 mx-auto -mb-10 grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-white shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
                                    {/* ✅ stretch fit frame: object-fill */}
                                    <img
                                        src={t.photo}
                                        alt={t.name}
                                        className="h-full w-full object-fill"
                                        loading="lazy"
                                    />
                                </div>

                                {/* card */}
                                <div className="relative flex h-[380px] w-[325px] flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-blue-400 via-blue-500 to-blue-800 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.18)]">
                                    {/* soft shapes */}
                                    <div className="pointer-events-none absolute inset-0">
                                        <div className="bottom-[-80px] absolute -left-10 h-[220px] w-[220px] rounded-full bg-white/10" />
                                        <div className="bottom-[-120px] absolute left-16 h-[260px] w-[260px] rounded-full bg-white/10" />
                                    </div>

                                    <div className="relative">
                                        <div className="text-center">
                                            <div className="text-lg font-extrabold text-white">{t.name}</div>
                                            <div className="mt-1 text-sm font-semibold text-white/90">{t.title}</div>
                                            <div className="mx-auto mt-4 h-px w-4/5 border-t border-dashed border-white/60" />
                                        </div>

                                        <div className="mt-4 font-semibold text-[17px] text-white">
                                            Pengalaman dan prestasi
                                        </div>

                                        <ul className="mt-3 space-y-3">
                                            {t.points.map((p, idx) => (
                                                <CheckItem key={idx}>{p}</CheckItem>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* dots */}
                    <div className="mt-1 flex items-center justify-center gap-2">
                        {Array.from({ length: teachers.length }).map((_, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => scrollToIndex(i)}
                                className={[
                                    "h-2 w-2 rounded-full transition",
                                    i === index ? "bg-cyan-500" : "bg-slate-300",
                                ].join(" ")}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
