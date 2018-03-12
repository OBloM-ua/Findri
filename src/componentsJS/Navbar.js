import React, { Component } from 'react'
import { IndexLink, Link } from 'react-router'
import * as firebase from 'firebase'
import { browserHistory } from 'react-router'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      label: 'Sign in',
      user: undefined,
    }
    this.signInOut = this.signInOut.bind(this)
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this))
  }

  onAuthStateChanged(user) {
    if (user) {
      this.setState({
        user: user,
        label: 'Sign out',
        displayName: user.displayName,
      }, this.saveOrUpdateNewUser)
    }
    else {
      this.setState({
        user: null,
        label: 'Sign in',
      })
    }
  }


  signInOut() {
    if (this.state.user) {
      firebase.auth().signOut()
      browserHistory.push('/')
    }
    else {
      let provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider)
      browserHistory.push('/')
    }
    return true
  }

  saveOrUpdateNewUser() {
    let userRef = firebase.database().ref('users/' + this.state.user.uid)
    userRef.update({
      name: this.state.user.displayName,
      email: this.state.user.email,
      photoURL: '//graph.facebook.com/v2.8/' + this.state.user.providerData['0'].uid + '/picture?width=200&height=200',
    })
  }

  render() {
    if (this.state.user === undefined)
      return (<img className="loading" src="/cube.gif" alt="loading data"/>)
    else
      return (
        <div>
          <div className="nav-container">
            <div className="nav-logo">
              <IndexLink to="/"> <img src="/findri-text.png" alt="Findri"/> </IndexLink>
            </div>


            <div className="nav-btn ">

              {!this.state.user && <a className="btn btn-danger" id="sign_in_out" onClick={this.signInOut}>
                <i className="glyphicon glyphicon-log-in"/> {this.state.label}</a>}

              {this.state.user && <div className="btn-group">
                <button onClick={function () {
                  browserHistory.push('/add')
                }} type="button" className="btn btn-danger"><i
                  className="glyphicon glyphicon-plus"/> Ride
                </button>
                <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                  <span className="caret"></span>
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li><Link to="/profile">
                    <i className="glyphicon glyphicon-user"/> {this.state.displayName}
                  </Link></li>
                  <li><a onClick={this.signInOut}>
                    <i className="glyphicon glyphicon-log-in"/> {this.state.label}
                  </a></li>
                  <li role="separator" className="divider"/>
                  <li><Link to="/about">
                    <i className="glyphicon glyphicon-info-sign"/> About
                  </Link></li>
                </ul>
              </div>}

            </div>
          </div>
          {/*<div className="my-container">*/}
            {this.props.children}
          {/*</div>*/}
        </div>
      )
  }
}

export default Navbar
