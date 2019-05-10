import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

const mapStateToProps = state => {
  return state;
}

class AdminStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  sendPayouts = () => {
    this.setState({
      ajax: true
    });
    this.props.sendAllOutstandingPayouts(() => this.setState({ajax: false, paymentsSent: true}));
  }
  
  componentDidMount() {
    this.props.getAdminStats()
  }

  render() {
    return (
      <React.Fragment>
        <h3>Site Stats</h3>
        <p># of Users: {this.props.system.stats}</p>
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, actions)(AdminStats); 
  