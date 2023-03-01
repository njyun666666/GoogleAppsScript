function enableGetStockPrice() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  const isEnable = Boolean(sheet.getRange(1, 4).getValue());
  console.log(isEnable);

  if (isEnable) {
    getStockPrice();
  }

}

function getStockPrice() {

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

    getRegularMarketPrice(param);
  })


  sheet.getRange(1, 5).setValue(new Date());

}





function getRegularMarketPrice(item) {

  const response = UrlFetchApp.fetch(`https://query1.finance.yahoo.com/v7/finance/quote?formatted=true&crumb=6JyjA0OjskY&lang=en-US&region=US&symbols=${item.stock}&fields=messageBoardId,longName,shortName,marketCap,underlyingSymbol,underlyingExchangeSymbol,headSymbolAsString,regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume,uuid,regularMarketOpen,fiftyTwoWeekLow,fiftyTwoWeekHigh,toCurrency,fromCurrency,toExchange,fromExchange&corsDomain=finance.yahoo.com`);


  var json = JSON.parse(response.getContentText());
  var regularMarketPrice = Number(json.quoteResponse.result[0].regularMarketPrice.raw);


  Logger.log(`${item.stock}: regularMarketPrice=${regularMarketPrice}`);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  sheet.getRange(item.row, item.column).setValue(regularMarketPrice);

}
