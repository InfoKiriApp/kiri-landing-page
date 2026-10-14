/**
 * Regala Kiri — Google Apps Script webhook
 *
 * SETUP (one time, ~2 minutes):
 * 1. Open your Google Sheet.
 * 2. Add a header row in row 1 with these columns (order matters):
 *      Timestamp | Gifter First Name | Gifter Last Name | Gifter Email |
 *      Child First Name | Child Last Name | Child Age | Relationship |
 *      Parent First Name | Parent Last Name | Parent Email |
 *      Street | Number | Floor | Postal | City | Country | Occasion | Message | Child Photo
 * 3. Go to Extensions > Apps Script.
 * 4. Delete any starter code, paste THIS entire file, and Save.
 * 5. Click Deploy > New deployment.
 *      - Type: Web app
 *      - Description: Regala Kiri webhook
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 6. Click Deploy, authorize when prompted (it will ask for Google Drive access
 *    because child photos are stored in a private Drive folder), and COPY the
 *    "Web app URL". It looks like: https://script.google.com/macros/s/AKfycb.../exec
 * 7. Give that URL to v0 to store as GOOGLE_SHEETS_WEBHOOK_URL.
 *
 * Whenever you change this script, create a NEW deployment (or "Manage
 * deployments" > edit > Version: New version) so the URL serves the update.
 *
 * Child photos are saved in a Drive folder named PHOTO_FOLDER_NAME (created
 * automatically, private to the account that owns the script). The sheet cell
 * contains a link to the file.
 */

var PHOTO_FOLDER_NAME = "Regala Kiri - Fotos";

function getPhotoFolder() {
  var folders = DriveApp.getFoldersByName(PHOTO_FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(PHOTO_FOLDER_NAME);
}

function savePhoto(data) {
  if (!data.childPhotoBase64) return "";

  var base64 = String(data.childPhotoBase64).replace(/^data:image\/jpeg;base64,/, "");
  var safeName = String(data.childPhotoName || "foto")
    .replace(/\.[^.]+$/, "")
    .replace(/[^\w\- ]+/g, "")
    .slice(0, 60);
  var fileName = [data.childFirstName, data.childLastName, safeName, data.timestamp]
    .filter(Boolean)
    .join(" - ") + ".jpg";

  var blob = Utilities.newBlob(Utilities.base64Decode(base64), "image/jpeg", fileName);
  return getPhotoFolder().createFile(blob).getUrl();
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    var photoUrl = savePhoto(data);

    sheet.appendRow([
      data.timestamp,
      data.gifterFirstName,
      data.gifterLastName,
      data.gifterEmail,
      data.childFirstName,
      data.childLastName,
      data.childAge,
      data.relationship,
      data.parentFirstName,
      data.parentLastName,
      data.parentEmail,
      data.street,
      data.number,
      data.floor,
      data.postal,
      data.city,
      data.country,
      data.occasion,
      data.message,
      photoUrl,
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
