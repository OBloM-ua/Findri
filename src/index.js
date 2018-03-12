import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import * as firebase from 'firebase'

import Navbar from './componentsJS/Navbar'
import Main from './componentsJS/Main'
import RideAdd from './componentsJS/RideAdd'
import Profile from './componentsJS/Profile'
import RideInfo from './componentsJS/RidePage'
import About from './componentsJS/About'
import Test from './componentsJS/Test'
import 'react-widgets/dist/css/react-widgets.css' // needed for calendarElement (Mian.js and RideAdd.js)


let config = {
  apiKey: 'AIzaSyD4b4sST0v_mtFtwu1DwuHobg1eQ--7twc',
  authDomain: 'findri-de.firebaseapp.com',
  databaseURL: 'https://findri-de.firebaseio.com',
  projectId: 'findri-de',
  storageBucket: 'findri-de.appspot.com',
  messagingSenderId: '794755403460',
}
firebase.initializeApp(config)


ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={Navbar}>
        <IndexRoute component={Main}/>
        <Route path="add" component={RideAdd}/>
        <Route path="profile" component={Profile}/>
        <Route path="rides/:rideId" component={RideInfo}/>
        <Route path="about" component={About}/>
      </Route>
      <Route path="test" component={Test}/>
    </Router>
  ), document.getElementById('root'),
)
