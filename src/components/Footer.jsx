export default function Footer() {
  return (
    <footer className="relative w-full bg-slate-900">

      {/* SOFT TOP GRADIENT (BUKAN BAR) */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-indigo-900/80 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-6">

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-slate-300">

          {/* TENTANG */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tentang</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Tentang Kami</li>
              <li className="hover:text-white cursor-pointer">Bantuan</li>
              <li className="hover:text-white cursor-pointer">Jadi Mitra</li>
              <li className="hover:text-white cursor-pointer">Kontak Kami</li>
              <li className="hover:text-white cursor-pointer">Karir</li>
            </ul>
          </div>

          {/* LAINNYA */}
          <div>
            <h4 className="text-white font-semibold mb-4">Lainnya</h4>
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
            <h4 className="text-white font-semibold mb-4">Rekomendasi</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                Rekomendasi Instruktur
                <span className="text-xs bg-red-500 px-2 py-0.5 rounded-full text-white">
                  NEW
                </span>
              </li>
              <li>Blog Skill Academy</li>
              <li>Skill Coins</li>
            </ul>
          </div>

          {/* APP */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-4">Available Now</h4>

            <div className="flex gap-4 mb-2">
              <div className="bg-black rounded-lg px-4 py-2 text-white text-sm font-semibold">
                ▶ Google Play
              </div>
              <div className="bg-black rounded-lg px-4 py-2 text-white text-sm font-semibold">
                 App Store
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Best personal growth app 2026
            </p>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t border-slate-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 gap-4">
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
