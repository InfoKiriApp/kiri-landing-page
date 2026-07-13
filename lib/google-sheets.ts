/**
 * Appends a row to a Google Sheet via a Google Apps Script web app webhook.
 *
 * The server sends the full named data object. The Apps Script builds the row
 * from named fields, so column order is defined in the script — not here.
 * This means changing fields never requires updating this helper.
 */

export type SubmissionData = {
  timestamp: string
  gifterFirstName: string
  gifterLastName: string
  gifterEmail: string
  childFirstName: string
  childLastName: string
  relationship: string
  parentFirstName: string
  parentLastName: string
  parentEmail: string
  street: string
  number: string
  floor: string
  postal: string
  city: string
  country: string
  occasion: string
  message: string
}

export async function appendRow(data: SubmissionData): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error("Missing GOOGLE_SHEETS_WEBHOOK_URL environment variable")
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
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
