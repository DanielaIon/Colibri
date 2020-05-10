import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import React, { Component } from 'react';
import './Questions.scss'
const axios = require("axios");
const jwt_decode = require('jwt-decode');

class Questions extends Component {


  constructor(props){
    super(props);
    this.state = {
        questions:[], 
        question:{
          email: "",
          answer: "",
          question : "",
          visible : ""
        },
        user:{
        }

    }

  this.addQuestionSubmit = this.addQuestionSubmit.bind(this);
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

  // console.log(this.state.user.email+"---"+this.state.question)
  axios.post(`http://localhost:3000/api/v1/questions`,this.state.question, config)
  .then(res => {
    this.getQuestions()
    // this.props.history.push('/mybookings');
    }).catch(err=> {
      console.log(err);
    console.log("ooops eroare");

    });
}

updateQuestionField= (event)=>{
    let myquestion = {...this.state.question}
    myquestion.question = event.target.value
    myquestion.email = this.state.user.email
    this.setState({question:myquestion})
  }

addQuestionSubmit(event) {
  event.preventDefault();
  this.add();
}


updateAnswer= (event)=>{
  let question = {...this.state.question}
  question.answer = event.target.value
  console.log(question);
  this.setState({question})
}


 deleteQuestion(id) {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
  }
    axios.delete(`http://localhost:3000/api/v1/questions/${id}`,config)
      .then(res => {
          console.log("Element sters");
          this.getQuestions();
      }).catch(err=> {
        console.log(err);
      });
  }

updateQuestion(id) {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
  }
    axios.put(`http://localhost:3000/api/v1/questions/${id}`,this.state.question,config)
      .then(res => {
          console.log("Element updatat");
          this.getQuestions();
      }).catch(err=> {
        console.log(err);
      });
  }

getQuestions() {
  const config = {
    headers: {Authorization: `Bearer ${localStorage.getItem("tokenJWT")}`}
  }
  axios.get(`http://localhost:3000/api/v1/questions`,config)
    .then(res => {
      const questions = res.data;
      this.setState({ questions});
    }).catch(err=> {
      console.log(err);
    });
}

componentDidMount() {
  this.getQuestions();

  let token = localStorage.getItem("tokenJWT");
  let person =  jwt_decode(token);
  this.getUser(person.userId)
}

  render() {
    let tableHeader = (<tr>
                          <th>Question</th>
                          <th>Answer</th>
                      </tr>);
    let questionForm = (<td colSpan="2">
                          <form onSubmit={this.addQuestionSubmit}>
                              <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                                  <div className="form-group" style={{ minWidth:'85%'}}>
                                    <input type="field" className="form-control" id="inputField" placeholder="Question" onChange={this.updateQuestionField}></input>
                                  </div>
                                  <div style={{ minWidth:'15%', float:'left'}}> 
                                    <center>
                                        <button type="submit" className="btn btn-secondary">Add question</button>
                                    </center>
                                  </div>
                              </div>
                            </form>
                        </td>)
    if (this.state.user.role ==='admin' || this.state.user.role ==='suport' ){
      tableHeader = (<tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Write Answer</th>
                        <th>Actions</th>
                    </tr>);
      questionForm = (<td colSpan="3">
                        <form onSubmit={this.addQuestionSubmit}>
                            <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                                <div className="form-group" style={{ minWidth:'100%'}}>
                                  <input type="field" className="form-control" id="inputField" placeholder="Question" onChange={this.updateQuestionField}></input>
                                </div>
                                <div style={{ minWidth:'15%', float:'left'}}> 
                                  <center>
                                      <button type="submit" className="btn btn-secondary">Add question</button>
                                  </center>
                                </div>
                            </div>
                          </form>
                      </td>)
    }
    let number = 1;          
    return (
          <div style={{width:'80%'}}>
            <br/>
            <br/>
            <table><tbody>
                {tableHeader}
                {
                  this.state.questions.map( (question, i) => {
                          if(question.visible=="true" || (this.state.user.role !='user')){
                            let mybuttons;
                            let content;

                            if (this.state.user.role ==='admin' || this.state.user.role ==='suport' ){
                                number = 3;
                                mybuttons = ( <ButtonGroup toggle>
                                                    <ToggleButton variant="secondary" type="radio" name="radio" value="3" onClick={()=> this.updateQuestion(question.id)}>
                                                        Update Answer
                                                    </ToggleButton>
                                                    <ToggleButton variant="secondary" type="radio" name="radio" value="3" onClick={()=> this.deleteQuestion(question.id)}>
                                                        Delete Question
                                                    </ToggleButton>
                                                </ButtonGroup>);
                                content = ( <form >
                                              <div style={{display:'flex', flexDirection:'row', justifyContent:'flex-start'}}>
                                                  <div  style={{ minWidth:'7%', float:'left'}}> 
                                                    <div className="form-group" style={{ minWidth:'33%'}}>
                                                      <input type="field" className="form-control" id="inputField" placeholder="Answer" onChange={this.updateAnswer}></input>
                                                    </div>
                                                  </div>
                                              </div>
                                              </form>);
                                return (
                                  <tr>
                                      <td>{question.emailemployee}</td>
                                      <td>{question.question}</td>
                                      <td>{question.answer}</td>
                                      <td>{content}</td>
                                      <td>{mybuttons}</td>
                                  </tr>
                              )
                            }
                            return (
                                <tr>
                                    <td>{question.question}</td>
                                    <td>{question.answer}</td>
                                </tr>
                            )
                          }
                  })
                }
                <tr>
                  {questionForm}
                </tr>
            </tbody></table>
        </div>
    );
  }
}

export default Questions;