
import React from 'react';
import Header from './Header';
import IsLoadingAndError from './IsLoadingAndError';
import Login from './Login';
import Footer from './Footer';
import Profile from './Profile';
import BestBooks from './BestBooks'
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

class App extends React.Component {

  // componentDidMount = () => {
  //   if(this.props.auth0.isAuthenticated) {
  //     this.props.auth0.getIdTokenClaims()
  //     .then(res => {
  //       const jwt = res.__raw;
  //       const config = {
  //         headers: {"Authorization" : `Bearer ${jwt}`},
  //         method: 'get',
  //         baseURL: process.env.REACT_APP_SERVER_URL,
  //         url: '/authorize'
  //       }
  //       axios(config)
  //         .then(axiosResults => console.log(axiosResults.data))
  //         .catch(err => console.error(err));
  //     })
  //     .catch(err => console.error(err));
  //   }
  // }
  render() {
    const { user, isAuthenticated } = this.props.auth0;
    console.log(this.props.auth0)
    console.log(user);
    console.log(isAuthenticated );
    return(
      <>
        <Router>
          <IsLoadingAndError>
            <Header isAuthenticated={isAuthenticated} />
            <Switch>
            <Route exact path="/">{isAuthenticated ? <BestBooks /> : <Login />}
              </Route>
              <Route exact path="/profile">{isAuthenticated ? <Profile userInfo={user} /> : ''} 
              </Route>
      
            </Switch>
            <Footer />
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);