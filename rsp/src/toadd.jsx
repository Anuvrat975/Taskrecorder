import React, {useState, useRef} from 'react'
import axios from 'axios'

export default function Toadd({input1, setRes, selected, setInput, username}) {
   const [start, setStart] = useState(true)
   const [end, setEnd] = useState(true)
   const [len, setLen] = useState(0)
   var nv1 = useRef(null)
   var nv2 = useRef(null)
   var nv0 = useRef(null)

  const handleRange = (e)=>{
    const s = e.target.value
    if(s==='today'){
      setStart(true)
      setEnd(false)
    }
    else if(s==='scheduled'){
      setStart(false)
      setEnd(false)
    }
    else{
      setStart(true)
      setEnd(true)
    }
  }
  const handleInput = async (e)=>{    
    const in1 = nv0.current.value
    const s1 = nv1.current.value//nv1.current will the current value of the input field which will be captured
    const e1 = nv2.current.value
    const s2 = s1.toString()
    const e2 = e1.toString()
    console.log(in1.current)
    
    setLen(len+1)
    const task = in1.toString()   
    try{
      const res = await axios.post(`https://taskrecorder-six.vercel.app/${username}`, { task: task, s2: s2, e2: e2 })
      console.log(res)
      setRes(len)
    }
    catch(err){
      console.log(err)
    }         
  }

  const handleDelete = async (e)=>{
    try{
      const res = await axios.post(`https://taskrecorder-six.vercel.app/${username}`, {selected: selected})
      console.log(res)
      setRes(Date.now())      
    }catch(err){
      console.log("This is"+" "+err)
    }}
  
  return (
    <div> 
      <input type="text" id='i1' ref={nv0}/>  <br/><br/>{/* 0 */}

      <label>Today</label>
      <input type="radio" id='r1' name="range" value='today' onChange={handleRange} />{/* 1 */}

      <label>Scheduled</label>
      <input type="radio" id='r2' name="range" value='scheduled' onChange={handleRange} />{/* 2 */}

      <label>No range</label>
      <input type="radio" id='r3' name="range" value='norange' onChange={handleRange} /><br/><br/>{/* 3 */}
      
      <label>Start date: </label>
      <input type='date' id='d1' disabled={start} ref={nv1}/><br/><br/>{/* 4 */}

      <label>End date: </label>
      <input type='date' id='d2' ref={nv2} disabled={end}/><br/><br/>

      <button onClick={handleInput}>Add</button>     
      <button onClick={handleDelete}>Delete</button> 
      </div>  
  )
}



