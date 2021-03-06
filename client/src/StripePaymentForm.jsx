import React, { Component } from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';
import { connect } from 'react-redux';
import './StripePaymentForm.css';
import * as actions from './actions';

class StripePaymentForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const {stripe, costWithFee, game, user, addPlayer, processPayment, setLoadingState} = this.props;
    setLoadingState(game._id);
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    stripe.createToken({name: user.username, email: user.email})
      .then(({token}) => processPayment(token, costWithFee, game, user, addPlayer))
      .then(() => setLoadingState(false));
    // However, this line of code will do the same thing:
    //
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

    // You can also use createSource to create Sources. See our Sources
    // documentation for more: https://stripe.com/docs/stripe-js/reference#stripe-create-source
    //
    // this.props.stripe.createSource({type: 'card', owner: {
    //   name: 'Jenny Rosen'
    // }});
  };
  render() {
    const { user } = this.props;
    return (
      <form className='payment-form' onSubmit={this.handleSubmit}>
        <label>
          Card details
          <CardElement style={{base: {fontSize: '18px'}}} value={{postalCode: user.zipCode}}/>
        </label>
        <button className='btn btn-success' data-dismiss='modal' onClick={e => this.handleSubmit(e)}>Pay and Join</button>
      </form>
    )
  }
}

export default connect(null, actions)(injectStripe(StripePaymentForm));