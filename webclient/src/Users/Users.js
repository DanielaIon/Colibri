import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import React, { Component } from 'react';
import './Users.scss'
const axios = require("axios");
const jwt_decode = require('jwt-decode');
class User extends Component {


  constructor(props){
    super(props);
    this.state = {
        users:[], 
        user:{
            password:"",
            firstName:"",
            lastName:"",
            email:"",
            department:"",
            position:"",
            role:"user"
          }

    }
  }

  getUser(id) {
    const authorization = {
      headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
    }

    axios.get(`http://localhost:3000/api/v1/employees/${id}`,authorization)
      .then(res => {
        const user = res.data;
        this.setState({ user:user[0] });
      }).catch(err=> {
        console.log(err);
      });
  
  }

  getUsers() {
    const authorization = {
        headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
      }
    axios.get(`http://localhost:3000/api/v1/employees`,authorization)
      .then(res => {
        const users = res.data;
        this.setState({ users});
      }).catch(err=> {
        console.log(err);
      });
  }

 deleteUser(id) {
    const authorization = {
        headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
      }
    axios.delete(`http://localhost:3000/api/v1/employees/${id}`,authorization)
      .then(res => {
          console.log("Element sters");
          this.getUsers();
      }).catch(err=> {
        console.log(err);
      });
  }

  makeTS(id) {
    let role = "suport";
    const authorization = {
        headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
      }
    axios.put(`http://localhost:3000/api/v1/employees/${id}`,{role},authorization)
      .then(res => {
          this.getUsers();
      }).catch(err=> {
        console.log(err);
      });
  }

  makeUser(id) {
    let role = "user";
    const authorization = {
        headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
      }
    axios.put(`http://localhost:3000/api/v1/employees/${id}`,{role},authorization)
      .then(res => {
          this.getUsers();
      }).catch(err=> {
        console.log(err);
      });
  }

  componentDidMount() {
  this.getUsers();
  
  let token = localStorage.getItem("tokenJWT");
  let person =  jwt_decode(token);
  this.getUser(person.userId)
  }

  render() {


    return (
          <div style={{width:'80%'}}>
            <br/>
            <br/>
            <table><tbody>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Departament</th>
                    <th>Position</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                {
                this.state.users.map( (employee, i) => {
                        let mybuttons;

                        if (this.state.user.role ==='admin' && employee.role === 'suport'){
                            mybuttons = (<td>
                                <ButtonGroup toggle>
                                    <ToggleButton variant="secondary" type="radio" name="radio" value="2" onClick={()=> this.makeUser(employee.id)}>
                                        Revoke permissions
                                    </ToggleButton>
                                    <ToggleButton variant="secondary" type="radio" name="radio" value="3" onClick={()=> this.deleteUser(employee.id)}>
                                        Delete
                                    </ToggleButton>
                                </ButtonGroup>
                            </td>
                            )
                        }
                        if (this.state.user.role ==='admin' && employee.role === 'user'){
                            mybuttons = (<td>
                                <ButtonGroup toggle>
                                    <ToggleButton variant="secondary" type="radio" name="radio"  value="1" onClick={()=> this.makeTS(employee.id)}>
                                        Grant permissions
                                    </ToggleButton>
                                    <ToggleButton variant="secondary" type="radio" name="radio" value="3" onClick={()=> this.deleteUser(employee.id)}>
                                        Delete
                                    </ToggleButton>
                                </ButtonGroup>
                            </td>
                            )
                        }
                        if (this.state.user.role ==='suport'&& employee.role === 'user'){
                            mybuttons = (<td>
                                <ButtonGroup toggle>
                                    <ToggleButton variant="secondary" type="radio" name="radio" value="3" onClick={()=> this.deleteUser(employee.id)}>
                                        Delete
                                    </ToggleButton>
                                </ButtonGroup>
                            </td>
                            )
                        }
                        return (
                            <tr>
                                <td>{employee.id}</td>
                                <td>{employee.firstname} {employee.lastname}</td>
                                <td>{employee.email}</td>
                                <td>{employee.username}</td>
                                <td>{employee.department}</td>
                                <td>{employee.position}</td>
                                <td>{employee.role}</td>
                                {mybuttons}
                            </tr>
                        )})
                    }
            </tbody></table>
        </div>
    );
  }
}

export default User;