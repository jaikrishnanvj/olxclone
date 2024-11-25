import React, {useContext,useState} from 'react';
import { FirebaseContext } from '../../Store/Context';
import { Link } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const history=useHistory()
  const {firebase}=useContext(FirebaseContext)
  const handleLogin=(e)=>{
    e.preventDefault()
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
  <label htmlFor="fname">Email</label>
  <br />
  <input
    className="input"
    type="email"
    id="fname"
    name="email"
    value={email}           
    onChange={(e) => setEmail(e.target.value)}  // Add onChange to update state
  />
  <br />
  <label htmlFor="lname">Password</label>
  <br />
  <input
    className="input"
    type="password"
    id="lname"
    name="password"
    value={password}          
    onChange={(e) => setPassword(e.target.value)}  // Add onChange to update state
  />
  <br />
  <br />
  <button>Login</button>
</form>

<Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}

export default Login;
