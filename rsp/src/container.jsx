import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import Todos from './todos.jsx'
import Toadd from './toadd.jsx'
import './index.css'
import { AuthContext } from './restricted.js'


export default function Container() {
  const [i1, setInput] = useState([])
  const [i2, setRes] = useState()
  const [selected, setSelected] = useState([])
  var {username} = useContext(AuthContext)
  if(!username){
    username='def.0'
  }


  
  /*const theStart =  async () =>{  
    try{
      var info = await axios.get('http://localhost:5000/gettasks')
      setInput(info.data)
      console.log(i1)
    }
    catch(err){
      console.error('Error fetching tasks:', err)
    }
  } 
  theStart()*/ //If I use this function an infinite loop occurs, why? Because the component is re-rendered every time the state changes, and the function is called again, which changes the state again, causing a loop.
  useEffect(()=>{
    async function fetchtasks(){
      console.log(username)
      try{
        var info = await axios.get(`http://localhost:5000/gettasks/${username}`)       
        setInput(info.data)
        console.log(info.data)
      }catch(err){
      console.error('Error fetching tasks:', err)
      } 
    }
    fetchtasks()         
  },[i2])

  return (    
    <div className='container'>
      
      <p>Number of tasks: {i1.length}</p>      
      <Todos input1={i1} selected={selected} setSelected={setSelected}/>
      {/*<Todos input1={i1} />*/}
      <Toadd input1={i1} setInput={setInput} setRes={setRes} selected={selected} username={username}/>

    </div>
  )
}
