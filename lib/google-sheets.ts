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
  console.log("[REGALA-KIRI WEBHOOK] appendRow called with", values.length, "values")
  
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  console.log("[REGALA-KIRI WEBHOOK] Webhook URL environment variable:", webhookUrl ? "SET" : "MISSING")
  
  if (!webhookUrl) {
    console.log("[REGALA-KIRI WEBHOOK] ERROR: Missing GOOGLE_SHEETS_WEBHOOK_URL")
    throw new Error("Missing GOOGLE_SHEETS_WEBHOOK_URL environment variable")
  }

  console.log("[REGALA-KIRI WEBHOOK] Making fetch request to webhook")
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ row: values }),
    // Don't follow redirects - just check the response status
    redirect: "manual",
  })

  console.log("[REGALA-KIRI WEBHOOK] Webhook response received - status:", res.status, "statusText:", res.statusText)

  // Google Apps Script returns 302 redirects on POST, which is normal.
  if (res.status === 302 || res.status === 301 || res.status === 307 || res.status === 308) {
    console.log("[REGALA-KIRI WEBHOOK] Redirect response received, treating as success")
    // The script executed and sent a redirect - this means it worked.
    return
  }

  console.log("[REGALA-KIRI WEBHOOK] Response is not a redirect, reading response text")
  const text = await res.text()
  console.log("[REGALA-KIRI WEBHOOK] Response text (first 500 chars):", text.slice(0, 500))

  // Apps Script returns JSON like {"result":"success"} on success.
  // Try to parse as JSON regardless of HTTP status, since Apps Script may return various status codes.
  let json: { result?: string; error?: string } | null = null
  try {
    json = JSON.parse(text)
    console.log("[REGALA-KIRI WEBHOOK] JSON parsed successfully:", json)
  } catch (err) {
    console.log("[REGALA-KIRI WEBHOOK] ERROR: Failed to parse JSON")
    throw new Error(`Webhook returned non-JSON response (status ${res.status}): ${text.slice(0, 300)}`)
  }

  if (json?.result !== "success") {
    console.log("[REGALA-KIRI WEBHOOK] ERROR: result is not 'success'", { result: json?.result, error: json?.error })
    throw new Error(`Webhook reported failure: ${json?.error ?? text.slice(0, 300)}`)
  }
  
  console.log("[REGALA-KIRI WEBHOOK] SUCCESS: Row appended")
}
