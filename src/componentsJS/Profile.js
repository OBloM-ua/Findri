import React, { Component } from 'react'
import * as firebase from 'firebase'
import RideList from './RideList'
import RatingAverage from './rating/RatingAverage'
import RatingList from './rating/RatingList'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: firebase.auth().currentUser,
      photo: '/no-profile.png',
    }
    this.savePhoneNumbers = this.savePhoneNumbers.bind(this)
    this.setNumbersAndPhoto()
  }

  savePhoneNumbers() {
    console.log('savePhoneNumbers')
    let userRef = firebase.database().ref('users/' + this.state.user.uid)
    userRef.update({
      phoneNr1: this.refs.phoneNr1.value,
      phoneNr2: this.refs.phoneNr2.value,
      phoneNr3: this.refs.phoneNr3.value,
    })
  }

  setNumbersAndPhoto() {
    firebase.database().ref('users/' + this.state.user.uid).once('value').then(function (snapshot) {
      let data = snapshot.val()
      this.setState({
        photo: data.photoURL,
      })
      if (data.phoneNr1 !== undefined)
        this.refs.phoneNr1.value = data.phoneNr1
      if (data.phoneNr2 !== undefined)
        this.refs.phoneNr2.value = data.phoneNr2
      if (data.phoneNr3 !== undefined)
        this.refs.phoneNr3.value = data.phoneNr3
    }.bind(this))

  }


  render() {

    return (
      <div>

        <div className="container-fluid">
          <div className="row text-center">
            {/*<!--Profile Info-->*/}
            <div className="col-lg-2 col-lg-offset-1 col-sm-2 col-sm-offset-1 col-md-2">

              <img src={this.state.photo} alt='/profile_placeholder.png'/>

              <h1>{this.state.user.displayName}</h1>
              <RatingAverage driverId={this.state.user.uid}/>
              <form id="profil-form">


                <input type="text" placeholder="phoneNr1" ref="phoneNr1"/><br/>
                <input type="text" placeholder="phoneNr2" ref="phoneNr2"/><br/>
                <input type="text" placeholder="phoneNr3" ref="phoneNr3"/><br/><br/>
                <button type="button" className="btn btn-danger" onClick={this.savePhoneNumbers} >Save</button>
              </form>


            </div>
            {/*<!--My Rides-->*/}
            <div className="col-lg-6 col-sm-6 col-md-6">
              <h3>My Rides</h3>

              <RideList for="profile"/>

            </div>
            {/*<!--My Feedbacks-->*/}
            <div className="col-lg-2  col-sm-2	col-md-2">
              <RatingList userId={this.state.user.uid}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Profile
