import React, { Component } from 'react'
import * as firebase from 'firebase'
import ReactStars from 'react-stars'

class RatingList extends Component {
  constructor(props) {
    super(props)
    this.state = ({
      userId: this.props.userId,
      ratingList: [],
    })
  }

  componentWillMount() {
    let query = firebase.database().ref('rating/' + this.state.userId + '/usersRating').limitToLast(20)
    // query.off();//?
    query.once('value').then(function (snapshot) {
      snapshot.forEach(function (cSnapshot) {
        this.createRatingList(cSnapshot)
      }.bind(this))
    }.bind(this))
  }

  createRatingList(snapshot) {
    let data = snapshot.val()
    let tmpRating = this.state.ratingList
    let rating = <div className="center" key={snapshot.key}>

      {data.name}
      <ReactStars edit="false"
                  size={30}
                  value={data.rating}/>
    </div>
    tmpRating.unshift(rating)
    this.setState({
      ratingList: tmpRating,
    })
  }

  render() {
    return (
      <div>
        <h3>Last 20 Ratings</h3>
        {this.state.ratingList}
      </div>
    )
  }
}
export default  RatingList