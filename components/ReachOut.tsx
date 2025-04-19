'use client'

import { useState } from 'react'
import { Mail, Github, Linkedin, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function ReachOut() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [easterInput, setEasterInput] = useState('')
  const [easterMsg, setEasterMsg] = useState('')
  const [loading, setLoading]   = useState(false)
  const [errorMsg, setErrorMsg] = useState('')


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg('')
    setLoading(true)
  
    try {
      const payload = { ...form, website: '', ts: Date.now() }
  
      const res = await fetch('/api/reach-out', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
  
      if (!res.ok) {
        const txt = await res.text()
        const reason =
          res.status === 400 ? 'Too short / too quick'
          : res.status === 429 ? 'Too many requests — slow down'
          : 'Server error'
        setErrorMsg(`${reason}. If this keeps happening, email me directly.`)
        throw new Error(txt)
      }
  
      setSubmitted(true)
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('Form submission failed:', err)
    } finally {
      setLoading(false)
    }
  }
  
  

  const handleEaster = (e: React.FormEvent) => {
    e.preventDefault()
    if (easterInput.trim().toLowerCase() === 'secret123') {
      router.push('/secret-route')
    } else {
      setEasterMsg('nuh uh, try again :(')
    }
  }

  return (
    <section id="reachout" className="min-h-[88vh] px-6 py-14 text-white">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex justify-center">
          <div className="inline-block px-1 backdrop-blur-md rounded-lg">
            <h2 className="text-4xl md:text-5xl font-semibold text-white drop-shadow-[0_0_8px_#ffffffaa]">
              Reach out
            </h2>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="inline-block px-1 backdrop-blur-md rounded-lg">
            <p className="text-center text-white/70 text-lg">
              If you’ve got an opportunity, let’s talk.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6 mx-auto w-full lg:ml-[10%] max-w-md">
            <div className="mx-auto lg:w-[70%] w-[100%] flex items-center gap-3 text-white/90 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-md border border-white/10 shadow-sm">
              <Mail size={20} className="text-white/80" />
              <span className="text-sm md:text-base text-white/80 tracking-wide">
                {process.env.NEXT_PUBLIC_PORTFOLIO_EMAIL}
              </span>
            </div>

            <div className="mx-auto lg:w-[70%] w-[80%] flex justify-between gap-4 mt-4">
              <a
                href="https://github.com/arshankaudinya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm hover:shadow-[0_0_8px_#ffffff55] transition"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/arshankaudinya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm hover:shadow-[0_0_8px_#ffffff55] transition"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border border-white/20 rounded-md text-sm bg-white/5 backdrop-blur-sm hover:shadow-[0_0_8px_#ffffff33] transition"
              >
                Download Résumé
              </a>
            </div>
            <div className="mx-auto lg:w-[70%] w-[80%]">
              <p className="text-center backdrop-blur-sm text-white/80 italic text-sm md:text-base">
              It&apos;s more than design and code, it&apos;s a part of me. I genuinely hope you loved exploring it.<br></br>much love, Arshan.
              </p>
            </div>
          </div>


          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-sm text-white/90">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-md px-4 py-2 outline-none focus:border-white focus:shadow-[0_0_4px_#ffffff55] transition placeholder-white/60 shadow-inner"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-md px-4 py-2 outline-none focus:border-white focus:shadow-[0_0_4px_#ffffff55] transition placeholder-white/60 shadow-inner"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            required
            className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-md px-4 py-2 outline-none focus:border-white focus:shadow-[0_0_4px_#ffffff55] transition placeholder-white/60 shadow-inner"
            value={form.message}
            onChange={handleChange}
          />

          {/* Honeypot field */}
          {/* This field is hidden from users but will be filled by bots */}
          <input type="text" name="website" className="hidden" autoComplete="off" />
          <input type="hidden" name="ts" value={Date.now()} />

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-white/10 px-6 py-2 rounded-md hover:bg-white/20 transition flex items-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader2 className="animate-spin text-white/60" size={16} />}
              Send
            </button>

            {submitted && !loading && (
              <p className="text-green-400 text-sm">Thanks! I&apos;ll get back to you soon.</p>
            )}
            {errorMsg && !loading && (
              <p className="text-rose-400 text-sm">{errorMsg}</p>
            )}
          </div>

          </form>
        </div>
        <form onSubmit={handleEaster} className="pt-10">
        <div className="relative w-full md:w-1/2 mx-auto">
          <div className="absolute inset-0 rounded-md bg-white/10 backdrop-blur-sm shadow-inner z-[-1]" />
          <input
            type="text"
            placeholder="Found any clues?"
            value={easterInput}
            onChange={(e) => setEasterInput(e.target.value)}
            className="w-full text-center bg-black/30 text-white/90 border border-dashed border-white/20 rounded-md px-4 py-2 outline-none focus:border-white focus:shadow-[0_0_4px_#ffffff55] transition placeholder-white/60 font-mono tracking-wide relative z-10"
          />
        </div>


          {easterMsg && (
            <p className="text-center text-rose-400 text-sm mt-2">{easterMsg}</p>
          )}
        </form>
      </div>
    </section>
  )
}



