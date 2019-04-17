import * as tf from '@tensorflow/tfjs-node';
import { RandomForestClassifier } from 'machinelearn/ensemble';
import { preprocess, dynamicLabels } from './data';
import { accuracyScore } from 'machinelearn/metrics';
import train from './dataset/train.json';
import test from './dataset/test.json';
import * as csvWriter from 'csv-writer';

const writer = csvWriter.createObjectCsvWriter;

export const run = () => new Promise((resolve) => {

  console.log('RUNNING')

  const labels = ['status_group', 'region', 'basin', 'scheme_management', 'extraction_type', 'management_group', 'payment_type', 'water_quality', 'quality_group', 'quantity', 'source', 'waterpoint_type']
  const dataset = train.concat(test);
  const labelsGenerated = dynamicLabels(dataset, labels);


  const trainData = preprocess(train, labelsGenerated);
  const testData = preprocess(test, labelsGenerated);

  const cls = new RandomForestClassifier({
    nEstimator: 10,
  });

  cls.fit(trainData.X, trainData.y);

  const yPred = cls.predict(testData.X);

  const currWriter = writer({
      path: 'fileTest.csv',
      header: [
          {id: 'id', title: 'id'},
          {id: 'status_group', title: 'status_group'}
      ]
  });

  const records = yPred.map((pred, index) => ({
    id: test[index].id,
    status_group: pred
  }))

  currWriter.writeRecords(records)
    .then(() => {
        console.log('...Done');
  });
 
  resolve();
});
