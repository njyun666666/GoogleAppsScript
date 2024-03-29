function getCathaybkExrate2022() {
  const str = UrlFetchApp.fetch("https://www.cathaybk.com.tw/cathaybk/personal/product/deposit/currency-billboard/#currency");
  const regex = /<div>(.+)<\/div>/g;
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");

  let m;
  let i = 0;


  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }


    if (i <= 3) {


      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {


        if (groupIndex === 1) {
          console.log(`i=${i}, Found match, group ${groupIndex}: ${match}`);
          switch (i) {
            case 0:
              sheet.getRange(2, 2).setValue(Number(match));
              break;
            case 1:
              sheet.getRange(3, 2).setValue(Number(match));
              break;
            case 2:
              sheet.getRange(5, 2).setValue(Number(match));
              break;
            case 3:
              sheet.getRange(6, 2).setValue(Number(match));
              break;
            default:
              break;
          }
        }


      });

    }

    i++

  }

  // const dateRegex = /<span class="cubinvest_date">(.+)<\/span>/g;
  // sheet.getRange(7, 1).setValue(dateRegex.exec(str)[1]);

  const today = new Date();
  const now = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  sheet.getRange(7, 1).setValue(now);

}
