import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

//import pages
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import HomePage from '../HomePage/HomePage';
import TradePage from '../TradePage/TradePage';
import CreatePost from '../CreatePost/CreatePost';
import HomeSelectToy from '../HomePage/HomeSelectToy';
import AllToys from '../AllToys/AllToys';
import TradeSelectToy from '../TradePage/TradeSelectToy';
import AllSelectToy from '../AllToys/AllSelectToy';
import UserEditToy from '../UserPage/UserEditToy';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
// import ToyBox from '../ToyBox/ToyBox';

//need this for body margin, previously made
import './App.css';
//import MUI
import { withStyles } from '@material-ui/core/styles';

const styles = () => {
  return ({
    app: {
      minHeight: '100%',
    }
  })
};//end styles



class App extends Component {
  componentDidMount() {
   
    this.props.dispatch({ type: 'FETCH_USER' })
  }

  render() {
    
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.app}>
          <Route path="/" component={Nav} />
          <Switch>
           
            <Redirect exact from="/" to="/home" />
            {/* display rest of pages without being protected. */}
            {/* HOME TOYS */}
            <Route exact path="/home" component={HomePage} />
            <Route exact path="/home/details/:id" component={HomeSelectToy} />
            {/* ALL TOYS */}
            <Route exact path="/alltoys" component={AllToys} />
            <Route exact path="/alltoys/details/:id" component={AllSelectToy} />
            {/* TRADE TOYS */}
            <Route exact path="/trade" component={TradePage} />
            <Route exact path="/trade/details/:id" component={TradeSelectToy} />
            {/* Create POST */}
            <ProtectedRoute exact path="/create" component={CreatePost} />
            
            <Route exact path="/about" component={AboutPage} />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute exact path="/account" component={UserPage} />
            <ProtectedRoute exact path="/account/edit/:id" component={UserEditToy} />
 
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  };
};

//connect withStyles with our component and redux
export default connect()(withStyles(styles)(App));
