const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'React_tutorial_olx_clone-main',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

