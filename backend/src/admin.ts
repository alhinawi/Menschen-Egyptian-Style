// Teacher dashboard: per-student progress summaries for the site owner.
//
// The learner's synced progress blob is the same localStorage mirror the
// leaderboard scores from: top-level keys are localStorage keys, lesson
// states live in the "menschen-book-*" / "native-*" entries as JSON strings
// holding {page, done-*, field-*, ...}. This parser reads ONE student's blob
// per request (the owner opens one student at a time), summarizes it, and
// never returns written answers - only counts and the current page number.

export type LessonSummary = {
  /** localStorage key without its synced prefix, e.g. "kb-a11-2-3" */
  lesson: string
  /** last page index the student opened in that lesson, when recorded */
  page: number | null
  /** checked-off exercises (done-* flags) inside the lesson state */
  exercises_done: number
  /** text/select fields holding a non-empty answer */
  answered_fields: number
}

export type ProgressSummary = {
  lessons_touched: number
  exercises_done: number
  answered_fields: number
  lessons: LessonSummary[]
}

const LESSON_PREFIXES = ['menschen-book-', 'native-']

const isPlainObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

export function summarizeProgress(data: string): ProgressSummary {
  const lessons: LessonSummary[] = []
  let exercises = 0
  let answered = 0
  try {
    const blob: unknown = JSON.parse(data)
    if (!isPlainObject(blob)) throw new Error('blob is not an object')
    for (const [key, raw] of Object.entries(blob)) {
      const prefix = LESSON_PREFIXES.find((p) => key.startsWith(p))
      if (!prefix || typeof raw !== 'string') continue
      let state: unknown
      try {
        state = JSON.parse(raw)
      } catch {
        continue // plain string setting, no lesson state inside
      }
      if (!isPlainObject(state)) continue
      let done = 0
      let fields = 0
      let page: number | null = null
      const walk = (v: Record<string, unknown>) => {
        // Sub-answer flags count one each; an exercise's group flag is ignored once it has any.
        const flags = Object.keys(v).filter((k) => k.startsWith('done-') && v[k] === true)
        const parents = new Set(flags.filter((k) => k.includes(':f-')).map((k) => k.slice(0, k.indexOf(':f-'))))
        done += flags.filter((k) => !parents.has(k)).length
        for (const [k, val] of Object.entries(v)) {
          if (k === 'page' && typeof val === 'number') page = val
          else if (k.startsWith('done-') && val === true) continue
          else if (k.startsWith('field-') && typeof val === 'string' && val.trim()) fields++
          else if (isPlainObject(val)) walk(val)
        }
      }
      walk(state)
      exercises += done
      answered += fields
      lessons.push({ lesson: key.slice(prefix.length), page, exercises_done: done, answered_fields: fields })
    }
  } catch {
    // unreadable blob: report an empty summary rather than failing the view
  }
  // Most active lessons first; the rest follow in storage order.
  lessons.sort((a, b) => b.exercises_done - a.exercises_done || b.answered_fields - a.answered_fields)
  return { lessons_touched: lessons.length, exercises_done: exercises, answered_fields: answered, lessons }
}
