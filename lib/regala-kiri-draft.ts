const DRAFT_KEY = "kiri:regala-draft:v1"
const DRAFT_TTL_MS = 1000 * 60 * 60 * 24 * 30

// Consent and the child's photo are never stored: consent must be given fresh, and the photo is sensitive on shared devices.
export type DraftableForm = Record<string, string>

type StoredDraft = {
  savedAt: number
  step: number
  form: DraftableForm
}

export function loadDraft(): StoredDraft | null {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY)
    if (!raw) return null
    const draft = JSON.parse(raw) as StoredDraft
    if (Date.now() - draft.savedAt > DRAFT_TTL_MS) {
      window.localStorage.removeItem(DRAFT_KEY)
      return null
    }
    return draft
  } catch {
    return null
  }
}

export function saveDraft(step: number, form: DraftableForm) {
  try {
    const hasContent = Object.entries(form).some(([key, value]) => key !== "country" && value.trim() !== "")
    if (!hasContent) return
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify({ savedAt: Date.now(), step, form }))
  } catch {
    // Storage can be full or blocked (private mode); the form keeps working without a draft.
  }
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(DRAFT_KEY)
  } catch {}
}
