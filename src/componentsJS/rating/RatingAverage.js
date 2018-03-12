import React, {Component} from 'react';
import * as firebase from "firebase";
import ReactStars from 'react-stars'

class RatingAverage extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      averageRaiting: 0,
      amount: 0,
    });
  }

  componentDidMount() {
    let query = firebase.database().ref('rating/' + this.props.driverId)
    query.off()
    query.on('value', snap => {

      if (snap.val() !== null)
        this.setState({
          averageRaiting: snap.val().averageRating,
          amount: snap.val().amount,
        })

    })
  }

  render() {
    return (
      <div className="center">
        <ReactStars
          edit="false"
          value={this.state.averageRaiting}
          count={5}
          size={30}
        />{this.state.amount} Feedbacks {/*total amount from stars*/}
      </div>
    );
  }
}

export default RatingAverage;
