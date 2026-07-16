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
 *
 * The server sends an ordered array of cell values as `{ row: [...] }`, and the
 * Apps Script appends it verbatim. This keeps the column layout defined in one
 * place (the API route) without needing to edit the script when fields change.
 */

export async function appendRow(values: (string | number)[]): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error("Missing GOOGLE_SHEETS_WEBHOOK_URL environment variable")
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ row: values }),
    // Apps Script web apps redirect to a script.googleusercontent.com URL; follow it.
    redirect: "follow",
  })

  const text = await res.text()

  // Apps Script returns JSON like {"result":"success"} on success.
  // Try to parse as JSON regardless of HTTP status, since Apps Script may return various status codes.
  let json: { result?: string; error?: string } | null = null
  try {
    json = JSON.parse(text)
  } catch {
    throw new Error(`Webhook returned non-JSON response (status ${res.status}): ${text.slice(0, 300)}`)
  }

  if (json?.result !== "success") {
    throw new Error(`Webhook reported failure: ${json?.error ?? text.slice(0, 300)}`)
  }
}
