import { useEffect, useMemo, useState } from "react";

const slides = [
    {
        image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    },
    {
        image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    },
    {
        image:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    },
];

const mod = (n, m) => ((n % m) + m) % m;
const clamp01 = (v) => Math.max(0, Math.min(1, v));

export default function HeroSlider() {
    const [index, setIndex] = useState(1);
    const [paused, setPaused] = useState(false);
    const [sp, setSp] = useState(0);

    const next = () => setIndex((i) => mod(i + 1, slides.length));

    useEffect(() => {
        if (paused) return;
        const t = setInterval(next, 3500);
        return () => clearInterval(t);
    }, [paused]);

    // scroll progress
    useEffect(() => {
        const DIST = 420;
        const onScroll = () => setSp(clamp01(window.scrollY / DIST));
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const trio = useMemo(() => {
        const p = mod(index - 1, slides.length);
        const n = mod(index + 1, slides.length);
        return {
            prev: slides[p],
            active: slides[index],
            next: slides[n],
        };
    }, [index]);

    // animasi lingkaran
    const leftX = -220 * sp;
    const rightX = 220 * sp;
    const scale = 1 - sp * 0.25;
    const fade = 1 - sp;

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#CFF9EA] via-[#DFF3FF] to-[#C7E6FF] p-10">

            {/* === DECORATIVE CIRCLES === */}
            <div className="pointer-events-none absolute inset-0">

                {/* KIRI BESAR */}
                <div
                    className="bg-[#61CBD0]/35 absolute -left-56 top-10 h-[520px] w-[520px] rounded-full"
                    style={{
                        transform: `translateX(${leftX}px) scale(${scale})`,
                        opacity: fade,
                        transition: "all 400ms cubic-bezier(.22,.61,.36,1)",
                    }}
                />

                {/* KIRI KECIL */}
                <div
                    className="bg-[#BFF2E2]/55 absolute -left-40 top-36 h-[420px] w-[420px] rounded-full"
                    style={{
                        transform: `translateX(${leftX * 0.7}px) scale(${scale})`,
                        opacity: fade,
                        transition: "all 420ms cubic-bezier(.22,.61,.36,1)",
                    }}
                />

                {/* KANAN FULL */}
                <div
                    className="bottom-[-80px] bg-[#93C5FD]/25 absolute -right-56 h-[520px] w-[520px] rounded-full"
                    style={{
                        transform: `translateX(${rightX}px) scale(${scale})`,
                        opacity: fade,
                        transition: "all 420ms cubic-bezier(.22,.61,.36,1)",
                    }}
                />

                {/* KANAN DOT */}
                <svg
                    className="top-[-120px] absolute -right-72 h-[560px] w-[560px]"
                    viewBox="0 0 560 560"
                    fill="none"
                    style={{
                        transform: `translateX(${rightX * 1.1}px) scale(${scale})`,
                        opacity: fade,
                        transition: "all 450ms cubic-bezier(.22,.61,.36,1)",
                    }}
                >
                    <circle
                        cx="280"
                        cy="280"
                        r="200"
                        stroke="rgba(97,203,208,0.55)"
                        strokeWidth="3"
                        strokeDasharray="7 11"
                    />
                </svg>

                {/* soft haze */}
                <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-white/20 blur-[120px]" />
                <div className="absolute -bottom-52 -right-52 h-[620px] w-[620px] rounded-full bg-white/20 blur-[140px]" />
            </div>

            {/* === SLIDER === */}
            <div className="relative mx-auto max-w-6xl px-4">
                <div
                    className="relative overflow-visible"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <div className="relative h-[260px] md:h-[340px] lg:h-[420px]">

                        {/* PREV */}
                        <div className="-translate-y-1/2 -translate-x-[14%] scale-[0.9] absolute left-0 top-1/2 z-10 h-full w-[280px] opacity-60 md:w-[820px]">
                            <SlideCard slide={trio.prev} muted />
                        </div>

                        {/* NEXT */}
                        <div className="-translate-y-1/2 scale-[0.9] absolute right-0 top-1/2 z-10 h-full w-[280px] translate-x-[14%] opacity-60 md:w-[820px]">
                            <SlideCard slide={trio.next} muted />
                        </div>

                        {/* ACTIVE */}
                        <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2 z-20 h-full w-[460px] md:w-[1050px]">
                            <SlideCard slide={trio.active} />
                        </div>
                    </div>

                    {/* DOTS */}
                    <div className="mt-6 flex items-center justify-center gap-2">
                        {slides.map((_, i) => {
                            const active = i === index;
                            return (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    className={[
                                        "h-2 rounded-full transition-all",
                                        active ? "w-8 bg-cyan-300" : "w-2 bg-white/50",
                                    ].join(" ")}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* === BOTTOM LINE === */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[12px]">
                <div className="absolute inset-x-0 bottom-0 h-px bg-white/35" />
                <div
                    className="absolute bottom-0 right-0 h-[12px] rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-300"
                    style={{
                        width: "100%",
                        transformOrigin: "right",
                        transform: `scaleX(${1 - sp})`,
                        transition: "transform 150ms linear",
                    }}
                />
            </div>
        </section>
    );
}

function SlideCard({ slide, muted = false }) {
    return (
        <article
            className={[
                "relative h-full overflow-hidden rounded-[26px]",
                muted ? "shadow-xl" : "shadow-2xl",
            ].join(" ")}
        >
            <img
                src={slide.image}
                alt="Hero Slide"
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div
                className={[
                    "absolute inset-0",
                    muted
                        ? "bg-black/40"
                        : "bg-gradient-to-t from-black/70 via-black/30 to-transparent",
                ].join(" ")}
            />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-7">
                <h3 className="text-lg font-semibold leading-snug md:text-2xl">
                    Program Belajar Terbaik untuk Masa Depanmu
                </h3>
            </div>
        </article>
    );
}
