import React, { Component } from 'react'
import * as firebase from 'firebase'
import ReactStars from 'react-stars'

class RatingAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0,
      driverId: this.props.driverId,
      user: firebase.auth().currentUser,
    }
    if (this.state.user)
      this.getMyLastRatingFromFirebase()
    this.saveUserRaiting = this.saveUserRaiting.bind(this)
  }

  getMyLastRatingFromFirebase() {
    let query = firebase.database().ref('rating/' + this.state.driverId + '/usersRating/' + this.state.user.uid)
    // query.off();
    query.once('value').then(function (snapshot) {
      if (snapshot.val() !== null)
        this.setState({
          rating: snapshot.val().rating,
        })
    }.bind(this))
  }

  saveUserRaiting(newRating) {
    let query = firebase.database().ref('rating/' + this.state.driverId + '/usersRating/' + this.state.user.uid)
    query.update({
      rating: newRating,
      name: this.state.user.displayName,
    })

    this.countAndSaveAverageRating()
  }

  countAndSaveAverageRating() {
    let total = 0
    let counter = 0
    let average = 0
    let query = firebase.database().ref('rating/' + this.state.driverId + '/usersRating')
    query.once('value').then(function (snapshot) {
      snapshot.forEach(function (cSnapshot) {
        counter++
        total += cSnapshot.val().rating
      })
    }).then(function () {
      query = firebase.database().ref('rating/' + this.state.driverId)
      average = total / counter
      if (isNaN(average)) {
        average = 0
      }
      query.update({
        averageRating: average,
        amount: counter,
      })
    }.bind(this))
  }

  render() {
    if (!this.state.user || this.state.user.uid === this.state.driverId)
      return null
    return (
      <div className="center">
        <h3>your's Raiting</h3>

        <ReactStars
          value={this.state.rating}
          onChange={this.saveUserRaiting}
          count={5}
          size={30}
        />
      </div>
    )
  }
}

export default RatingAdd
