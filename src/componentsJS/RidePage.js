import React, { Component } from 'react'
import * as firebase from 'firebase'
import Driver from './Driver'
import Ride from './Ride'
import RatingAdd from './rating/RatingAdd'

class RideInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ratingComp: null,
      rideComp: null,
      driverComp: null,
    }
  }

  componentWillMount() {
    let query = firebase.database().ref('rides/' + this.props.params.rideId)
    query.once('value').then(function (snapshot) {
      let data = snapshot.val()
      data.key = snapshot.key
      this.setState({
        //так робити краще бо тоді не треба в рендері писати {this.state.ride&&<Ride ride={this.state.ride} />}
        rideComp: <Ride ride={data} showSeeMore={false}/>,
        driverComp: <Driver driverId={data.userId}/>,
        ratingComp: <RatingAdd driverId={data.userId}/>,
      })
    }.bind(this))
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row text-center">
          <div className="col-lg-1 col-sm-1	col-md-1"/>
          <div className="col-lg-5 col-sm-5	col-md-5">
            {this.state.rideComp}
            {this.state.ratingComp}
          </div>

          <div className="col-lg-5 col-sm-5	col-md-5">
            {this.state.driverComp}
          </div>
          <div className="col-lg-1 col-sm-1	col-md-1"/>
        </div>
      </div>
    )
  }
}

export default RideInfo
