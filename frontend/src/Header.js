import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import logo from "./Users/logo.png";
import './Header.scss'
const axios = require("axios");
const jwt_decode = require('jwt-decode');
class Header extends Component {


  constructor(props){
    super(props);
    this.state = {person:{},    isOpen: false }
  }


  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });


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

  logOff(){
    localStorage.removeItem("tokenJWT");
  }

  render() {
 const accountOptions = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    return (
        <table style={{width: '80%', backgroundColor: 'gray'}}><tbody>
          <tr>
            <td style={{width: '10%'}}>
                <div className="dropdown" onClick={this.toggleOpen} style={{float:"right"}}>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                  >
                    <img className = "profilePicture" src={logo} height="200px" alt="Logo"/>
                  </button>
                  <div className={accountOptions} aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item " href="/" onClick={this.logOff}>
                      Logout
                    </a>
                  </div>
                </div>
            </td>
            <td style={{width: '90%'}}>
                <ul className="headerListAdmin">
                    <li className = "name">{this.state.person.firstname} {this.state.person.lastname}</li>
                    <i>
                    <li className = "position">&nbsp;&nbsp;lucreaza ca {this.state.person.position}</li>
                    <li className = "department">&nbsp;&nbsp;pentru departamentul {this.state.person.department} </li>
                    <br/>
                    <br/>
                    <li className = "email">&nbsp;&nbsp;{this.state.person.email} </li>
                    </i>
                </ul>
            </td>
          </tr>
          </tbody></table>
    );
  }
}

export default Header;