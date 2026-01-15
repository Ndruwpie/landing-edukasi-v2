export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-slate-900 via-blue-900 to-teal-700 text-white">

            <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">
                {/* LEFT: LOGO + BRAND */}
                <div className="flex shrink-0 items-center gap-3">
                    {/* icon placeholder */}
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/10">
                        <span className="font-black text-teal-200">D</span>
                    </div>

                    <div className="leading-tight">
                        <div className="text-sm font-bold tracking-wide">Edu Platform</div>
                        <div className="-mt-0.5 text-[11px] text-white/70">By Demonster</div>
                    </div>
                </div>

                {/* MENU */}
                <ul className="hidden items-center gap-5 text-sm font-semibold text-white/90 md:flex">
                    <NavItem label="Instansi" />
                    <NavItem label="SA Pro" />
                    <NavItem label="DigiStamp" />
                </ul>

                {/* SEARCH */}
                <div className="hidden flex-1 justify-center md:flex">
                    <div className="relative w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Kamu ingin menguasai skill apa hari ini?"
                            className="
                h-10 w-full
                rounded-md
                bg-white
                pl-4 pr-10
                text-slate-800 shadow-sm
                outline-none
                placeholder:text-slate-500"
                        />
                        <span className="-translate-y-1/2 absolute right-3 top-1/2 text-slate-500">
                            🔍
                        </span>
                    </div>
                </div>

                {/* CTA */}
                <button
                    className="
            ml-auto
            h-10
            rounded-md bg-teal-500 px-4 text-sm font-semibold shadow-sm hover:bg-teal-600"
                >
                    Daftar/Masuk
                </button>
            </div>

            {/* subtle bottom divider (biar mirip screenshot) */}
            <div className="h-px bg-white/10" />
        </nav>
    );
}

function NavItem({ label }) {
    return (
        <li className="flex cursor-pointer items-center gap-2 transition hover:text-teal-200">
            <span>{label}</span>
            <span className="text-xs opacity-80">▾</span>
        </li>
    );
}
