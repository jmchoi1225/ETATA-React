import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Group, Course} from './class/group'
import Registration from './registration/registration'
import Main from './main/main'
import logo from './logo.svg';
import './App.css';

const tmpGroups = new Array();
for(let g =0; g<2; g++){
  let tmpGroup;
  if(g==0){
    tmpGroup = new Group('운영체제');
    tmpGroup.addCourse(0,new Course("F028","수B 금B"));
    tmpGroup.addCourse(1,new Course("F058","월C 수C"));
  }
  else if(g==1){
    tmpGroup = new Group('도분설');
    tmpGroup.addCourse(0,new Course("F001","월B 수B"));
    tmpGroup.addCourse(1,new Course("F002","월C 수B"));
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
        <Route path = '/registration' render ={props=>(
          <Registration groups = {this.state.groups}/>
        )}/> 
      </Router>
    )
  }
}

export default App;
