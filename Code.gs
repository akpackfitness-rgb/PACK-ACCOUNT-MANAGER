// ============================================================
//  PACK Account Manager — Google Apps Script Backend
//  Deploy as: Web App → Execute as: Me → Who has access: Anyone
// ============================================================

function doGet(e) {
  var params = JSON.parse(e.parameter.data || '{}');
  return handleRequest(params);
}

function doPost(e) {
  var params = JSON.parse(e.postData.contents || '{}');
  return handleRequest(params);
}

function handleRequest(p) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var result = {};

  try {

    // ── AUTO-INIT: create sheets + headers if missing ──────────────
    if (p.action === 'initSheets') {
      p.sheets.forEach(function(def) {
        var sh = ss.getSheetByName(def.name);
        if (!sh) {
          sh = ss.insertSheet(def.name);
          sh.appendRow(def.headers);
          var hdr = sh.getRange(1, 1, 1, def.headers.length);
          hdr.setFontWeight('bold');
          hdr.setBackground('#1a1e2a');
          hdr.setFontColor('#ffffff');
          sh.setFrozenRows(1);
        } else {
          var firstRow = sh.getRange(1, 1, 1, def.headers.length).getValues()[0];
          var isEmpty = firstRow.every(function(c) { return c === '' || c === null; });
          if (isEmpty) {
            sh.insertRowBefore(1);
            sh.getRange(1, 1, 1, def.headers.length).setValues([def.headers]);
          }
        }
      });
      result = { ok: true };

    // ── PING ────────────────────────────────────────────────────────
    } else if (p.action === 'ping') {
      result = { ok: true };

    // ── GET ROWS BY DATE ─────────────────────────────────────────────
    } else if (p.action === 'getByDate') {
      var sh = ss.getSheetByName(p.sheet);
      if (!sh) {
        result = { rows: [] };
      } else {
        var data = sh.getDataRange().getValues();
        var rows = data.slice(1).filter(function(r) { return r[0] === p.date; });
        result = { rows: rows };
      }

    // ── SAVE ROWS FOR DATE (replace existing) ────────────────────────
    } else if (p.action === 'setByDate') {
      var sh = ss.getSheetByName(p.sheet);
      if (sh) {
        var data = sh.getDataRange().getValues();
        for (var i = data.length; i >= 2; i--) {
          if (data[i - 1][0] === p.date) sh.deleteRow(i);
        }
      }
      p.rows.forEach(function(r) { sh.appendRow(r); });
      result = { ok: true };

    // ── GET ALL ROWS ─────────────────────────────────────────────────
    } else if (p.action === 'getAll') {
      var sh = ss.getSheetByName(p.sheet);
      if (!sh) {
        result = { rows: [] };
      } else {
        var data = sh.getDataRange().getValues();
        result = { rows: data.slice(1) };
      }

    // ── OVERWRITE ALL ROWS ───────────────────────────────────────────
    } else if (p.action === 'setAll') {
      var sh = ss.getSheetByName(p.sheet);
      if (sh) {
        var last = sh.getLastRow();
        if (last > 1) sh.deleteRows(2, last - 1);
        p.rows.forEach(function(r) { sh.appendRow(r); });
      }
      result = { ok: true };
    }

  } catch (err) {
    result = { error: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}
