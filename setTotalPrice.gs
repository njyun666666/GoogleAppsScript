function setTotalPrice() {

  const dataSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  const totalPrice = dataSheet.getRange(16, 2).getValue();

  const totalPriceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Total Price");
  const lastRow = totalPriceSheet.getLastRow();
  const targetRow = lastRow + 1;

  Logger.log(`totalPrice=${totalPrice}, targetRow=${targetRow}`);

  const today = new Date();
  
  totalPriceSheet.getRange(targetRow, 1).setValue(`${today.getUTCFullYear()}-${today.getUTCMonth() + 1}-${today.getUTCDate()}`);
  totalPriceSheet.getRange(targetRow, 2).setValue(parseInt(totalPrice));
  totalPriceSheet.getRange(lastRow, 3).copyTo(totalPriceSheet.getRange(targetRow, 3));
}
