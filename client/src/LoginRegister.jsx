import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Login from './Login';
import Register from './Register';
import './LoginRegister.css';

class LoginRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.currentTab || 0
    }
  }
  
  switchTabs = (e) => {
    this.setState({
      active: e.target.dataset.tab
    })
  }
  
  render() {
    const {active} = this.state;
    return (
      <Tabs 
        className='login-register' 
        defaultIndex={this.state.active} 
        selectedTabClassName='active' 
        selectedTabPanelClassName='active-tab-content'
        >
        <TabList className='tabs'>
      		<Tab className='tab-link'>Login</Tab>
      		<Tab className='tab-link'>Register</Tab>
      	</TabList>
        <TabPanel className='tab-content'>
          <Login {...this.props} />
        </TabPanel>
        <TabPanel className='tab-content'>
          <Register {...this.props} />
        </TabPanel>
      </Tabs>
    )
  }
}

export default LoginRegister;