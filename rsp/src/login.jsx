import React, { useState, useContext} from 'react'
import axios from 'axios'
import {useNavigate, Navigate, Link} from 'react-router-dom'
import {AuthContext} from './restricted.js'

export default function Login() {
  const [l1,setUser] = useState([])
  const {setStatus, setUsername} = useContext(AuthContext)
  const [loading, setitLoading] = useState(false)
  const navigate = useNavigate();
  const handleInput = async (e) =>{
    e.preventDefault()
    setitLoading(true)  
    const u = e.target[0].value
    const p = e.target[1].value     
    setUser([u, p])
    
    /*while()*/
    try{
  
      const res = await axios.post('https://taskrecorder-six.vercel.app/login',{uname:u, pwd:p})
      console.log(res.status)
      if(res.status===200){
        setUsername(u) 
        setStatus(true) 
        setitLoading(true)                   
        navigate('/container');
      }
      else{
        alert('Login failed')
        setitLoading(false)
      }
    }
    catch(err){
      console.log(err)
    }

  }
  return (
    <div>
      <form onSubmit={handleInput}>
       <label>Login</label>
       <input type='text'/><br/>
       <label>Password</label>
       <input type='password' id='pf1'></input><br/>      
       <button id='b1'>Submit</button><br/>
       <span><p>New User ?</p> </span>       
        <Link to='/signup'>Sign up</Link><br/>
       <p>{loading ? 'Loading...' : 'Hello'}</p>
      </form>
    </div>
  )
}






//doesnt work beacuse i1 and i2 are given the values but the re-rendering of component does not happen(only the values get stored)
