import * as tf from '@tensorflow/tfjs-node';
import { RandomForestClassifier } from 'machinelearn/ensemble';
import { preprocess, preprocessYTrue } from './data';
import { accuracyScore } from 'machinelearn/metrics';
import pumpItUpTrain from './dataset/train.json';
import pumpItUpTest from './dataset/test.json';

export const run = () => new Promise((resolve) => {
  console.log('RUNNING')
  const trainData = preprocess(pumpItUpTrain);
  
  const testData = preprocess(pumpItUpTest);

  const cls = new RandomForestClassifier({
    nEstimator: 100,
  });
  console.log(trainData.y)
  cls.fit(trainData.X, trainData.y);

  const yPred = cls.predict(testData.X);

  console.log(yPred);

  resolve();
});
