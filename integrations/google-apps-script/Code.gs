/**
 * BizMeUp audit form: Google Apps Script web app.
 * Appends each lead to the "Leads" sheet and emails an alert.
 * Setup steps are in README.md next to this file.
 */

const SHEET_NAME = 'Leads';
const NOTIFY_EMAIL = 'mail.bizmeup@gmail.com';
const HEADERS = ['Received', 'Name', 'Business', 'Phone', 'Website or Instagram', 'Services', 'Budget', 'Page'];
const PHONE = /^(?:\+?91|0)?[6-9]\d{9}$/;

function doPost(e) {
  const p = (e && e.parameter) || {};

  // Honeypot: bots fill this hidden field. Pretend it worked.
  if (p.company_website) return json({ result: 'success' });

  const phone = String(p.phone || '').replace(/[\s\-().]/g, '');
  if (!p.name || !p.business || !PHONE.test(phone)) {
    return json({ result: 'error', error: 'invalid' });
  }

  const row = [
    new Date(),
    clean(p.name),
    clean(p.business),
    clean(phone),
    clean(p.link),
    clean(p.services),
    clean(p.budget),
    clean(p.page),
  ];

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet().appendRow(row);
  } finally {
    lock.releaseLock();
  }

  try {
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New audit request: ' + row[1] + ' (' + row[2] + ')',
      body: HEADERS.slice(1).map(function (h, i) { return h + ': ' + (row[i + 1] || '-'); }).join('\n') +
        '\n\nWhatsApp: https://wa.me/91' + phone.slice(-10),
    });
  } catch (err) {
    // The lead is already saved; a failed email should not fail the form.
    console.error(err);
  }

  return json({ result: 'success' });
}

/** Health check: open the web app URL in a browser to confirm it is deployed. */
function doGet() {
  return json({ result: 'ok' });
}

function getSheet() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Trim, cap length and stop values being read as spreadsheet formulas. */
function clean(value) {
  const s = String(value || '').trim().slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
