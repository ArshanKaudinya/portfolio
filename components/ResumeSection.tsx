'use client'

import { Download } from 'lucide-react'

export default function ResumeSection() {
  const languages = ['Python', 'C/C++', 'JavaScript']
  const frameworks = ['React', 'Git & GitHub', 'RESTful APIs', 'Tailwind']
  const csTopics = ['DSA', 'Analytics', 'OOPS']

  return (
    <section id="résumé" className="min-h-screen px-6 text-white">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="inline-block px-1 backdrop-blur-md rounded-lg">
              <h2 className="-mt-2 text-4xl md:text-5xl font-semibold text-white drop-shadow-[0_0_8px_#ffffffaa] inline-flex items-center">
                Résumé
                <a href="/resume.pdf" download aria-label="Download Résumé">
                  <Download className="ml-2 mt-2 lg:mt-5 text-white hover:text-accent transition" size={24} />
                </a>
              </h2>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base">
          {/* Profile Summary */}
          <div className="border border-white/10 rounded-lg p-4 backdrop-blur-md">
            <h3 className="text-white text-lg font-semibold mb-2 drop-shadow-[0_0_6px_#ffffffcc]">
              Focus
            </h3>
            <hr className="border-t border-white/20 my-2 shadow-[0_0_8px_#ffffff40]" />
            <p className="text-white/75">
            I build practical, impact-driven systems across domains, combining clean architecture, efficient problem-solving, and a strong product sense. My work spans from low-level logic to user experience, driven by the goal of shipping things that work, scale, and make a real difference.
            </p>
          </div>

          {/* Education */}
          <div className="border border-white/10 rounded-lg p-4 backdrop-blur-md">
            <h3 className="text-white text-lg font-semibold mb-2 drop-shadow-[0_0_6px_#ffffffcc]">
              Education
            </h3>
            <hr className="border-t border-white/20 my-2 shadow-[0_0_8px_#ffffff40]" />
            <ul className="text-white/75 space-y-2">
              <li>
                <span className="text-white font-medium">
                  Vellore Institute of Technology, Chennai (exp. 2028)
                </span><br />
                B.Tech – Computer Science & Engineering
              </li>
              <li>
                <span className="text-white font-medium">
                  Mount Carmel School, Delhi
                </span><br />
                PCM with Computer Science
              </li>
            </ul>
          </div>

          {/* Course Work */}
          <div className="border border-white/10 rounded-lg p-4 backdrop-blur-md">
            <h3 className="text-white text-lg font-semibold mb-2 drop-shadow-[0_0_6px_#ffffffcc]">
              Course Work
            </h3>
            <hr className="border-t border-white/20 my-2 shadow-[0_0_8px_#ffffff40]" />
            <ul className="text-white/75 space-y-3">
              <li>
                <span className="text-white font-medium">Business Analytics:</span> Machine Learning, Data Mining, Data Visualization.
              </li>
              <li>
                <span className="text-white font-medium">Python, C/C++, OOPS:</span> A+ Grade in all courses.
              </li>
              <li>
                <span className="text-white font-medium">Finance Theory 1:</span> MIT OpenCourseWare
              </li>
              <li>
                <span className="text-white font-medium">Introduction to python:</span> MITx 6.00.1x
              </li>
            </ul>
          </div>

          {/* Co-Curriculars & Achievements */}
          <div className="border border-white/10 rounded-lg p-4 backdrop-blur-md">
            <h3 className="text-white text-lg font-semibold mb-0 drop-shadow-[0_0_6px_#ffffffcc]">
              Co-Curriculars & Achievements
            </h3>
            <div className="h-px w-full bg-white/20 my-3 shadow-[0_0_6px_#ffffff33]" />

            <ul className="text-white/75 space-y-0 text-sm md:text-base">
              <li>
                <span className="text-white font-medium">IEEE CS – Joint Management Lead:</span> Led 100+ members and executed large-scale technical and outreach events.
              </li>
              <li>
                <span className="text-white font-medium">House Captain:</span> Directed 300+ students with standout cultural performance and team discipline.
              </li>
              <li>
                <span className="text-white font-medium">Additional:</span> Founded coding club, won Programming Week, and led school productions for 1000+ attendees.
              </li>
            </ul>

          </div>



          {/* Skills */}
          <div className="border border-white/10 rounded-lg px-4 py-3 backdrop-blur-md md:col-span-2">
            <h3 className="text-white text-lg font-semibold mb-2 drop-shadow-[0_0_6px_#ffffffcc]">
              Skills
            </h3>
            <hr className="border-t border-white/20 my-2 shadow-[0_0_8px_#ffffff40]" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/75">
              <div>
                <h4 className="font-medium text-white drop-shadow-[0_0_4px_#ffffff88] mb-1">Languages</h4>
                <ul className="space-y-1 list-disc list-inside">
                  {languages.map((lang, i) => <li key={i}>{lang}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white drop-shadow-[0_0_4px_#ffffff88] mb-1">Frameworks & Tools</h4>
                <ul className="space-y-1 list-disc list-inside">
                  {frameworks.map((fw, i) => <li key={i}>{fw}</li>)}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-white drop-shadow-[0_0_4px_#ffffff88] mb-1">CS Topics</h4>
                <ul className="space-y-1 list-disc list-inside">
                  {csTopics.map((topic, i) => <li key={i}>{topic}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



