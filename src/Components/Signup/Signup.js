import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../Store/Context';  // Ensure correct import
import Logo from '../../olx-logo.png';
import {useHistory} from 'react-router-dom'
import './Signup.css';
import { Link } from 'react-router-dom';

export default function Signup() {
  const history=useHistory()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const { firebase } = useContext(FirebaseContext);  // Corrected syntax

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    firebase.auth().createUserWithEmailAndPassword(email, password)  // Corrected method name
      .then((result) => {
        result.user.updateProfile({ displayName: username }).then(()=>{
          firebase.firestore().collection('users').add({
            id:result.user.uid ,
            username:username,
            phone:phone
          }).then(()=>{
            history.push('/login')
          })
        })
      })
      .catch((error) => {
        console.error("Error signing up:", error.message);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
