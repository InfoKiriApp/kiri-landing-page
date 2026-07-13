import { JWT } from "google-auth-library"

/**
 * Server-side Google Sheets helper.
 *
 * Requires the following environment variables (set in Vercel + .env.local):
 * - GOOGLE_SERVICE_ACCOUNT_EMAIL  The service account email address.
 * - GOOGLE_PRIVATE_KEY            The service account private key (PEM).
 *                                 When pasted into an env var the newlines are
 *                                 usually escaped as "\n", so we unescape them.
 * - GOOGLE_SHEET_ID               The spreadsheet ID (from the sheet URL).
 * - GOOGLE_SHEET_RANGE            Optional. Defaults to "Sheet1!A:Z".
 */

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]

function getPrivateKey(): string {
  let key = process.env.GOOGLE_PRIVATE_KEY
  if (!key) {
    throw new Error("Missing GOOGLE_PRIVATE_KEY environment variable")
  }

  key = key.trim()

  // Some dashboards store the value wrapped in surrounding quotes — strip them.
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1)
  }

  // If the key is base64-encoded (no PEM header present), decode it.
  if (!key.includes("BEGIN") && /^[A-Za-z0-9+/=\s]+$/.test(key)) {
    try {
      const decoded = Buffer.from(key, "base64").toString("utf8")
      if (decoded.includes("BEGIN")) {
        key = decoded
      }
    } catch {
      // fall through and use the raw value
    }
  }

  // Env vars often store newlines escaped as literal "\n"; convert them back.
  key = key.replace(/\\n/g, "\n")

  return key
}

function getJwtClient(): JWT {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  if (!email) {
    throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL environment variable")
  }

  return new JWT({
    email,
    key: getPrivateKey(),
    scopes: SCOPES,
  })
}

/**
 * Appends a single row of values to the configured Google Sheet.
 * Throws if the request fails so callers can handle the error and avoid
 * redirecting the customer to checkout.
 */
export async function appendRow(values: (string | number)[]): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID
  if (!spreadsheetId) {
    throw new Error("Missing GOOGLE_SHEET_ID environment variable")
  }
  const range = process.env.GOOGLE_SHEET_RANGE || "Sheet1!A:Z"

  const client = getJwtClient()
  const { token } = await client.getAccessToken()
  if (!token) {
    throw new Error("Failed to obtain Google access token")
  }

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}` +
    `/values/${encodeURIComponent(range)}:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [values] }),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Google Sheets append failed (${res.status}): ${detail}`)
  }
}
