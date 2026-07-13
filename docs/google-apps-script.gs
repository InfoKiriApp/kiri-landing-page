/**
 * Regala Kiri — Google Apps Script webhook
 *
 * SETUP (one time, ~2 minutes):
 * 1. Open your Google Sheet.
 * 2. Add a header row in row 1 with these columns (order matters):
 *      Timestamp | Gifter First Name | Gifter Last Name | Gifter Email |
 *      Child First Name | Child Last Name | Relationship |
 *      Parent First Name | Parent Last Name | Parent Email |
 *      Street | Number | Floor | Postal | City | Country | Occasion | Message
 * 3. Go to Extensions > Apps Script.
 * 4. Delete any starter code, paste THIS entire file, and Save.
 * 5. Click Deploy > New deployment.
 *      - Type: Web app
 *      - Description: Regala Kiri webhook
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 6. Click Deploy, authorize when prompted, and COPY the "Web app URL".
 *    It looks like: https://script.google.com/macros/s/AKfycb.../exec
 * 7. Give that URL to v0 to store as GOOGLE_SHEETS_WEBHOOK_URL.
 *
 * Whenever you change this script, create a NEW deployment (or "Manage
 * deployments" > edit > Version: New version) so the URL serves the update.
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Build the row from named fields — column order is defined here, not in the server.
    // Add or reorder fields freely; the server always sends the full named object.
    sheet.appendRow([
      data.timestamp            || new Date().toISOString(),
      data.gifterFirstName      || "",
      data.gifterLastName       || "",
      data.gifterEmail          || "",
      data.childFirstName       || "",
      data.childLastName        || "",
      data.relationship         || "",
      data.parentFirstName      || "",
      data.parentLastName       || "",
      data.parentEmail          || "",
      data.street               || "",
      data.number               || "",
      data.floor                || "",
      data.postal               || "",
      data.city                 || "",
      data.country              || "",
      data.occasion             || "",
      data.message              || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Optional: lets you confirm the deployment is live by visiting the URL. */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ result: "success", status: "Regala Kiri webhook is live" }))
    .setMimeType(ContentService.MimeType.JSON);
}
