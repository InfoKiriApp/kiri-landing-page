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
  console.log("[v0] WEBHOOK: appendRow() called with", values.length, "values")
  
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  console.log("[v0] WEBHOOK: GOOGLE_SHEETS_WEBHOOK_URL env var is:", webhookUrl ? "SET" : "MISSING")
  
  if (!webhookUrl) {
    console.log("[v0] WEBHOOK: ERROR - GOOGLE_SHEETS_WEBHOOK_URL not found in environment")
    throw new Error("Missing GOOGLE_SHEETS_WEBHOOK_URL environment variable")
  }

  console.log("[v0] WEBHOOK: Preparing request to webhook")
  const requestBody = { row: values }
  console.log("[v0] WEBHOOK: Request body prepared, calling fetch()")

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
      // Don't follow redirects - just check the response status
      redirect: "manual",
    })

    console.log("[v0] WEBHOOK: Response received with status:", res.status, res.statusText)

    // Google Apps Script returns 302 redirects on POST, which is normal.
    if (res.status === 302 || res.status === 301 || res.status === 307 || res.status === 308) {
      console.log("[v0] WEBHOOK: Got expected redirect status", res.status, "- treating as success")
      // The script executed and sent a redirect - this means it worked.
      return
    }

    console.log("[v0] WEBHOOK: Response status is not a redirect, attempting to parse as JSON")
    const text = await res.text()
    console.log("[v0] WEBHOOK: Response text (first 500 chars):", text.slice(0, 500))

    // Apps Script returns JSON like {"result":"success"} on success.
    // Try to parse as JSON regardless of HTTP status, since Apps Script may return various status codes.
    let json: { result?: string; error?: string } | null = null
    try {
      json = JSON.parse(text)
      console.log("[v0] WEBHOOK: JSON parsed successfully:", json)
    } catch (err) {
      console.log("[v0] WEBHOOK: Failed to parse JSON response")
      console.log("[v0] WEBHOOK: Error:", err instanceof Error ? err.message : String(err))
      throw new Error(`Webhook returned non-JSON response (status ${res.status}): ${text.slice(0, 300)}`)
    }

    if (json?.result !== "success") {
      console.log("[v0] WEBHOOK: JSON result is not 'success'")
      console.log("[v0] WEBHOOK: json.result:", json?.result)
      console.log("[v0] WEBHOOK: json.error:", json?.error)
      throw new Error(`Webhook reported failure: ${json?.error ?? text.slice(0, 300)}`)
    }
    
    console.log("[v0] WEBHOOK: Success - row appended")
  } catch (err) {
    console.log("[v0] WEBHOOK: Exception caught in appendRow()")
    console.log("[v0] WEBHOOK: Error type:", err instanceof Error ? err.constructor.name : typeof err)
    console.log("[v0] WEBHOOK: Error message:", err instanceof Error ? err.message : String(err))
    if (err instanceof Error && err.stack) {
      console.log("[v0] WEBHOOK: Stack trace:", err.stack)
    }
    throw err
  }
}
