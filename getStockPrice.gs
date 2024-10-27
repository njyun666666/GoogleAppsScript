function enableGetStockPrice() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  const isEnable = Boolean(sheet.getRange(1, 4).getValue());
  // console.log(isEnable);

  if (isEnable) {
    getStockPrice();
  }

}

function getStockPrice() {
  let result = true;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  const stockList = sheet.getRangeList(['D2:D']);
  const stockRow = 2;
  const priceColumn = 5;

  stockList.getRanges()[0].getValues().forEach((item, i) => {

    const stock = item[0].toString();

    if (!stock) {
      return;
    }
    console.log(i, stock);

    const param = {
      stock: stock,
      row: stockRow + i,
      column: priceColumn
    }

    const res = getRegularMarketPrice(param);
    
    if (!res) {
      result = false
    }
  })


  sheet.getRange(1, 5).setValue(new Date());

  if (!result) throw (`api response == null`);
}





function getRegularMarketPrice(item) {
  let response;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${item.stock}?region=US&lang=en-US&includePrePost=false&interval=1d&useYfid=false&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance`

  // logWrite({
  //   level: LogLevelEnum.INFO,
  //   method: getRegularMarketPrice.name,
  //   url: url,
  //   request: JSON.stringify(item),
  //   response: ''
  // });

  for (let i = 0; i < 5; i++) {
    try {

      response = UrlFetchApp.fetch(url);
      break;

    } catch (ex) { }

    Utilities.sleep(1000);
  }

  if (response == null) {
    logWrite({
      level: LogLevelEnum.ERROR,
      method: getRegularMarketPrice.name,
      url: url,
      request: JSON.stringify(item),
      response: `response == null`
    });

    return false;
  }


  var json = JSON.parse(response.getContentText());
  var regularMarketPrice = Number(json.chart.result[0].meta.regularMarketPrice);


  Logger.log(`${item.stock}: regularMarketPrice=${regularMarketPrice}`);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  sheet.getRange(item.row, item.column).setValue(regularMarketPrice);

  return true;
}
