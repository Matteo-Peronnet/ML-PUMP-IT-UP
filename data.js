import mapping from './dataset/mapping.json';


export function preprocess(dataset) {

  const X = [];
  const y = [];
  // List of labels in a certain order. Training data must be preprocessed and appended in this order
  const labels = ['id', 'amount_tsh', 'date_recorded', 'funder', 'gps_height', 'installer', 'longitude', 'latitude', 'wpt_name', 'num_private', 'basin', 'subvillage', 'region', 'region_code', 'district_code', 'lga', 'ward', 'population', 'public_meeting', 'recorded_by', 'scheme_management', 'scheme_name', 'permit', 'construction_year', 'extraction_type', 'extraction_type_group', 'extraction_type_class', 'management', 'management_group', 'payment', 'payment_type', 'water_quality', 'quality_group', 'quantity', 'quantity_group', 'source', 'source_type', 'source_class', 'waterpoint_type', 'waterpoint_type_group', 'status_group'];
  for (let i = 0; i < dataset.length; i++) {
    const row = dataset[i];
    // Handling the target data; nothing to preprocess, it should be either 0 or 1
    y.push(mapping["status_group"][row.status_group]);

    // Handle the training data
    const newRow = [];
    Object.keys(mapping)
        .filter((key) => key !== 'status_group')
        .map((key) => {
        let value = (mapping[key][row[key]]);
        newRow.push(value === undefined ? 1 : value)
    })

    X.push(newRow);
  }

  return { X, y };
}
