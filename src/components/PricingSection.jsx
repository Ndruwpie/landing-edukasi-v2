import { useEffect, useRef, useState } from "react";

const clamp01 = (v) => Math.max(0, Math.min(1, v));

export default function PricingSection() {
    const sectionRef = useRef(null);

    // progress masuk & keluar (0..1)
    const [enterP, setEnterP] = useState(0);
    const [exitP, setExitP] = useState(0);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || 800;

            /**
             * ENTER (slide up):
             * mulai anim ketika top section masih di bawah viewport,
             * dan selesai ketika top sudah mendekati area atas.
             */
            const ENTER_START = vh * 0.85; // mulai saat top berada di 85% tinggi viewport (mau masuk)
            const ENTER_RANGE = vh * 0.35; // durasi anim
            const enterRaw = (ENTER_START - rect.top) / ENTER_RANGE;
            const e = clamp01(enterRaw);
            setEnterP(e);

            /**
             * EXIT (opacity makin tebal):
             * mulai ketika section sudah hampir keluar (bottom mendekati top),
             * makin tebal ketika bottom naik ke atas.
             */
            const EXIT_START = vh * 0.35; // mulai ketika rect.bottom < 35% viewport (mau keluar)
            const EXIT_RANGE = vh * 0.35;
            const exitRaw = (EXIT_START - rect.bottom) / EXIT_RANGE;
            const x = clamp01(exitRaw);
            setExitP(x);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    // SLIDE UP: dari 75% -> 50% (semakin masuk, semakin naik)
    const translateY = 75 - 25 * enterP; // (%)

    // OPACITY: normal (0.35) lalu makin tebal saat mau keluar -> 0.85
    const opacity = 0.35 + 0.5 * exitP;

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-10"
        >
            {/* HALF CIRCLE BOTTOM */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0">
                <div
                    className={[
                        "mx-auto",
                        "h-[520px] w-[1500px] md:h-[560px] md:w-[1500px]",
                        "rounded-t-full",
                        "bg-white",
                        "shadow-[0_-30px_90px_rgba(15,23,42,0.10)]",
                        "transition-transform duration-700 ease-out",
                        "will-change-transform,opacity",
                    ].join(" ")}
                    style={{
                        opacity,
                        transform: `translateY(${translateY}%)`,
                    }}
                />
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-4">
                {/* CONTAINER ROUNDED */}
                <div className="rounded-2xl bg-gradient-to-b from-blue-400 via-blue-500 to-blue-800 p-6">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {/* LEFT INFO */}
                        <div className="flex flex-col justify-between text-white">
                            <div>
                                <h3 className="mb-2 text-2xl font-bold">
                                    Bimbel terbaik untuk lolos seleksi
                                </h3>
                                <p className="mb-6 text-xl font-bold text-orange-400">
                                    CPNS & PPPK 2026
                                </p>
                                <button className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-100">
                                    Lihat Semua →
                                </button>
                            </div>
                        </div>

                        {/* CARD 1 */}
                        <div className="relative flex flex-col rounded-xl bg-white p-5">
                            <span className="absolute -top-3 left-5 rounded-full bg-green-500 px-3 py-1 text-xs text-white">
                                ⭐ Recommended
                            </span>

                            <h4 className="mb-4 text-lg font-bold text-slate-800">
                                Bimbel Online <br /> CPNS
                            </h4>

                            <ul className="mb-6 space-y-2 text-sm text-slate-600">
                                <li>✔️ Durasi belajar <b>2–3 Minggu</b></li>
                                <li>✔️ Hingga <b>24x</b> sesi pembahasan soal</li>
                                <li>✔️ Tryout SKD (TIU, TWK, TKP)</li>
                                <li>✔️ Akses video & diskusi</li>
                                <li>✔️ Grup persiapan CASN</li>
                            </ul>

                            <div className="mt-auto">
                                <p className="mb-1 text-sm text-slate-500">Mulai dari</p>
                                <p className="mb-4 text-2xl font-bold text-slate-800">Rp249.000</p>
                                <button className="w-full rounded-lg bg-teal-500 py-2 font-semibold text-white hover:bg-teal-600">
                                    Konsultasi Sekarang
                                </button>
                            </div>
                        </div>

                        {/* CARD 2 */}
                        <div className="relative flex flex-col rounded-xl bg-white p-5">
                            <span className="absolute -top-3 left-5 rounded-full bg-green-500 px-3 py-1 text-xs text-white">
                                ⭐ Recommended
                            </span>

                            <h4 className="mb-4 text-lg font-bold text-slate-800">
                                Belajar Mandiri <br /> CPNS & PPPK
                            </h4>

                            <ul className="mb-6 space-y-2 text-sm text-slate-600">
                                <li>✔️ Materi video lengkap</li>
                                <li>✔️ Latihan soal belajar</li>
                                <li>✔️ Tryout CAT berulang</li>
                                <li>✔️ Akses <b>seumur hidup</b></li>
                            </ul>

                            <div className="mt-auto">
                                <p className="mb-1 text-sm text-slate-500">Mulai dari</p>
                                <p className="mb-4 text-2xl font-bold text-slate-800">Rp55.000</p>
                                <button className="w-full rounded-lg bg-teal-500 py-2 font-semibold text-white hover:bg-teal-600">
                                    Lihat Kelas
                                </button>
                            </div>
                        </div>

                        {/* CARD 3 */}
                        <div className="relative flex flex-col rounded-xl bg-white p-5">
                            <span className="absolute -top-3 left-5 rounded-full bg-orange-500 px-3 py-1 text-xs text-white">
                                🔥 Terpopuler
                            </span>

                            <h4 className="mb-4 text-lg font-bold text-slate-800">
                                Tryout <br /> CPNS & PPPK
                            </h4>

                            <ul className="mb-6 space-y-2 text-sm text-slate-600">
                                <li>✔️ Tryout berbasis CAT</li>
                                <li>✔️ Pembahasan + skor</li>
                                <li>✔️ Bisa dikerjakan berulang</li>
                                <li>✔️ Akses seumur hidup</li>
                            </ul>

                            <div className="mt-auto">
                                <p className="mb-1 text-sm text-slate-500">Mulai dari</p>
                                <p className="mb-4 text-2xl font-bold text-slate-800">Rp10.000</p>
                                <button className="w-full rounded-lg bg-teal-500 py-2 font-semibold text-white hover:bg-teal-600">
                                    Lihat Kelas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* end container */}
            </div>
        </section>
    );
}
