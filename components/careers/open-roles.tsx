"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import FadeIn from "./fade-in"
import { ApplyButton } from "./application/provider"
import { JOBS, type Job, type JobArea } from "@/lib/careers"

type Filter = "todos" | JobArea

const FILTERS: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  ...JOBS.map((job) => ({ id: job.area, label: job.filterLabel })),
]

function JobCard({
  job,
  open,
  onToggle,
}: {
  job: Job
  open: boolean
  onToggle: () => void
}) {
  const reduceMotion = useReducedMotion()
  const panelId = `puesto-${job.area}`
  const buttonId = `${panelId}-boton`

  return (
    <article
      className={`rounded-3xl border bg-white transition-shadow ${
        open ? "border-kiri-purple/40 shadow-md" : "border-kiri-lilac shadow-sm hover:shadow-md"
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-4 rounded-3xl p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple md:p-7"
        >
          <span className="text-2xl leading-none" aria-hidden="true">
            {job.emoji}
          </span>
          <span className="flex flex-1 flex-col gap-2">
            <span className="text-lg font-bold text-kiri-ink md:text-xl">{job.title}</span>
            <span className="text-sm leading-relaxed text-kiri-ink/70">{job.summary}</span>
            <span className="flex flex-wrap gap-2 pt-1">
              <span className="rounded-full bg-kiri-lilac/60 px-3 py-1 text-xs font-semibold text-kiri-purple">
                Prácticas
              </span>
              <span className="rounded-full bg-kiri-blush px-3 py-1 text-xs font-semibold text-kiri-magenta">
                Híbrido Madrid
              </span>
            </span>
          </span>
          <ChevronDown
            className={`mt-1 h-5 w-5 flex-shrink-0 text-kiri-purple transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
            aria-hidden="true"
          />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-6 border-t border-kiri-lilac px-6 pb-7 pt-6 md:px-7 md:pl-[4.25rem]">
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-kiri-magenta">Qué harás</h4>
                <ul className="flex flex-col gap-2">
                  {job.tasks.map((task) => (
                    <li key={task} className="flex gap-3 text-sm leading-relaxed text-kiri-ink/80">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-kiri-purple" aria-hidden="true" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-kiri-magenta">Encajas si</h4>
                <p className="text-sm leading-relaxed text-kiri-ink/80">{job.fit}</p>
              </div>
              {job.bonus && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-kiri-magenta">Valoramos</h4>
                  <p className="text-sm leading-relaxed text-kiri-ink/80">{job.bonus}</p>
                </div>
              )}
              <ApplyButton
                area={job.area}
                className="inline-flex items-center gap-2 self-start rounded-full bg-kiri-purple px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2"
              >
                Aplicar a este puesto
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </ApplyButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export default function OpenRoles() {
  const [filter, setFilter] = useState<Filter>("todos")
  const [openArea, setOpenArea] = useState<JobArea | null>(null)

  const visibleJobs = filter === "todos" ? JOBS : JOBS.filter((job) => job.area === filter)

  return (
    <section id="puestos" className="scroll-mt-24 px-6 py-20">
      <div className="mx-auto flex max-w-4xl flex-col gap-10">
        <FadeIn className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-kiri-magenta">Puestos abiertos</p>
          <h2 className="font-serif text-3xl font-bold text-kiri-ink text-balance md:text-4xl">
            Encuentra tu sitio en Kiri
          </h2>
        </FadeIn>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar puestos por área">
          {FILTERS.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kiri-purple focus-visible:ring-offset-2 ${
                  active
                    ? "bg-kiri-purple text-white"
                    : "bg-kiri-lilac/50 text-kiri-purple hover:bg-kiri-lilac"
                }`}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        <div className="flex flex-col gap-4">
          {visibleJobs.map((job) => (
            <JobCard
              key={job.area}
              job={job}
              open={openArea === job.area}
              onToggle={() => setOpenArea((current) => (current === job.area ? null : job.area))}
            />
          ))}
        </div>

        <p className="text-sm leading-relaxed text-kiri-ink/70">
          ¿No cumples todo? No pasa nada. Si el proyecto te motiva y te ves en la mayoría de puntos, aplica.
        </p>
      </div>
    </section>
  )
}
