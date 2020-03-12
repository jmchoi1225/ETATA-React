import React from 'react';
import {Group, Course} from './class/group'
import Registration from './registration/registration'
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
    page : "registration", // getGroups || main || registration
    groups : tmpGroups
  }
  _setGroups(groups){
    this.setState({groups})
  }
  render(){
    /*if (this.state.page == "getGroups") return <GetGroups _setGroups = {this._setGroups}/>
    else if(this.state.page == "main"){
      if(this.state.groups){
        return <Main groups = {this.state.groups}/>
      }else{
        console.log("create groups first")
        this.setState({page : "getGroups"})
      }
    } 
    else if(this.state.page == "registration"){
      if(this.state.groups){
        return <Registration groups = {this.state.groups}/>
      }else{
        console.log("create groups first")
        this.setState({page : "getGroups"})
      }
    }*/
    if(this.state.groups){
      return <Registration groups = {this.state.groups}/>
    }
  }
}

export default App;
