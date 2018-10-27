import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import { Header } from './Header';
import { NotFound } from './NotFound';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import NewGame from './NewGame';
import JoinGame from './JoinGame';
import GamesList from './GamesList';
import VenuesList from './VenuesList';
import Upload from './Upload';
import VenueEdit from './VenueEdit';

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
              <Route exact path='/login/' component={Login} />
              <Route exact path='/login/:id' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/games' component={GamesList} />
              <Route exact path='/venues' component={VenuesList} />
              <Route exact path='/newgame' component={NewGame} />
              <Route exact path='/game/join/:id' component={JoinGame} />
              <Route exact path='/admin/upload' component={Upload} />
              <Route exact path='/edit-venue' component={VenueEdit} />
              <Route path='*' component={NotFound} />
            </Switch>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
