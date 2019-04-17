
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

function getAltitude(data)
{
  let value;

  if(data < 1 )
  {
    value = 0;
  }else if(data < 400)
  {
    value = 1;
  }else if(data < 900)
  {
    value = 2;
  }else if(data < 1300)
  {
    value = 3;
  }else if(data < 1700)
  {
    value = 4;
  }else
  {
    value = 5;
  }
  return value;
}

function getConstructionYear(data)
{
  let value;
  if(data < 1 )
  {
    value = 0;
  }else if(data < 1980)
  {
    value = 1;
  }else if(data < 1990)
  {
    value = 2;
  }else if(data < 2000)
  {
    value = 3;
  }else if(data < 2010)
  {
    value = 4;
  }else
  {
    value = 5;
  }
  return value;
}

function getPopulation(data)
{
  let value;
  if(data < 1 )
  {
    value = 0;
  }else if(data < 2)
  {
    value = 1;
  }else if(data < 101)
  {
    value = 2;
  }else if(data < 201)
  {
    value = 3;
  }else if(data < 301)
  {
    value = 4;
  }else if(data < 501)
  {
    value = 5;
  }
  else
  {
    value = 6;
  }
  return value;
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
    newRow.push(getAltitude(row['gps_height']));
    newRow.push(getConstructionYear(row['construction_year']));
    newRow.push(getPopulation(row['population']));
    X.push(newRow);
  }

  return { X, y };
}
