import React, {useState, useEffect}from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import {Group, Course} from './class/group'
import MakeGroups from './makeGroups/makeGroups'
import Registration from './registration/registration'
import Main from './main/main'
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

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
  const [groups, setGroups] = useState(null);

  useEffect(()=>{
    const params = {
      userId
    }
    axios.get('/users/groups', {params}).then(res=>{
      setGroups(res.data);
    })
  },[])

  async function _changeGroups(groups) {
    setGroups(groups);
    await axios({
      method : "put",
      url : '/users/groups',
      params: {
        userId,
        userGroups : groups, 
      },
    })
  }

  return(
    <Router>
      <Route exact path = '/' render = {props=>(
        <Main groups = {groups}/>
      )}/>
      <Route path = '/makeGroups' render = {props=>(
        <MakeGroups _changeGroups = {_changeGroups} groups = {groups}/>
      )}/>
      <Route path = '/registration' render ={props=>(
        <Registration groups = {groups}/>
      )}/> 
    </Router>
  )
}

export default App;
