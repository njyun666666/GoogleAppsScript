function getExrate() {
  var response = UrlFetchApp.fetch("https://tw.rter.info/capi.php");
//Logger.log(response.getContentText());
  
  var json=JSON.parse(response.getContentText());
  var exrate=Number(json["USDTWD"]["Exrate"]);
  var updateTime=json["USDTWD"]["UTC"];
  Logger.log(`exrate=${exrate}, updateTime=${updateTime}`);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  // Logger.log(sheet);
  //.getActiveSheet();

  sheet.getRange(2,2).setValue(exrate);
  sheet.getRange(3,2).setValue(updateTime);

}
