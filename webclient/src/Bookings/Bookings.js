import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import React, { Component } from 'react';
import './MyBookings.scss'
const axios = require("axios");
const jwt_decode = require('jwt-decode');
const moment = require('moment');

class Bookings extends Component {

  constructor(props){
    super(props);
    
    this.state = {
        resources:[], 
        bookings:[{}],
        user:{
        }

    }
  }

  updateResource = (event)=>{
    // let resource = {...this.state.resource}
    let resource = JSON.parse(event.target.value);
    this.setState({resource})
  }

  updateDay = (event)=>{
    let day = event.target.value;
    this.setState({day})
  }

  getUser(id) {
    const authorization = {
      headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
    }

    axios.get(`http://localhost:3000/api/v1/employees/${id}`,authorization)
      .then(res => {
        const user = res.data;
        this.setState({ user:user[0] });
        this.getBookings()
      }).catch(err=> {
        console.log(err);
      });

  }

  getBookings() {
    console.log(this.state.user.id)

    const authorization = {
      headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
    }
    axios.get(`http://localhost:3000/api/v1/bookings/`,authorization)
        .then(res => {
            console.log("Element obtinut");
            this.setState({ bookings:res.data});
        }).catch(err=> {
          console.log("O mica eroare");
        });
    }

    deleteBookings(id) {
      const authorization = {
        headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
      }
      axios.delete(`http://localhost:3000/api/v1/bookings/${id}`,authorization)
          .then(res => {
              console.log("Element sters");
              this.getBookings()
          }).catch(err=> {
            console.log("O mica eroare");
          });

      }



  componentDidMount() {
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
              <th>id</th>
              <th>Resource</th>
              <th>Employee</th>
              <th>day</th>
              <th>startHour</th>
              <th>endHour</th>
              <th>details</th>
              <th>Action</th>
            </tr>
            {
              this.state.bookings.map( (booking, i) => {
                  return(
                    <tr>
                    <td>{booking.id}</td>
                    <td>{booking.idresource}</td>
                    <td>{booking.idemployee}</td>
                    <td>{booking.day}</td>
                    <td>{booking.starthour}</td>
                    <td>{booking.endhour}</td>
                    <td>{booking.details}</td>
                    <ButtonGroup toggle>
                      <ToggleButton variant="secondary" type="radio" name="radio" value="32" onClick={(ev)=> {ev.preventDefault(); this.deleteBookings(booking.id)}} >
                        Delete
                      </ToggleButton>
                  </ButtonGroup>
                    </tr>
                  );
                })
            }
            </tbody></table>
            
        </div>
    );
  }
}

export default Bookings;