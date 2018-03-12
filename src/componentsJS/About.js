import React, { Component } from 'react'

export default class About extends Component {
  constructor(props) {
    super(props)
    this.state = {a: 'A'}
  }

  render() {
    return (
      <div className="container">
        <h1>Helllo users</h1>
        <p>This Project was created to connect people travelling between Austria and Ukraine with private drivers.</p>
        <h3>Support emails</h3>
        <h2>Founder</h2>
        <a href="mailto:y.baidiuk@gmail.com">y.baidiuk@gmail.com</a>
        <br/>
        <h2>Co-founder</h2>
        <a href="mailto:sergii@kauk.at">sergii@kauk.at</a>
        <br/> <br/>
        <h4>Verion: 0.9</h4>
      </div>
    )
  }


}