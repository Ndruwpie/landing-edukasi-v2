import { useRef, useState } from "react"

const categories = [
  "Professional & Personal Development",
  "Technology & Software",
  "Design",
  "Business",
  "Sales & Marketing",
  "Language",
  "Office Productivity",
]

const courses = [
  {
    title: "Storytelling dan Creative Writing untuk Menulis Cerita",
    instructor: "Meutia Azzura",
    role: "Content Writer",
    rating: 4.9,
    price: "Rp360.000",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    title: "Mulai Karier sebagai UX Designer",
    instructor: "Luky Primadani",
    role: "UX Researcher",
    rating: 4.8,
    price: "Rp166.667",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    title: "Kunci Sukses Memulai Travel Agency",
    instructor: "Agung Yoga Asmoro",
    role: "Tourism Entrepreneur",
    rating: 4.9,
    price: "Rp240.000",
    image:
      "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    title: "Sekretaris 101: Pengelolaan Surat dan Dokumen",
    instructor: "Regina Rima Rianti",
    role: "Executive Secretary",
    rating: 5.0,
    price: "Rp360.000",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    title: "E-Commerce 101: Kunci Sukses Berjualan Online",
    instructor: "Carissa Mashinta",
    role: "E-Commerce Manager",
    rating: 5.0,
    price: "Rp100.000",
    oldPrice: "Rp200.000",
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
]

export default function CourseSection() {
  const tagRef = useRef(null)
  const sliderRef = useRef(null)
  const [index, setIndex] = useState(0)

  const visibleCards = 4
  const cardWidth = 256
  const maxIndex = courses.length - visibleCards

  const scrollTagLeft = () =>
    tagRef.current.scrollBy({ left: -200, behavior: "smooth" })
  const scrollTagRight = () =>
    tagRef.current.scrollBy({ left: 200, behavior: "smooth" })

  const slideLeft = () => {
    if (index > 0) {
      setIndex(index - 1)
      sliderRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" })
    }
  }

  const slideRight = () => {
    if (index < maxIndex) {
      setIndex(index + 1)
      sliderRef.current.scrollBy({ left: cardWidth, behavior: "smooth" })
    }
  }

  return (
    <section className="-mt-6 w-full bg-slate-900 pb-12 pt-0">
      <div className="mx-auto max-w-6xl px-4">

        <div className="rounded-2xl bg-gradient-to-br from-slate-800 via-indigo-800 to-slate-900 p-6">

          {/* HEADER */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Kelas Pro Course
            </h2>
            <a href="#" className="text-sm text-indigo-200 hover:text-white">
              Lihat Semua →
            </a>
          </div>

          {/* TAG SLIDER */}
          <div className="relative mb-8">
            <button
              onClick={scrollTagLeft}
              className="-translate-y-1/2 absolute left-0 top-1/2
                         z-10 h-8 w-8 rounded-full bg-slate-900 text-white"
            >
              ‹
            </button>

            <div ref={tagRef} className="flex gap-3 overflow-hidden px-10">
              {categories.map((cat, i) => (
                <span
                  key={i}
                  className="whitespace-nowrap rounded-full bg-slate-900/80 px-4 py-2 text-sm text-white"
                >
                  {cat}
                </span>
              ))}
            </div>

            <button
              onClick={scrollTagRight}
              className="-translate-y-1/2 absolute right-0 top-1/2
                         z-10 h-8 w-8 rounded-full bg-slate-900 text-white"
            >
              ›
            </button>
          </div>

          {/* COURSE SLIDER */}
          <div className="relative">
            <div ref={sliderRef} className="flex gap-4 overflow-hidden pb-14">
              {courses.map((c, i) => (
                <div
                  key={i}
                  className="
                    flex
                    min-w-[240px] cursor-pointer flex-col
                    overflow-hidden rounded-xl
                    bg-white shadow-md transition
                    hover:scale-[1.02]"
                >
                  {/* IMAGE */}
                  <div className="relative h-[120px] shrink-0">
                    <img
                      src={c.image}
                      alt={c.title}
                      className="h-full w-full object-cover"
                    />
                    {c.badge && (
                      <span className="absolute right-2 top-2 rounded bg-green-500 px-2 py-1 text-xs text-white">
                        {c.badge}
                      </span>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col p-3">
                    <h3 className="mb-2 line-clamp-2 min-h-[40px] text-sm font-semibold text-slate-800">
                      {c.title}
                    </h3>

                    <div className="mb-2 flex items-center gap-2">
                      <img
                        src={c.avatar}
                        alt={c.instructor}
                        className="h-6 w-6 rounded-full"
                      />
                      <p className="text-xs text-slate-500">
                        {c.instructor} · {c.role}
                      </p>
                    </div>

                    <div className="mb-2 flex items-center gap-1 text-sm text-yellow-400">
                      ★ ★ ★ ★ ★
                      <span className="ml-1 text-xs text-slate-600">
                        {c.rating}
                      </span>
                    </div>

                    <div className="mt-auto text-sm font-semibold text-slate-800">
                      {c.price}
                      {c.oldPrice && (
                        <span className="ml-2 text-xs text-slate-400 line-through">
                          {c.oldPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DOTS */}
            <div className="-translate-x-1/2 absolute bottom-3 left-1/2 flex justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            {/* ARROWS */}
            <div className="absolute -bottom-2 right-2 flex gap-2">
              <button
                onClick={slideLeft}
                className="h-9 w-9 rounded-full bg-white shadow"
              >
                ‹
              </button>
              <button
                onClick={slideRight}
                className="h-9 w-9 rounded-full bg-white shadow"
              >
                ›
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
