/**
 * Appends a row to a Google Sheet via a Google Apps Script web app webhook.
 *
 * This avoids the need for a Google Cloud service account. Instead, a small
 * Apps Script bound to the target sheet is deployed as a web app, and its URL
 * is stored in the GOOGLE_SHEETS_WEBHOOK_URL environment variable.
 *
 * The Apps Script source lives in `docs/google-apps-script.gs` in this repo —
 * paste it into Extensions > Apps Script on your sheet and deploy it as a
 * web app ("Execute as: Me", "Who has access: Anyone").
 */

export type SubmissionPayload = {
  timestamp: string
  gifterName: string
  gifterEmail: string
  childName: string
  childAddress: string
  childCity: string
  childPostal: string
  occasion: string
  message: string
}

export async function appendSubmission(payload: SubmissionPayload): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error("Missing GOOGLE_SHEETS_WEBHOOK_URL environment variable")
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    // Apps Script web apps redirect to a script.googleusercontent.com URL; follow it.
    redirect: "follow",
  })

  const text = await res.text()

  if (!res.ok) {
    throw new Error(`Webhook responded with ${res.status}: ${text.slice(0, 300)}`)
  }

  // Apps Script returns JSON like {"result":"success"} on success.
  let json: { result?: string; error?: string } | null = null
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`Webhook returned non-JSON response: ${text.slice(0, 300)}`)
  }

  if (json?.result !== "success") {
    throw new Error(`Webhook reported failure: ${json?.error ?? text.slice(0, 300)}`)
  }
}
