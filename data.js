
export function dynamicLabels (dataset, labels) {
  let labelsList = {};

  labels.map((label) => {
      labelsList[label] = {};
      let datas = dataset.map((curr) => curr[label]);
      const uniqDatas = [ ...new Set(datas) ];
      labelsList[label].selfMapping = true;
      labelsList[label].datas = uniqDatas.reduce((acc, curr) => {
            acc[curr] = Object.keys(acc).length;
            return acc;
      }, {});
  })
  console.log(labelsList)
  return labelsList;
}


export function preprocess(dataset, labels) {

  const X = [];
  const y = [];
  

  for (let i = 0; i < dataset.length; i++) {
    const row = dataset[i];
    // Handling the target data; nothing to preprocess, it should be either 0 or 1
    y.push(labels["status_group"].datas[row.status_group]);
    // Handle the training data
    const newRow = [];
    Object.keys(labels)
        .filter((key) => key !== 'status_group')
        .map((key) => {
        if(labels[key].selfMapping) {
            newRow.push(labels[key].datas[row[key]])
        }
    })
    X.push(newRow);
  }

  return { X, y };
}
