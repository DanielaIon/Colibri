import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import Header from './Header';
import Nav from './Nav';
import {
  BrowserRouter,
  Routes,
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
          <Routes>
            <Route path="/bookresource" element={
              <React.Fragment>
                <Nav/>  
                <Header/>
                <BookResource/>
              </React.Fragment>
            }/>
              
            <Route path="/mybookings" element={
              <React.Fragment>
                <Nav/>  
                <Header/>
                <MyBookings/>
              </React.Fragment>
            }/>
              
            <Route path="/resources" element={
              <React.Fragment>
              <Nav/>  
              <Header/>
              <Resource/>
            </React.Fragment>
            }/>
              
            <Route path="/inforesources" element={
              <React.Fragment>
              <Nav/>  
              <Header/>
              <ResourceInfo/>
            </React.Fragment>
            }/>
              
            <Route path="/users" element={
              <React.Fragment>
              <Nav/>  
              <Header/>
              <Users/>
            </React.Fragment>
            }/>
              
            <Route path="/bookings" element={
              <React.Fragment>
              <Nav/>  
              <Header/>
              <Bookings/>
            </React.Fragment>
            }/>
              
            <Route path="/faq" element={
              <React.Fragment>
              <Nav/>  
              <Header/>
              <Questions/>
            </React.Fragment>
            }/>
            
            <Route exact path="/" element={<Auth/>}/>
          </Routes>
        </BrowserRouter>
      </center>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
