# Audit form: Google Sheet and email alerts

The site's audit form posts each lead to a Google Apps Script web app, which adds a row to a Google Sheet and emails mail.bizmeup@gmail.com.

## One-time setup (about 5 minutes)

1. In Google Drive, create a new Google Sheet, for example "BizMeUp leads".
2. In the sheet, open **Extensions > Apps Script**.
3. Delete the starter code and paste in everything from `Code.gs` (in this folder). Save.
4. Click **Deploy > New deployment**. Choose type **Web app**.
   - Description: BizMeUp audit form
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, then approve the permissions Google asks for (sheet access and sending email).
6. Copy the **Web app URL** (it ends in `/exec`).
7. Open the URL in a browser. You should see `{"result":"ok"}`.
8. Add the URL to the site as `PUBLIC_FORM_ENDPOINT`:
   - Locally: in a `.env` file at the project root (copy `.env.example`).
   - On Vercel or Netlify: in the project's environment variables, then redeploy.

A "Leads" tab with headings is created automatically on the first submission.

## Changing the script later

After editing the code, use **Deploy > Manage deployments > Edit > Version: New version > Deploy**. The URL stays the same.
