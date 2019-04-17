import * as tf from '@tensorflow/tfjs-node';
import { preprocess, dynamicLabels } from './data';
import train from './dataset/train.json';
import test from './dataset/test.json';
import { exportCsvDataset, exportCsvPredict } from './export.js';

export const run = () => new Promise((resolve) => {

  let features = ['region', 'basin', 'scheme_management', 'extraction_type', 'management_group', 'payment_type', 'water_quality', 'quality_group', 'quantity', 'source', 'waterpoint_type', 'ward']
  let manualFeature = ['gps_height', 'construction_year', 'population'];
  let allFeatures = features.concat(manualFeature);

  const dataset = train.concat(test);
  const labelsGenerated = dynamicLabels(dataset, features.concat('status_group'));


  const trainData = preprocess(train, labelsGenerated);
  const testData = preprocess(test, labelsGenerated);

  /** EXPORT **/
  exportCsvDataset(trainData.X, allFeatures, 'train-formated-X');
  exportCsvDataset(testData.X, allFeatures, 'test-formated-X');
  exportCsvPredict(trainData.y, ['predict'],'train-formated-y');

  resolve();
});
