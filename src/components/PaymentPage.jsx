import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// --- helpers ---
const rupiah = (v) => {
    if (typeof v === "string") return v;
    try {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);
    } catch {
        return `Rp ${v}`;
    }
};

const parsePriceToNumber = (priceStr) => {
    // "Rp360.000" -> 360000
    if (!priceStr) return 0;
    const s = String(priceStr).replace(/[^\d]/g, "");
    return Number(s || 0);
};

const clamp01 = (v) => Math.max(0, Math.min(1, v));

// --- UI bits ---
function MethodCard({ active, title, subtitle, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "w-full text-left rounded-2xl p-4 transition",
                "ring-1",
                active ? "bg-white ring-sky-300 shadow-[0_18px_40px_rgba(15,23,42,0.10)]" : "bg-white/60 ring-white/70 hover:bg-white/80",
            ].join(" ")}
        >
            <div className="flex items-start gap-3">
                <div
                    className={[
                        "mt-0.5 h-5 w-5 rounded-full ring-2 ring-slate-300 flex items-center justify-center",
                        active ? "ring-sky-500" : "",
                    ].join(" ")}
                >
                    {active && <div className="h-2.5 w-2.5 rounded-full bg-sky-500" />}
                </div>
                <div>
                    <div className="font-semibold text-slate-900">{title}</div>
                    <div className="text-sm text-slate-600">{subtitle}</div>
                </div>
            </div>
        </button>
    );
}

function Field({ label, required, value, onChange, placeholder, error, type = "text" }) {
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                {label}
                {required && <span className="text-rose-500">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={[
                    "w-full rounded-xl px-4 py-3 outline-none",
                    "bg-white/70 backdrop-blur",
                    "ring-1",
                    error ? "ring-rose-300 focus:ring-rose-400" : "ring-slate-200 focus:ring-sky-300",
                    "shadow-sm",
                ].join(" ")}
            />
            {error && <div className="text-xs font-medium text-rose-600">{error}</div>}
        </div>
    );
}

function SelectField({ label, required, value, onChange, options, error }) {
    return (
        <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                {label}
                {required && <span className="text-rose-500">*</span>}
            </label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={[
                    "w-full rounded-xl px-4 py-3 outline-none",
                    "bg-white/70 backdrop-blur",
                    "ring-1",
                    error ? "ring-rose-300 focus:ring-rose-400" : "ring-slate-200 focus:ring-sky-300",
                    "shadow-sm",
                ].join(" ")}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <div className="text-xs font-medium text-rose-600">{error}</div>}
        </div>
    );
}

function SuccessModal({ open, onClose }) {
    if (!open) return null;
    return (
        <div className="z-[999] fixed inset-0 grid place-items-center bg-slate-900/40 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-[0_30px_90px_rgba(15,23,42,0.30)]">
                <div className="p-6">
                    <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M20 6L9 17l-5-5"
                                stroke="#10B981"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <h3 className="text-center text-xl font-extrabold text-slate-900">Sudah terbayar ✅</h3>
                    <p className="mt-2 text-center text-sm text-slate-600">
                        Harap cek email untuk jadwal selanjutnya dan informasi akses kelas.
                    </p>

                    <div className="mt-6 flex justify-center">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                        >
                            Oke, mengerti
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PaymentPage() {
    const navigate = useNavigate();
    const { state } = useLocation();

    // course dari CourseSection (navigate("/payment", { state: { course } }))
    const picked = state?.course;

    // fallback data sertifikasi (AI / UI / UX)
    const fallbackCourse = useMemo(
        () => ({
            title: "Sertifikasi AI untuk Produktivitas & Karier",
            chip: "AI",
            price: "Rp349.000",
        }),
        []
    );

    const course = picked || fallbackCourse;

    // Payment methods
    const [method, setMethod] = useState("gopay");

    // Form fields
    const [fullName, setFullName] = useState("");
    const [country, setCountry] = useState("ID");
    const [address1, setAddress1] = useState("");
    const [email, setEmail] = useState("");

    // validation errors
    const [errors, setErrors] = useState({});

    // modal success
    const [paid, setPaid] = useState(false);

    // decor animation (masuk saat mendekati top)
    const [sp, setSp] = useState(0);
    useEffect(() => {
        const START_PX = 140;
        const RANGE_PX = 260;

        const calc = () => {
            const raw = (START_PX - 0) / RANGE_PX; // payment page biasanya di top; biar tetap ada gaya anim
            setSp(clamp01(raw));
        };
        calc();
    }, []);

    const SLIDE_END = 0.7;
    const slideP = clamp01(sp / SLIDE_END);
    const fadeP = clamp01((sp - SLIDE_END) / (1 - SLIDE_END));
    const leftX = -260 * slideP;
    const rightX = 260 * slideP;
    const opacity = 1 - fadeP;

    const decorStyleLeft = (factor = 1) => ({
        transform: `translateX(${leftX * factor}px)`,
        opacity,
        transition: "transform 520ms cubic-bezier(.22,.61,.36,1), opacity 360ms ease",
        willChange: "transform, opacity",
    });

    const decorStyleRight = (factor = 1) => ({
        transform: `translateX(${rightX * factor}px)`,
        opacity,
        transition: "transform 520ms cubic-bezier(.22,.61,.36,1), opacity 360ms ease",
        willChange: "transform, opacity",
    });

    const amount = parsePriceToNumber(course.price || course?.price);
    const vat = Math.round(amount * 0.11);
    const total = amount; // kalau kamu mau total include VAT: amount + vat

    const validate = () => {
        const next = {};
        if (!fullName.trim()) next.fullName = "Nama lengkap wajib diisi.";
        if (!email.trim()) next.email = "Email wajib diisi.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Format email tidak valid.";
        if (!country) next.country = "Pilih negara / wilayah.";
        if (!address1.trim()) next.address1 = "Alamat wajib diisi.";

        setErrors(next);
        return Object.keys(next).length === 0;
    };

    const onPay = () => {
        if (!validate()) return;
        setPaid(true);
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#F5FAFF]">
            <SuccessModal
                open={paid}
                onClose={() => {
                    setPaid(false);
                    navigate("/", { replace: false });
                }}
            />

            {/* DECOR */}
            <div className="pointer-events-none absolute inset-0">
                {/* kanan */}
                <div
                    className="bottom-[-120px] bg-[#93C5f0]/55 absolute -right-2 h-[420px] w-[420px] rounded-full opacity-95"
                    style={decorStyleRight(1)}
                />


                {/* kiri */}
                <div
                    className="absolute -left-8 top-[50px] h-[320px] w-[320px] rounded-full bg-[#A9D4F2] opacity-55"
                    style={decorStyleLeft(1)}
                />
                <svg
                    className="-left-42 absolute top-[10px] h-[560px] w-[560px]"
                    viewBox="0 0 560 560"
                    fill="none"
                    style={decorStyleLeft(1.05)}
                >
                    <circle
                        cx="280"
                        cy="280"
                        r="210"
                        stroke="rgba(97,203,208,0.55)"
                        strokeWidth="3"
                        strokeDasharray="6 10"
                    />
                </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
                {/* top bar */}
                <div className="mb-6 flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-slate-800 ring-1 ring-slate-200 shadow hover:bg-white"
                        aria-label="Kembali"
                        title="Kembali"
                    >
                        ←
                    </button>

                    <div>
                        <div className="text-sm font-semibold text-slate-600">Detail pembayaran</div>
                        <div className="text-xl font-extrabold text-slate-900">Checkout Kursus Sertifikasi</div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* LEFT: form */}
                    <div className="lg:col-span-2">
                        <div className="overflow-hidden rounded-2xl bg-white/55 shadow-[0_30px_90px_rgba(15,23,42,0.12)] ring-1 ring-white/70 backdrop-blur-xl">
                            <div className="p-6 md:p-8">
                                {/* payment method */}
                                <div className="mb-6">
                                    <div className="mb-3 text-sm font-extrabold text-slate-900">Metode pembayaran</div>

                                    <div className="grid gap-3 md:grid-cols-2">
                                        <MethodCard
                                            active={method === "gopay"}
                                            title="GoPay"
                                            subtitle="Selesaikan pembayaran via GoPay."
                                            onClick={() => setMethod("gopay")}
                                        />
                                        <MethodCard
                                            active={method === "card"}
                                            title="Kartu"
                                            subtitle="Visa / Mastercard / dll."
                                            onClick={() => setMethod("card")}
                                        />
                                    </div>

                                    <div className="mt-4 rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200">
                                        <div className="text-sm font-semibold text-slate-800">
                                            {method === "gopay" ? "GoPay dipilih" : "Kartu dipilih"}
                                        </div>
                                        <div className="mt-1 text-sm text-slate-600">
                                            {method === "gopay"
                                                ? "Setelah submit, kamu akan diarahkan untuk menyelesaikan pembayaran dengan aman."
                                                : "Pastikan data kartu benar. Pembayaran diproses aman."}
                                        </div>
                                    </div>
                                </div>

                                {/* billing */}
                                <div>
                                    <div className="mb-4 text-sm font-extrabold text-slate-900">Alamat penagihan</div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <Field
                                            label="Nama lengkap"
                                            required
                                            value={fullName}
                                            onChange={setFullName}
                                            placeholder="Contoh: Andru Pratama"
                                            error={errors.fullName}
                                        />

                                        <Field
                                            label="Email"
                                            required
                                            value={email}
                                            onChange={setEmail}
                                            placeholder="contoh@email.com"
                                            error={errors.email}
                                            type="email"
                                        />
                                    </div>

                                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                                        <SelectField
                                            label="Negara / wilayah"
                                            required
                                            value={country}
                                            onChange={setCountry}
                                            error={errors.country}
                                            options={[
                                                { value: "ID", label: "Indonesia" },
                                                { value: "SG", label: "Singapura" },
                                                { value: "MY", label: "Malaysia" },
                                                { value: "US", label: "Amerika Serikat" },
                                            ]}
                                        />

                                        <Field
                                            label="Alamat baris 1"
                                            required
                                            value={address1}
                                            onChange={setAddress1}
                                            placeholder="Jalan, nomor rumah, RT/RW"
                                            error={errors.address1}
                                        />
                                    </div>

                                    <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 p-4 ring-1 ring-white/70">
                                        <div className="text-sm font-semibold text-slate-800">
                                            Kursus sertifikasi yang kamu pilih
                                        </div>
                                        <div className="mt-2 flex flex-wrap items-center gap-2">
                                            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-white/70">
                                                Sertifikasi AI
                                            </span>
                                            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-white/70">
                                                Sertifikasi UI
                                            </span>
                                            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-white/70">
                                                Sertifikasi UX
                                            </span>
                                        </div>
                                        <div className="mt-2 text-sm text-slate-700">
                                            Kamu tetap checkout untuk: <b>{course.title}</b>
                                        </div>
                                    </div>
                                </div>

                                {/* action */}
                                <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                    <div className="text-xs text-slate-600">
                                        Dengan menekan <b>Bayar</b>, kamu menyetujui syarat & ketentuan.
                                    </div>

                                     
                                </div>

                                {Object.keys(errors).length > 0 && (
                                    <div className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-700 ring-1 ring-rose-200">
                                        Ada field yang belum diisi. Silakan periksa kembali.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6 overflow-hidden rounded-2xl bg-white/55 shadow-[0_30px_90px_rgba(15,23,42,0.12)] ring-1 ring-white/70 backdrop-blur-xl">
                            <div className="p-6 md:p-7">
                                <div className="text-lg font-extrabold text-slate-900">Paket Sertifikasi</div>
                                <div className="mt-2 text-sm text-slate-600">
                                    Sertifikasi AI, UI & UX — batch intensif.
                                </div>

                                <div className="mt-4 rounded-2xl bg-white/70 p-4 ring-1 ring-slate-200">
                                    <div className="text-sm font-bold text-slate-900">{course.title}</div>
                                    <div className="mt-1 text-sm text-slate-600">
                                        Metode: <b>{method === "gopay" ? "GoPay" : "Kartu"}</b>
                                    </div>
                                </div>

                                <div className="mt-5 border-t border-slate-200/80 pt-4">
                                    <div className="text-sm font-extrabold text-slate-900">Ringkasan pesanan</div>

                                    <div className="mt-3 space-y-2 text-sm text-slate-700">
                                        <div className="flex items-center justify-between">
                                            <span>Langganan / Kursus</span>
                                            <span className="font-semibold">{course.price}</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span>PPN (11%)</span>
                                            <span className="font-semibold">{rupiah(vat)}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between rounded-xl bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4 py-3 text-black">
                                        <span className="text-md font-semibold">Total
                                        </span>
                                        <span className="text-md font-extrabold">{course.price || rupiah(total)}</span>
                                    </div>

                                    <div className="mt-3 text-xs text-slate-600">
                                        Pembayaran akan diproses. Setelah berhasil, cek email untuk jadwal kelas berikutnya.
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={onPay}
                                    className="mt-5 w-full rounded-xl bg-gradient-to-r from-blue-400 via-blue-500 to-blue-800 px-6 py-3 text-sm font-extrabold text-white hover:bg-black-80"
                                >
                                    Bayar
                                </button>

                                <div className="mt-3 text-xs text-slate-500">
                                    Kamu bisa membatalkan kapan saja lewat pengaturan akun.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* bottom spacer */}
                <div className="h-10" />
            </div>
        </div>
    );
}
