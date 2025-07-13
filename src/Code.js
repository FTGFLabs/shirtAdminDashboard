/**
 * @OnlyCurrentDoc
 */

// เปิดหน้าเว็บ (Web App)
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Google Sheet Data Reader')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// สร้างเมนูใน Google Sheets
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('เมนูสคริปต์ของฉัน')
    .addItem('อ่านข้อมูลชีต', 'readSheetData')
    .addToUi();
}

// ตัวอย่างฟังก์ชันอ่านข้อมูลแถวแรก (ถ้าต้องการ)
function readSheetData() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getRange("A1:M1"); 
  return range.getValues();
}

// ฟังก์ชันค้นหารหัสนิสิต
function findStudentData(studentId) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  Logger.log('ค้นหา studentId: ' + studentId);

  for (let i = 1; i < data.length; i++) {
    const rawId = data[i][2]; // คอลัมน์ C (index 2)
    
    // แปลงเลขรูปแบบวิทยาศาสตร์เป็น string แบบเต็ม (ถ้ามี)
    const formattedId = rawId ? Number(rawId).toFixed(0) : '';
    Logger.log(`แถวที่ ${i+1} รหัสนิสิตใน sheet: ${rawId} แปลงเป็น: ${formattedId}`);

    // เปรียบเทียบกับ studentId ที่รับเข้ามา
    if (formattedId === studentId) {
      // แปลงข้อมูลในแถวนั้นเป็น string ทั้งหมด
      const formattedRow = data[i].map(value =>
        (value !== null && value !== undefined) ? value.toString() : ''
      );
      Logger.log('พบข้อมูลที่ตรงกัน: ' + JSON.stringify(formattedRow));
      return formattedRow;
    }
  }

  Logger.log('ไม่พบข้อมูลที่ตรงกัน');
  return null;
}
