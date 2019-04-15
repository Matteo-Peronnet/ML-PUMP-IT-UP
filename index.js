import * as train from './train';

train.run()
.then(() => {
  console.log('Training complete!');
}).catch((e) => {
  console.error('Training didn\'t complete correctly', e);
});
