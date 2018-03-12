import React, { Component } from 'react'

class MapDirections extends Component {
  componentDidMount() {
    let map = new window.google.maps.Map(this.refs.map, {
      mapTypeControl: false,
      center: {lat: 49.33, lng: 21.39},
      zoom: 5,
    })
    this.autocompleteDirectionsHandler(map)
  }

  autocompleteDirectionsHandler(map) {
    this.map = map
    this.travelMode = 'DRIVING'
    this.directionsService = new window.google.maps.DirectionsService()
    this.directionsDisplay = new window.google.maps.DirectionsRenderer()
    this.directionsDisplay.setMap(map)
  }

  componentWillReceiveProps(nextProps) {
    this.route(nextProps.fromCityId, nextProps.toCityId, nextProps.waypoints)
  }

  route(fromCityId, toCityId, waypoints) {
    if (!fromCityId || !toCityId) return
    console.log(fromCityId)
    console.log(toCityId)
    console.log(waypoints)
    let me = this

    this.directionsService.route({
      origin: {'placeId': fromCityId},
      waypoints: waypoints,//[{location: 'Vienna, Austria'}, {location: 'Bohorodchany, Ivano-Frankivs\'ka oblast, Ukraine'}]
      destination: {'placeId': toCityId},
      travelMode: this.travelMode,
    }, function (response, status) {
      if (status === 'OK') {
        me.directionsDisplay.setDirections(response)
      }
      else {
        window.alert('Directions request failed due to ' + status)
      }
    })
  };

  render() {
    return (
      <div>
        <div ref="map" className="map-directions"/>
      </div>
    )
  }

}

export default MapDirections