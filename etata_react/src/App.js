import React, {useState, useEffect}from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios'

import Grouplist from './grouplist'
import Registration from './registration'
import Main from './main'

import logo from './logo.svg';
import './App.css';

import {Group} from './domain/group'

const userId = 1 //create this as context later


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
        <Main grouplist = {grouplist} _changeGroups = {_changeGroups}/>
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
