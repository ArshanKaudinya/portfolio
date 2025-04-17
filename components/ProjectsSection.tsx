'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    name: 'Thriftee',
    description:
      'A full-stack thrift marketplace for India with real-time chat, item posting, and a sleek UI. Built with <span class="glow">Next.js</span>, <span class="glow">Supabase</span>, and <span class="glow">Tailwind</span>.',
    image: '/assets/thriftee.png',
    repo: 'https://github.com/ArshanKaudinya/thriftee',
    live: 'https://thriftee-alpha.vercel.app',
  },
  {
    name: 'Thrifty',
    description:
      'An early version of Thriftee focused on core concepts of full stack dev. Built with <span class="glow">React</span>, <span class="glow">Django</span>, <span class="glow">Supabase</span> and <span class="glow">Core CSS</span>.',
    image: '/projects/thrifty.png',
    repo: 'https://github.com/arshankaudinya/thrifty',
  },
  {
    name: 'Sorting Visualizer',
    description:
      'A clean and fast sorting visualizer built with <span class="glow">React</span>. Includes <span class="glow">bubble</span>, <span class="glow">merge</span>, <span class="glow">quick</span> and <span class="glow">insertion</span> sort.',
    image: '/projects/sorting.png',
    repo: 'https://github.com/arshankaudinya/sorting-visualizer',
  },
]

const layout = [
  { top: '10%', left: '10%' },
  { top: '35%', left: '40%' },
  { top: '60%', left: '70%' },
]

function shuffle<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item)
}

export default function ProjectsSection() {
  const [assignedLayout, setAssignedLayout] = useState<typeof layout>([])

  const reshuffle = () => {
    const shuffled = shuffle(layout).slice(0, projects.length)
    setAssignedLayout(shuffled)
  }

  useEffect(() => {
    reshuffle()
  }, [])

  if (!assignedLayout.length) return null

  return (
    <section
      id="projects"
      className="min-h-screen px-6 text-text relative overflow-hidden"
    >
      <div className="flex justify-center">
        <div className="inline-block px-1 backdrop-blur-md rounded-lg">
          <h2 className="text-4xl md:text-5xl font-semibold text-white drop-shadow-[0_0_8px_#ffffffaa]">
            My Work
          </h2>
        </div>
      </div>

      {/* MOBILE: single column cards */}
      <div className="flex flex-col mt-6 space-y-6 sm:px-28 [@media(min-width:1200px)]:hidden">
        {projects.map((p, i) => (
          <div
            key={i}
            className="w-full h-80 transition-transform duration-300 hover:scale-[1.02] hover:z-20"
          >
            <div className="bg-surface/70 backdrop-blur-md border border-border rounded-xl shadow-lg p-4 flex flex-col justify-between h-full transition-all duration-250 overflow-hidden hover:shadow-[0_0_25px_#ffffff77]">
              <div className="relative w-full h-38 rounded overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover rounded" />
              </div>
              <div className="mt-2">
                <h3 className="text-white font-bold text-lg">{p.name}</h3>
                <p
                  className="text-[#B0B0B0] text-sm mt-1"
                  dangerouslySetInnerHTML={{ __html: p.description }}
                />
              </div>
              <div className="flex gap-4 mt-3 text-sm">
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  <Github size={18} />
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP: scattered absolute cards */}
      <div className="relative w-full h-[60vh] hidden [@media(min-width:1200px)]:block">
        {projects.map((p, i) => (
          <div
            key={i}
            className="absolute w-80 h-80 transition-transform duration-300 hover:scale-[1.07] hover:z-20"
            style={{
              top: assignedLayout[i]?.top,
              left: assignedLayout[i]?.left,
            }}
          >
            <div className="bg-surface/70 backdrop-blur-md border border-border rounded-xl shadow-lg p-4 flex flex-col justify-between h-full transition-all duration-250 overflow-hidden hover:shadow-[0_0_25px_#ffffff77]">
              <div className="relative w-full h-38 rounded overflow-hidden">
                <Image src={p.image} alt={p.name} fill className="object-cover rounded" />
              </div>
              <div className="mt-2">
                <h3 className="text-white font-bold text-lg">{p.name}</h3>
                <p
                  className="text-[#B0B0B0] text-sm mt-1"
                  dangerouslySetInnerHTML={{ __html: p.description }}
                />
              </div>
              <div className="flex gap-4 mt-3 text-sm">
                <a href={p.repo} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  <Github size={18} />
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

