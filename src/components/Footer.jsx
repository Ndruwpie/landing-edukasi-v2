export default function Footer() {
  return (
      <footer className="relative w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-emerald-300">

      {/* SOFT TOP GRADIENT (BUKAN BAR) */}
      <div className="pointer-events-none absolute left-0 top-0 h-20 w-full bg-gradient-to-b from-white/80 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-14">

        {/* CONTENT */}
        <div className="text-black-300 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">

          {/* TENTANG */}
          <div>
            <h4 className="mb-4 font-semibold text-black">Tentang</h4>
            <ul className="space-y-2 text-sm">
              <li className="cursor-pointer hover:text-black">Tentang Kami</li>
              <li className="cursor-pointer hover:text-black">Bantuan</li>
              <li className="cursor-pointer hover:text-black">Jadi Mitra</li>
              <li className="cursor-pointer hover:text-black">Kontak Kami</li>
              <li className="cursor-pointer hover:text-black">Karir</li>
            </ul>
          </div>

          {/* LAINNYA */}
          <div>
            <h4 className="mb-4 font-semibold text-black">Lainnya</h4>
            <ul className="space-y-2 text-sm">
              <li>Syarat & Ketentuan</li>
              <li>Kebijakan Privasi</li>
              <li>Press Kit</li>
              <li>Verifikasi Sertifikat</li>
              <li>Event Skill Academy</li>
              <li>For Enterprise</li>
            </ul>
          </div>

          {/* EKSTRA */}
          <div>
            <h4 className="mb-4 font-semibold text-black">Rekomendasi</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                Rekomendasi Instruktur
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs text-black">
                  NEW
                </span>
              </li>
              <li>Blog Skill Academy</li>
              <li>Skill Coins</li>
            </ul>
          </div>

          {/* APP */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 font-semibold text-black">Available Now</h4>

            <div className="mb-2 flex gap-4">
              <div className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white">
                ▶ Google Play
              </div>
              <div className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white">
                 App Store
              </div>
            </div>

            <p className="text-blak-400 text-xs">
              Best personal growth app 2026
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="text-black-400 mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-700 pt-6 text-sm md:flex-row">
          <p>© 2026 Skill Academy. All Rights Reserved</p>

          <div className="flex gap-4">
            <span>WhatsApp</span>
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
