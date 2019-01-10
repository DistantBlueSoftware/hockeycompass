import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

const mapStateToProps = state => {
  return state;
}

class AdminPayouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ajax: false,
      paymentsSent: false
    }
  }

  sendPayouts = () => {
    this.setState({
      ajax: true
    });
    this.props.sendAllOutstandingPayouts(() => this.setState({ajax: false, paymentsSent: true}));
  }
  
  componentDidMount() {
    this.props.getPaymentsTotal()
  }

  render() {
    const buttonText = this.state.paymentsSent ? 'Payments Sent!' : 'Send All Payments';
    const loadingOrReady = this.state.ajax ? <i className="fas fa-circle-notch fa-spin"></i> : buttonText;
    const buttonDisabled = this.state.paymentsSent ? 'disabled' : null;
    const { games, sendPayouts } = this.props;
    return (
      <React.Fragment>
        <h3>Admin Payouts</h3>
        <p>Current Total Payout Amount: ${this.props.payouts.total} <br />
        <em style={{fontSize: '12px'}}>You'll need this amount in your PayPal balance to make the payout.</em></p>
        <button className='btn btn-large btn-success' disabled={buttonDisabled} onClick={() => this.sendPayouts()}>{loadingOrReady}</button>
        {/*games.games.map(game => <h2>{game.name}</h2>)*/}
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, actions)(AdminPayouts); 
  