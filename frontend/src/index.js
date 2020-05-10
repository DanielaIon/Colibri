import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Header from './Header';
import Nav from './Nav';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

import Auth from './Users/Auth';
import Users from './Users/Users';
import Resource from './Resources/Resource';
import ResourceInfo from './Resources/ResourceInfo';
import Questions from './Questions/Questions';
import Bookings from './Bookings/Bookings';
import BookResource from './Bookings/BookResource';
import MyBookings from './Bookings/MyBookings';


// import Helmet from 'react-helmet';

ReactDOM.render(

  <React.StrictMode >
      <center className="body">
        <br/><br/>

        <BrowserRouter basename="/">
          <Switch>
            <Route path="/bookresource" >
              <Nav/>  
              <Header/>
              <BookResource/>
            </Route>
            <Route path="/mybookings" >
              <Nav/>  
              <Header/>
              <MyBookings/>
            </Route>
            <Route path="/resources">
              <Nav/>
              <Header/>
              <Resource/>
            </Route>
            <Route path="/inforesources">
              <Nav/>
              <Header/>
              <ResourceInfo/>
            </Route>
            <Route path="/users" >
              <Nav/>
              <Header/>
              <Users/>
            </Route>
            <Route path="/bookings" >
              <Nav/>
              <Header/>
              <Bookings/>
            </Route>
            <Route path="/faq" >
              <Nav/>
              <Header/>
              <Questions/>
            </Route>
            <Route path="/" component={Auth}/>
          </Switch>
        </BrowserRouter>
      </center>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
