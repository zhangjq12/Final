const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

var buf = fs.readFileSync(path.join(__dirname, "./VendorPriceSheet.xlsx"));
var workbook = xlsx.read(buf, {type: "buffer"});
var sheetNames = workbook.SheetNames;
var worksheet = workbook.Sheets[sheetNames[1]];
//console.log(worksheet);
//console.log(JSON.stringify(xlsx.utils.sheet_to_json(worksheet)));
var sheet = xlsx.utils.sheet_to_json(worksheet);
for(var s of sheet) {
    s.Product_No = s["Product No."];
    s.Product_name = s["Product name"];
    delete s["Product No."];
    delete s["Product name"];
}
module.exports = sheet;