import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './ResourceInfo.scss'
const axios = require("axios");
const jwt_decode = require('jwt-decode');

class ResourceInfo extends Component {


  constructor(props){
    super(props);
    this.state = {
        resources:[], 
        resource:{
          name: "",
          details : ""
        },
        user:{
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
                    <th>Name</th>
                    <th>Details</th>
                </tr>
                {
                this.state.resources.map( (resource, i) => {
                        return (
                            <tr>
                                <td>{resource.name}</td>
                                <td>{resource.details}</td>
                            </tr>
                        )})
                    }
            </tbody></table>
        </div>
    );
  }
}

export default ResourceInfo;