import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import * as firebase from 'firebase'
import MapDirections from './MapDirections'

import moment from 'moment'
import momentLocalizer from 'react-widgets/lib/localizers/moment'
import { DateTimePicker } from 'react-widgets'

export default class RideAdd extends Component {

  constructor(props) {
    super(props)
    momentLocalizer(moment)

    this.state = {
      currentUser: firebase.auth().currentUser,
      datetime: new Date(),
      throughFieldKeysArr: ['through0'],
      waypoints: [],
    }

    this.saveRide = this.saveRide.bind(this)
    this.dateTimeHandler = this.dateTimeHandler.bind(this)
  }

  componentDidMount() {
    this.makeAutocomplete(false, this.refs.fromCity, this, 'from')
    this.makeAutocomplete(false, this.refs.toCity, this, 'to')
    let ref = this.state.throughFieldKeysArr.slice(-1) // forExemple ref = [through0] , ref[0] = "through0"
    let lastChar = ref[0].slice(-1)
    this.makeAutocomplete(lastChar, this.refs[ref], this)// default first field (this.refs.through0)
  }

  componentDidUpdate() {
    let ref = this.state.throughFieldKeysArr.slice(-1) // forExemple ref = [through0] , ref[0] = "through0"
    let lastChar = ref[0].slice(-1)
    this.makeAutocomplete(lastChar, this.refs[ref], this)// 2 and 3 field
  }

  saveRide() {
    if (!this.state.currentUser) {
      alert('Please Sign in')
      browserHistory.push('/')
      return
    }
    let ride = {
      fromCity: this.state.fromCity,
      through: this.getThroughs(),
      toCity: this.state.toCity,
      datetime: this.state.datetime,
      price: this.refs.price.value,
      places: this.refs.places.value,
      description: this.refs.description.value,

      userName: this.state.currentUser.displayName,
      userId: this.state.currentUser.uid,
      index: this.state.toCountry + this.state.datetime, // search index
      fromCityId: this.state.fromCityId,
      fromCountry: this.state.fromCountry,
      toCityId: this.state.toCityId,
      toCountry: this.state.toCountry,
      deleted: false,
    }
    console.log('new Ride = ', ride)

    if (this.verifyFields(ride)) {
      let userRef = firebase.database().ref('rides/')
      let rideId = userRef.push(ride).key
      browserHistory.push('/rides/' + rideId)
    }
  }


  verifyFields(ride) {
    let allOk = true

    if (ride.fromCity === undefined) {
      this.refs.fromCity.style.borderColor = 'red'
      allOk = false
    }
    else this.refs.fromCity.style.borderColor = 'green'

    if (ride.toCity === undefined) {
      this.refs.toCity.style.borderColor = 'red'
      allOk = false
    }
    else this.refs.toCity.style.borderColor = 'green'

    if (ride.price === '') {
      this.refs.price.style.borderColor = 'red'
      allOk = false
    }
    else this.refs.price.style.borderColor = 'green'

    if (ride.datetime === null || moment().isAfter(moment(ride.datetime)) || ride.datetime === 'Invalid date') {
      this.setState({style: {borderColor: 'red'}})
      allOk = false
    }
    else this.setState({style: {borderColor: 'green'}})
    return allOk
  }


  makeAutocomplete(ref, input, context, saveName) {
    let autocomplete = new window.google.maps.places.Autocomplete(input)
//    autocomplete.setComponentRestrictions(
//      {'country': ['at', 'ua']})
    autocomplete.addListener('place_changed', function () {
      let place = autocomplete.getPlace()
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert('No details available for input: \'' + place.name + '\'')
        return
      }

      if (ref) {
        let waypointsTmp = context.state.waypoints
        waypointsTmp[ref] = {location: place.formatted_address}
        context.setState({waypoints: waypointsTmp})
      }
      else {
        let obj = {}
        obj[saveName + 'City'] = place.formatted_address
        obj[saveName + 'CityId'] = place.place_id
        obj[saveName + 'Country'] = place.address_components.slice(-1)[0].short_name
        context.setState(obj)

      }
    })
  }

  dateTimeHandler(date) {
    this.setState({
      datetime: moment(date).format('YYYY-MM-DDTHH:mm'),
    })
  }

  addThroughField() {
    let newThroughKey = `through${this.state.throughFieldKeysArr.length}`
    if (this.state.throughFieldKeysArr.length < 3)
      this.setState({throughFieldKeysArr: this.state.throughFieldKeysArr.concat([newThroughKey])})
  }

  getThroughs() {
    let sum = ' -> '
    this.state.waypoints.map((obj) => {
      return sum += obj.location + ' -> '
    })
    console.log(sum)
    return sum
  }
git
  removeThroughField(id) {

    //todo remove with ID
    let length = this.state.throughFieldKeysArr.length

    if (length===1) {
      this.setState({
        waypoints: this.state.waypoints.slice(0, -1),
      })
      this.refs['through'+(length-1)].value = ''
    }
    else
      this.setState({
        throughFieldKeysArr: this.state.throughFieldKeysArr.slice(0, -1),
        waypoints: this.state.waypoints.slice(0, -1),
      })
  }

  render() {
    return (
      <div>
        <div className="container-fluid text-center">
          <div className="col-lg-5 col-lg-offset-1 col-sm-5 col-sm-offset-1 col-md-5">

            {/*RIDE-FORM*/}
            {/*From*/}
            <div className="input-group ">
                        <span className="input-group-addon">
                        <i className="glyphicon glyphicon-export"/> From</span>
              <input ref="fromCity" type="text" className="form-control" placeholder="From"/>
            </div>
            <br/>
            {/*Through*/}
            {this.state.throughFieldKeysArr.map(throughId =>
              <div key={throughId} className="input-group">
              <span className="input-group-addon">
              <i className="glyphicon glyphicon-transfer"/> Through</span>
                <input ref={throughId} type="text" className="form-control" placeholder="Brno"/>
                <span className="input-group-btn">
                  {/*//show only on last one and wenn not 3 */}
                  {parseInt(throughId.slice(-1), 10) === 2 || parseInt(throughId.slice(-1),
                    10) !== this.state.throughFieldKeysArr.length - 1 ||
                  <button className="btn btn-default " type="button" onClick={ () => this.addThroughField()}>
                    <span className="glyphicon glyphicon-plus green"/>
                  </button>
                  }
                  <button className="btn btn-default " type="button"
                          onClick={ () => this.removeThroughField(throughId)}>
                    <span className="glyphicon glyphicon-minus red"/>
                  </button>
              </span>
              </div>,
            )}
            <br/>
            {/*To*/}
            <div className="input-group ">
                        <span className="input-group-addon"><i
                          className="glyphicon glyphicon-import"/> To</span>
              <input ref="toCity" type="text" className="form-control" placeholder="To"/>
            </div>

            {/*Date*/}
            <label>Date </label>


            <DateTimePicker
              defaultValue={this.state.datetime}
              footer
              format={'DD.MM.YYYY HH:mm'}
              finalView={'year'}
              culture="en-GB"
              min={moment().minute(0).toDate()}
              max={moment().add(4, 'M').toDate()}
              style={this.state.style}
              onChange={this.dateTimeHandler}
            />

            {/*Price*/}
            <label>Price</label>
            <input type="number" ref="price" className="form-control"/>

            {/*Places*/}
            <label>Free places</label>
            <input type="number" ref="places" className="form-control"/>
            <br/>

            {/*Description*/}
            <div className="form-group">
              <label>Description:</label>
              <textarea className="form-control" rows="3" ref="description"/>
            </div>
            <br/>

            {/*Submit*/}
            <button className="btn btn-success" onClick={this.saveRide}>
              Submit
            </button>

          </div>
          <div className="col-lg-5 col-sm-5 col-md-5">
            <MapDirections fromCityId={this.state.fromCityId} toCityId={this.state.toCityId}
                           waypoints={this.state.waypoints}/>
          </div>
        </div>

      </div>
    )

  }
}