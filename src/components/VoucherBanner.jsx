export default function VoucherBanner() {
  return (
    <section className="w-full bg-slate-900 pt-0 pb-6 -mt-6">
      <div className="max-w-6xl mx-auto px-4">

        <div
          className="
            rounded-2xl
            px-6 py-4
            flex flex-col md:flex-row
            items-center justify-between
            gap-4
            bg-gradient-to-r
            from-orange-500
            via-orange-400
            to-amber-300
            shadow-lg
          "
        >
          {/* TEXT */}
          <p className="text-white text-sm md:text-base font-medium">
            Jangan lupa tukarkan kode voucher dan cek status sertifikatmu sekarang
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            <button
              className="
                flex items-center gap-2
                bg-white text-slate-800
                px-4 py-2
                rounded-lg
                text-sm font-semibold
                hover:bg-slate-100
                transition
              "
            >
              🎟️ Tukar Kode Voucher
            </button>

            <button
              className="
                flex items-center gap-2
                bg-white/90 text-slate-800
                px-4 py-2
                rounded-lg
                text-sm font-semibold
                hover:bg-white
                transition
              "
            >
              🏅 Cek Sertifikat
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
