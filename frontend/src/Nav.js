import React, { Component } from 'react';
import './Nav.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
const axios = require("axios");
const jwt_decode = require('jwt-decode');
class Nav extends Component {
  
  constructor(props){
    super(props);
    this.state = {person:{}}
  }

getUser(id) {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
  }

  axios.get(`http://localhost:3000/api/v1/employees/${id}`,config)
    .then(res => {
      const person = res.data;
      console.log("niiiice")
      this.setState({ person:person[0] });
    }).catch(err=> {
      console.log(err);
    });
}

componentDidMount() {
  let token = localStorage.getItem("tokenJWT");
  let person =  jwt_decode(token);
  this.getUser(person.userId)
}

  render() {
    let buttons;
    if (this.state.person.role === "user"){
    buttons = (
      <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
        <a className="navbar-brand" href="/faq">FAQ</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <a className="nav-link" href="/inforesources">Resources</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/mybookings">My bookings</a>
            </li>
            <li className="nav-item ">
              <a className="nav-link" href="/bookresource">Book a resource</a>
            </li>
          </ul>

          <span className="navbar-text">
            Welcome to Colibri! 
          </span>
        </div>
    </nav>
    );
    }
    else{
      buttons = (
        <nav className="navbar navbar-expand-xl navbar-dark bg-dark">
          <a className="navbar-brand" href="/faq">FAQ</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ">
                <a className="nav-link" href="/users">Users</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/resources">Resources</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/bookings">All Bookings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mybookings">My bookings</a>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="/bookresource">Book a resource </a>
              </li>
            </ul>
  
            <span className="navbar-text">
              Welcome to Colibri! 
            </span>
          </div>
      </nav>
      );
    }

    return (
          <div style={{width:'80%'}}>
            {buttons}                
          </div>
    );
  }
}

export default Nav;