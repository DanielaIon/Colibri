import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import React, { Component } from 'react';
import './Resource.scss'
const axios = require("axios");
const jwt_decode = require('jwt-decode');

class Resource extends Component {


  constructor(props){
    super(props);
    this.state = {
        resources:[], 
        resource:{
          name: "",
          details : ""
        },
        user:{
            id: 4,
            role : "admin"
        }

    }

  this.addResourceSubmit = this.addResourceSubmit.bind(this);
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

add = (event) => {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
  }

  axios.post(`http://localhost:3000/api/v1/resources`,this.state.resource,config)
  .then(res => {
    this.getResources()
    }).catch(err=> {
    });

}

  updatName= (event)=>{
    let resource = {...this.state.resource}
    resource.name = event.target.value
    this.setState({resource:resource})
  }
  updateDetails= (event)=>{
    let resource = {...this.state.resource}
    resource.details = event.target.value
    this.setState({resource:resource})
  }
  addResourceSubmit(event) {
    event.preventDefault();
    this.add();
  }


  getResources() {
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
    }
    axios.get(`http://localhost:3000/api/v1/resources`,config)
      .then(res => {
        const resources = res.data;
        this.setState({ resources});
      }).catch(err=> {
        console.log(err);
      });
  }

 deleteResource(id) {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
  }
    axios.delete(`http://localhost:3000/api/v1/resources/${id}`,config)
      .then(res => {
          console.log("Element sters");
          this.getResources();
      }).catch(err=> {
        console.log(err);
      });
  }

  componentDidMount() {
  this.getResources();

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
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
                {
                this.state.resources.map( (resource, i) => {
                        let mybuttons;

                        if (this.state.user.role ==='admin' || this.state.user.role ==='suport' ){
                            mybuttons = (<td>
                                <ButtonGroup toggle>
                                    <ToggleButton variant="secondary" type="radio" name="radio" value="3" onClick={()=> this.deleteResource(resource.id)}>
                                        Delete
                                    </ToggleButton>
                                </ButtonGroup>
                            </td>
                            )
                        }
                        return (
                            <tr>
                                <td>{resource.id}</td>
                                <td>{resource.name}</td>
                                <td>{resource.details}</td>
                                {mybuttons}
                            </tr>
                        )})
                    }
                    <tr>
                      <td></td>
                      <td colSpan="3">
                          <form onSubmit={this.addResourceSubmit}>
                               <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                                  <div className="form-group" style={{ minWidth:'33%'}}>
                                    <input type="field" className="form-control" id="inputField" placeholder="Name" onChange={this.updatName}></input>
                                  </div>
                                  <div className="form-group" style={{ minWidth:'33%'}}>
                                    <input type="field" className="form-control" id="inputField" placeholder="Details" onChange={this.updateDetails}></input>
                                  </div>
                                  <div  style={{ minWidth:'7%', float:'left'}}> 
                                  <center>
                                      <button type="submit" className="btn btn-secondary">Add</button>
                                  </center>
                                  </div>
                              </div>
                            </form>
                      </td>
                    </tr>
            </tbody></table>
        </div>
    );
  }
}

export default Resource;