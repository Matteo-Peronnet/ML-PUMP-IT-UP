import { preprocess, preprocess2, dynamicLabels } from './data';
import train from './dataset/train.json';
import test from './dataset/test.json';
import { exportCsvDataset } from './export';


export const run = () => new Promise((resolve) => {

  console.log('RUNNING')

  const labels = ['status_group', 'region', 'basin', 'scheme_management', 'extraction_type', 'management_group', 'ward', 'payment_type', 'water_quality', 'quality_group', 'quantity', 'source', 'waterpoint_type']
  const dataset = train.concat(test);
  const labelsGenerated = dynamicLabels(dataset, labels);


  const trainData = preprocess2(train, labelsGenerated, true);
  const testData = preprocess2(test, labelsGenerated, false);


  exportCsvDataset(trainData.data, trainData.labels, 'train-formated');
  exportCsvDataset(testData.data, testData.labels, 'test-formated');

  resolve();
});
