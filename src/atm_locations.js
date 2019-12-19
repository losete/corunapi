/**
 *
 * Script-Name: atm_locations
 */
const http = require('http');
const hostname = '127.0.0.1';
const port = 3005;

var datos = '';

var locations = require('mastercard-locations');
var MasterCardAPI = locations.MasterCardAPI;

var consumerKey = "Th6Txk2F9XNDwDEDrFvAXKpYB1eNMlcMkmgyjrWAd73121b6!0f994dc17c2d4d99849b72b0d209daaf0000000000000000";   // You should copy this from "My Keys" on your project page e.g. UTfbhDCSeNYvJpLL5l028sWL9it739PYh6LU5lZja15xcRpY!fd209e6c579dc9d7be52da93d35ae6b6c167c174690b72fa
var keyStorePath = "Corunapi-sandbox.p12"; // e.g. /Users/yourname/project/sandbox.p12 | C:\Users\yourname\project\sandbox.p12
var keyAlias = "keyalias";   // For production: change this to the key alias you chose when you created your production key
var keyPassword = "keystorepassword";   // For production: change this to the key alias you chose when you created your production key

var requestData = {
  "PageOffset": "0",
  "PageLength": "100",
  "Latitude": "43.3623436",
  "Longitude": "-8.4115401",
  "DistanceUnit": "MILE",
  "Radius": "2"
};

// You only need to do initialize MasterCardAPI once
//
var authentication = new MasterCardAPI.OAuth(consumerKey, keyStorePath, keyAlias, keyPassword);
MasterCardAPI.init({
    sandbox: true,
    debug: true,
    authentication: authentication
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(datos, null, 3));
});

server.listen(port, hostname, () => {
  var tmp = [];
  var tmpCoor = new Object();
  locations.ATMLocations.query(requestData
  , function (error, data) {
      if (error) {
          err("HttpStatus: "+error.getHttpStatus());
          err("Message: "+error.getMessage());
          err("ReasonCode: "+error.getReasonCode());
          err("Source: "+error.getSource());
          err(error);
      }
      else {
      var json = [];
        console.log();
        for (var i = 0; i < data['Atms']['Atm'].length; i++) {
          json = data['Atms']['Atm'][i]['Location']['Point'];
          tmpCoor.x = json['Longitude'];
          tmpCoor.y = json['Latitude'];
          tmp.push(tmpCoor);
          console.log(tmpCoor.x);
          tmpCoor = new Object();
        }
        datos = tmp;
      }
  });
});
