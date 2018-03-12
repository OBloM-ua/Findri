import React, { Component } from 'react'
import * as firebase from 'firebase'

class RideEditButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: firebase.auth().currentUser,
    }
    this.removeRide = this.removeRide.bind(this)
  }

  removeRide(e) {
    e.preventDefault() // not scroling to Top after Removing Ride
    console.log('REMOVE: ' + this.props.rideId)
    let query = firebase.database().ref('rides/' + this.props.rideId)
    query.update({deleted: true})
  }


  render() {


    if (this.state.user && this.state.user.uid === this.props.userId)
      return (
        <div>
          <div className="btn-group btn-drop-down">
            <button type="button" className="btn btn-default dropdown-toggle "
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">

              <span className="glyphicon glyphicon-pencil"/>
            </button>
            <ul className="dropdown-menu">
              <li><a href="#" onClick={this.removeRide}>Remove</a></li>
            </ul>
          </div>
        </div>
      )
    else return null
  }
}

export default  RideEditButton
