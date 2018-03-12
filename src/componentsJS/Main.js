import React, { Component } from 'react'
import RideList from './RideList'
import moment from 'moment'

import momentLocalizer from 'react-widgets/lib/localizers/moment'
import { Calendar } from 'react-widgets'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: moment().format('YYYY-MM-DD'),
      direction: 'UA',
    }
    momentLocalizer(moment)
    this.handleDatePicker = this.handleDatePicker.bind(this)
    this.handleDirection = this.handleDirection.bind(this)
  }

  handleDatePicker(value) {
    this.setState({
      date: moment(value).format('YYYY-MM-DD'),
    })
  }

  handleDirection(e) {
    this.setState({
      direction: e.target.value,
    })
  }


  render() {
    return (
      <div>
        {/*Content*/}
        <div className="container-fluid row text-center ">

          <div className="col-lg-3 col-lg-offset-1  col-sm-3 col-sm-offset-1	col-md-3 ">

            <h4>Direction</h4>

            <select className="form-control" onChange={this.handleDirection}>
              <option value="UA">-> UA</option>
              <option value="AT">-> AT</option>
            </select>

            <h4>Date</h4>

            <Calendar defaultValue={new Date()}
                      onChange={this.handleDatePicker}
                      footer
                      finalView={'year'}
                      culture="en-GB"/>
          </div>

          {/*<!--RIDES-->*/}
          <div className="col-lg-7 col-sm-7	col-md-7">
            <h3>Search Rides</h3>
            <RideList for="main" date={this.state.date} direction={this.state.direction}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Main