import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigation from './Navigation';
import { NotFound } from './NotFound';
import { Footer } from './Footer';
import Home from './Home';
import LoginRegister from './LoginRegister';
import Profile from './Profile';
import AdminDashboard from './AdminDashboard';
import GameDetail from './GameDetail';
import GamesList from './GamesList';
import VenuesList from './VenuesList';
import Upload from './Upload';
import PasswordReset from './PasswordReset';
import PrivacyPolicy from './PrivacyPolicy';
import TermsConditions from './TermsConditions';
import { CancellationPolicy } from './CancellationPolicy';
import ScrollToTop from './ScrollToTop';
import './animations.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ScrollToTop>
            <Navigation />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={LoginRegister} />
              <Route exact path="/login/:id" component={LoginRegister} />
              <Route exact path="/register" component={LoginRegister} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/games" component={GamesList} />
              <Route exact path="/venues" component={VenuesList} />
              <Route exact path="/newgame" component={GameDetail} />
              <Route exact path="/newgame/:venue" component={GameDetail} />
              <Route
                exact
                path="/game/join/:id"
                render={() => <GamesList openModal={'payment-modal'} />}
              />
              <Route exact path="/game/:id/edit" component={GameDetail} />} />
              <Route exact path="/admin" component={AdminDashboard} />
              <Route exact path="/admin/upload" component={Upload} />
              <Route exact path="/reset/:token" component={PasswordReset} />
              <Route exact path="/privacy" component={PrivacyPolicy} />
              <Route exact path="/terms" component={TermsConditions} />
              <Route
                exact
                path="/cancellation-policy"
                component={CancellationPolicy}
              />
              <Route path="*" component={NotFound} />
            </Switch>
            <Footer />
          </ScrollToTop>
        </Router>
      </div>
    );
  }
}

export default App;
