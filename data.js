
export function normalize(labels, value) {
  return  2 * ((value - labels.moy) / (labels.max - labels.min))
}


export function dynamicLabels (dataset, labels) {

  let labelsList = {};

  labels.map((label) => {
      labelsList[label] = {};
      let datas = dataset.map((curr) => curr[label]);
      const uniqDatas = [ ...new Set(datas) ];
      labelsList[label].selfMapping = true;
      labelsList[label].datas = uniqDatas.reduce((acc, curr) => {
            acc[curr] = {}
            acc[curr].value = Object.keys(acc).length;
            return acc;
      }, {});
     const sortedValues = Object.keys(labelsList[label].datas)
      .sort((a, b) => labelsList[label].datas[a].value - labelsList[label].datas[b].value);

     labelsList[label].min = labelsList[label].datas[sortedValues[0]].value
     labelsList[label].max = labelsList[label].datas[sortedValues[sortedValues.length - 1]].value
     labelsList[label].moy = (labelsList[label].min + labelsList[label].max) / 2
  })

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

export function preprocess2(dataset, labels, withGroup) {

  const data = [];
  const labelValues = Object.keys(labels);
  const labelWithoutGroup = labelValues.filter((key) => key !== 'status_group')

  const processLabels = withGroup ? labelValues : labelWithoutGroup;

  for (let i = 0; i < dataset.length; i++) {
    const row = dataset[i];
    // Handling the target data; nothing to preprocess, it should be either 0 or 1
    // Handle the training data
    let newRow = {};

    processLabels
        .map((key) => {
        if(labels[key].selfMapping) {
            if(key === 'status_group') {
              newRow[key] = labels[key].datas[row[key]].value
            } else {
              newRow[key] = normalize(labels[key], labels[key].datas[row[key]].value)
            }
            
        }
        
    })
    //newRow.output = labels["status_group"].datas[row.status_group].value
    data.push(newRow);
  }
  

  return { data, labels: processLabels };
}
