import React from 'react';
import ReactDOM from 'react-dom';
import Map from './src/Map';

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coor: []
    };
  }

  handleClick(service) {
      var apikey = 'PQvIynyWLRzFqR4oxy7ffbFmLKhPhYOy';
      var tmp = [];
      var tmpCoor = new Object();
      fetch('http://localhost:8000/' + service + '?apikey=' + apikey).then(res => res.json())
        .then((data) => {
          console.log(data);
          this.setState({ coor : data });
      })
  }

  /*handleClickGas = () => {
    var tmpCoor = []
    fetch('http://localhost:8000/gasolineras',{
      'method':'GET',
      headers: new Headers({
      'apikey': ' lluevetodoeldia'})}
    ).then(res => res.json())
      .then((data) => {
        for (var i = 0; i < data['features'].length; i++) {
          tmpCoor.push(data['features'][i]['geometry']);
        }
        this.setState({ coor : tmpCoor });
    })
  }*/

  render() {
  // HAY QUE PERFECCIONAR LAS CONSULTAS PARA QUE DEVUELVA LO ABIERTO COGIENDO LA HORA DEL SISTEMA
  // Ojo: depende de cada uno la forma de hacer querys, igual se complica mucho
  // y compensa mas trtatar la respuesta
  // Dos opciones: tratar la respuesta o incluirlo en la consulta
      return (
        <div>
          <Map points = {this.state.coor} />
          <button onClick={() => this.handleClick('gasolineras')}>
            Gasolineras
          </button>
          <button onClick={() => this.handleClick('cajeros')}>
            Cajeros
          </button>
          <button onClick={() => this.handleClick('supermercados')}>
             Supermercados
          </button>
          <button onClick={() => this.handleClick('hospitales')}>
             Hospitales
          </button>
          <button onClick={() => this.handleClick('farmacias')}>
             Farmacias
          </button>
          <button onClick={() => this.handleClick('banos')}>
             Baños públicos
          </button>
          <button onClick={() => this.handleClick('fuentes')}>
             Puntos de agua potable
          </button>
        </div>
      );
    }
}

ReactDOM.render(<Page />, document.getElementById('general'));