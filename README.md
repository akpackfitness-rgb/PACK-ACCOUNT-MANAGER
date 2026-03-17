# PACK Account Manager

A clean, dark-themed **Gym Accounts Management Web App** powered by **Google Sheets** as the backend database.

![PACK Account Manager](https://img.shields.io/badge/PACK-Account%20Manager-00c6b3?style=for-the-badge)
![Google Sheets](https://img.shields.io/badge/Backend-Google%20Sheets-34A853?style=for-the-badge&logo=google-sheets)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-lightgrey?style=for-the-badge)

---

## Features

- **Daily Collection** — Log member payments by date with Entry ID, Member ID, Name, Notes (New / Renewal), Cash and UPI amounts
- **Monthly Report** — Auto-generated summary of total collections and entries per month
- **Expenses** — Manual expense tracker with Date, Type, Description and Amount
- **Smart Notes** — Press `n` for New member, `r` for Renewal — badge appears instantly
- **Auto Sheet Setup** — Sheets and headers are created automatically on first launch
- **Dark UI** — Professional dark dashboard inspired by modern admin panels
- **Zero dependencies** — Single HTML file, no build tools, no npm

---

## Project Structure

```
pack-account-manager/
├── index.html      ← The entire web app (single file)
├── Code.gs         ← Google Apps Script backend
├── README.md       ← This file
└── .gitignore
```

---

## Setup Guide

### Step 1 — Google Sheets

1. Go to [Google Sheets](https://sheets.google.com) and create a **new spreadsheet**
2. Note the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

### Step 2 — Apps Script

1. Inside the spreadsheet, go to **Extensions → Apps Script**
2. Delete any existing code in the editor
3. Copy the entire contents of **`Code.gs`** and paste it in
4. Click **Save** (💾)

### Step 3 — Deploy as Web App

1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon → select **Web app**
3. Set:
   - **Description:** PACK Account Manager
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**
5. Copy the **Web App URL** — looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### Step 4 — Update index.html

Open `index.html` and find these two lines near the top of the `<script>` section:

```js
const SHEETS_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
const SHEETS_ID  = 'YOUR_SPREADSHEET_ID';
```

Replace with your actual values from Steps 1–3.

### Step 5 — Host on GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your app will be live at:
   ```
   https://YOUR_USERNAME.github.io/pack-account-manager/
   ```

---

## Google Sheets Structure

The app auto-creates these 3 sheets on first launch:

### DAILY REPORT
| DATE | ENTRY_ID | MEMBER_ID | NAME | NOTES | CASH | UPI |
|------|----------|-----------|------|-------|------|-----|

### MONTHLY REPORTS
| MONTH | TOTAL_COLLECTION | TOTAL_ENTRIES |
|-------|-----------------|---------------|

### EXPENSE REPORTS
| DATE | TYPE | DESCRIPTION | AMOUNT |
|------|------|-------------|--------|

---

## Usage

| Action | How |
|--------|-----|
| Add entry | Click **+ Add Entry** |
| Mark as New member | Click Notes field → press `n` |
| Mark as Renewal | Click Notes field → press `r` |
| Clear badge | Press `Backspace` in Notes field |
| Change date | Use the date picker at top |
| Save to Sheets | Click **Save to Sheets** |
| View monthly summary | Click **Monthly Report** in sidebar |
| Add expense | Go to Expenses → click **+ Add Expense** |

---

## Redeployment (after Code.gs changes)

When you update `Code.gs`, you must create a **new deployment version**:

1. Apps Script → **Deploy → Manage deployments**
2. Click the ✏️ edit icon on your deployment
3. Change version to **New version**
4. Click **Deploy**

> ⚠️ The Web App URL stays the same — no need to update `index.html`

---

## License

MIT — free to use and modify.
