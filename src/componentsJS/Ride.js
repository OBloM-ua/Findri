import React, { Component } from 'react'
import  { Link } from 'react-router'
import moment from 'moment'
import RideEditButton from './RideEditButton'

class Ride extends Component {
  render() {
    // moment.locale('en');
    let data = this.props.ride
    let link = 'rides/' + this.props.ride.key
    let title = moment(data.datetime).format('dddd, D MMMM, YYYY HH:mm')

    let inFuture = moment().isBefore(moment(data.datetime))

    return (
      <div className="list-group-item">

        { inFuture && <RideEditButton userId={this.props.ride.userId} rideId={this.props.ride.key}/>}

        <p>{title}</p>
        <h4>From: {data.fromCity}</h4>
        Through: {data.through}
        <h4>To: {data.toCity}</h4>
        <p>{data.userName}<b> Price: {data.price} </b> Free Places: {data.places}</p>
        <p>{data.description}<br/>
          {this.props.showSeeMore && <Link to={link}>See More</Link> }
        </p>
      </div>
    )
  }
}

export default Ride
