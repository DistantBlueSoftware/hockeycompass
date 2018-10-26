import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import { Header } from './Header';
import { NotFound } from './NotFound';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import LoginRegister from './LoginRegister';
import Profile from './Profile';
import GameDetail from './GameDetail';
import JoinGame from './JoinGame';
import GamesList from './GamesList';
import VenuesList from './VenuesList';
import Upload from './Upload';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <React.Fragment>
            <Navigation />
            {/*<Header />*/}
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login/' component={LoginRegister} />
              <Route exact path='/login/:id' component={LoginRegister} />
              <Route exact path='/register' render={() => <LoginRegister currentTab={1} />} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/games' component={GamesList} />
              <Route exact path='/venues' component={VenuesList} />
              <Route exact path='/newgame' component={GameDetail} />
              <Route exact path='/game/join/:id' render={() => <GamesList openModal={'payment-modal'} />} />
              <Route exact path='/admin/upload' component={Upload} />
              <Route path='*' component={NotFound} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
