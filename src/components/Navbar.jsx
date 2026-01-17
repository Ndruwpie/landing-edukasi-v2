export default function Navbar() {
    return (
        <nav
            className="
        sticky top-0 z-50 w-full
        bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800
        text-slate-800
        backdrop-blur-xl"
        >
            {/* Decorative glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 top-0 h-[260px] w-[260px] rounded-full bg-white/40 blur-3xl" />
                <div className="absolute -right-32 top-0 h-[260px] w-[260px] rounded-full bg-white/40 blur-3xl" />
            </div>

            <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-6 px-6">

                {/* LEFT: LOGO + BRAND */}
                <div className="flex shrink-0 items-center gap-3">
                    {/* icon placeholder */}
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-white shadow-md">
                        <span className="font-white text-sky-500">D</span>
                    </div>

                    <div className="leading-tight">
                        <div className="text-sm font-bold tracking-wide text-white">
                            Edu Platform
                        </div>
                        <div className="-mt-0.5 text-white text-[11px]">
                            By Demonster
                        </div>
                    </div>
                </div>

                {/* MENU */}
                <ul className="hidden items-center gap-6 text-sm font-semibold text-white md:flex">
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
                rounded-lg
                bg-white/90
                pl-4 pr-10
                text-slate-700 shadow-md
                outline-none
                ring-1 ring-white/60
                placeholder:text-slate-400
                focus:ring-2 focus:ring-sky-400"
                        />
                        <span className="-translate-y-1/2 absolute right-3 top-1/2 text-slate-400">
                            🔍
                        </span>
                    </div>
                </div>

                {/* CTA */}
                <button
                    className="
            ml-auto h-10
            rounded-lg
            bg-gradient-to-r from-sky-500 to-cyan-500
            px-5 text-sm font-semibold text-white
            shadow-lg shadow-cyan-500/30
            transition hover:from-sky-600 hover:to-cyan-600"
                >
                    Daftar / Masuk
                </button>
            </div>

            {/* subtle bottom divider */}
            <div className="h-px bg-white/40" />
        </nav>
    );
}

function NavItem({ label }) {
    return (
        <li className="flex cursor-pointer items-center gap-2 transition hover:text-sky-600">
            <span>{label}</span>
            <span className="text-xs opacity-70">▾</span>
        </li>
    );
}
