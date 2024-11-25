import React,{useEffect,useContext} from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Login from './Pages/Login'
import Create from './Pages/Create'
import Signup from './Pages/Signup'
import View from './Pages/ViewPost'
import './App.css';
import Post from './Store/postContext';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './Store/Context';

function App() {
  const {setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  useEffect(()=>{
      firebase.auth().onAuthStateChanged((user)=>{
        setUser(user)
      })
  })
  return (
    <div>
      <Post>
       <Router>
        <Route exact path='/' component={Home} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
        <Route path='/create' component={Create} />
        <Route path='/view' component={View} />
      </Router>
      </Post>
    </div>
  );
}

export default App;
