import React, {useState, useEffect}from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'

import Grouplist from './grouplist'
import Registration from './registration/registration'
import Main from './main'

import logo from './logo.svg';
import './App.css';

import {Group} from './domain/group'

const userId = 1 //create this as context later

/*const tmpGroups = new Array();

for(let g =0; g<3; g++){
  let tmpGroup;
  if(g==0){
    tmpGroup = new Group('운영체제');
    tmpGroup.addCourse(0,new Course("F001", "운영체제", "김상훈", "월A 수A"));
    tmpGroup.addCourse(1,new Course("F002", "운영체제","김상훈","월C 수C"));
  }
  else if(g==1){
    tmpGroup = new Group('도분설');
    tmpGroup.addCourse(0,new Course("F011", "도메인분석및설계", "이정태","월A 수B"));
    tmpGroup.addCourse(1,new Course("F012","도메인분석및설계","이정태","월C 수D"));
  }
  else if(g==2){
    tmpGroup = new Group('정보보호');
    tmpGroup.addCourse(0,new Course("F021","기계학습밎데이터마이닝","손경아","화C 목C"));
    tmpGroup.addCourse(1,new Course("F022","기계학습밎데이터마이닝","손경아","화D 목D"));
  }
  tmpGroups.push(tmpGroup);
}*/


const App  = ()=> {
  const [grouplist, setGroups] = useState(null);

  useEffect(()=>{
    axios({
      method : "get",
      url : '/users/grouplist',
      params: {
          userId, 
      },
    }).then(res=>{
      if(res.data){
        let tempGrouplist = []
        for(let i =0; i< res.data.length; i ++){
          const tempGroup = Object.assign(new Group, res.data[i])
          tempGrouplist.push(tempGroup)
        }
        setGroups(tempGrouplist);
      }
    })
  },[])

  async function _changeGroups(newGrouplist) {
    console.log("changing grouplist" , newGrouplist)
    setGroups(newGrouplist);
    await axios({
      method : "put",
      url : '/users/grouplist',
      params: {
        userId,
        userGrouplist : newGrouplist, 
      },
    })
  }

  return(
    <Router>
      <Route exact path = '/' render = {props=>(
        <Main grouplist = {grouplist}/>
      )}/>
      <Route path = '/grouplist' render = {props=>(
        <Grouplist _changeGroups = {_changeGroups} grouplist = {grouplist}/>
      )}/>
      <Route path = '/registration' render ={props=>(
        <Registration grouplist = {grouplist}/>
      )}/> 
    </Router>
  )
}

export default App;
