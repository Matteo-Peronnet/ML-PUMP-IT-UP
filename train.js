import * as tf from '@tensorflow/tfjs-node';
import { RandomForestClassifier } from 'machinelearn/ensemble';
import { preprocess, preprocessYTrue } from './data';
import { accuracyScore } from 'machinelearn/metrics';
import pumpItUpTrain from './dataset/train.json';
import pumpItUpTest from './dataset/test.json';
import * as csvWriter from 'csv-writer';
import mapping from './dataset/mapping.json';

const writer = csvWriter.createObjectCsvWriter;

export const run = () => new Promise((resolve) => {

  console.log('RUNNING')
  const trainData = preprocess(pumpItUpTrain);
  
  const testData = preprocess(pumpItUpTest);

  const cls = new RandomForestClassifier({
    nEstimator: 100,
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
    id: pumpItUpTest[index].id,
    status_group: pred
  }))

  currWriter.writeRecords(records)
    .then(() => {
        console.log('...Done');
  });
 
  resolve();
});
