'use client'

import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const sections = ['home', 'projects', 'résumé', 'contacts']

export default function NavBar() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const scrollTo = (index: number) => {
    const id = sections[index]
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setCurrentIndex(index)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = sections.indexOf(entry.target.id)
            if (i !== -1) setCurrentIndex(i)
          }
        })
      },
      { threshold: 0.5 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Mobile-only: centered, show only active with left/right arrows */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden flex items-center gap-4 text-[#EDEDED] z-50">
        <button
          onClick={() => scrollTo(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className={`transition hover:text-[#9E9E9E] ${currentIndex === 0 ? 'opacity-30 cursor-default' : ''}`}
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-white text-base font-medium">{sections[currentIndex]}</span>
        <button
          onClick={() => scrollTo(Math.min(sections.length - 1, currentIndex + 1))}
          disabled={currentIndex === sections.length - 1}
          className={`transition hover:text-[#9E9E9E] ${currentIndex === sections.length - 1 ? 'opacity-30 cursor-default' : ''}`}
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Desktop-only: original vertical nav */}
      <div className="hidden md:flex fixed font-outfit top-6 left-6 z-50 flex-col items-center gap-3 text-[#EDEDED] font-medium">
        <button
          onClick={() => scrollTo(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className={`transition hover:text-[#9E9E9E] ${currentIndex === 0 ? 'opacity-30 cursor-default' : ''}`}
        >
          <ChevronUp size={22} />
        </button>

        <div className="backdrop-blur-sm flex flex-col gap-1 items-center text-xl">
          {sections.map((s, i) => (
            <button
              key={s}
              onClick={() => scrollTo(i)}
              className={`transition ${
                i === currentIndex
                  ? 'text-white drop-shadow-[0_0_12px_white]'
                  : 'text-white/70 hover:text-[#9E9E9E]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo(Math.min(sections.length - 1, currentIndex + 1))}
          disabled={currentIndex === sections.length - 1}
          className={`transition hover:text-[#9E9E9E] ${currentIndex === sections.length - 1 ? 'opacity-30 cursor-default' : ''}`}
        >
          <ChevronDown size={22} />
        </button>
      </div>
    </>
  )
}



