function getCathaybkExrate() {
  const response = UrlFetchApp.fetch("https://www.cathaybk.com.tw/cathaybk/personal/deposit-exchange/rate/currency-billboard/");
  const str = response.getContentText();
  const regex = /<td.*data-title="USD".*>(.+)<\/td>/g;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");

  let m;
  let i = 0;

  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }


    if (i === 0) {
      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        console.log(`${i}, Found match, group ${groupIndex}: ${match}`);

        if (groupIndex === 1) {
          sheet.getRange(2, 2).setValue(Number(match));

        }
      });
    }

    i++;
  }


  const dateRegex = /<span class="cubinvest_date">(.+)<\/span>/g;
  sheet.getRange(3, 2).setValue(dateRegex.exec(str)[1]);

}
