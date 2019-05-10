import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminPayouts from './AdminPayouts';
import AdminStats from './AdminStats';
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
    this.props.routeChange('/admin');
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
        <AdminStats />
      </div>
    )
  }
}

export default connect(mapStateToProps, actions)(requireAuth(AdminDashboard))