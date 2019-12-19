const http = require('http');
const fetch = require("node-fetch");
const hostname = '127.0.0.1';
const port = 3011;

var datos = '';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(datos, null, 3));
});

server.listen(port, hostname, () => {
  var tmp = [];
  var tmpCoor = new Object();
  fetch('http://overpass-api.de/api/interpreter?data=[out:json];(node[amenity=toilets](43.322498,-8.444925,43.389976,-8.382816);>;);out meta;'
      ).then(res => res.json())
        .then((data) => {
          var json = [];
          for (var i = 0; i < data['elements'].length; i++) {
            json = data['elements'][i];
            tmpCoor.x = json['lon'];
            tmpCoor.y = json['lat'];
            tmp.push(tmpCoor);
            tmpCoor = new Object();
          }
          datos = tmp;
      });
});