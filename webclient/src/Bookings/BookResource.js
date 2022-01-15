import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import React, { Component } from 'react';
import './BookResource.scss'
const axios = require("axios");
const jwt_decode = require('jwt-decode');
const moment = require('moment');

class BookResource extends Component {

  constructor(props){
    super(props);
    
    this.state = {
        resources:[], 
        bookings:[],
        resource:{
        },
        day:moment().format("YYYY-MM-DD"),
        startHour:"",
        endHour:"",
        details:"",
        user:{
        }

    }
  }

  updateResource = (event)=>{
    if(event.target.value === "undefined"){
    }
    else{
      let resource = JSON.parse(event.target.value);

      this.setState({resource})

      this.getBookings(JSON.parse(event.target.value), this.state.day)
    }
  }

  updateDay = (event)=>{
    let day = event.target.value;
    this.setState({day})
    
    this.getBookings(this.state.resource, day)
  }

  getResources() {
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
    }
    axios.get(`http://192.168.49.2:30474/api/v1/resources`,config)
      .then(res => {
        const resources = res.data;
        this.setState({ resources});
      }).catch(err=> {
        console.log(err);
      });
  }

  getUser(id) {
    const authorization = {
      headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
    }

    axios.get(`http://192.168.49.2:30474/api/v1/employees/${id}`,authorization)
      .then(res => {
        const user = res.data;
        this.setState({ user:user[0] });
      }).catch(err=> {
        console.log(err);
      });

  }

  getBookings(resource, day) {
    let id = resource.id;
   
    const authorization = {
      headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
    }
    axios.get(`http://192.168.49.2:30474/api/v1/bookings/resources/${id}/${day}`,authorization)
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
    axios.delete(`http://192.168.49.2:30474/api/v1/bookings/${id}`,authorization)
        .then(res => {
            console.log("Element sters");
        }).catch(err=> {
          console.log("O mica eroare");
        });
  }

  
  checkBooking(resource, day, startinghour, endinghour){
    let check = true
    this.state.bookings.map( (booking, i) => {
      if(startinghour >= booking.starthour && startinghour <= booking.endhour) {
        check = false
      }
      if(startinghour <= booking.starthour && endinghour >= booking.endhour) {
        check = false
      }
      else if(endinghour >= booking.starthour && endinghour <= booking.endhour) {
        check = false
       }
    });
    return check;
  }

  postBookings() {

    if (this.state.resource.id == undefined){
      alert(`You haven't selected a resource!`+"\r\n"+` Please fill the field! `);
    }
    else if (this.state.startHour == "") {
      alert(`You haven't selected a starting hour!`+"\r\n"+` Please fill the field! `);
    }
    else if (this.state.endHour == "") {
      alert(`You haven't selected an ending hour!`+"\r\n"+` Please fill the field! `);
    }
    else if (this.state.startHour>this.state.endHour){
      alert(`Starting Hour is greater than Ending hour!`+"\r\n"+ `Please enter another hours !`);
    }
    else if (this.state.details == "") {
      alert(`You haven't written any details!`+ "\r\n" +` Please specify the purpose of that booking! `);
    }
    else if (this.checkBooking(this.state.resource.id, this.state.day, this.state.startHour, this.state.endHour ) === false) {
      alert(`There is already a booking in that interval!`+"\r\n"+`Please choose another interval or another resource!`);
    }
    else {
      let booking = {
        idResource:this.state.resource.id,
        idEmployee:this.state.user.id,
        day : this.state.day,
        startHour :this.state.startHour,
        endHour:this.state.endHour,
        details:this.state.details
      }

      const authorization = {
        headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
      }
      axios.post(`http://192.168.49.2:30474/api/v1/bookings/`,booking,authorization)
          .then(res => {
            alert(`You just made a booking!`);
            this.getBookings(this.state.resource,this.state.day);
          }).catch(err=> {
            console.log("O mica eroare");
          });
    }
  }

  updateDetails= (event)=>{
      let details = event.target.value
      this.setState({details})
    }

  updateStartHour= (event)=>{
      let startHour = event.target.value
      this.setState({startHour})
    }
  
  updateEndHour= (event)=>{
      let endHour = event.target.value
      this.setState({endHour})
    }


  componentDidMount() {
    let token = localStorage.getItem("tokenJWT");
    let person =  jwt_decode(token);
    this.getUser(person.userId)

    this.getResources();
  }

  render() {
    return (
        <div style={{width:'80%'}}>
          <br/>
          <br/>
          <table><tbody>
            <tr>
              <th>Select Resource</th>
              <th>Select Day</th>
              <th>Select Starting Hour</th>
              <th>Select Ending Hour</th>
              <th>Write Details</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>
                <select id="resources"  onChange={this.updateResource}>
                    <option value={JSON.stringify("undefined")}>--Please choose an option--</option>
                    {
                      this.state.resources.map( (resource, i) => {
                          return(
                            <option value={JSON.stringify(resource)}>{resource.name}</option>
                          );
                        }
                      )
                    }
                  </select>
                </td>
                <td>
                  <input type="date" id="start" name="trip-start"
                          value={this.state.day}
                          min={moment().add(-1, 'days').format("YYYY-MM-DD")} max={moment().add(14, 'days').format("YYYY-MM-DD")} onChange={this.updateDay} required/>
                </td>
                <td>
                <input type="time" id="startHour" name="startHour" min="09:00" max="18:00" required onChange={this.updateStartHour} required/>
                </td>
                <td>
                <input type="time" id="endHour" name="endHour" onChange={this.updateEndHour} required/>
                </td>
                <td>
                  <form>
                    <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                        <div className="form-group" style={{ minWidth:'33%'}}>
                          <input type="field" className="form-control" id="inputField" placeholder="details" onChange={this.updateDetails}></input>
                        </div>
                    </div>
                  </form>
                </td>
                <td>
                  <ButtonGroup toggle>
                    <ToggleButton variant="secondary" type="radio" name="radio" value="32" onClick={(ev)=> {ev.preventDefault(); this.getBookings(this.state.resource,this.state.day)}} >
                      Get Bookings
                    </ToggleButton>
                    <ToggleButton variant="secondary" type="radio" name="radio1" value="3" onClick={(ev)=> {ev.preventDefault();this.postBookings()}} >
                      Post Bookings
                    </ToggleButton>
                  </ButtonGroup>
                </td>
              </tr>
            </tbody></table>

            <br/>
            <br/>
            <p style={{float:'left', textAlign:'left'}}>
              Below you can find the booked intervals for that resource and day. Please choose an interval that is not booked. <br/>
              If your booking is urgent please write an email to the person who made the booking and add a techincal suport in CC. <br/>
              Thank you!
            </p>
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
                    </tr>
                  );
                })
            }
            </tbody></table>
            
        </div>
    );
  }
}

export default BookResource;