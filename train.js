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

  const labels = ['id', 'amount_tsh', 'date_recorded', 'funder', 'gps_height', 'installer', 'longitude', 'latitude', 'wpt_name', 'num_private', 'basin', 'subvillage', 'region', 'region_code', 'district_code', 'lga', 'ward', 'population', 'public_meeting', 'recorded_by', 'scheme_management', 'scheme_name', 'permit', 'construction_year', 'extraction_type', 'extraction_type_group', 'extraction_type_class', 'management', 'management_group', 'payment', 'payment_type', 'water_quality', 'quality_group', 'quantity', 'quantity_group', 'source', 'source_type', 'source_class', 'waterpoint_type', 'waterpoint_type_group', 'status_group'];
  
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
