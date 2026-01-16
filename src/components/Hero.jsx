export default function Hero() {
    return (
        <section className="relative overflow-hidden
      bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-400 text-white">

            {/* Decorative Blobs */}
            <div className="absolute -left-32 -top-32 h-[480px] w-[480px]
        rounded-full bg-white/25 blur-3xl" />

            <div className="absolute -right-32 top-1/3 h-[420px] w-[420px]
        rounded-full bg-white/20 blur-3xl" />

            {/* Soft center glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[900px] w-[900px] rounded-full bg-white/10 blur-[180px]" />
            </div>

            <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-8 py-20 md:grid-cols-2">

                {/* TEXT AREA */}
                <div className="mx-auto max-w-xl text-center md:text-left">

                    {/* Badge */}
                    <span className="mb-4 inline-block rounded-full
            bg-white/25 px-4 py-1 text-xs font-semibold backdrop-blur">
                        #Platform Belajar Terpercaya
                    </span>

                    <h1 className="text-2xl font-semibold leading-snug md:text-3xl">
                        Bimbel Online & Offline{" "}
                        <span className="text-yellow-200">Terbesar</span>, <br />
                        Terlengkap, dan{" "}
                        <span className="text-yellow-200">Terbukti</span>
                    </h1>

                    <p className="mt-4 text-sm opacity-90 md:text-base">
                        Diskon spesial untukmu dengan isi email sekarang dan mulai belajar
                        lebih terarah.
                    </p>

                    {/* EMAIL INPUT */}
                    <div className="mx-auto mt-8 flex max-w-md items-center overflow-hidden
            rounded-full bg-white shadow-xl shadow-black/20 md:mx-0">
                        <span className="px-5 font-medium text-gray-500">@</span>
                        <input
                            type="email"
                            placeholder="Email kamu"
                            className="flex-1 px-4 py-3 text-gray-700 outline-none"
                        />
                        <button className="bg-orange-500 px-6 py-3 font-semibold text-white
              transition hover:bg-orange-600">
                            Dapatkan Diskon →
                        </button>
                    </div>

                    {/* Small Note */}
                    <p className="mt-3 text-xs opacity-80">
                        *Tanpa spam. Penawaran terbatas untuk pengguna baru.
                    </p>
                </div>

                {/* IMAGE AREA */}
                <div className="relative hidden justify-center md:flex">
                    <img
                        src="https://illustrations.popsy.co/blue/student-learning.svg"
                        alt="Belajar Online"
                        className="max-w-md translate-y-4 drop-shadow-xl"
                    />
                </div>

            </div>
        </section>
    );
}
