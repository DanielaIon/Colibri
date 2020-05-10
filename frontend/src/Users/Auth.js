import 'bootstrap/dist/css/bootstrap.min.css';

import logo from "./logo.png"
import React, { Component } from 'react';
const axios = require("axios");

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:{
        password:"",
        firstName:"",
        lastName:"",
        email:"",
        username:"",
        department:"",
        position:"",
        role:"user"
      },
      state:'login'

    };

    this.loginSubmit = this.loginSubmit.bind(this);
    this.registerSubmit = this.registerSubmit.bind(this);
  }

  
  login = (event) => {
    axios.post(`http://localhost:3000/api/v1/employees/login`,this.state.user)
    .then(res => {
      console.log(res.data)
      localStorage.setItem("tokenJWT",res.data)
      this.props.history.push('/faq');
      }).catch(err=> {
        console.log(err);
      console.log("ooops eroare");

      });
  }

  register = (event) => {
    let myuser = {...this.state.user}
    myuser.role = "user"
    this.setState({user:myuser})

    axios.post(`http://localhost:3000/api/v1/employees/register`,this.state.user)
    .then(res => {
      this.props.history.push('/');
      }).catch(err=> {
        console.log(err);
      console.log("ooops eroare");

      });
  }

  loginSubmit(event) {
    event.preventDefault();
    this.login();
  }

  registerSubmit(event) {
    event.preventDefault();
    this.register();
  }

  updatePassword= (event)=>{
    let myuser = {...this.state.user}
    myuser.password = event.target.value
    this.setState({user:myuser})
  }
  updateFirstName= (event)=>{
    let myuser = {...this.state.user}
    myuser.firstName = event.target.value
    this.setState({user:myuser})
  }
  updateLastName = (event)=> {
    let myuser = {...this.state.user}
    myuser.lastName = event.target.value
    this.setState({user:myuser})
  }
  updateEmail = (event)=> {
    let myuser = {...this.state.user}
    myuser.email = event.target.value
    this.setState({user:myuser})
  }
  updateUsername = (event)=> {
    let myuser = {...this.state.user}
    myuser.username = event.target.value
    this.setState({user:myuser})
  }
  updateDepartment = (event)=> {
    let myuser = {...this.state.user}
    myuser.department = event.target.value
    this.setState({user:myuser})
  }
  updatePosition = (event)=> {
    let myuser = {...this.state.user}
    myuser.position = event.target.value
    this.setState({user:myuser})
  }


  render() {
    let buttons;
    let form;

    if (this.state.state === "register"){
      buttons = (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary active">
            <input type="radio" name="options" id="register" onClick={()=> this.setState({state:'register'}) } />Register
          </label>
          <label className="btn btn-secondary">
            <input type="radio" name="options" id="login" onClick={()=> this.setState({state:'login'})}/> Login
          </label>
        </div>
      );
      form = (
        <form style={{ height:'600px'}} onSubmit={this.registerSubmit}> 
            <div className="form-group">
              <label for="inputEmail">Email</label>
              <input type="email" className="form-control" id="inputEmail" placeholder="gpopescu@mail.com" onChange={this.updateEmail}></input>
            </div>
            <div className="form-group">
              <label for="inputUsername">Username</label>
              <input type="text" className="form-control" id="inputUsername" placeholder="gpopescu" onChange={this.updateUsername}></input>
            </div>
            <div className="form-group">
              <label for="inputPassword">Password</label>
              <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={this.updatePassword}></input>
            </div>
            <div className="form-group">
              <label for="inputFirstName">First Name</label>
              <input type="text" className="form-control" id="inputFirstName" placeholder="Gigel" onChange={this.updateFirstName}></input>
            </div>
            <div className="form-group">
              <label for="inputLastName">Last Name</label>
              <input type="text" className="form-control" id="inputLastName" placeholder="Popescu" onChange={this.updateLastName}></input>
            </div>
            <div className="form-group">
              <label for="inputDepartament">Departament</label>
              <input type="text" className="form-control" id="inputDepartament" placeholder="Financiare" onChange={this.updateDepartment}></input>
            </div>
            <div className="form-group">
              <label for="inputPozitie">Pozitia</label>
              <input type="text" className="form-control" id="inputPozitie" placeholder="Contabil" onChange={this.updatePosition}></input>
            </div>
            <button type="submit" className="btn btn-secondary">Submit</button>
          </form>
        );
    }
    else if (this.state.state === "login"){
      buttons = (
        <div className="btn-group btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary" >
            <input type="radio" name="options" id="register" autocomplete="off" onClick={()=> this.setState({state:'register'}) } />Register
          </label>
          <label className="btn btn-secondary active">
            <input type="radio" name="options" id="login" autocomplete="off" onClick={()=> this.setState({state:'login'})} /> Login
          </label>
        </div>
      );
      form = (
        <form style={{ height:'600px'}} onSubmit={this.loginSubmit}>
            <div className="form-group">
              <label for="inputEmail">Email or Username</label>
              <input type="text" className="form-control" id="inputEmail" placeholder="gpopescu@mail.com" onChange={this.updateEmail}></input>
            </div>
            <div className="form-group">
              <label for="inputPassword">Password</label>
              <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={this.updatePassword}></input>
            </div>
            <button type="submit" className="btn btn-secondary">Submit</button>
          </form>
      );
  }
    return (
      <div >
        <table style={{width: '80%'}}><tbody>
          <tr>
            <td style={{width: '50%'}}>
              <img src={logo} alt="Logo"/>
            </td>
            <td style={{width: '50%'}}>
              {buttons}  
              {form}

              {/* <a onClick={this.login}>hello</a> */}
            </td>
          </tr>
          </tbody></table>
      </div>
    );
  }
}

export default Auth;