function getFubonExrate2024() {

  const html = UrlFetchApp.fetch("https://www.fubon.com/Fubon_Portal/banking/Personal/deposit/exchange_rate/exchange_rate1_photo.jsp?urlParameter=1D&currency=USD");


  // const regex = /<td class="tac">([\s\S]*?)<\/td>/g;

  const regex = /<td class="tac">[\s\S]*?<div>([\s\S]*?)<\/div>[\s\S]*?<\/td>/g;


  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");

  const matches = [];
  let match;
  let i=0;
  while ((match = regex.exec(html)) !== null && i<3) {



    matches.push(match[1].trim());

    i++;
  }


  console.log(matches);

  let bankBuy = matches[1];
  let bankSell = matches[2];

  // console.log(bankBuy, bankSell);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  sheet.getRange(3, 2).setValue(bankBuy);
  sheet.getRange(4, 2).setValue(bankSell);
  sheet.getRange(1, 2).setValue(new Date());

}
