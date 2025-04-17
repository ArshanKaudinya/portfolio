'use client'

export default function Hero() {
  return (
    <section id='home' className="h-screen flex flex-col pointer-events-none z-10 items-center justify-center text-center">
      <div className="backdrop-blur-sm rounded-xl px-0">
        <h1 className="text-4xl font-outfit md:text-7xl font-bold tracking-tight text-white drop-shadow-[0_0_1.2px_#ffffff]">
          Arshan Kaudinya
        </h1>
        <div className="relative inline">
          <span className="shimmer-text text-white text-lg tracking-wide relative z-10">
            Engineering what’s next
          </span>
        </div>
      </div>
    </section>

  )
}

