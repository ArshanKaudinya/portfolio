import Hero from '@/components/Hero'
import ProjectsSection from '@/components/ProjectsSection'
import NavBar from '@/components/Navbar'
import Blobs from '@/components/ParticleField'
import ResumeSection from '@/components/ResumeSection'
import ReachOut from '@/components/ReachOut'

export default function HomePage() {
  return (
    <div className="relative w-screen min-h-screen text-white scroll-smooth overflow-x-hidden">
      <div className="fixed pointer-events-auto inset-0 -z-10">
        <div className="w-screen h-screen">
          <Blobs />
        </div>
      </div>

      {/* add px & keep desktop as-is */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative z-10 px-4 sm:px-6 md:px-10"
      >
        <Hero />
      </section>

      {/* add px + some vertical padding */}
      <section
        id="projects"
        className="relative z-10 px-4 sm:px-6 md:px-10 py-8 sm:py-12"
      >
        <ProjectsSection />
      </section>

      <section
        id="résumé"
        className="relative z-10 px-4 sm:px-6 md:px-10 py-8 sm:py-12"
      >
        <ResumeSection />
      </section>

      <section
        id="contacts"
        className="relative z-10 px-4 sm:px-6 md:px-10 py-8 sm:py-12"
      >
        <ReachOut />
      </section>

      <NavBar />
    </div>
  )
}





