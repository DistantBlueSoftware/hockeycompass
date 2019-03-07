import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminPayouts from './AdminPayouts';
import requireAuth from './requireAuth';
import * as actions from './actions';

const mapStateToProps = state => {
  return {...state};
}

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  componentDidMount() {
    const {games} = this.props;
    if (games && games.games.length === 0) this.props.listGames();
  }
  
  render() {
    const {games} = this.props;
    const awaitingPayout = games.games.filter(game => !game.payoutDistributed);
    return (
      <div className='container-fluid'>
        <h1>Admin Portal</h1>
        <AdminPayouts games={awaitingPayout} />
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(requireAuth(AdminDashboard))