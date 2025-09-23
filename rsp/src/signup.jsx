import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [usc, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInput = async (e) => {
    e.preventDefault();
    
    const username = e.target[0].value;
    const password = e.target[1].value;
    const confirmPassword = e.target[2].value;
    
    // Input validation
    if (!username || !password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      e.target[0].value = '';
      e.target[1].value = '';
      e.target[2].value = '';
      setUser([]);
      return;
    }
    
    setLoading(true);//1
    
    try {
      const res = await axios.post('https://taskrecorder-six.vercel.app/signup', {
        uname: username,  // Use local variables instead of state
        pass: password
      });
      
      console.log(res);
      alert('Signup successful!');//1 read about
      
      // Clear form on success
      e.target[0].value = '';
      e.target[1].value = '';
      e.target[2].value = '';
      setUser([]);
      
    } catch (err) {
      console.log(err);
      alert('Signup failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleInput}>
        <label>Username</label>
        <input type='text' required /><br/><br/>
        <label>New Password</label>
        <input type='password' id='p1' required /><br/><br/>
        <label>Confirm Password</label>
        <input type='password' id='p2' required /><br/><br/>
        <button type='submit' disabled={loading}>
          {loading ? 'Signing up...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
