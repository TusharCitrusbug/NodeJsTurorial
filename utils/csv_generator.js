const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const HeaderGenerator = (data) => {
  let keys = Object.keys(data[0]);
  let headers = new Array();
  keys.forEach((key) => {
    headers.push({ id: key, title: (key).toUpperCase() })
  })
  return headers;
}

exports.csvGenerator = (data,name) => {
  let csv_path = `static/csv/${new Date().toISOString()}${name}.csv`
  const csvWriter = createCsvWriter({
    path: csv_path,
    header: HeaderGenerator(data)
  });
  csvWriter
    .writeRecords(data)
    .then((x) => console.log('The CSV file was written successfully'));
  return csv_path
}
