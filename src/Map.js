import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

class Map extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      points: props
    };
  }

  getMarkers = () => {
    if (this.props.points.length > 0){
      var x = '';
      var y = ''
      var tmp = [];
      var markers = [];
      for (var i = 0; i < this.props.points.length; i++) {
        x = this.props.points[i]['x'];
        y = this.props.points[i]['y'];
        tmp = <Marker position={[y,x]}> <Popup> Popup for any custom information. </Popup> </Marker>;
        markers.push(tmp);
      }
      return markers;
    } else {
      return <Marker position={[43.3623553, -8.4116459]}> <Popup> Popup for any custom information. </Popup> </Marker>;
    }

  }

  render() {
    console.log(this.props)
    var markers = this.getMarkers()
    return (
      <LeafletMap
        center={[43.3623553, -8.4116459]}
        zoom={14}
        maxZoom={16}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {markers}
      </LeafletMap>
    );
  }
}

export default Map
