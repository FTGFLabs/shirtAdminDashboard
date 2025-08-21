/**
 * @OnlyCurrentDoc
 */

// เปิดหน้าเว็บ (Web App)
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Google Sheet Data Reader')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Get all student data from the sheet
function getAllStudents() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  const formattedData = data.map(row =>
    row.map(cell => (cell !== null && cell !== undefined) ? cell.toString() : '')
  );

  return formattedData;
}
Logger.log(getAllStudents())

// Create a custom menu in Google Sheets
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('เมนูสคริปต์ของฉัน')
    .addItem('เปิดหน้า Admin Dashboard', 'doGet')
    .addToUi();
}

// Get status and problem text for a specific row
function getStatusByStudentId(sheetIndex) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const status = sheet.getRange(sheetIndex, 14).getValue() || ''; // Column N
  const problem = sheet.getRange(sheetIndex, 15).getValue() || ''; // Column O
  return { status: status, problem: problem };
}

// Update status and problem text for a specific row
function updateStudentStatus(sheetIndex, status, problemText) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.getRange(sheetIndex, 14).setValue(status); // Update status in Column N
  sheet.getRange(sheetIndex, 15).setValue(problemText); // Update problem text in Column O
  return 'Success';
}