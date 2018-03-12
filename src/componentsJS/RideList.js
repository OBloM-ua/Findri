import React, { Component } from 'react'
import * as firebase from 'firebase'
import Ride from './Ride'

class RideList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: this.props.date,
      user: firebase.auth().currentUser,
      rides: [],
      direction: this.props.direction,
      loading: true,
    }
  }

  componentDidMount() {
    this.getRidesFromFirebase()
  }

  componentWillUnmount() {
    this.query.off()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: true,
      date: nextProps.date,
      rides: [],
      direction: nextProps.direction,
    }, this.getRidesFromFirebase)
  }

  getRidesFromFirebase() {
    this.query = null
    if (this.props.for === 'profile' && this.state.user)
      this.query = firebase.database().ref('rides/').orderByChild('userId').equalTo(this.state.user.uid).limitToLast(
        20)

    else //AT02.04.2017-10:10
      this.query = firebase.database().ref('rides/').orderByChild('index').startAt(
        this.state.direction + this.state.date + 'T00:00').endAt(this.state.direction + this.state.date + 'T23:59')

    this.query.off()
    this.query.on('value', snap => {
      this.setRidesList(snap)
    })
  }

  setRidesList(snap) {

    let rides = []
    snap.forEach(function (rideSnap) {
      let data = rideSnap.val()
      data.key = rideSnap.key
      if (data.deleted === true) return

      let ride = <Ride key={data.key} ride={data} for={this.props.for} showSeeMore/>
      if (this.props.for === 'main')
        rides.push(ride)
      else
        rides.unshift(ride)
    }.bind(this))

    this.setState({
      rides: rides,
      loading: false,
    })

  }

  render() {

    if (this.state.loading)
      return (<img className="loadingRideList" src="/cube.gif" alt="loading data"/>)

    if (this.state.rides.length === 0)
      return <h1>No Rides today</h1>

    return (
      <div className="list-group">
        {this.state.rides}
      </div>
    )
  }
}

export default RideList
