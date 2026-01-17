export default function VoucherBanner() {
    return (

        <div className="mx-auto max-w-6xl px-4">

            <div
                className="
          flex flex-col items-center justify-between gap-4
          rounded-2xl
          bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300
          px-6 py-4
          shadow-xl
          md:flex-row"
            >
                <p className="text-sm font-medium text-white md:text-base">
                    Jangan lupa tukarkan kode voucher dan cek status sertifikatmu sekarang
                </p>

                <div className="flex gap-3">
                    <button className="
            flex items-center gap-2 rounded-lg
            bg-white px-4 py-2
            text-sm font-semibold text-slate-800
            transition hover:bg-slate-100">
                        🎟️ Tukar Kode Voucher
                    </button>

                    <button className="
            flex items-center gap-2 rounded-lg
            bg-white/90 px-4 py-2
            text-sm font-semibold text-slate-800
            transition hover:bg-white">
                        🏅 Cek Sertifikat
                    </button>
                </div>
            </div>
        </div>
    );
}
