export default function PricingSection() {
  return (
    <section className="w-full bg-slate-900 pt-2 pb-16 -mt-4">
      <div className="max-w-6xl mx-auto px-4">

        {/* CONTAINER ROUNDED */}
        <div className="bg-gradient-to-br from-slate-800 via-indigo-800 to-slate-900 rounded-2xl p-6">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* LEFT INFO */}
            <div className="text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Bimbel terbaik untuk lolos seleksi
                </h3>
                <p className="text-xl font-bold text-orange-400 mb-6">
                  CPNS & PPPK 2026
                </p>
                <button className="inline-flex items-center gap-2 bg-white text-slate-800 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-slate-100 transition">
                  Lihat Semua →
                </button>
              </div>
            </div>

            {/* CARD 1 */}
            <div className="bg-white rounded-xl p-5 flex flex-col relative">
              <span className="absolute -top-3 left-5 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                ⭐ Recommended
              </span>

              <h4 className="text-lg font-bold text-slate-800 mb-4">
                Bimbel Online <br /> CPNS
              </h4>

              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li>✔️ Durasi belajar <b>2–3 Minggu</b></li>
                <li>✔️ Hingga <b>24x</b> sesi pembahasan soal</li>
                <li>✔️ Tryout SKD (TIU, TWK, TKP)</li>
                <li>✔️ Akses video & diskusi</li>
                <li>✔️ Grup persiapan CASN</li>
              </ul>

              <div className="mt-auto">
                <p className="text-sm text-slate-500 mb-1">Mulai dari</p>
                <p className="text-2xl font-bold text-slate-800 mb-4">
                  Rp249.000
                </p>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold">
                  Konsultasi Sekarang
                </button>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white rounded-xl p-5 flex flex-col relative">
              <span className="absolute -top-3 left-5 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                ⭐ Recommended
              </span>

              <h4 className="text-lg font-bold text-slate-800 mb-4">
                Belajar Mandiri <br /> CPNS & PPPK
              </h4>

              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li>✔️ Materi video lengkap</li>
                <li>✔️ Latihan soal belajar</li>
                <li>✔️ Tryout CAT berulang</li>
                <li>✔️ Akses <b>seumur hidup</b></li>
              </ul>

              <div className="mt-auto">
                <p className="text-sm text-slate-500 mb-1">Mulai dari</p>
                <p className="text-2xl font-bold text-slate-800 mb-4">
                  Rp55.000
                </p>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold">
                  Lihat Kelas
                </button>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white rounded-xl p-5 flex flex-col relative">
              <span className="absolute -top-3 left-5 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                🔥 Terpopuler
              </span>

              <h4 className="text-lg font-bold text-slate-800 mb-4">
                Tryout <br /> CPNS & PPPK
              </h4>

              <ul className="space-y-2 text-sm text-slate-600 mb-6">
                <li>✔️ Tryout berbasis CAT</li>
                <li>✔️ Pembahasan + skor</li>
                <li>✔️ Bisa dikerjakan berulang</li>
                <li>✔️ Akses seumur hidup</li>
              </ul>

              <div className="mt-auto">
                <p className="text-sm text-slate-500 mb-1">Mulai dari</p>
                <p className="text-2xl font-bold text-slate-800 mb-4">
                  Rp10.000
                </p>
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold">
                  Lihat Kelas
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
