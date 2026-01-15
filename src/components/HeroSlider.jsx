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

export default function HeroSlider() {
    const [index, setIndex] = useState(1);
    const [paused, setPaused] = useState(false);

    const next = () => setIndex((i) => mod(i + 1, slides.length));

    // ✅ AUTO SLIDESHOW
    useEffect(() => {
        if (paused) return;
        const t = setInterval(next, 3500); // ganti durasi di sini (ms)
        return () => clearInterval(t);
    }, [paused]);

    const trio = useMemo(() => {
        const p = mod(index - 1, slides.length);
        const n = mod(index + 1, slides.length);
        return {
            prev: { ...slides[p] },
            active: { ...slides[index] },
            next: { ...slides[n] },
        };
    }, [index]);

    return (
        <section className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-teal-800 py-8">
            <div className="relative mx-auto max-w-6xl px-4">
                {/* hover untuk pause */}
                <div
                    className="relative overflow-visible"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {/* AREA TINGGI SLIDER (tetap) */}
                    <div className="relative h-[240px] md:h-[320px]">
                        {/* PREV (kiri) */}
                        <div
                            className="
                -translate-y-1/2 -translate-x-[14%]
                scale-[0.9] absolute left-0
                top-1/2 z-10
                w-[280px] opacity-60
                transition-all
                duration-500 ease-out md:w-[420px]"
                        >
                            <SlideCard slide={trio.prev} muted />
                        </div>

                        {/* NEXT (kanan) */}
                        <div
                            className="
                -translate-y-1/2 scale-[0.9] absolute
                right-0 top-1/2 z-10
                w-[280px]
                translate-x-[14%] opacity-60
                transition-all
                duration-500 ease-out md:w-[420px]"
                        >
                            <SlideCard slide={trio.next} muted />
                        </div>

                        {/* ACTIVE (tengah) — lebih lebar */}
                        <div
                            className="
                -translate-x-1/2 -translate-y-1/2 absolute left-1/2 top-1/2
                z-20 w-[360px]
                transition-all
                duration-500 ease-out md:w-[850px]"
                        >
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
                                        active ? "w-8 bg-blue-400" : "w-2 bg-white/40",
                                    ].join(" ")}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            );
                        })}
                    </div>

                    {/* small hint (optional) */}
                    <p className="mt-2 text-center text-xs text-white/60">
                        
                    </p>
                </div>
            </div>
        </section>
    );
}

function SlideCard({ slide, muted = false }) {
    return (
        <article
            className={[
                "relative h-[240px] md:h-[320px] overflow-hidden rounded-[26px]",
                muted ? "shadow-lg" : "shadow-2xl",
            ].join(" ")}
        >
            <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div
                className={[
                    "absolute inset-0",
                    muted
                        ? "bg-black/45"
                        : "bg-gradient-to-t from-black/75 via-black/25 to-transparent",
                ].join(" ")}
            />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white md:p-7">
                <p className="font-semibold tracking-wider text-[11px] opacity-90 md:text-xs">
                    {slide.tag}
                </p>
                <h3 className="mt-1 text-lg font-semibold leading-snug md:text-2xl">
                    {slide.title}
                </h3>
            </div>
        </article>
    );
}
