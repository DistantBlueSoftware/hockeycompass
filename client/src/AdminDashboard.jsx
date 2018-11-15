import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  render() {
    return (
      <div>
        <h1>Admin Portal</h1>
      </div>
    )
  }
}

export default connect()(AdminDashboard)