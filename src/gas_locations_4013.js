const http = require('http');
const fetch = require("node-fetch");
const hostname = '127.0.0.1';
const port = 4013;

var datos = '';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(datos, null, 3));
});

server.listen(port, hostname, () => {
  var tmpCoor = [];
    fetch('http://www.mapabase.es/arcgis/rest/services/Otros/Gasolineras/FeatureServer/0/query?where=localidad+%3D+%27CORUÑA+%28A%29%27&outFields=latitud,longitud,horario,dirección,rótulo&f=json'
      ).then(res => res.json())
      .then((data) => {
        for (var i = 0; i < data.features.length; i++) {
          tmpCoor.push(data.features[i].geometry);
        }
        datos = tmpCoor;
    });
});