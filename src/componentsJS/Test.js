import React, { Component } from 'react'
import { IndexLink } from 'react-router'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {throughFields: ['through-0']}
  }

  addThroughField() {
    let newThroughField = `through-${this.state.throughFieldKeysArr.length}`
    if (this.state.throughFieldKeysArr.length < 3)
      this.setState({throughFields: this.state.throughFieldKeysArr.concat([newThroughField])})
  }

  removeThroughField() {
    if (this.state.throughFieldKeysArr.length > 1)
      this.setState({throughFields: this.state.throughFieldKeysArr.slice(0, -1)})
  }

  render() {
    return (
      <div>
        <div className="nav-container">
          <div className="nav-logo">
            <IndexLink to="/"> <img src="/findri-text.png" alt="Findri"/> </IndexLink>
          </div>
          <div className="nav-btn ">
            <div className="btn-group">
              <button type="button" className="btn btn-danger">Action</button>
              <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </div>
          </div>
        </div>

        <h1>CONTENT</h1>
      </div>
    )
  }


}