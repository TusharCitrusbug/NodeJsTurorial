const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const data = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M'
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F'
  }
];

const HeaderGenerator = (data) => {
  let keys = Object.keys(data[0]);
  let headers = new Array();
  keys.forEach((key) => {
    headers.push({ id: key, title: (key).toUpperCase() })
  })
  return headers;
}

const csvGenerator = (data) => {
  const path = `./static/csv/${new Date()}data.csv`
  const csvWriter = createCsvWriter({
    path: path,
    header: HeaderGenerator(data)
  });
  csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully'));

    return path
}
csvGenerator(data)