const XLSX = require("xlsx");
const fs = require("fs");
if (process.argv[2]) {
  var workbook = XLSX.readFile(process.argv[2]);
  var sheet_name_list = workbook.SheetNames;
  console.log('parsing file...')
  // const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])
  sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    for(z in worksheet) {
      if(z[0] === '!') continue;
      //parse out the column, row, and value
      var tt = 0;
      for (var i = 0; i < z.length; i++) {
        if (!isNaN(z[i])) {
          tt = i;
          break;
        }
      };
      var col = z.substring(0,tt);
      var row = parseInt(z.substring(tt));
      var value = worksheet[z].v;
  
      //store header names
      if(row == 1 && value) {
        headers[col] = value;
        continue;
      }
  
      if(!data[row]) data[row]={};
      data[row][headers[col]] = value;
    }
    const destFile = process.argv[3] || 'output.json';
    fs.writeFile(destFile, JSON.stringify(data), 'utf8', () => console.log(`parsing complete! File outputted as ${destFile}`));
  });
} else {
   console.error('Syntax: node xlsxconvert filename.xlsx outputfile.json[optional] -- did you specify a filename?')
 }