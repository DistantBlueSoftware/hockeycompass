import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Login from './Login';
import Register from './Register';
import './LoginRegister.css';

class LoginRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    }
  }
  
  // switchTabs = (e) => {
  //   console.log(e.target.dataset.tab)
  //   this.setState({
  //     active: e.target.dataset.tab
  //   })
  // }
  
  componentDidUpdate = prevProps => {
    if (prevProps.match.path !== this.props.match.path) { 
      let active = 0;
      if (this.props.match.path === '/register') active = 1; 
      this.setState({
        active
      });
    }
  }
  
  render() {
    const {active} = this.state;
    console.log(active)
    return (
      <Tabs 
        className='login-register' 
        selectedIndex={active} 
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