import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Group, Course} from './class/group'
import MakeGroups from './makeGroups/makeGroups'
import Registration from './registration/registration'
import Main from './main/main'
import logo from './logo.svg';
import './App.css';

//context

const tmpGroups = new Array();
for(let g =0; g<3; g++){
  let tmpGroup;
  if(g==0){
    tmpGroup = new Group('운영체제');
    tmpGroup.addCourse(0,new Course("F001","월A 수A"));
    tmpGroup.addCourse(1,new Course("F002","월C 수C"));
  }
  else if(g==1){
    tmpGroup = new Group('도분설');
    tmpGroup.addCourse(0,new Course("F011","월A 수B"));
    tmpGroup.addCourse(1,new Course("F012","월C 수D"));
  }
  else if(g==2){
    tmpGroup = new Group('정보보호');
    tmpGroup.addCourse(0,new Course("F021","화C 목C"));
    tmpGroup.addCourse(1,new Course("F022","화D 목D"));
  }
  tmpGroups.push(tmpGroup);
}


class App extends React.Component {
  state = {
    groups : tmpGroups
  }
  _setGroups(groups){
    this.setState({groups})
  }
  render(){
    return(
      <Router>
        <Route exact path = '/' render = {props=>(
          <Main groups = {this.state.groups}/>
        )}/>
        <Route path = '/makeGroups' render = {props=>(
          <MakeGroups groups = {this.state.groups}/>
        )}/>
        <Route path = '/registration' render ={props=>(
          <Registration groups = {this.state.groups}/>
        )}/> 
      </Router>
    )
  }
}

export default App;