import React, { Component } from 'react';
import { connect } from 'react-redux';
import {AdminPayouts} from './AdminPayouts';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {
    return (
      <div className='container-fluid'>
        <h1>Admin Portal</h1>
        <AdminPayouts />
      </div>
    )
  }
}

export default connect()(AdminDashboard)