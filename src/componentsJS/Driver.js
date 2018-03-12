import React, { Component } from 'react'
import * as firebase from 'firebase'
import RatingAverage from './rating/RatingAverage'

class Driver extends Component {
  constructor(props) {
    super(props)
    this.state = {
      driverId: this.props.driverId,
      showInfo: false,
      user: firebase.auth().currentUser,
    }
    this.setDriverData(this.props.driverId)
    this.showInfo = this.showInfo.bind(this)
  }


  setDriverData(driverId) {
    let query = firebase.database().ref('users/' + driverId)
    query.once('value').then(function (snapshot) {
      let data = snapshot.val()
      this.setState({
        photoURL: data.photoURL,
        name: data.name,
        averageRaiting: this.state.averageRaiting,
        phoneNr1: data.phoneNr1,
        phoneNr2: data.phoneNr2,
        phoneNr3: data.phoneNr3,
      })
    }.bind(this))
  }

  showInfo() {
    this.setState({showInfo: true})
    //   add Statistick . тільки статисника після  зірочки можна ставити всім зто як хоче бо можна 5
    //   зірок ще до поїздки за приємне і швидке мпілкування влупити або 1 зірку за хамство
    // як водій буде відмічати хто з ним був то недовольних пасажирів він не відмітить
    // тому ми ніколи не дізнаємось чи їхав пасажир від водія чесно

    //myPhoneRequestCounter myPhoneRequestCounter
    let driverRef = firebase.database().ref('users/' + this.state.driverId + '/myPhoneRequestCounter')
    driverRef.transaction(function (myPhoneRequestCounter) {
      return (myPhoneRequestCounter || 0) + 1
    })


    //iClickedShowInfoCounter
    console.log('iClickedShowInfoCounter  ' + this.state.user.uid)
    let userRef = firebase.database().ref('users/' + this.state.user.uid + '/iClickedShowInfoCounter')
    userRef.transaction(function (iClickedShowInfoCounter) {
      return (iClickedShowInfoCounter || 0) + 1
    })
  }

  render() {
    return (
      <div className="jumbotron">
        <img src={this.state.photoURL} alt="no user pic"/>
        <h2>{this.state.name}</h2><br/>
        <RatingAverage driverId={this.props.driverId}/>
        <br/>

        {!this.state.user && <p style={{color: 'red'}}>For informations please Sign in</p>}

        {!this.state.showInfo && this.state.user &&
        <a type="button" className="btn btn-danger" onClick={this.showInfo}>Show Info</a>}


        {this.state.showInfo &&
        <div>
          <p>{this.state.phoneNr1}</p>
          <p> {this.state.phoneNr2}</p>
          <p>{this.state.phoneNr3}</p>
        </div>
        }

      </div>
    )

  }
}

export default Driver
