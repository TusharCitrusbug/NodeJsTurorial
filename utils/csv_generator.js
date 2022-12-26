const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const HeaderGenerator = (data) => {
  let keys = Object.keys(data[0]);
  let headers = new Array();
  keys.forEach((key) => {
    headers.push({ id: key, title: (key).toUpperCase() })
  })
  return headers;
}

exports.csvGenerator = (data) => {
  const csvWriter = createCsvWriter({
    path: `../csv/${new Date()}data.csv`,
    header: HeaderGenerator(data)
  });
  csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully'));

}
