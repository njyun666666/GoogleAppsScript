function getStockPrice() {

  const stocks = [
    {
      stock: 'TSLA',
      row: 11,
      column: 2
    },
    {
      stock: 'AMD',
      row: 12,
      column: 2
    },
    {
      stock: 'PPGH',
      row: 13,
      column: 2
    },
  ];

  stocks.forEach(item => {
    getRegularMarketPrice(item);
  });


}



function getRegularMarketPrice(item) {

  const response = UrlFetchApp.fetch(`https://query1.finance.yahoo.com/v7/finance/quote?formatted=true&crumb=6JyjA0OjskY&lang=en-US&region=US&symbols=${item.stock}&fields=messageBoardId,longName,shortName,marketCap,underlyingSymbol,underlyingExchangeSymbol,headSymbolAsString,regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume,uuid,regularMarketOpen,fiftyTwoWeekLow,fiftyTwoWeekHigh,toCurrency,fromCurrency,toExchange,fromExchange&corsDomain=finance.yahoo.com`);


  var json = JSON.parse(response.getContentText());
  var regularMarketPrice = Number(json.quoteResponse.result[0].regularMarketPrice.raw);


  Logger.log(`${item.stock}: regularMarketPrice=${regularMarketPrice}`);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  sheet.getRange(item.row, item.column).setValue(regularMarketPrice);

}
