import * as tf from '@tensorflow/tfjs-node';
import { RandomForestClassifier } from 'machinelearn/ensemble';
import { preprocess, dynamicLabels } from './data';
import { accuracyScore } from 'machinelearn/metrics';
import train from './dataset/train.json';
import test from './dataset/test.json';
import { exportCsvDataset, exportCsvPredict } from './export.js';

export const run = () => new Promise((resolve) => {

  let features = ['region', 'basin', 'scheme_management', 'extraction_type', 'management_group', 'payment_type', 'water_quality', 'quality_group', 'quantity', 'source', 'waterpoint_type', 'ward']
  let allFeatures = features.concat('status_group');

  const dataset = train.concat(test);
  const labelsGenerated = dynamicLabels(dataset, allFeatures);


  const trainData = preprocess(train, labelsGenerated);
  const testData = preprocess(test, labelsGenerated);
  
  /** EXPORT **/
  exportCsvDataset(trainData.X, features, 'train-formated-X');
  exportCsvDataset(testData.X, features, 'test-formated-X');
  exportCsvPredict(trainData.y, ['predict'],'train-formated-y');

  resolve();
});
