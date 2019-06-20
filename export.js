import * as csvWriter from 'csv-writer';

const writer = csvWriter.createObjectCsvWriter;

const folder = `export`;

export function exportCsvDataset(dataset, headers ,filename) {

  const exportTrain = writer({
      path: `${folder}/${filename}.csv`,
      header: headers.map((header) => ({ id: header, title: header}))
  });

  exportTrain.writeRecords(dataset).then(() => {
        console.log('Train done !');
  });
}

export function exportCsvPredict(dataset, headers ,filename) {

  const exportTrain = writer({
      path: `${folder}/${filename}.csv`,
      header: headers.map((header) => ({ id: header, title: header}))
  });

  exportTrain.writeRecords(dataset.map((data) => (
  	headers.reduce((acc, curr) => {
  		acc[curr] = data
  		return acc;
  	}, {})
  ))).then(() => {
        console.log('Train done !');
  });
}